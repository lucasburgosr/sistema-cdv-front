import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Bodega } from '../types/Bodega';
import { Categoria } from '../types/Categoria';
import { Varietal } from '../types/Varietal';
import { useNavigate, useParams } from 'react-router-dom'; // Para obtener el ID del producto

const FormProducto: React.FC = () => {
    const { id } = useParams<{ id?: string }>(); // Obtenemos el id si estamos en modo edición
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const navigate = useNavigate();

    const [bodegas, setBodegas] = useState<Bodega[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [varietales, setVarietales] = useState<Varietal[]>([]);

    const [producto, setProducto] = useState({
        bodegaId: 0,
        varietalId: 0,
        categoriaId: 0,
        linea: '',
        codigoFabrica: 0,
        descripcion: '',
        unidades: '',
        unidadDeMedida: '',
        esMin: false,
        esMinorista: false, // Cambiado de esMin a esMinorista
        esMayorista: false, // Cambiado de esMay a esMayorista
        esSobremesa: false,
        esDistri: false,
        esMeLi: false,
        esBsAs: false,
        stock: true,
        comercializado: true,
    });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;

        // Determinar si estamos en modo edición
        if (id) {
            setIsEdit(true);
            fetchProducto(id);
        }

        // Fetch bodegas
        fetch(`${apiUrl}/bodegas`)
            .then((response) => response.json())
            .then((data) => setBodegas(data))
            .catch((error) => console.error('Error fetching bodegas:', error));

        // Fetch categorias
        fetch(`${apiUrl}/categorias`)
            .then((response) => response.json())
            .then((data) => setCategorias(data))
            .catch((error) => console.error('Error fetching categorias:', error));

        // Fetch varietales
        fetch(`${apiUrl}/varietales`)
            .then((response) => response.json())
            .then((data) => setVarietales(data))
            .catch((error) => console.error('Error fetching varietales:', error));
    }, [id]);

    // Función para obtener los datos de un producto existente (modo edición)
    const fetchProducto = async (productoId: string) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/productos/${productoId}`);
            const data = await response.json();
            setProducto(data); // Cargamos los datos del producto
        } catch (error) {
            console.error('Error fetching producto:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setProducto({
            ...producto,
            [name]: fieldValue,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const method = isEdit ? 'PUT' : 'POST'; // Usamos PUT si es edición, POST si es creación
            const endpoint = isEdit ? `${apiUrl}/productos/${id}` : `${apiUrl}/productos`;

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error(isEdit ? 'Error al actualizar el producto' : 'Error al crear el producto');
            }

            alert(isEdit ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');

            if (isEdit) {
                navigate(`/`)
            } else {
                const data = await response.json();
                const productoId = data.id;
                navigate(`/crear-costoymargen/${productoId}`)
            }


        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className='text-center'>{isEdit ? 'Modificar Producto' : 'Crear Producto'}</h2>
            <Form onSubmit={handleSubmit}>

                {/* Bodega */}
                <Form.Group controlId="bodegaId">
                    <Form.Label>Bodega</Form.Label>
                    <Form.Control as="select" name="bodegaId" value={producto.bodegaId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}>
                        <option value="">Seleccione una bodega</option>
                        {bodegas.map((bodega) => (
                            <option key={bodega.id} value={bodega.id}>
                                {bodega.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Categoría */}
                <Form.Group controlId="categoriaId">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control as="select" name="categoriaId" value={producto.categoriaId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}>
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Varietal */}
                <Form.Group controlId="varietalId">
                    <Form.Label>Varietal</Form.Label>
                    <Form.Control as="select" name="varietalId" value={producto.varietalId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}>
                        <option value="">Seleccione un varietal</option>
                        {varietales.map((varietal) => (
                            <option key={varietal.id} value={varietal.id}>
                                {varietal.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Línea */}
                <Form.Group controlId="linea">
                    <Form.Label>Línea</Form.Label>
                    <Form.Control
                        type="text"
                        name="linea"
                        value={producto.linea}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                </Form.Group>

                {/* Descripción */}
                <Form.Group controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                </Form.Group>

                {/* Unidades */}
                <Form.Group controlId="unidades">
                    <Form.Label>Unidades</Form.Label>
                    <Form.Control
                        type="number"
                        name="unidades"
                        value={producto.unidades}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                </Form.Group>

                {/* Unidad de Medida */}
                <Form.Group controlId="unidadDeMedida">
                    <Form.Label>Unidad de Medida</Form.Label>
                    <Form.Control
                        type="text"
                        name="unidadDeMedida"
                        value={producto.unidadDeMedida}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                </Form.Group>

                {/* Checkboxes para opciones booleanas */}
                <Form.Check
                    type="checkbox"
                    label="Minorista"
                    name="esMinorista" // Cambiado de esMin a esMinorista
                    checked={producto.esMinorista}
                    onChange={handleInputChange}
                />

                <Form.Check
                    type="checkbox"
                    label="Mayorista"
                    name="esMayorista" // Cambiado de esMay a esMayorista
                    checked={producto.esMayorista}
                    onChange={handleInputChange}
                />

                <Form.Check
                    type="checkbox"
                    label="Distribuidora"
                    name="esDistri"
                    checked={producto.esDistri}
                    onChange={handleInputChange}
                />

                <Form.Check
                    type="checkbox"
                    label="Sobremesa"
                    name="esSobremesa"
                    checked={producto.esSobremesa}
                    onChange={handleInputChange}
                />

                <Form.Check
                    type="checkbox"
                    label="Mercado Libre"
                    name="esMeLi"
                    checked={producto.esMeLi}
                    onChange={handleInputChange}
                />

                <Form.Check
                    type="checkbox"
                    label="Buenos Aires"
                    name="esBsAs"
                    checked={producto.esBsAs}
                    onChange={handleInputChange}
                />


                <Form.Check
                    type="checkbox"
                    label="Stock"
                    name="stock"
                    checked={producto.stock}
                    onChange={handleInputChange}
                />

                <Form.Check
                    type="checkbox"
                    label="Comercializado"
                    name="comercializado"
                    checked={producto.comercializado}
                    onChange={handleInputChange}
                />

                <Button variant="primary" type="submit" className='mt-2'>
                    {isEdit ? 'Modificar Producto' : 'Crear Producto'}
                </Button>
            </Form>
        </div>
    );
};

export default FormProducto;
