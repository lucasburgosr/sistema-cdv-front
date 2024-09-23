export interface Producto {
    id: number,
    codigoProducto: number,
    bodegaId: number,
    varietalId: number,
    categoriaId: number,
    linea: string,
    codigoFabrica: number,
    descripcion: string,
    unidades: number,
    unidadDeMedida: number,
    esMinorista: boolean,
    esMayorista: boolean,
    esDistri: boolean,
    esSobremesa: boolean,
    esMeLi: boolean,
    esBsAs: boolean,
    stock: boolean,
    comercializado: boolean,
    Bodega: {
        nombre: string,
    },
    Categoria: {
        nombre: string,
    },
    PrecioMinorista: {
        precioUnidad: number,
        precioCaja: number,
        esMin: boolean,
    },
    PrecioMayorista: {
        precioUnidad: number,
        precioCaja: number,
        esMay: boolean,
    },
    PrecioBuenosAires: {
        precioUnidad: number,
        precioCaja: number,
        esBsAs: boolean,
    },
    PrecioDistribucion: {
        precioMayUnidad: number,
        precioMayCaja: number,
        esDistri: boolean,
    },
    PrecioSobremesa: {
        precio: number,
        precioPorCopa: number,
        esSobremesa: boolean,
    },
    PrecioMercadoLibre: {
        precioMLIndividual: number,
        precioMLCaja: number,
        precioCuotas3Individual: number,
        precioCuotas6Individual: number,
        precioCuotas12Individual: number,
        precioCuotas3Caja: number,
        precioCuotas6Caja: number,
        precioCuotas12Caja: number,
        esMeLi: boolean
    }
}