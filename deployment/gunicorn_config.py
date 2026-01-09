import multiprocessing

# Server Socket
bind = "unix:/var/www/home-services/home-services.sock"

# Worker Processes
# rule of thumb: (2 x CPUs) + 1. For a 2 vCPU server, 5 is good.
workers = 5
worker_class = 'sync'
timeout = 30
keepalive = 2

# Logging
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"
loglevel = "info"

# Process Naming
proc_name = "home-services"

# Security
limit_request_line = 4096
limit_request_fields = 100
limit_request_field_size = 8190
