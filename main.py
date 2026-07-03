from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json
import os

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="public",
    static_url_path="/static"
)

ARQUIVO_CONVIDADOS = "convidados.json"


def carregar_convidados():
    if not os.path.exists(ARQUIVO_CONVIDADOS):
        return []

    try:
        with open(ARQUIVO_CONVIDADOS, "r", encoding="utf-8") as arquivo:
            return json.load(arquivo)
    except json.JSONDecodeError:
        return []


def salvar_convidado(nome):
    convidados = carregar_convidados()
    convidados.append({
        "nome": nome,
        "data_confirmacao": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

    with open(ARQUIVO_CONVIDADOS, "w", encoding="utf-8") as arquivo:
        json.dump(convidados, arquivo, ensure_ascii=False, indent=4)


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/confirmar", methods=["POST"])
def confirmar():
    dados = request.get_json(silent=True) or {}
    nome = dados.get("nome", "").strip()

    if not nome:
        return jsonify({
            "sucesso": False,
            "mensagem": "Por favor, informe o nome do convidado."
        }), 400

    salvar_convidado(nome)

    return jsonify({
        "sucesso": True,
        "mensagem": "Presença confirmada com sucesso! Obrigado por fazer parte desse momento especial."
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
