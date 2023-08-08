# Base on offical NGINX Alpine image
FROM nginx

# ENV DEBIAN_FRONTEND noninteractive
# ENV TZ Asia/Shanghai

# RUN apt-get update \
#  && apt-get install -y --no-install-recommends \
#       apache2-utils 

# Remove any existing config files
# RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
