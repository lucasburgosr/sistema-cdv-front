export interface Bodega {
    id: number,
    nombre: string,
    porcentajeDescuento: number,
    porcentajeDescuentosProntoPago: number,
    accionTipica: string,
    margenMinimo: number,
    margenMay: number,
    margenDepo: number,
    margenDistri: number,
    costoConIva: number,
    costoSinIva: number,
    proveedor: number,
}