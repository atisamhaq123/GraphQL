# base image
FROM node:20.10.0 as node

# set working directory
WORKDIR /app

RUN mkdir client_app

WORKDIR /app/client_app

COPY . .

RUN npm install

#RUN ng build
RUN npm run build
FROM nginx:alpine

RUN rm /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html
COPY --from=node /app/client_app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/client_app/dist/. .

