# Site RSVP - 1º Aninho do Ravi

Projeto Flask pronto para deploy na Vercel.

## Rodar localmente

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

Linux/Mac:

```bash
source .venv/bin/activate
```

Instalar dependências:

```bash
pip install -r requirements.txt
```

Executar:

```bash
python main.py
```

Acesse:

```text
http://127.0.0.1:5000
```

## Deploy no GitHub

```bash
git init
git add .
git commit -m "site rsvp aniversario ravi"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ravi-rsvp.git
git push -u origin main
```

## Deploy na Vercel

1. Acesse a Vercel.
2. Clique em Add New Project.
3. Importe o repositório do GitHub.
4. Framework: Other.
5. Build Command: deixe vazio.
6. Output Directory: deixe vazio.
7. Clique em Deploy.

## Observação importante

O arquivo `convidados.json` funciona localmente.

Na Vercel, por ser ambiente serverless, gravações em arquivo podem não persistir de forma permanente.
Para produção real, o ideal é usar Google Sheets, Supabase, Firebase ou outro armazenamento externo.
