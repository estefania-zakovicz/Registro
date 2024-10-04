import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    empresa: "",
    cuit: "",
    celular: "",
    servicio_contratado: "",
    adelanto: "",
    cuotas_de_adelanto: "",
    fecha_instalacion_servicio: "",
    precio_mensual_licencia: "",
  });

  const [pagoData, setPagoData] = useState({
    empresa: "",
    precio_mensual_de_licencia: "",
    estado: "",
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
      const response = await axios.post(
        "http://localhost:5001/api/datos",
        formData
      );
      console.log(response.data);
      alert('Datos guardados en la tabla "datos"');
      // Reinicia formulario
      setFormData({
        empresa: "",
        cuit: "",
        celular: "",
        servicio_contratado: "",
        adelanto: "",
        cuotas_de_adelanto: "",
        fecha_instalacion_servicio: "",
        precio_mensual_licencia: "",
      });
    } catch (error) {
      console.error("Error al guardar datos:", error);
    }
  };

  const handlePagoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/pago_de_licencias", pagoData);
      alert('Datos guardados en la tabla "pago_de_licencias"');
      // Reinicia formulario
      setPagoData({
        empresa: "",
        precio_mensual_de_licencia: "",
        estado: "",
      });
    } catch (error) {
      console.error("Error al guardar datos de pago:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center">Agregar Datos</h2>
        <input
          name="empresa"
          placeholder="Empresa"
          value={formData.empresa}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="cuit"
          placeholder="CUIT"
          value={formData.cuit}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="celular"
          placeholder="Celular"
          value={formData.celular}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="servicio_contratado"
          placeholder="Servicio Contratado"
          value={formData.servicio_contratado}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="adelanto"
          placeholder="Adelanto"
          value={formData.adelanto}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="cuotas_de_adelanto"
          placeholder="Cuotas de Adelanto"
          value={formData.cuotas_de_adelanto}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="fecha_instalacion_servicio"
          type="date"
          value={formData.fecha_instalacion_servicio}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="precio_mensual_licencia"
          placeholder="Precio Mensual de Licencia"
          value={formData.precio_mensual_licencia}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Guardar en Datos
        </button>
      </form>

      <form
        onSubmit={handlePagoSubmit}
        className="bg-white p-5 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center">
          Agregar Pago de Licencias
        </h2>
        <input
          name="empresa"
          placeholder="Empresa"
          value={pagoData.empresa}
          onChange={handlePagoChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="precio_mensual_de_licencia"
          placeholder="Precio Mensual"
          value={pagoData.precio_mensual_de_licencia}
          onChange={handlePagoChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          name="estado"
          placeholder="Estado"
          value={pagoData.estado}
          onChange={handlePagoChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Guardar en Pago de Licencias
        </button>
      </form>
    </div>
  );
};

export default Form;