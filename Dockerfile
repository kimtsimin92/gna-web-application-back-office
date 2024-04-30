FROM httpd:2.4
COPY dist/gna-web-application-back-office/browser /usr/local/apache2/htdocs/
COPY .htaccess /usr/local/apache2/htdocs/
COPY httpd.conf /usr/local/apache2/conf/httpd.conf
RUN chmod -R 755 /usr/local/apache2/htdocs/
