export interface PrecioMercadoLibre {
    id: number,
    productoId: number,
    precioMLIndividual: number,
    precioMLCaja: number,
    precioCuotas3Individual: number,
    precioCuotas6Individual: number,
    precioCuotas12Individual: number,
    precioCuotas3Caja: number,
    precioCuotas6Caja: number,
    precioCuotas12Caja: number,
    esMeLi: boolean
    Producto: {
        descripcion: string;
    }
}