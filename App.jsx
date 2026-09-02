import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Placeholder from './pages/Placeholder';

const pages = [
  'Leads',
  'Clientes',
  'Orçamentos',
  'Ordens de Serviço',
  'Produção',
  'Qualidade',
  'Financeiro',
  'Compras',
  'Estoque',
  'Relatórios',
  'Configurações'
];

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />

        {pages.map((page) =>
          page === 'Clientes' ? (
            <Route
              key={page}
              path="/clientes"
              element={<Clientes />}
            />
          ) : (
            <Route
              key={page}
              path={'/' + slug(page)}
              element={<Placeholder title={page} />}
            />
          )
        )}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function slug(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-');
}
