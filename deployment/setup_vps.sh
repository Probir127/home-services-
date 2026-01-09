#!/bin/bash
set -e

# Configuration
APP_NAME="home-services"
REPO_URL="https://github.com/Probir127/home-services-"
DOMAIN="grbs.se"
USER="grbs"
DB_NAME="grbs_db"
DB_USER="grbs_user"

# 1. Update System
echo "--- Updating System ---"
apt-get update && apt-get upgrade -y
apt-get install -y python3-pip python3-venv python3-dev libpq-dev postgresql postgresql-contrib nginx curl git certbot python3-certbot-nginx

# 2. Create User
echo "--- Creating User ---"
if ! id "$USER" &>/dev/null; then
    useradd -m -s /bin/bash $USER
    usermod -aG sudo $USER
fi

# 3. Database Setup
echo "--- Setting up PostgreSQL ---"
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;" || true
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD 'CHANGE_ME_IN_PROD';" || true
sudo -u postgres psql -c "ALTER ROLE $DB_USER SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE $DB_USER SET timezone TO 'UTC';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

# 4. Clone Project
echo "--- Cloning Project ---"
mkdir -p /var/www
cd /var/www
if [ ! -d "$APP_NAME" ]; then
    git clone $REPO_URL $APP_NAME
    chown -R $USER:$USER /var/www/$APP_NAME
fi
cd $APP_NAME

# 5. Application Setup (as User)
echo "--- Installing Dependencies ---"
sudo -u $USER bash <<EOF
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
EOF

# 6. Create .env (Placeholder)
echo "--- Creating .env ---"
if [ ! -f ".env" ]; then
    cat > .env <<EOL
DEBUG=False
SECRET_KEY=CHANGE_THIS_TO_A_LONG_RANDOM_STRING
ALLOWED_HOSTS=$DOMAIN,www.$DOMAIN,$(curl -s ifconfig.me)
DATABASE_URL=postgres://$DB_USER:CHANGE_ME_IN_PROD@localhost:5432/$DB_NAME
THROTTLE_RATE_ANON=100/day
THROTTLE_RATE_USER=1000/day
THROTTLE_RATE_CONTACT=5/hour
EOL
    chown $USER:$USER .env
fi

# 7. Collect Static
echo "--- Collecting Static Files ---"
sudo -u $USER bash <<EOF
cd /var/www/$APP_NAME
source venv/bin/activate
python manage.py collectstatic --noinput
python manage.py migrate
EOF

# 8. Setup Gunicorn
echo "--- Configuring Gunicorn ---"
cat > /etc/systemd/system/gunicorn.service <<EOL
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=$USER
Group=www-data
WorkingDirectory=/var/www/$APP_NAME
ExecStart=/var/www/$APP_NAME/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/var/www/$APP_NAME/$APP_NAME.sock grbs_project.wsgi:application

[Install]
WantedBy=multi-user.target
EOL

systemctl start gunicorn
systemctl enable gunicorn

# 9. Setup Nginx
echo "--- Configuring Nginx ---"
cat > /etc/nginx/sites-available/$APP_NAME <<EOL
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN $(curl -s ifconfig.me);

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        root /var/www/$APP_NAME;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/$APP_NAME/$APP_NAME.sock;
    }
}
EOL

ln -s /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo "--- DONE! ---"
echo "Next steps:"
echo "1. Edit .env with real secrets"
echo "2. Run 'certbot --nginx -d $DOMAIN -d www.$DOMAIN' for HTTPS"
