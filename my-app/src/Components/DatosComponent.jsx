import React, { useState } from 'react';

// Componente principal que incluye tanto el formulario de clientes como el de pagos
const DatosComponent = () => {
  const [clients, setClients] = useState([]);
  const [payments, setPayments] = useState([]);
  const [client, setClient] = useState({ name: '', email: '' });
  const [payment, setPayment] = useState({ clientId: '', amount: '' });

  // Maneja el cambio en el formulario de clientes
  const handleClientChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario de clientes
  const handleClientSubmit = (e) => {
    e.preventDefault();
    setClients([...clients, client]);
    setClient({ name: '', email: '' });
  };

  // Maneja el cambio en el formulario de pagos
  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario de pagos
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPayments([...payments, payment]);
    setPayment({ clientId: '', amount: '' });
  };

  return (
    <div>
      <h2>Formulario de Clientes</h2>
      <form onSubmit={handleClientSubmit}>
        <input
          type="text"
          name="name"
          value={client.name}
          onChange={handleClientChange}
          placeholder="Nombre del cliente"
          required
        />
        <input
          type="email"
          name="email"
          value={client.email}
          onChange={handleClientChange}
          placeholder="Email del cliente"
          required
        />
        <button type="submit">Agregar Cliente</button>
      </form>

      <h2>Tabla de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Formulario de Pagos</h2>
      <form onSubmit={handlePaymentSubmit}>
        <input
          type="text"
          name="clientId"
          value={payment.clientId}
          onChange={handlePaymentChange}
          placeholder="ID del cliente"
          required
        />
        <input
          type="number"
          name="amount"
          value={payment.amount}
          onChange={handlePaymentChange}
          placeholder="Monto"
          required
        />
        <button type="submit">Agregar Pago</button>
      </form>

      <h2>Tabla de Pagos</h2>
      <table>
        <thead>
          <tr>
            <th>ID del Cliente</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.clientId}</td>
              <td>{payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatosComponent;
