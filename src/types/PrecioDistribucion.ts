export interface PrecioDistribucion {
    id: number,
    productoId: number,
    cantidadMinVenta: number,
    precioMayUnidad: number,
    precioMayCaja: number,
    porcentajeDescuentoPosible: number,
    esDistri: boolean,
    Producto: {
        descripcion: string
    }
}