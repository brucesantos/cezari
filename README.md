# Cezari Consultoria

Site estático publicado pelo GitHub Pages. Não requer CodeKit, Sass, npm ou etapa de build.

## Editar

- `index.html`: textos, menus, áreas de atuação, contato e lista de clientes.
- `assets/uploads/clientes/`: logos extraídos do documento fornecido pelo cliente.
- `css/custom.css`: ajustes de estilo do site e do carrossel.
- `js/custom.js`: faixa de logos com movimento linear contínuo, sem controles visuais.

O visual original usa o CSS já compilado do Slides 5.2.1 (`css/slides.min.css`) e seu JavaScript (`js/slides.min.js`). O arquivo `css/slides.css` é a versão legível legada, não carregada pela página. Faça novos ajustes em `css/custom.css`, que é carregado depois do CSS base.

## Visualizar localmente

Abra a pasta com o Live Server do VS Code ou execute `python3 -m http.server 8000` e acesse `http://localhost:8000`.

## Atualizar clientes

Adicione o arquivo do logo em `assets/uploads/clientes/` e copie um item `li.client-logo` dentro de `#clients-track` no HTML. Atualize o caminho e o texto alternativo (`alt`) com o nome da empresa. O carrossel ocupa toda a largura da seção e repete os logos continuamente. Respeita a preferência por movimento reduzido, permitindo rolagem manual nesse caso. O foco pelo teclado pausa a animação.

## Publicação

Revise as mudanças antes de enviar ao branch usado pelo GitHub Pages. Mantenha o arquivo `CNAME`, que configura o domínio existente. Ao alterar CSS ou JavaScript, atualize o parâmetro de versão dos respectivos links no HTML para evitar cache antigo.
