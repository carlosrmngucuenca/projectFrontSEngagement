# Utiliza una imagen de Nginx como base
FROM nginx:latest

# Copia los archivos de tu aplicación Angular al directorio de publicación de Nginx
COPY dist/student-front /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx en segundo plano
CMD ["nginx", "-g", "daemon off;"]
