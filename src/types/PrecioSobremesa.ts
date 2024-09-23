export interface PrecioSobremesa {
    id: number,
    productoId: number,
    precio: number,
    precioPorCopa: number,
    esSobremesa: boolean,
    Producto: {
        descripcion: string
    }
}