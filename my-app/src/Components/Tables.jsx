import React, { useEffect, useState } from "react";
import axios from "axios";

const Tables = () => {
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  const [message, setMessage] = useState("");

  // Estado para el formulario de agregar datos
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

  // Estado para el formulario de pagos de licencias
  const [formPaymentData, setFormPaymentData] = useState({
    empresa: "",
    precio_mensual_de_licencia: "",
    estado: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response1 = await axios.get("http://localhost:5001/api/datos");
      setTable1Data(response1.data);
      const response2 = await axios.get("http://localhost:5001/api/pago_de_licencias");
      setTable2Data(response2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setFormPaymentData({ ...formPaymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/datos", formData);
      setMessage("Datos guardados con éxito"); // Mensaje de éxito
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
      fetchData(); // Refresca los datos
    } catch (error) {
      console.error("Error adding data:", error);
      setMessage("Error al agregar datos"); // Mensaje de error
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/pago_de_licencias", formPaymentData);
      setFormPaymentData({
        empresa: "",
        precio_mensual_de_licencia: "",
        estado: "",
      });
      fetchData(); // Refresca los datos
    } catch (error) {
      console.error("Error adding payment data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      {/* Mensaje de éxito o error */}
      {message && <div className="text-red-500">{message}</div>}
      
      {/* Formulario para la tabla de datos */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-5 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center">Agregar Datos</h2>
        <input type="text" name="empresa" placeholder="Empresa" value={formData.empresa} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="text" name="cuit" placeholder="CUIT" value={formData.cuit} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="text" name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="text" name="servicio_contratado" placeholder="Servicio Contratado" value={formData.servicio_contratado} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="text" name="adelanto" placeholder="Adelanto" value={formData.adelanto} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="text" name="cuotas_de_adelanto" placeholder="Cuotas de Adelanto" value={formData.cuotas_de_adelanto} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="date" name="fecha_instalacion_servicio" placeholder="Fecha Instalación" value={formData.fecha_instalacion_servicio} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="text" name="precio_mensual_licencia" placeholder="Precio Mensual" value={formData.precio_mensual_licencia} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Agregar a Tabla 1</button>
      </form>

      {/* Formulario para la tabla de pagos */}
      <form onSubmit={handlePaymentSubmit} className="mb-8 bg-white p-5 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center">Agregar Pago de Licencias</h2>
        <input type="text" name="empresa" placeholder="Empresa" value={formPaymentData.empresa} onChange={handlePaymentChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="text" name="precio_mensual_de_licencia" placeholder="Precio Mensual" value={formPaymentData.precio_mensual_de_licencia} onChange={handlePaymentChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <input type="text" name="estado" placeholder="Estado" value={formPaymentData.estado} onChange={handlePaymentChange} required className="w-full p-2 border border-gray-300 rounded mb-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Agregar a Tabla 2</button>
      </form>

      {/* Tabla 1 */}
      <div className="w-full overflow-hidden rounded-lg shadow-lg mb-8">
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
                <td className="py-2 px-4 border-b">{item.cuotas_de_adelanto}</td>
                <td className="py-2 px-4 border-b">{item.fecha_instalacion_servicio}</td>
                <td className="py-2 px-4 border-b">{item.precio_mensual_licencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla 2 */}
      <div className="w-full overflow-hidden rounded-lg shadow-lg mb-8">
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
                <td className="py-2 px-4 border-b">{item.precio_mensual_licencia}</td>
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