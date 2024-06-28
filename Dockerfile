FROM node:20.10.0-alpine AS builder

WORKDIR /usr/local/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --configuration=production --output-hashing=all

FROM httpd:2.4

COPY --from=builder /usr/local/app/dist/gna-web-application-back-office/browser /usr/local/apache2/htdocs/
COPY .htaccess /usr/local/apache2/htdocs/
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

RUN chmod -R 755 /usr/local/apache2/htdocs/
