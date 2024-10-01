import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormBodega: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    porcentajeDescuento: '',
    porcentajeDescuentosProntoPago: '',
    accionTipica: '',
    margenMin: '',
    margenMay: '',
    margenDepo: '',
    margenDistri: '',
    costo: '',
    costoConIva: '',
    costoSinIva: '',
    proveedor: ''
  });

  const [isConIva, setIsConIva] = useState(true); // Estado para manejar el checkbox de IVA

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el cambio en el checkbox
  const handleCheckboxChange = () => {
    setIsConIva(!isConIva); // Cambia el estado del checkbox entre con IVA y sin IVA
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const costo = parseFloat(formData.costo);
    let costoConIva = 0;
    let costoSinIva = 0;

    if (isConIva) {
      costoConIva = costo;
      costoSinIva = Math.round(costo / 1.21);
    } else {
      costoSinIva = costo;
      costoConIva = costo * 1.21;
    }

    const updatedFormData = {
      ...formData,
      costoConIva: costoConIva.toFixed(2),
      costoSinIva: costoSinIva.toFixed(2),
    };

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/bodegas`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la bodega');
      }

      alert('Bodega creada exitosamente');
      // Limpia el formulario
      setFormData({
        nombre: '',
        porcentajeDescuento: '',
        porcentajeDescuentosProntoPago: '',
        accionTipica: '',
        margenMin: '',
        margenMay: '',
        margenDepo: '',
        margenDistri: '',
        costo: '',
        costoConIva: '',
        costoSinIva: '',
        proveedor: ''
      });
      setIsConIva(true); // Restablece el checkbox a "Con IVA"
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className='text-center'>Crear Bodega</h2>
      <Form onSubmit={handleSubmit}>

        {/* Campo de Costo */}
        <Form.Group controlId="costo">
          <Form.Label>Costo</Form.Label>
          <Form.Control
            type="number"
            name="costo"
            value={formData.costo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
          />
        </Form.Group>

        {/* Checkbox para indicar si es con IVA o sin IVA */}
        <Form.Group controlId="conIvaCheckbox">
          <Form.Check
            type="checkbox"
            label={isConIva ? 'Con IVA' : 'Sin IVA'}
            checked={isConIva}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        {/* Otros campos del formulario */}
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="porcentajeDescuento">
          <Form.Label>Porcentaje de Descuento</Form.Label>
          <Form.Control
            type="number"
            name="porcentajeDescuento"
            value={formData.porcentajeDescuento}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="porcentajeDescuentosProntoPago">
          <Form.Label>Porcentaje de Descuento Pronto Pago</Form.Label>
          <Form.Control
            type="number"
            name="porcentajeDescuentosProntoPago"
            value={formData.porcentajeDescuentosProntoPago}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="accionTipica">
          <Form.Label>Acción Típica</Form.Label>
          <Form.Control
            type="text"
            name="accionTipica"
            value={formData.accionTipica}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="margenMin">
          <Form.Label>Margen Minorista (%)</Form.Label>
          <Form.Control
            type="number"
            name="margenMin"
            value={formData.margenMin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="margenMay">
          <Form.Label>Margen Mayorista (%)</Form.Label>
          <Form.Control
            type="number"
            name="margenMay"
            value={formData.margenMay}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="margenDepo">
          <Form.Label>Margen Depósito (%)</Form.Label>
          <Form.Control
            type="number"
            name="margenDepo"
            value={formData.margenDepo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="margenDistri">
          <Form.Label>Margen Distribuidora (%)</Form.Label>
          <Form.Control
            type="number"
            name="margenDistri"
            value={formData.margenDistri}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="proveedor">
          <Form.Label>Proveedor</Form.Label>
          <Form.Control
            type="text"
            name="proveedor"
            value={formData.proveedor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-2'>
          Crear Bodega
        </Button>
      </Form>
    </div>
  );
};

export default FormBodega;
