export class Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    idCategoria: number;
    detalle: string;

    constructor(id: number, nombre: string, precio: number, imagen: string, idCategoria: number, detalle: string){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen,
        this.idCategoria = idCategoria,
        this.detalle = detalle
    }
}
