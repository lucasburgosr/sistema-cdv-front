import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';
import { Producto } from '../types/Producto'; // Importa tu interfaz Producto
import { useNavigate } from 'react-router-dom';

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Fetch de los productos desde el backend
  useEffect(() => {
    fetch(`${apiUrl}/productos`)  // Cambia la URL según sea necesario
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching productos:', error));
  }, [apiUrl]);

  const handleUpdateProducto = (id: number) => {
    // Redirige a la página de edición, pasando el id del producto
    navigate(`/modificar-producto/${id}`);
  };

  // Filtra los productos según el término de búsqueda
  const filteredProductos = productos.filter(producto =>
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 mx-auto text-center">
      <h2>Lista de Productos</h2>
  
      {/* Barra de búsqueda */}
      <FormControl
        type="text"
        placeholder="Buscar por descripción"
        className="mb-4 w-25"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      {/* Verificar si hay productos para mostrar */}
      {Array.isArray(filteredProductos) && filteredProductos.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Bodega</th>
              <th>Línea</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Unidades</th>
              <th>Unidad de medida</th>
              <th>Modificar Producto</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.Bodega.nombre}</td>
                <td>{producto.linea}</td>
                <td>{producto.Categoria.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.unidades}</td>
                <td>{producto.unidadDeMedida}</td>
                <td>
                  <Button variant="primary" onClick={() => handleUpdateProducto(producto.id)}>
                    Modificar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        // Mostrar el texto cuando no haya productos
        <div className="mt-4">
          <h4>No hay productos cargados</h4>
        </div>
      )}
    </div>
  );
  
};

export default Productos;
