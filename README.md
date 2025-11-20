# Automação Playwright – Extração de Dados do IBGE (> 60 anos)
Projeto Desafio Lev – Web Automation + Data Extraction
<div align="center">
🔎 Automação completa de extração da Tabela 1209 – SIDRA/IBGE
Com e Sem Login • Download Automático • Filtragem de População 60+
</div>
<br>
# Visão Geral do Projeto

Este projeto automatiza a extração de dados da tabela 1209 do site SIDRA / IBGE, filtrando a população com 60 anos ou mais, realizando:

- Seleção automática dos filtros
- Download do CSV com nome personalizado
- Execução em dois modos:

    COM login
    SEM login

<br>
  1. Requisitos para Execução
  Pré-requisitos obrigatórios

Node.js 18+
NPM
Playwright (instalado automaticamente)
Arquivo .env configurado:

```bash
USER_EMAIL=seu_email
PASSWORD=sua_senha
```

<br>
📦 2. Instalação do Projeto

🔧 Instalar dependências

```bash
npm install
```

<br>
3. Como Executar os Testes

Executar testes COM login

```bash
npm run test
```

Com navegador visível:

```bash
npm run viewTest
```

Executar testes SEM login

```bash
npm run testWithoutLogin
```

Com navegador visível:

```bash
npm run viewTestWithoutLogin
```

<br>
4. Estratégia Utilizada Na Automação

A automação se divide em 12 passos principais:

A) Execução com Login

1 - Acessa o site do SIDRA

2 - Realiza login utilizando o módulo dotenv

3 - Aguarda overlay e o remove

4 - Acessa barra de pesquisa

5 - Procura pela tabela 1209

6 - Aguarda editor carregar

7 - Desmarca todos os filtros

8 - Marca filtros de “60 anos ou mais”

9 - Altera nível Brasil → Estados

10 - Abre modal de downloads

11 - Define nome + formato CSV

12 - Salva o download na pasta /downloads/dados/


B) Execução Sem Login

Mesma lógica, porém pulando a etapa de login.

<br>

5. Principais Desafios Encontrados

1. Aprender e entender como playwright funciona:
  Por nunca ter mexido com essa tecnoogia foi um desafio e tanto aprender e defrutar de uma ferramenta poderosa de testes e automação

2. Selectores bem especificos
  Exigiu uso de CSS avançado como:
    ```bash
    .lv-block .lv-data .item-lista[data-indice="12"] .sidra-check .sidra-toggle
    ```

4. Detecção correta do download
  Necessidade de capturar evento de download:
    ```bash
    const download = await page.waitForEvent('download');
    ```
    
<br>
6. Estrutura Final do Projeto
desafio-lev/
│
├── tests/
│   └── desafio.spec.js
│
├── downloads/
│   └── dados/
│
├── .env
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
<br>

🚀 Pronto para uso em produção.
