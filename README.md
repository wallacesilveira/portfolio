# Wallace Silveira — Site Pessoal / Portfólio

Site pessoal em HTML5 + CSS3 + JavaScript puro (sem frameworks), com foco em
apresentar a carreira profissional (TOTVS Fluig, BPM/ECM, automação de
processos, Power Automate) e um portfólio de projetos.

## Estrutura de pastas

```
wallPage/
├── index.html          # Página única com todas as seções (âncoras)
├── css/
│   └── style.css       # Estilos, design tokens (CSS variables), tema claro/escuro
├── js/
│   └── main.js         # Tema, menu mobile, scroll reveal, filtro do portfólio, formulário
├── assets/
│   ├── favicon.svg
│   ├── og-image.svg    # TODO: trocar por imagem raster 1200x630 para redes sociais
│   └── projects/
│       ├── project-1.svg ... project-6.svg   # TODO: trocar pelos screenshots reais
└── README.md
```

## Como rodar localmente

Como é um site 100% estático, basta abrir `index.html` no navegador. Para uma
experiência mais próxima de produção (URLs relativas, cache, etc.), sirva a
pasta com um servidor local simples:

```bash
# Opção 1: Python (já vem instalado na maioria dos sistemas)
cd wallPage
python -m http.server 8080
# depois acesse http://localhost:8080

# Opção 2: Node (via pacote npx, sem instalação global)
cd wallPage
npx serve .

# Opção 3: extensão "Live Server" do VS Code
# clique com o botão direito em index.html > "Open with Live Server"
```

## Onde editar o conteúdo

- **Projetos do portfólio**: em `index.html`, procure o comentário
  `<!-- TODO: substituir pelos projetos reais -->` na seção `#portfolio`.
  Cada `<article class="project-card">` tem:
  - `data-category`: usado pelo filtro (`fluig`, `web`, `automacao` — pode combinar mais de uma, separadas por espaço)
  - imagem em `assets/projects/` (substitua os arquivos `.svg` por screenshots reais `.jpg/.png/.webp`)
  - título, descrição, tags e link do projeto
- **Formulário de contato**: em `index.html`, troque `SEU_FORM_ID` na tag
  `<form ... action="https://formspree.io/f/SEU_FORM_ID">` pelo ID gerado ao
  criar um formulário gratuito em [formspree.io](https://formspree.io).
- **Imagem de compartilhamento (Open Graph)**: troque `assets/og-image.svg`
  por uma imagem raster de 1200x630px (`.jpg` ou `.png`) e atualize as tags
  `og:image` / `twitter:image` no `<head>` de `index.html`.
- **Cores e tipografia**: tokens centralizados em `css/style.css`, no bloco
  `:root { ... }` (tema escuro, padrão) e `:root[data-theme="light"]` (tema claro).

## Deploy

### Vercel
1. Crie um repositório Git com o conteúdo desta pasta.
2. Em [vercel.com](https://vercel.com), clique em "New Project" e importe o repositório.
3. Como é um site estático, não é necessário configurar build command nem
   output directory — o Vercel detecta automaticamente.

### Netlify
1. Crie um repositório Git com o conteúdo desta pasta (ou use drag-and-drop).
2. Em [app.netlify.com](https://app.netlify.com), clique em "Add new site" →
   "Deploy manually" (arraste a pasta) ou "Import an existing project" (via Git).
3. Build command: (vazio) — Publish directory: `.` (raiz do projeto).

### GitHub Pages
1. Faça push do conteúdo desta pasta para um repositório no GitHub.
2. Vá em **Settings → Pages**.
3. Em "Source", selecione a branch (ex.: `main`) e a pasta `/ (root)`.
4. O site ficará disponível em `https://<usuario>.github.io/<repositorio>/`.

## Notas técnicas

- Tema escuro é o padrão; a preferência do usuário é salva em `localStorage`.
- Scroll reveal usa `IntersectionObserver` (com fallback que exibe tudo caso a API não esteja disponível).
- Imagens do portfólio usam `loading="lazy"`.
- Sem dependências de build: os únicos recursos externos são as fontes do Google Fonts (Space Grotesk + Inter).
