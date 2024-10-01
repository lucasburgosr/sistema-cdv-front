import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, InputGroup } from 'react-bootstrap';

const FormPromocion: React.FC = () => {
  // Estados para manejar productos, bodegas, varietales y selección
  const [productos, setProductos] = useState<any[]>([]); // Lista de productos filtrados
  const [bodegas, setBodegas] = useState<any[]>([]); // Lista de bodegas
  const [varietales, setVarietales] = useState<any[]>([]); // Lista de varietales
  const [productosSeleccionados, setProductosSeleccionados] = useState<any[]>([]); // Productos incluidos en la promo
  const [filtros, setFiltros] = useState({
    bodega: '',
    varietal: '',
    descripcion: '',
  });
  const [costoTotal, setCostoTotal] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [margenMedio, setMargenMedio] = useState(0);
  const [precioPropuesto, setPrecioPropuesto] = useState(0);
  const [margenPromedio, setMargenPromo] = useState(0);

  const [nombrePromocion, setNombrePromocion] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch de productos, bodegas y varietales
  useEffect(() => {
    fetch(`${apiUrl}/productos`)
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching productos:', error));

    // Fetch de bodegas
    fetch(`${apiUrl}/bodegas`)
      .then(response => response.json())
      .then(data => {
        setBodegas(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching bodegas:', error));

    // Fetch de varietales
    fetch(`${apiUrl}/varietales`)
      .then(response => response.json())
      .then(data => {
        setVarietales(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching varietales:', error));

  }, [apiUrl]);

  // Función para calcular totales y márgenes cada vez que cambia la selección de productos
  useEffect(() => {
    const costo = productosSeleccionados.reduce((sum, producto) => sum + producto.CostoYMargen.costoConIva, 0);
    const precio = productosSeleccionados.reduce((sum, producto) => sum + producto.PrecioMinorista.precioUnidad, 0);
    const margen = productosSeleccionados.length
      ? (productosSeleccionados.reduce((sum, producto) => sum + producto.CostoYMargen.margenMin, 0) / productosSeleccionados.length) / 100
      : 0;
    
    setCostoTotal(costo);
    setPrecioTotal(precio);
    setMargenMedio(margen);
  }, [productosSeleccionados]);

  // Función para seleccionar/deseleccionar productos
  const handleSeleccionProducto = (productoSeleccionado: any) => {
    const seleccion = productosSeleccionados.includes(productoSeleccionado)
      ? productosSeleccionados.filter((p) => p.id !== productoSeleccionado.id)
      : [...productosSeleccionados, productoSeleccionado];
    setProductosSeleccionados(seleccion);
  };

  const handlePrecioPropuestoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const precio = parseFloat(e.target.value);
    setPrecioPropuesto(precio);
    const margenPromedio = precio ? ((precio - costoTotal) / precio) * 100 : 0;
    setMargenPromo(margenPromedio);
  };

  const guardarPromocion = async (e: React.FormEvent) => {
    e.preventDefault();

    const promocion = {
      nombre: nombrePromocion,
      productos: productosSeleccionados,
      costoTotal,
      precioTotal: precioPropuesto,
      margenPromedio,
      fecha: new Date(),
    };

    console.log('Promoción guardada:', promocion);

    const endpoint = `${apiUrl}/promociones`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promocion)
    });

    if(!response.ok) {
      console.log('Error al crear la promoción');
    }

    alert("Promoción creada exitosamente");
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Crear Promoción</h2>
          <Form>
            {/* Campo para el nombre de la promoción */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Nombre de la Promoción</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombrePromocion}
                    onChange={(e) => setNombrePromocion(e.target.value)}
                    placeholder="Ingresa el nombre de la promoción"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Filtros para buscar productos */}
            <Row className="mb-3">
              {/* Filtro por bodega (lista desplegable) */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filtrar por Bodega</Form.Label>
                  <Form.Control
                    as="select"
                    value={filtros.bodega}
                    onChange={(e) => setFiltros({ ...filtros, bodega: e.target.value })}
                  >
                    <option value="">Todas las Bodegas</option>
                    {bodegas.map((bodega) => (
                      <option key={bodega.id} value={bodega.nombre}>
                        {bodega.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* Filtro por varietal (lista desplegable) */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filtrar por Varietal</Form.Label>
                  <Form.Control
                    as="select"
                    value={filtros.varietal}
                    onChange={(e) => setFiltros({ ...filtros, varietal: e.target.value })}
                  >
                    <option value="">Todos los Varietales</option>
                    {varietales.map((varietal) => (
                      <option key={varietal.id} value={varietal.nombre}>
                        {varietal.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* Filtro por descripción */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filtrar por Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    value={filtros.descripcion}
                    onChange={(e) => setFiltros({ ...filtros, descripcion: e.target.value })}
                    placeholder="Descripción del producto"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Tabla de productos */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Incluir</th>
                  <th>Producto</th>
                  <th>Bodega</th>
                  <th>Costo</th>
                  <th>Precio</th>
                  <th>Margen Minorista</th>
                </tr>
              </thead>
              <tbody>
                {productos
                  .filter((producto) =>
                    (filtros.bodega === '' || producto.Bodega.nombre === filtros.bodega) &&
                    (filtros.varietal === '' || producto.Varietal.nombre === filtros.varietal) &&
                    (filtros.descripcion === '' || producto.descripcion.toLowerCase().includes(filtros.descripcion.toLowerCase()))
                  )
                  .map((producto) => (
                    <tr key={producto.id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={productosSeleccionados.includes(producto)}
                          onChange={() => handleSeleccionProducto(producto)}
                        />
                      </td>
                      <td>{producto.descripcion}</td>
                      <td>{producto.Bodega.nombre}</td>
                      <td>${producto.CostoYMargen.costoConIva}</td>
                      <td>${producto.PrecioMinorista.precioUnidad}</td>
                      <td>{producto.CostoYMargen.margenMin}%</td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            {/* Resumen de la promoción */}
            <Row className="mt-4">
              <Col md={4}>
                <h5>Costo Total: ${costoTotal.toFixed(2)}</h5>
              </Col>
              <Col md={4}>
                <h5>Precio Total: ${precioTotal.toFixed(2)}</h5>
              </Col>
              <Col md={4}>
                <h5>Margen Medio: {margenMedio ? (margenMedio * 100) : '0.00'}%</h5>
              </Col>
            </Row>

            {/* Precio propuesto y margen calculado */}
            <Row className="mt-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Precio Final Propuesto</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      value={precioPropuesto}
                      onChange={handlePrecioPropuestoChange}
                      placeholder="Ingresa el precio final para la promoción"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <h5>Margen Promoción: {margenPromedio.toFixed(2)}%</h5>
              </Col>
            </Row>

            {/* Botón para guardar la promoción */}
            <Row className="mt-4">
              <Col className="d-grid">
                <Button variant="success" onClick={guardarPromocion}>
                  Guardar Promoción
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormPromocion;
