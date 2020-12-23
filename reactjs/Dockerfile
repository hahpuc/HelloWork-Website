# build environment
FROM node:15-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

# the image size according to alpine does not affect some package like python...
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

# install packages and build for production
RUN npm install --quiet

COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]