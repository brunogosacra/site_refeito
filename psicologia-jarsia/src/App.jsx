import { useState, useEffect } from 'react';
import './index.css';


const passosData = [
  {
    id: "01",
    titulo: "Planeamento & Requisitos",
    descricao: "Definição do escopo, organização do fluxo de trabalho e estruturação inicial dos objetivos no Clube DS.",
    detalhes: "Fase inicial onde são definidos os marcos e a arquitetura básica da aplicação."
  },
  {
    id: "02",
    titulo: "Prototipagem & Design",
    descricao: "Criação das interfaces, escolha da paleta de cores (Branco, Azul e Vermelho) e definição do layout responsivo.",
    detalhes: "Construção do protótipo visual em Glassmorphism e definição de componentes reutilizáveis."
  },
  {
    id: "03",
    titulo: "Desenvolvimento Frontend",
    descricao: "Construção de componentes em React via Vite, aplicação do CSS estilizado e interatividade.",
    detalhes: "Implementação das funcionalidades dinâmicas com Hooks do React e gestão de cadastros."
  },
  {
    id: "04",
    titulo: "Publicação & Deploy",
    descricao: "Otimização de performance, geração do build final e publicação da plataforma na Vercel.",
    detalhes: "Testes finais de usabilidade, SEO e integração contínua na Vercel."
  }
];


const projetosIniciais = [
  {
    id: "PROJ-01",
    titulo: "Plataforma de Cursos",
    categoria: "Fullstack",
    autor: "Ana Silva",
    descricao: "Painel interativo para streaming de videoaulas com sistema de progresso.",
    imagem: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop"
  },
  {
    id: "PROJ-02",
    titulo: "App de Finanças",
    categoria: "Frontend",
    autor: "Carlos Eduardo",
    descricao: "Dashboard em React para controle de gastos pessoais e gráficos em tempo real.",
    imagem: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop"
  },
  {
    id: "PROJ-03",
    titulo: "API Rest de E-commerce",
    categoria: "Backend",
    autor: "Mariana Costa",
    descricao: "Arquitetura microsserviços em Node.js com autenticação JWT e integração Stripe.",
    imagem: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop"
  }
];

