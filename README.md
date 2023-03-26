# Proyecto Frontend React - Gestion de Capital Humano UTN-FRT

Este es un proyecto frontend desarrollado para la materia de Gestion de Capital Humano de la UTN-FRT. El objetivo del proyecto es desarrollar una aplicación web que permita gestionar los recursos humanos de una empresa de forma eficiente.

## Inicialización del proyecto

Para inicializar el proyecto, siga los siguientes pasos:

1. Clone el repositorio.
2. Abra una terminal y navegue a la carpeta raíz del proyecto.
3. Ejecute el comando `yarn` o `npm i` para instalar las dependencias.
4. Una vez finalizada la instalación, ejecute el comando `yarn start` o `npm start` para iniciar la aplicación. La aplicación se ejecutará en el puerto 3000 del servidor local.

## Usuarios

La aplicación cuenta con dos usuarios hardcodeados:

- Usuario1: admin -> contraseña: admin
- Usuario2: user -> contraseña: user

## Características de la aplicación

- La aplicación está desarrollada en React.
- Se utiliza React Router V6 para la navegación entre páginas.
- Los estilos se gestionan con CSS una librería llamada Styled Components.
- La aplicación cuenta con un sistema de autenticación básico. Los usuarios se almacenan en un archivo JSON y se validan en el frontend guardandolos en el localStorage del navegador.
- Se utiliza Axios para realizar peticiones HTTP al backend. (a desarrollar los endpoints)
- La aplicación está diseñada de forma responsive para adaptarse a diferentes tamaños de pantalla.
