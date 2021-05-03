FROM node:current-alpine
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 3000
# ENV NEXT_PUBLIC_ANALYTICS_ID=true
CMD ["yarn", "start"]

# FROM nginx:alpine
# COPY out /usr/share/nginx/html
