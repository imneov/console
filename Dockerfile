FROM nginx:alpine

ARG DIRECTORY_NAME

COPY ./packages/${DIRECTORY_NAME}/dist/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
