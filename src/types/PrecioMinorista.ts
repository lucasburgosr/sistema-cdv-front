export interface PrecioMinorista {
    id: number,
    productoId: number,
    precioUnidad: number,
    precioCaja: number,
    esMin: boolean,
    Producto: {
        descripcion: string;
    }
}