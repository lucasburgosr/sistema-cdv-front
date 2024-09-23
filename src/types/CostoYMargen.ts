export interface CostoYMargen {
    id?: number,
    productoId: number,
    costoConIva?: number,
    costoSinIva?: number,
    iva: boolean,
    descuento?: number,
    descuentoPp?: number,
    acciones1?: number,
    acciones2?: number,
    margenMin?: number,
    margenMay?: number,
    margenMeLi?: number,
    margenBsAs?: number,
    margenDepo?: number,
    margenDistri?: number,
    margenSobremesa?: number,
    fechaActualizacionCosto?: Date,
    fechaActuailzacionMargenODescuento?: Date,
    costoEnvioCaja?: number,
    Producto: {
        descripcion: string;
    }
}