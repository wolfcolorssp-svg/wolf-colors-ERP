import { useState } from 'react';
import {
  Plus,
  Search,
  MoreHorizontal,
  Users,
  X
} from 'lucide-react';

const clientesDemo = [
  {
    id: 1,
    nome: 'Metalúrgica Alfa',
    documento: '12.345.678/0001-90',
    contato: 'Carlos Silva',
    telefone: '(11) 99999-1111',
    email: 'carlos@metalurgicaalfa.com.br',
    cidade: 'São Paulo - SP',
    status: 'Ativo'
  },
  {
    id: 2,
    nome: 'Shark no Vidro',
    documento: '23.456.789/0001-12',
    contato: 'Marcos Souza',
    telefone: '(11) 98888-2222',
    email: 'marcos@sharknovidro.com.br',
    cidade: 'São Paulo - SP',
    status: 'Ativo'
  },
  {
    id: 3,
    nome: 'Indústria Beta',
    documento: '34.567.890/0001-23',
    contato: 'Ana Oliveira',
    telefone: '(19) 97777-3333',
    email: 'ana@industriabeta.com.br',
    cidade: 'Campinas - SP',
    status: 'Ativo'
  }
];

export default function Clientes() {
  const [clientes, setClientes] = useState(clientesDemo);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const [form, setForm] = useState({
    nome: '',
    documento: '',
    contato: '',
    telefone: '',
    email: '',
    cidade: ''
  });

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = busca.toLowerCase();

    return (
      cliente.nome.toLowerCase().includes(texto) ||
      cliente.documento.toLowerCase().includes(texto) ||
      cliente.contato.toLowerCase().includes(texto)
    );
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((atual) => ({
      ...atual,
      [name]: value
    }));
  }

  function abrirModal() {
    setForm({
      nome: '',
      documento: '',
      contato: '',
      telefone: '',
      email: '',
      cidade: ''
    });

    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function salvarCliente(event) {
    event.preventDefault();

    if (!form.nome.trim()) {
      alert('Informe o nome do cliente.');
      return;
    }

    const novoCliente = {
      id: Date.now(),
      nome: form.nome,
      documento: form.documento,
      contato: form.contato,
      telefone: form.telefone,
      email: form.email,
      cidade: form.cidade,
      status: 'Ativo'
    };

    setClientes((atual) => [novoCliente, ...atual]);
    setModalAberto(false);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">COMERCIAL</p>
          <h1>Clientes</h1>
          <p>Gerencie os clientes e empresas da Wolf Colors.</p>
        </div>

        <button className="primary" onClick={abrirModal}>
          <Plus size={18} />
          Novo Cliente
        </button>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h2>Cadastro de clientes</h2>
            <p>
              {clientes.length} cliente{clientes.length !== 1 ? 's' : ''} cadastrado
              {clientes.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="client-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </div>
        </div>

        {clientesFiltrados.length === 0 ? (
          <div className="empty-state">
            <Users size={38} />
            <h3>Nenhum cliente encontrado</h3>
            <p>Tente buscar por nome, CNPJ ou contato.</p>
          </div>
        ) : (
          <div className="table">
            <div className="tr th">
              <span>CLIENTE</span>
              <span>CNPJ / CPF</span>
              <span>CONTATO</span>
              <span>TELEFONE</span>
              <span>STATUS</span>
              <span></span>
            </div>

            {clientesFiltrados.map((cliente) => (
              <div className="tr" key={cliente.id}>
                <div className="client-name">
                  <div className="client-avatar">
                    {cliente.nome.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <b>{cliente.nome}</b>
                    <small>{cliente.cidade || '—'}</small>
                  </div>
                </div>

                <span>{cliente.documento || '—'}</span>

                <span>{cliente.contato || '—'}</span>

                <span>{cliente.telefone || '—'}</span>

                <span>
                  <i className="badge prod">{cliente.status}</i>
                </span>

                <button className="more" title="Mais opções">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {modalAberto && (
        <div className="modal-overlay" onMouseDown={fecharModal}>
          <div
            className="modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <p className="eyebrow">COMERCIAL</p>
                <h2>Novo Cliente</h2>
                <p>Cadastre uma nova empresa ou cliente.</p>
              </div>

              <button className="icon-btn" onClick={fecharModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={salvarCliente}>
              <div className="form-grid">
                <label>
                  Nome / Razão Social *
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Ex.: Metalúrgica Alfa"
                    required
                  />
                </label>

                <label>
                  CNPJ / CPF
                  <input
                    name="documento"
                    value={form.documento}
                    onChange={handleChange}
                    placeholder="00.000.000/0000-00"
                  />
                </label>

                <label>
                  Contato
                  <input
                    name="contato"
                    value={form.contato}
                    onChange={handleChange}
                    placeholder="Nome do responsável"
                  />
                </label>

                <label>
                  Telefone
                  <input
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                  />
                </label>

                <label>
                  E-mail
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="cliente@empresa.com.br"
                  />
                </label>

                <label>
                  Cidade / UF
                  <input
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                    placeholder="São Paulo - SP"
                  />
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button type="submit" className="primary">
                  <Plus size={18} />
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
