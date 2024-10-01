{/*
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica que los campos no estén vacíos
    if (nombreUsuario === '' || clave === '') {
      setError('El nombre de usuario y la clave son obligatorios');
      return;
    }

    // Intenta hacer la petición al backend
    try {
      const response = await fetch(`${apiUrl}/promociones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreUsuario, clave }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token JWT en el localStorage o sessionStorage
        localStorage.setItem('token', data.token);

        // Llamar a la función de login del contexto de autenticación
        login(data.token);

        // Redirigir al usuario a la página principal
        navigate('/');
      } else {
        // Si el servidor devuelve un error, mostrarlo
        setError(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setError('Error de red o de servidor');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Iniciar Sesión</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nombreUsuario">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="clave">
              <Form.Label>Clave</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
*/}