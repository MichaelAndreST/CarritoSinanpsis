export class Producto {
    id!: number;
    nombre!: string;
    precio!: number;
    imagen!: string;

    constructor(id: number, nombre: string, precio: number, imagen: string){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen
    }
}
