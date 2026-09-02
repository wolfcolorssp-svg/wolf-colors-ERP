# Wolf ERP - Setup Guide

## Problemas com GitHub Pages

Se você está recebendo erro `DNS_PROBE_FINISHED_NXDOMAIN` ao tentar acessar o site:

### 1. Verificar Configuração do Repositório
- Vá para **Settings** → **Pages** no repositório
- Certifique-se de que GitHub Pages está **ENABLED**
- Source deve estar configurado como **Deploy from a branch** ou **GitHub Actions**

### 2. Opção A: GitHub Actions (Automático - Recomendado)
O repositório agora tem um workflow automático `.github/workflows/deploy.yml` que:
- Faz checkout do código
- Instala dependências com npm
- Faz build com Vite
- Deploy automático para GitHub Pages

Simplesmente faça push para `main` e aguarde o workflow executar.

### 3. Opção B: Deploy Manual
```bash
# Instalar dependências
npm install

# Fazer build
npm run build

# A pasta 'dist' contém os arquivos prontos para GitHub Pages
```

### 4. URL Correta
O site será acessível em:
```
https://wolfcolorssp-svg.github.io/wolf-colors-site/
https://wolfcolorssp-svg.github.io/wolf-colors-site/login
```

Se você configurou um CNAME customizado (ex: `wolf-colors-site.com`), a URL será diferente.

## Desenvolvimento Local

```bash
npm install
npm run dev
# Acesse http://localhost:5173
```

## Estrutura do Projeto

```
wolf-colors-ERP/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Entry point
│   └── global.css      # Estilos globais
├── public/             # Arquivos públicos
│   └── 404.html        # Redirect para SPA routing
├── index.html          # HTML principal
├── vite.config.js      # Configuração do Vite
├── package.json        # Dependências
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions workflow
```

## Próximas Alterações Necessárias

1. **Integrar Supabase** no `src/pages/Login.jsx`
2. **Adicionar autenticação** com proteção de rotas
3. **Configurar CORS** se necessário
4. **Implementar estados** com Context API ou Redux

## Troubleshooting

### Erro: "404 Not Found"
- Verifique se GitHub Pages está habilitado nas configurações
- Confirme que o workflow completou com sucesso
- Aguarde 5-10 minutos após push para GitHub Pages processar

### Erro DNS
- Limpe cache do navegador (Ctrl+Shift+Del)
- Tente em modo anônimo/privado
- Aguarde propagação de DNS (até 24 horas para domínios customizados)

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```
