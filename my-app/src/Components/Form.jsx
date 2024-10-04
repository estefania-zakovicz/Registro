import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    empresa: '',
    cuit: '',
    celular: '',
    servicioContratado: '',
    adelanto: '',
    cuotasDeAdelanto: '',
    fechaInstalacion: '',
    precioMensual: '',
  });

  const [pagoData, setPagoData] = useState({
    empresa: '',
    precioMensual: '',
    estado: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePagoChange = (e) => {
    const { name, value } = e.target;
    setPagoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/datos', formData);
      console.log(response.data);
      alert('Datos guardados en la tabla "datos"');
      // Reinicia formulario
      setFormData({
        empresa: '',
        cuit: '',
        celular: '',
        servicioContratado: '',
        adelanto: '',
        cuotasDeAdelanto: '',
        fechaInstalacion: '',
        precioMensual: '',
      });
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
};


  const handlePagoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/pago_de_licencias', pagoData);
      alert('Datos guardados en la tabla "pago_de_licencias"');
      // Reinicia formulario
      setPagoData({
        empresa: '',
        precioMensual: '',
        estado: '',
      });
    } catch (error) {
      console.error('Error al guardar datos de pago:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center">Agregar Datos</h2>
        <input name="empresa" placeholder="Empresa" value={formData.empresa} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="cuit" placeholder="CUIT" value={formData.cuit} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="servicioContratado" placeholder="Servicio Contratado" value={formData.servicioContratado} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="adelanto" placeholder="Adelanto" value={formData.adelanto} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="cuotasDeAdelanto" placeholder="Cuotas de Adelanto" value={formData.cuotasDeAdelanto} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="fechaInstalacion" type="date" value={formData.fechaInstalacion} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="precioMensual" placeholder="Precio Mensual" value={formData.precioMensual} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Guardar en Datos</button>
      </form>

      <form onSubmit={handlePagoSubmit} className="bg-white p-5 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center">Agregar Pago de Licencias</h2>
        <input name="empresa" placeholder="Empresa" value={pagoData.empresa} onChange={handlePagoChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="precioMensual" placeholder="Precio Mensual" value={pagoData.precioMensual} onChange={handlePagoChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input name="estado" placeholder="Estado" value={pagoData.estado} onChange={handlePagoChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Guardar en Pago de Licencias</button>
      </form>
    </div>
  );
};

export default Form;
