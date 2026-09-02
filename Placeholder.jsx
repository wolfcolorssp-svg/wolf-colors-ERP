import { Construction, Users, Plus, X } from 'lucide-react';
import { useState } from 'react';

function Configuracoes() {
  const [users, setUsers] = useState([
    { id: 1, nome: 'Admin', email: 'admin@wolf.com', senhaPadrao: '' }
  ]);
  const [modalAberto, setModalAberto] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', senhaPadrao: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((atual) => ({ ...atual, [name]: value }));
  }

  function abrirModal() {
    setForm({ nome: '', email: '', senhaPadrao: '' });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function salvarUsuario(e) {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim()) {
      alert('Nome e e-mail são obrigatórios.');
      return;
    }

    const novo = {
      id: Date.now(),
      nome: form.nome,
      email: form.email,
      senhaPadrao: form.senhaPadrao // atenção: trata-se apenas de demo; implemente hash/back-end
    };

    setUsers((atual) => [novo, ...atual]);
    setModalAberto(false);

    // Mostrar alerta com senha padrão quando informada
    if (novo.senhaPadrao) {
      alert(`Usuário criado. Senha padrão: ${novo.senhaPadrao}`);
    } else {
      alert('Usuário criado. Sem senha padrão definida.');
    }
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <h2>Configurações / Usuários</h2>
          <p>{users.length} usuário{users.length !== 1 ? 's' : ''} cadastrado{users.length !== 1 ? 's' : ''}</p>
        </div>

        <div>
          <button className="primary" onClick={abrirModal}>
            <Plus size={18} /> Novo Usuário
          </button>
        </div>
      </div>

      <div className="table">
        <div className="tr th">
          <span>USUÁRIO</span>
          <span>E-MAIL</span>
          <span>SENHA PADRÃO</span>
          <span></span>
        </div>

        {users.map((u) => (
          <div className="tr" key={u.id}>
            <div>
              <b>{u.nome}</b>
            </div>
            <span>{u.email}</span>
            <span>{u.senhaPadrao || '—'}</span>
            <span>
              <button className="more" title="Mais opções">
                <Users size={16} />
              </button>
            </span>
          </div>
        ))}
      </div>

      {modalAberto && (
        <div className="modal-overlay" onMouseDown={fecharModal}>
          <div className="modal" onMouseDown={(ev) => ev.stopPropagation()}>
            <div className="modal-head">
              <div>
                <p className="eyebrow">CONFIGURAÇÃO</p>
                <h2>Novo Usuário</h2>
                <p>Cadastre um novo usuário e, opcionalmente, defina uma senha padrão para o primeiro acesso.</p>
              </div>

              <button className="icon-btn" onClick={fecharModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={salvarUsuario}>
              <div className="form-grid">
                <label>
                  Nome *
                  <input name="nome" value={form.nome} onChange={handleChange} placeholder="Ex.: João Silva" required />
                </label>

                <label>
                  E-mail *
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="usuario@empresa.com" required />
                </label>

                <label>
                  Senha padrão
                  <input name="senhaPadrao" value={form.senhaPadrao} onChange={handleChange} placeholder="Senha para primeiro acesso (opcional)" />
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="secondary" onClick={fecharModal}>Cancelar</button>
                <button type="submit" className="primary"><Plus size={18}/> Salvar Usuário</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Placeholder({ title }) {
  if (title === 'Configurações' || title === 'Configurações') {
    return <Configuracoes />;
  }

  return (
    <div className="placeholder">
      <div className="placeholder-icon"><Construction size={32} /></div>
      <p className="eyebrow">WOLF ERP</p>
      <h1>{title}</h1>
      <p>Este módulo será construído dentro da estrutura definitiva do ERP.</p>
      <div className="roadmap">Próxima etapa: transformar esta tela em um módulo funcional conectado ao banco de dados.</div>
    </div>
  );
}
