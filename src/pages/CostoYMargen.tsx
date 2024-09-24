import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { CostoYMargen } from '../types/CostoYMargen';

const CostosYMargenes: React.FC = () => {
    const [costos, setCostos] = useState<CostoYMargen[]>([]);
    const [editMode, setEditMode] = useState(false); // Estado para controlar el modo edición
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para la búsqueda
    const [modifiedCostos, setModifiedCostos] = useState<CostoYMargen[]>([]); // Almacena los costos modificados

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/costoymargen`)
            .then((response) => response.json())
            .then((data) => {
                setCostos(data);
            })
            .catch((error) => console.error('Error fetching costos y márgenes:', error));
    }, []);

    // Función para manejar el input de búsqueda
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Filtrar los costos y márgenes por la descripción del producto
    const filteredCostos = costos.filter((costo) =>
        costo.Producto.descripcion.toLowerCase().includes(searchTerm)
    );

    // Función para manejar los cambios en los inputs
    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedCostos = [...costos];
        (updatedCostos[index] as any)[field] = Number(value); // Asegurar que el valor sea numérico

        // Verificar si el costo ya está en los modificados, de lo contrario añadirlo
        const existingIndex = modifiedCostos.findIndex((c) => c.id === updatedCostos[index].id);
        if (existingIndex !== -1) {
            const updatedModifiedCostos = [...modifiedCostos];
            updatedModifiedCostos[existingIndex] = updatedCostos[index];
            setModifiedCostos(updatedModifiedCostos);
        } else {
            setModifiedCostos([...modifiedCostos, updatedCostos[index]]);
        }

        setCostos(updatedCostos);
    };

    // Función para manejar el clic en el botón de edición
    const handleEditClick = () => {
        setEditMode(true);
    };

    // Función para guardar los cambios y deshabilitar el modo edición
    const handleSaveClick = () => {
        setEditMode(false);

        // Calcular costoSinIva solo si costoConIva ha sido modificado
        const updatedModifiedCostos = modifiedCostos.map((costo) => {
            if (costo.costoConIva) {
                costo.costoSinIva = Number((costo.costoConIva / 1.21).toFixed(0)); // Redondear a 0 decimales
            }
            return costo;
        });

        console.log(updatedModifiedCostos);

        // Enviar solo los costos modificados al servidor
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/costoymargen/multiple-update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedModifiedCostos), // Enviar los costos modificados
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Actualizado:', data);
                setModifiedCostos([]); // Limpiar los costos modificados después de guardar
            })
            .catch((error) => console.error('Error al actualizar los costos/márgenes:', error));
    };

    return (
        <div className="container mt-4">
            <h2 className='text-center'>Costos y márgenes</h2>

            <div className='d-flex gap-2'>

                {/* Barra de búsqueda */}
                <Form className="mb-3 w-25">
                    <Form.Control
                        type="text"
                        placeholder="Buscar por descripción"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form>

                <Button variant="primary" onClick={editMode ? handleSaveClick : handleEditClick} className="mb-3">
                    {editMode ? 'Guardar' : 'Editar'}
                </Button>

            </div>

            <div className="table-responsive text-center">
                <Table striped bordered hover>
                    <thead className="fs-6 text">
                        <tr>
                            <th>Producto</th>
                            <th>Costo sin IVA</th>
                            <th>Costo con IVA</th>
                            <th>Descuento</th>
                            <th>Descuento PP</th>
                            <th>Acciones 1</th>
                            <th>Acciones 2</th>
                            <th>Margen minorista</th>
                            <th>Margen mayorista</th>
                            <th>Margen Mercado Libre</th>
                            <th>Margen Buenos Aires</th>
                            <th>Margen Depósito</th>
                            <th>Margen Distribución</th>
                            <th>Margen Sobremesa</th>
                            <th>Costo de envío caja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCostos.map((costo, index) => (
                            <tr key={costo.id}>
                                <td>{costo.Producto.descripcion}</td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.costoSinIva}
                                            onChange={(e) => handleInputChange(index, 'costoSinIva', e.target.value)}
                                        />
                                    ) : (
                                        costo.costoSinIva
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.costoConIva}
                                            onChange={(e) => handleInputChange(index, 'costoConIva', e.target.value)}
                                        />
                                    ) : (
                                        costo.costoConIva
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.descuento}
                                            onChange={(e) => handleInputChange(index, 'descuento', e.target.value)}
                                        />
                                    ) : (
                                        costo.descuento
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.descuentoPp}
                                            onChange={(e) => handleInputChange(index, 'descuentoPp', e.target.value)}
                                        />
                                    ) : (
                                        costo.descuentoPp
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.acciones1}
                                            onChange={(e) => handleInputChange(index, 'acciones1', e.target.value)}
                                        />
                                    ) : (
                                        costo.acciones1
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.acciones2}
                                            onChange={(e) => handleInputChange(index, 'acciones2', e.target.value)}
                                        />
                                    ) : (
                                        costo.acciones2
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.margenMin}
                                            onChange={(e) => handleInputChange(index, 'margenMin', e.target.value)}
                                        />
                                    ) : (
                                        costo.margenMin
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.margenMay}
                                            onChange={(e) => handleInputChange(index, 'margenMay', e.target.value)}
                                        />
                                    ) : (
                                        costo.margenMay
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.margenMeLi}
                                            onChange={(e) => handleInputChange(index, 'margenMeLi', e.target.value)}
                                        />
                                    ) : (
                                        costo.margenMeLi
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.margenBsAs}
                                            onChange={(e) => handleInputChange(index, 'margenBsAs', e.target.value)}
                                        />
                                    ) : (
                                        costo.margenBsAs
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.margenDepo}
                                            onChange={(e) => handleInputChange(index, 'margenDepo', e.target.value)}
                                        />
                                    ) : (
                                        costo.margenDepo
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.margenDistri}
                                            onChange={(e) => handleInputChange(index, 'margenDistri', e.target.value)}
                                        />
                                    ) : (
                                        costo.margenDistri
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.margenSobremesa}
                                            onChange={(e) => handleInputChange(index, 'margenSobremesa', e.target.value)}
                                        />
                                    ) : (
                                        costo.margenSobremesa
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={costo.costoEnvioCaja}
                                            onChange={(e) => handleInputChange(index, 'costoEnvioCaja', e.target.value)}
                                        />
                                    ) : (
                                        costo.costoEnvioCaja
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default CostosYMargenes;
