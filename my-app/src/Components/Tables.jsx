// src/components/Tables.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tables = () => {
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    empresa: '',
    cuit: '',
    celular: '',
    servicioContratado: '',
    adelanto: '',
    cuotasAdelanto: '',
    fechaInstalacion: '',
    precioMensual: '',
  });

  const [formPaymentData, setFormPaymentData] = useState({
    empresa: '',
    precioMensual: '',
    estado: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('http://localhost:5001/api/datos');
        setTable1Data(response1.data);

        const response2 = await axios.get('http://localhost:5001/api/pago_de_licencias');
        setTable2Data(response2.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Maneja el cambio en el formulario de datos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setFormPaymentData({ ...formPaymentData, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post('http://localhost:5001/api/datos', formData);
      setFormData({
        empresa: '',
        cuit: '',
        celular: '',
        servicioContratado: '',
        adelanto: '',
        cuotasAdelanto: '',
        fechaInstalacion: '',
        precioMensual: '',
      });
      // Refresca datos
      fetchData();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  // Maneja el envío del formulario de pagos
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/pago_de_licencias', formPaymentData);
      setFormPaymentData({
        empresa: '',
        precioMensual: '',
        estado: '',
      });
      // Refresca datos
      fetchData();
    } catch (error) {
      console.error('Error adding payment data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      {/* Formulario para la tabla de datos */}
      <form onSubmit={handleSubmit} className="mb-8">
        <h2 className="text-xl font-bold">Agregar Datos</h2>
        <input type="text" name="empresa" placeholder="Empresa" value={formData.empresa} onChange={handleChange} required />
        <input type="text" name="cuit" placeholder="CUIT" value={formData.cuit} onChange={handleChange} required />
        <input type="text" name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} required />
        <input type="text" name="servicioContratado" placeholder="Servicio Contratado" value={formData.servicioContratado} onChange={handleChange} required />
        <input type="text" name="adelanto" placeholder="Adelanto" value={formData.adelanto} onChange={handleChange} required />
        <input type="text" name="cuotasAdelanto" placeholder="Cuotas de Adelanto" value={formData.cuotasAdelanto} onChange={handleChange} required />
        <input type="date" name="fechaInstalacion" placeholder="Fecha Instalación" value={formData.fechaInstalacion} onChange={handleChange} required />
        <input type="text" name="precioMensual" placeholder="Precio Mensual" value={formData.precioMensual} onChange={handleChange} required />
        <button type="submit">Agregar a Tabla 1</button>
      </form>

      {/* Formulario para la tabla de pagos */}
      <form onSubmit={handlePaymentSubmit} className="mb-8">
        <h2 className="text-xl font-bold">Agregar Pago de Licencias</h2>
        <input type="text" name="empresa" placeholder="Empresa" value={formPaymentData.empresa} onChange={handlePaymentChange} required />
        <input type="text" name="precioMensual" placeholder="Precio Mensual" value={formPaymentData.precioMensual} onChange={handlePaymentChange} required />
        <input type="text" name="estado" placeholder="Estado" value={formPaymentData.estado} onChange={handlePaymentChange} required />
        <button type="submit">Agregar a Tabla 2</button>
      </form>

      <div className="w-full overflow-hidden rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center">Tabla 1</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Empresa</th>
              <th className="py-2 px-4 border-b">CUIT</th>
              <th className="py-2 px-4 border-b">Celular</th>
              <th className="py-2 px-4 border-b">Servicio Contratado</th>
              <th className="py-2 px-4 border-b">Adelanto</th>
              <th className="py-2 px-4 border-b">Cuotas de Adelanto</th>
              <th className="py-2 px-4 border-b">Fecha Instalación</th>
              <th className="py-2 px-4 border-b">Precio Mensual</th>
            </tr>
          </thead>
          <tbody>
            {table1Data.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.empresa}</td>
                <td className="py-2 px-4 border-b">{item.cuit}</td>
                <td className="py-2 px-4 border-b">{item.celular}</td>
                <td className="py-2 px-4 border-b">{item.servicio_contratado}</td>
                <td className="py-2 px-4 border-b">{item.adelanto}</td>
                <td className="py-2 px-4 border-b">{item.cuotas_adelanto}</td>
                <td className="py-2 px-4 border-b">{item.fecha_instalacion_servicio}</td>
                <td className="py-2 px-4 border-b">{item.precio_mensual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full overflow-hidden rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center">Tabla 2</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Empresa</th>
              <th className="py-2 px-4 border-b">Precio Mensual</th>
              <th className="py-2 px-4 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>
            {table2Data.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.empresa}</td>
                <td className="py-2 px-4 border-b">{item.precio_mensual}</td>
                <td className="py-2 px-4 border-b">{item.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
