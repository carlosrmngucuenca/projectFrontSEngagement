#build angular app in production mode
ng build --prod --base-href /myapp/
docker build -t felipe98mz/moteFront:v1 .
docker run -d -p 80:80 felipe98mz/moteBack:v1
