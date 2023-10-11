@echo off

echo Construyendo la imagen Docker...
docker build -t my-nginx-angular .

echo Ejecutando el contenedor Docker...
docker run -d -p 80:80 my-nginx-angular

echo Aplicación Angular construida y contenedor Docker en ejecución en el puerto 4200.
