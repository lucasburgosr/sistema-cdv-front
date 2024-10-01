import { Producto } from "./Producto"

export interface Promocion {
    nombrePromocion: string,
    productosSeleccionados: Producto[],
    costoTotal: number,
    precioTotal: number,
    margenPromedio: number,
    fechaCreacion: Date,
}