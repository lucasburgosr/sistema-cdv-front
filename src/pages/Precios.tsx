import { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { Producto } from '../types/Producto';
import { ParametrosMeLi } from '../types/ParametrosMeLi';

const Precios: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [parametrosMeLi, setParametrosMeLi] = useState<ParametrosMeLi[]>([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/productos`)
            .then(response => response.json())
            .then(data => {
                setProductos(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching productos:', error));

        fetch(`${apiUrl}/parametros-ml`)
            .then(response => response.json())
            .then(data => {
                setParametrosMeLi(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching parámetros:', error));
    }, [apiUrl]);

    // Filtrar productos por descripción basado en el término de búsqueda
    const filteredProductos = productos.filter(producto =>
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container mt-4'>
            <h2 className='text-center'>Precios</h2>

            {/* Input de búsqueda */}
            <Form.Group className="mb-3 w-25" controlId="search">
                <Form.Control
                    type="text"
                    placeholder="Buscar por descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                />
            </Form.Group>

            <div className='table-responsive text-center'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Producto</th>
                            <th colSpan={2}>Minorista</th>
                            <th colSpan={2}>Mayorista</th>
                            <th colSpan={2}>Sobremesa</th>
                            <th colSpan={2}>Distribución</th>
                            <th colSpan={2}>Buenos Aires</th>
                            <th colSpan={8}>Mercado Libre</th>
                        </tr>
                        <tr>
                            <th>Precio Unitario</th>
                            <th>Precio por Caja</th>
                            <th>Precio Unitario</th>
                            <th>Precio por Caja</th>
                            <th>Precio por Botella</th>
                            <th>Precio por Copa</th>
                            <th>Precio Unitario</th>
                            <th>Precio por Caja</th>
                            <th>Precio Unitario</th>
                            <th>Precio por Caja</th>
                            <th>Precio Unitario</th>
                            <th>Precio Unitario 3 Cuotas</th>
                            <th>Precio Unitario 6 Cuotas</th>
                            <th>Precio Unitario 12 Cuotas</th>
                            <th>Precio por Caja</th>
                            <th>Precio por Caja 3 Cuotas</th>
                            <th>Precio por Caja 6 Cuotas</th>
                            <th>Precio por Caja 12 Cuotas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredProductos) && filteredProductos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.descripcion}</td>

                                {/* Verificación para Precio Minorista */}
                                {producto.PrecioMinorista?.esMin ? (
                                    <>
                                        <td>{producto.PrecioMinorista.precioUnidad}</td>
                                        <td>{producto.PrecioMinorista.precioCaja}</td>
                                    </>
                                ) : (
                                    <td colSpan={2}>N/A</td>
                                )}

                                {/* Verificación para Precio Mayorista */}
                                {producto.PrecioMayorista?.esMay ? (
                                    <>
                                        <td>{producto.PrecioMayorista.precioUnidad}</td>
                                        <td>{producto.PrecioMayorista.precioCaja}</td>
                                    </>
                                ) : (
                                    <td colSpan={2}>N/A</td>
                                )}

                                {/* Verificación para Precio Sobremesa */}
                                {producto.PrecioSobremesa?.esSobremesa ? (
                                    <>
                                        <td>{producto.PrecioSobremesa.precio}</td>
                                        <td>{producto.PrecioSobremesa.precioPorCopa}</td>
                                    </>
                                ) : (
                                    <td colSpan={2}>N/A</td>
                                )}

                                {/* Verificación para Precio Distribución */}
                                {producto.PrecioDistribucion?.esDistri ? (
                                    <>
                                        <td>{producto.PrecioDistribucion.precioMayUnidad}</td>
                                        <td>{producto.PrecioDistribucion.precioMayCaja}</td>
                                    </>
                                ) : (
                                    <td colSpan={2}>N/A</td>
                                )}

                                {/* Verificación para Precio Buenos Aires */}
                                {producto.PrecioBuenosAires?.esBsAs ? (
                                    <>
                                        <td>{producto.PrecioBuenosAires.precioUnidad}</td>
                                        <td>{producto.PrecioBuenosAires.precioCaja}</td>
                                    </>
                                ) : (
                                    <td colSpan={2}>N/A</td>
                                )}

                                {producto.PrecioMercadoLibre?.esMeLi && parametrosMeLi.length > 0 ? (
                                    <>
                                        <td>{producto.PrecioMercadoLibre.precioMLIndividual}</td>
                                        <td>{producto.PrecioMercadoLibre.precioCuotas3Individual}</td>
                                        <td>{producto.PrecioMercadoLibre.precioCuotas6Individual}</td>
                                        <td>{producto.PrecioMercadoLibre.precioCuotas12Individual}</td>
                                        <td>{producto.PrecioMercadoLibre.precioMLCaja}</td>
                                        <td>{producto.PrecioMercadoLibre.precioCuotas3Caja}</td>
                                        <td>{producto.PrecioMercadoLibre.precioCuotas6Caja}</td>
                                        <td>{producto.PrecioMercadoLibre.precioCuotas12Caja}</td>
                                    </>
                                ) : (
                                    <td colSpan={8}>N/A</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Precios;
