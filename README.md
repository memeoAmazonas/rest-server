# rest-server-express-template
### - modificar y renonbrar el .env.local por .env
### - crear la bd en [atlas](https://www.mongodb.com/cloud/atlas), se debe tener instalado [compas](https://www.mongodb.com/try/download/compass), para manejar las bd
### - Los servicios del crud de este proyecto estan alojados en [Heroku](https://server-node-initial.herokuapp.com/)
### - crear usuarios de prueba, body del post es 
```$xslt
{
    "name": "sell4",
    "email": "sell4@test.com",
    "password":"123456789",
    "role": "SELL_ROLE"
}
nota: los roles pueden ser ['ADMIN_ROLE', 'USER_ROLE', 'SELL_ROLE'] de otro modo no creara el usuario en bd
```
### - como ayuda, en la raiz del proyecto se encuentra la collection generada por postman para los servicios, se debe reemplazar {{url}} por su valor correspondiente.  
``` enjoy :)```
