import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productos from '../pages/Producto';
import AppNavbar from '../components/Navbar';
import FormProducto from '../pages/FormProducto';
import CostosYMargenes from '../pages/CostoYMargen';
import FormCostoYMargen from '../pages/FormCostoYMargen';
import FormBodega from '../pages/FormBodega';
import FormCategoria from '../pages/FormCategoria';
import FormVarietal from '../pages/FormVarietal';
import Precios from '../pages/Precios';
import ParametrosMercadoLibre from '../pages/ParametrosMeLi';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path='/precios' element={<Precios />} />
        <Route path='/crear-producto' element={<FormProducto />} />
        <Route path='/modificar-producto/:id' element={<FormProducto />}></Route>
        <Route path='/costosymargenes' element={<CostosYMargenes />}></Route>
        <Route path='/crear-costoymargen/:id' element={<FormCostoYMargen />}></Route>
        <Route path='/crear-bodega' element={<FormBodega />}></Route>
        <Route path='/crear-categoria' element={<FormCategoria />}></Route>
        <Route path='/crear-varietal' element={<FormVarietal />}></Route>
        <Route path='/parametros-ml' element={< ParametrosMercadoLibre />}/>
      </Routes>
    </Router>
  );
}

export default AppRouter;
