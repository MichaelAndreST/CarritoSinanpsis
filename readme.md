# Carrito de Compras - Frontend Sinapsis

Este proyecto es una aplicación de carrito de compras construida con Angular. Utiliza el almacenamiento local del navegador (localStorage)

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [Angular CLI](https://angular.io/cli) (v15 o superior)

## Instalación y configuración

Sigue estos pasos para levantar el proyecto:

### 1. Clonar el repositorio
```bash
git clone https://github.com/MichaelAndreST/CarritoSinanpsis.git
cd CarritoSinapsis
```

### 2. Instalar las dependencias
Ejecuta el siguiente comando para instalar las dependencias del proyecto:
```bash
npm install
```

### 3. Ejecutar la aplicación
Levanta el servidor de desarrollo utilizando el siguiente comando:
```bash
ng serve
```

Por defecto, la aplicación estará disponible en [http://localhost:4200](http://localhost:4200).


## Funcionalidad clave

- Servicio de lista de carrito de compras para agregar y eliminar productos. Los datos se guardan de forma temporal en el localstorage
- Muestra de lista de productos separados por categoria y un dropdownlist que permite mostrar cada categoria
- Detalle de los productos al Seleccionarlos por su imagen


- Se realizo el proyecto utilizando boostrap para utilizar un formato responsive


### Construcción para producción
Genera una build optimizada con:
```bash
ng build --configuration production
```
---
¡Gracias por revisar mi proyecto!
