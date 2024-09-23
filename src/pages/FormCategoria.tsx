import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormCategoria: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/categorias`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la categoría');
      }

      alert('Categoría creada exitosamente');
      // Limpia el formulario
      setFormData({
        nombre: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Categoría</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-2'>
          Crear Categoría
        </Button>
      </Form>
    </div>
  );
};

export default FormCategoria;
