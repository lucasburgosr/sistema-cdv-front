import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormCostoYMargen: React.FC = () => {
  const [costoConIva, setCostoConIva] = useState(true);
  const [costo, setCosto] = useState(''); // El valor que ingresa el usuario
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    costo: costo || 0,
    iva: costoConIva || 0,
    descuento: 0, // Inicializar con 0 en lugar de parseFloat('')
    descuentoPp: 0,
    acciones1: 0,
    acciones2: 0,
    margenMin: 0,
    margenMay: 0,
    margenMeLi: 0,
    margenBsAs: 0,
    margenDepo: 0,
    margenDistri: 0,
    margenSobremesa: 0,
    fechaActualizacionCosto: Date.now(),
    fechaActualizacionMargenODescuento: Date.now(),
    costoEnvioCaja: 0,
    cantidadMinVentaMayorista: 0,
    cantidadMinVentaDistri: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Permitir que los valores numéricos manejen 0 correctamente
    const parsedValue = ['descuento', 'descuentoPp', 'acciones1', 'acciones2', 'margenMin', 'margenMay', 'margenMeLi', 'margenBsAs', 'margenDepo', 'margenDistri', 'margenSobremesa', 'costoEnvioCaja', 'cantidadMinVentaMayorista', 'cantidadMinVentaDistri'].includes(name)
      ? parseFloat(value) || 0  // Aquí permitimos que el valor 0 sea válido
      : value;

    setFormData({
      ...formData,
      [name]: parsedValue,  // Actualizamos el estado con valores numéricos
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idNumber = Number(id);
    let costoSinIva, costoFinalConIva;

    if (costoConIva) {
      costoFinalConIva = parseFloat(costo) || 0;
      costoSinIva = Math.round(costoFinalConIva / 1.21);
    } else {
      costoSinIva = parseFloat(costo) || 0;
      costoFinalConIva = costoSinIva * 1.21;
    }

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/costoymargen`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productoId: idNumber,
          costoConIva: costoFinalConIva,
          costoSinIva: costoSinIva,
          ...formData,
          iva: costoConIva,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || 'Error al guardar los costos y márgenes');
      }

      alert('Costos y márgenes guardados exitosamente');

      navigate('/')

    } catch (error: any) {
      console.error('Error:', error.message || 'Error desconocido');
      alert(`Error: ${error.message || 'No se pudieron crear los costos'}`);
    }
  };

  return (
    <div className='container mt-4'>
      <h2>Costos y Márgenes</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>Costo</Form.Label>
            <Form.Control
              type="number"
              name="costo"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label={costoConIva ? 'Con IVA' : 'Sin IVA'}
              checked={costoConIva}
              onChange={() => setCostoConIva(!costoConIva)}
            />
          </Col>
        </Row>

        {/* Los demás campos numéricos */}
        <Row className="mb-3">
          <Col>
            <Form.Label>Descuento %</Form.Label>
            <Form.Control
              type="number"
              name="descuento"
              value={formData.descuento}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Descuento PP %</Form.Label>
            <Form.Control
              type="number"
              name="descuentoPp"
              value={formData.descuentoPp}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Acciones 1</Form.Label>
            <Form.Control
              type="number"
              name="acciones1"
              value={formData.acciones1}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Acciones 2</Form.Label>
            <Form.Control
              type="number"
              name="acciones2"
              value={formData.acciones2}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Margen Minorista %</Form.Label>
            <Form.Control
              type="number"
              name="margenMin"
              value={formData.margenMin}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Margen Mayorista %</Form.Label>
            <Form.Control
              type="number"
              name="margenMay"
              value={formData.margenMay}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Margen ML %</Form.Label>
            <Form.Control
              type="number"
              name="margenMeLi"
              value={formData.margenMeLi}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Margen BsAs %</Form.Label>
            <Form.Control
              type="number"
              name="margenBsAs"
              value={formData.margenBsAs}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Margen Depo %</Form.Label>
            <Form.Control
              type="number"
              name="margenDepo"
              value={formData.margenDepo}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Margen Distri %</Form.Label>
            <Form.Control
              type="number"
              name="margenDistri"
              value={formData.margenDistri}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Margen Sobremesa %</Form.Label>
            <Form.Control
              type="number"
              name="margenSobremesa"
              value={formData.margenSobremesa}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Costo Envío por Caja $</Form.Label>
            <Form.Control
              type="number"
              name="costoEnvioCaja"
              value={formData.costoEnvioCaja}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Cantidad Mínima de Venta Mayorista</Form.Label>
            <Form.Control
              type="number"
              name="cantidadMinVentaMayorista"
              value={formData.cantidadMinVentaMayorista}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label>Cantidad Mínima de Venta Distri</Form.Label>
            <Form.Control
              type="number"
              name="cantidadMinVentaDistri"
              value={formData.cantidadMinVentaDistri}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Button variant="primary" type="submit" className='mt-2'>
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default FormCostoYMargen;
