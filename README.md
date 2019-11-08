# Team01-Entrega4 - FutureGuide

* [UML](https://www.lucidchart.com/documents/edit/4ed6e04c-3fc5-49f3-95b0-b5c3c09af656?shared=true&) - Diagrama UML del Proyecto 📋
* [FutureGuideVideo](https://www.youtube.com/watch?v=VshXXhN3a8k) - Video Propuesta
* [FutureGuideApp](https://youtu.be/z2ddwnfWDug) - Video Funcionalidades
* [Página Web](http://futureguide.herokuapp.com/) - Link de la página web

### Descripción

FutureGuide es una iniciativa que surge como respuesta al problema de escoger qué carrera estudiar y dónde hacerlo. Nuestro público objetivo son  los jóvenes que estén a punto o ya hayan culminado su educación secundaria y estén buscando una carrera que se adapte a sus gustos y necesidades específicas. Puedes comparar diversas universidades por el parámetro que desees: perfil del egresado, precio, etc. Olvídate de complicaciones y decisiones apresuradas, toma la alternativa correcta que te hará feliz de por vida.


### Pre-requisitos 📋
```
* Tener Instalado Node.js
* Express
* React
* Cuenta en Heroku
* Cuenta Mongo Atlas
```

### Instalación 🔧
_Paso 1_

```
Realizar git clone al proyecto
```

_Paso 2_

```
Abrir una consola cmd en el proyecto. Luego hacer npm install en la carpeta root y en la carpeta front.
```
_Paso 3_

```
Crear un archivo .env con el formato disponible en el archivo env.txt. con las credenciales de la base de datos creadas en Mongo Atlas.
```

## Deployment 📦

_Deploy en local_

_Paso 1_

```
Abrir una consola en la carpeta root del proyecto y hacer npm start.
```

_Paso 2_

```
Abrir otra consola cmd en la carpeta front y hacer npm start.
```
_Paso 3_

```
En el navegador ingresar la url http://localhost:3000/
```

_Deploy en Heroku_

_Paso 1_

```
Abrir consola en la carpeta root del proyecto.
```
_Paso 2_

```
Ingresar el comando heroku login e ingresar las credenciales de la cuenta en Heroku.
```
_Paso 3_

```
Ingresar el comando heroku create.
```
_Paso 4_

```
Ingresar el comando git push heroku master.
```
_Paso 5_

```
Ingresar el comando heroku ps:scale web=1 para asegurar que hay una instancia para el servidor.
```
_Paso 6_

```
Ingresar el comando heroku open para abrir la página en el browser.
```

## Construido con 🛠️

* [ReactJs](https://es.reactjs.org/) - El framework web usado.
* [NPM](https://www.npmjs.com/) - Manejador de dependencias.
* [HEROKU](https://www.heroku.com) - Herramienta Usada para el despliegue de la app.
* [NodeJs](https://nodejs.org/es/) - Entorno de ejecución
* [Mongo Atlas](https://www.mongodb.com/cloud/atlas) - Herramienta usada para centralizar la base de datos en la nube.
* [Mongodb](https://www.mongodb.com/es) - Sistema Manejador de Bases de Datos NOSQL.
* [GoogleFonts](https://fonts.google.com) - Fuentes utilizadas: Titillium Web & Karla

## Autores ✒️

* **Mateo Salcedo** 
* **Francisco González Rey** 
* **Andrés Manrique** 
* **Diany Quintero**
