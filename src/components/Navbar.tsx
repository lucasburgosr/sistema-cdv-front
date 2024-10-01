import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AppNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate('/crear-producto'); // Redirige a la página de creación de producto
  };

  const handleCreateBodega = () => {
    navigate('/crear-bodega'); // Redirige a la página de creación de bodega
  };

  const handleCreateCategoria = () => {
    navigate('/crear-categoria'); // Redirige a la página de creación de categoría
  };

  const handleCreateVarietal = () => {
    navigate('/crear-varietal'); // Redirige a la página de creación de varietal
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Gestión de Productos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Productos</Nav.Link>
            <Nav.Link href="/costosymargenes">Costos</Nav.Link>
            <Nav.Link href="/precios">Precios</Nav.Link>
            <Nav.Link href="/parametros-ml">Parámetros ML</Nav.Link>
            <Nav.Link href="/promociones">Promociones</Nav.Link>
            <NavDropdown title="Acciones" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item onClick={handleCreateProduct}>Crear Producto</NavDropdown.Item>
              <NavDropdown.Item onClick={handleCreateBodega}>Crear Bodega</NavDropdown.Item>
              <NavDropdown.Item onClick={handleCreateCategoria}>Crear Categoría</NavDropdown.Item>
              <NavDropdown.Item onClick={handleCreateVarietal}>Crear Varietal</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
