export interface PrecioMayorista {
    id: number,
    productoId: number,
    cantidadMinVenta: number,
    precioUnidad: number,
    precioCaja: number,
    esMay: boolean,
    Producto: {
        descripcion: string;
    }
}