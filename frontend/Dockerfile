FROM node:18-alpine AS build
WORKDIR /app

RUN apk add --no-cache python3 make g++ libstdc++

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
