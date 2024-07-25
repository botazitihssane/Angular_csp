FROM node:20.15.1-slim AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn global add @angular/cli && \
    ng build --configuration=production --output-path=dist/angular-csp/browser

RUN ls -R /app/dist

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