function App() {
  const [secaoAtiva, setSecaoAtiva] = useState('inicio');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [passoAtivo, setPassoAtivo] = useState(null); 


  const [cadastros, setCadastros] = useState(() => {
    const salvos = localStorage.getItem('clube_ds_membros');
    return salvos ? JSON.parse(salvos) : [
      { id: 'CDS-1001', nome: 'Ana Silva', email: 'ana@email.com', senha: '123', perfil: 'Desenvolvedor(a)' }
    ];
  });


  const [projetos, setProjetos] = useState(() => {
    const salvos = localStorage.getItem('clube_ds_projetos');
    return salvos ? JSON.parse(salvos) : projetosIniciais;
  });

  useEffect(() => {
    localStorage.setItem('clube_ds_membros', JSON.stringify(cadastros));
  }, [cadastros]);

  useEffect(() => {
    localStorage.setItem('clube_ds_projetos', JSON.stringify(projetos));
  }, [projetos]);


  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const [cadastroData, setCadastroData] = useState({ nome: '', email: '', senha: '', perfil: 'Estudante' });
  const [novoProjeto, setNovoProjeto] = useState({ titulo: '', categoria: 'Frontend', descricao: '', imagem: '' });
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });


  const handleNavClick = (e, secao) => {
    if (e) e.preventDefault();
    setSecaoAtiva(secao);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = (id) => {
    setPassoAtivo(passoAtivo === id ? null : id);
  };

  const exibirAlerta = (texto, tipo = 'sucesso') => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
  };

 
  const handleLogin = (e) => {
    e.preventDefault();
    const usuario = cadastros.find(u => u.email === loginData.email && u.senha === loginData.senha);
    if (usuario) {
      setUsuarioLogado(usuario);
      setLoginData({ email: '', senha: '' });
      exibirAlerta(`Bem-vindo de volta, ${usuario.nome}!`);
      setSecaoAtiva('inicio');
    } else {
      exibirAlerta('Credenciais inválidas!', 'erro');
    }
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    if (!cadastroData.nome || !cadastroData.email || !cadastroData.senha) return;

    const novo = {
      id: `CDS-${crypto.randomUUID().slice(0, 6).toUpperCase()}`,
      ...cadastroData
    };

    setCadastros([...cadastros, novo]);
    setUsuarioLogado(novo);
    setCadastroData({ nome: '', email: '', senha: '', perfil: 'Estudante' });
    exibirAlerta(`Conta criada com sucesso! Seu ID: ${novo.id}`);
    setSecaoAtiva('inicio');
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    exibirAlerta('Sessão encerrada.');
    setSecaoAtiva('inicio');
  };


  const handleAddProjeto = (e) => {
    e.preventDefault();
    if (!novoProjeto.titulo || !novoProjeto.descricao) return;

    const proj = {
      id: `PROJ-${crypto.randomUUID().slice(0, 4).toUpperCase()}`,
      autor: usuarioLogado ? usuarioLogado.nome : 'Membro Anônimo',
      imagem: novoProjeto.imagem || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop',
      ...novoProjeto
    };

    setProjetos([proj, ...projetos]);
    setNovoProjeto({ titulo: '', categoria: 'Frontend', descricao: '', imagem: '' });
    exibirAlerta('Projeto publicado na galeria!');
    setSecaoAtiva('galeria');
  };

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="logo" onClick={(e) => handleNavClick(e, 'inicio')}>
          Clube<span>DS</span>
        </div>
        <nav>
          <ul>
            <li><a href="#inicio" className={secaoAtiva === 'inicio' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, 'inicio')}>Início</a></li>
            <li><a href="#galeria" className={secaoAtiva === 'galeria' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, 'galeria')}>Galeria</a></li>
            <li><a href="#membros" className={secaoAtiva === 'membros' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, 'membros')}>Membros</a></li>
            {usuarioLogado ? (
              <>
                <li><span className="user-badge">👤 {usuarioLogado.nome.split(' ')[0]}</span></li>
                <li><button className="btn-nav active-btn" onClick={handleLogout}>Sair</button></li>
              </>
            ) : (
              <>
                <li><a href="#login" className={secaoAtiva === 'login' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, 'login')}>Login</a></li>
                <li><a href="#cadastro" className={`btn-nav ${secaoAtiva === 'cadastro' ? 'active-btn' : ''}`} onClick={(e) => handleNavClick(e, 'cadastro')}>Cadastre-se</a></li>
              </>
            )}
          </ul>
        </nav>
      </header>

   
      {mensagem.texto && <div className={`alert-toast ${mensagem.tipo}`}>{mensagem.texto}</div>}


      {secaoAtiva === 'inicio' && (
        <>
        <main id="inicio" className="hero">
          <div className="hero-content">
            <h1>Clube de Programação <span>ClubeDS</span></h1>
            <p>Comunidade prática para desenvolvedores. Crie projetos, compartilhe na galeria e evolua no ecossistema tech.</p>
            {usuarioLogado ? (
              <div className="hero-buttons">
                <button className="btn-primary" onClick={(e) => handleNavClick(e, 'novo-projeto')}>+ Publicar Projeto</button>
                <button className="btn-secondary" onClick={(e) => handleNavClick(e, 'galeria')}>Ver Galeria</button>
              </div>
            ) : (
              <div className="hero-buttons">
                <button className="btn-primary" onClick={(e) => handleNavClick(e, 'cadastro')}>Quero Fazer Parte</button>
                <button className="btn-secondary" onClick={(e) => handleNavClick(e, 'login')}>Acessar Conta</button>
              </div>
            )}
          </div>
        </main>
   

        <section id="passos" className="section-container">
          <h2>Passo a Passo do Projeto</h2>
          <p className="steps-subtitle">Clique num dos passos abaixo para ver mais detalhes</p>
          
          <div className="steps-container">
            {passosData.map((passo) => {
              const isSelected = passoAtivo === passo.id;
              return (
                <div 
                  key={passo.id}
                  className={`step-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCardClick(passo.id)}
                >
                  <div>
                    <div className="step-number">{passo.id}</div>
                    <h3>{passo.titulo}</h3>
                    <p>{passo.descricao}</p>
                    
                    {isSelected && (
                      <div className="step-details">
                        <hr className="divider" />
                        <p><strong>Detalhes:</strong> {passo.detalhes}</p>
                      </div>
                    )}
                  </div>
                  
                  <button className="btn-card-action">
                    {isSelected ? 'Ocultar Detalhes' : 'Ver Mais'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
        </>
         )}
     

   
      {secaoAtiva === 'galeria' && (
        <section className="section-container">
          <div className="section-header">
            <h2>Galeria de Projetos</h2>
            <p>Explore o que a nossa comunidade de desenvolvedores está construindo</p>
            {usuarioLogado && (
              <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={(e) => handleNavClick(e, 'novo-projeto')}>
                + Enviar Meu Projeto
              </button>
            )}
          </div>

          <div className="galeria-grid">
            {projetos.map((item) => (
              <div key={item.id} className="card-projeto">
                <div className="card-img-wrapper">
                  <img src={item.imagem} alt={item.titulo} />
                  <span className="categoria-badge">{item.categoria}</span>
                </div>
                <div className="card-body">
                  <h3>{item.titulo}</h3>
                  <p>{item.descricao}</p>
                  <div className="card-footer">
                    <small>Autor: <strong>{item.autor}</strong></small>
                    <span className="user-id">{item.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

   
      {secaoAtiva === 'novo-projeto' && (
        <section className="section-container">
          <h2>Publicar Novo Projeto</h2>
          <form className="form-box" onSubmit={handleAddProjeto}>
            <div className="form-group">
              <label>Título do Projeto</label>
              <input type="text" placeholder="Ex: E-commerce Responsivo" value={novoProjeto.titulo} onChange={(e) => setNovoProjeto({...novoProjeto, titulo: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <select value={novoProjeto.categoria} onChange={(e) => setNovoProjeto({...novoProjeto, categoria: e.target.value})}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div className="form-group">
              <label>URL da Imagem de Capa</label>
              <input type="url" placeholder="https://exemplo.com/imagem.jpg" value={novoProjeto.imagem} onChange={(e) => setNovoProjeto({...novoProjeto, imagem: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Descrição do Projeto</label>
              <textarea rows="4" placeholder="Descreva os recursos e tecnologias utilizadas..." value={novoProjeto.descricao} onChange={(e) => setNovoProjeto({...novoProjeto, descricao: e.target.value})} required></textarea>
            </div>
            <button type="submit" className="btn-primary">Publicar Projeto</button>
          </form>
        </section>
      )}


      {secaoAtiva === 'membros' && (
        <section className="section-container">
          <h2>Membros do Clube ({cadastros.length})</h2>
          <div className="membros-grid">
            {cadastros.map((item) => (
              <div key={item.id} className="membro-card">
                <div className="membro-avatar">{item.nome.charAt(0)}</div>
                <div className="membro-info">
                  <h4>{item.nome} <span className="user-id">{item.id}</span></h4>
                  <p>{item.email}</p>
                  <small className="badge">{item.perfil}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

   
      {secaoAtiva === 'login' && (
        <section className="section-container">
          <h2>Entrar na Conta</h2>
          <form className="form-box" onSubmit={handleLogin}>
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input type="password" value={loginData.senha} onChange={(e) => setLoginData({...loginData, senha: e.target.value})} required />
            </div>
            <button type="submit" className="btn-primary">Entrar</button>
          </form>
        </section>
      )}

     
      {secaoAtiva === 'cadastro' && (
        <section className="section-container">
          <h2>Cadastrar-se no Clube DS</h2>
          <form className="form-box" onSubmit={handleCadastro}>
            <div className="form-group">
              <label>Nome Completo</label>
              <input type="text" value={cadastroData.nome} onChange={(e) => setCadastroData({...cadastroData, nome: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" value={cadastroData.email} onChange={(e) => setCadastroData({...cadastroData, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input type="password" value={cadastroData.senha} onChange={(e) => setCadastroData({...cadastroData, senha: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Perfil</label>
              <select value={cadastroData.perfil} onChange={(e) => setCadastroData({...cadastroData, perfil: e.target.value})}>
                <option value="Estudante">Estudante</option>
                <option value="Desenvolvedor(a)">Desenvolvedor(a)</option>
                <option value="Designer">Designer</option>
              </select>
            </div>
            <button type="submit" className="btn-primary">Concluir Cadastro</button>
          </form>
        </section>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} ClubeDS — Clube de Programação. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;