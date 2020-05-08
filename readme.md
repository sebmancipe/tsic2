## Tener en cuenta para ejecución en Docker de máquina virtual:
Modificar el archivo api.js a la dirección IP del servidor (de la misma máquina anfitriona)
Modificar el archivo docker-compose.yml agregando el volumen de datos creado para mongo y definiéndolo en la parte inferior con el atributo 'external=true'
Modificar el archivo .env cambiando el atributo MONGO_HOSTNAME=mongo en vez de local
