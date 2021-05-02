# FROM node:current-alpine
# WORKDIR /app
# COPY . .
# RUN yarn
# RUN yarn build
# EXPOSE 3000
# CMD ["yarn", "start"]

FROM nginx:alpine
COPY out /usr/share/nginx/html