import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Container } from 'react-bootstrap';
import { ParametrosMeLi } from '../types/ParametrosMeLi';

const ParametrosMercadoLibre = () => {
    const [parametrosMeLi, setParametrosMeLi] = useState<ParametrosMeLi | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchParametrosML();
    }, [apiUrl]);

    const fetchParametrosML = async () => {
        try {
            const response = await fetch(`${apiUrl}/parametros-ml/`);
            const data = await response.json();
            setParametrosMeLi(data.length > 0 ? data[0] : null);
        } catch (error) {
            console.error('Error fetching Mercado Libre parameters:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setParametrosMeLi(prevState => {
            if (!prevState) {
                return {
                    margenLimite: 0,
                    precioLimite1: 0,
                    precioLimite2: 0,
                    costoEnvio: 0,
                    cf1: 0,
                    cf2: 0,
                    tasa3: 0,
                    tasa6: 0,
                    tasa12: 0,
                    [name]: value ? parseFloat(value) : 0,
                } as unknown as ParametrosMeLi;
            }

            return {
                ...prevState,
                [name]: value ? parseFloat(value) : 0
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = `${apiUrl}/parametros-ml${parametrosMeLi?.id ? `/${parametrosMeLi.id}` : ''}`;
            const method = parametrosMeLi?.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parametrosMeLi),
            });
            

            if (response.ok) {
                alert('Parámetros guardados exitosamente');
                setIsEditMode(false);
                fetchParametrosML();  // Refresca los datos después de guardar

                await completarPreciosMeLi();
            } else {
                alert('Error al guardar los parámetros');
            }
            
        } catch (error) {
            console.error('Error saving Mercado Libre parameters:', error);
        }
    };

    const completarPreciosMeLi = async () => {
        try {
            const response = await fetch(`${apiUrl}/costoymargen/completar-precios-ml`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parametrosMeLi), // Envías los parámetros guardados para hacer los cálculos
            });
    
            // Captura el cuerpo de la respuesta
            const responseBody = await response.json(); // Espera a obtener el texto de la respuesta
    
            if (response.ok) {
                alert('Cálculo de precios realizado exitosamente');
            } else {
                console.error('Error en la respuesta:', responseBody); // Muestra el cuerpo de la respuesta
                alert('Error al calcular precios');
            }
        } catch (error) {
            console.error('Error calculating prices:', error);
        }
    };
    

    const handleBack = () => {
        setIsEditMode(false);
    };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    return (
        <Container>
            {isEditMode ? (
                <Container>
                    <h1>Editar parámetros</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="margenLimite">
                            <Form.Label>Margen Límite:</Form.Label>
                            <Form.Control
                                type="number"
                                name="margenLimite"
                                value={parametrosMeLi?.margenLimite || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="precioLimite1">
                            <Form.Label>Precio Límite 1:</Form.Label>
                            <Form.Control
                                type="number"
                                name="precioLimite1"
                                value={parametrosMeLi?.precioLimite1 || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="precioLimite2">
                            <Form.Label>Precio Límite 2:</Form.Label>
                            <Form.Control
                                type="number"
                                name="precioLimite2"
                                value={parametrosMeLi?.precioLimite2 || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="costoEnvio">
                            <Form.Label>Costo Envío:</Form.Label>
                            <Form.Control
                                type="number"
                                name="costoEnvio"
                                value={parametrosMeLi?.costoEnvio || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="cf1">
                            <Form.Label>CF1:</Form.Label>
                            <Form.Control
                                type="number"
                                name="cf1"
                                value={parametrosMeLi?.cf1 || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="cf2">
                            <Form.Label>CF2:</Form.Label>
                            <Form.Control
                                type="number"
                                name="cf2"
                                value={parametrosMeLi?.cf2 || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="tasa3Cuotas">
                            <Form.Label>Tasa 3 Cuotas:</Form.Label>
                            <Form.Control
                                type="number"
                                name="tasa3"
                                value={parametrosMeLi?.tasa3 || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="tasa6Cuotas">
                            <Form.Label>Tasa 6 Cuotas:</Form.Label>
                            <Form.Control
                                type="number"
                                name="tasa6"
                                value={parametrosMeLi?.tasa6 || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="tasa12Cuotas">
                            <Form.Label>Tasa 12 Cuotas:</Form.Label>
                            <Form.Control
                                type="number"
                                name="tasa12"
                                value={parametrosMeLi?.tasa12 || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className='m-2'>Guardar</Button>
                        <Button onClick={handleBack} variant="secondary" className='m-2'>Volver</Button>
                    </Form>
                </Container>
            ) : (
                <>
                    <h1>Parámetros de Mercado Libre</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Margen Límite</th>
                                <th>Precio Límite 1</th>
                                <th>Precio Límite 2</th>
                                <th>Costo Envío</th>
                                <th>CF1</th>
                                <th>CF2</th>
                                <th>Tasa 3 Cuotas</th>
                                <th>Tasa 6 Cuotas</th>
                                <th>Tasa 12 Cuotas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parametrosMeLi ? (
                                <tr>
                                    <td>{parametrosMeLi.margenLimite}</td>
                                    <td>{parametrosMeLi.precioLimite1}</td>
                                    <td>{parametrosMeLi.precioLimite2}</td>
                                    <td>{parametrosMeLi.costoEnvio}</td>
                                    <td>{parametrosMeLi.cf1}</td>
                                    <td>{parametrosMeLi.cf2}</td>
                                    <td>{parametrosMeLi.tasa3}</td>
                                    <td>{parametrosMeLi.tasa6}</td>
                                    <td>{parametrosMeLi.tasa12}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center">No hay parámetros creados</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button onClick={handleEdit} variant="secondary">{parametrosMeLi ? 'Editar' : 'Crear'}</Button>
                </>
            )}
        </Container>
    );
};

export default ParametrosMercadoLibre;
