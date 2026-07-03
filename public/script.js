const form = document.getElementById("formConfirmacao");
const mensagem = document.getElementById("mensagem");

const dataFesta = new Date("2026-08-18T18:00:00-03:00");

function atualizarContador() {
  const agora = new Date();
  const diferenca = dataFesta - agora;

  if (diferenca <= 0) return;

  const totalSegundos = Math.floor(diferenca / 1000);

  const dias = Math.floor(totalSegundos / 86400);
  const horas = Math.floor((totalSegundos % 86400) / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  document.getElementById("dias").textContent = String(dias).padStart(2, "0");
  document.getElementById("horas").textContent = String(horas).padStart(2, "0");
  document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
  document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

function soltarConfete() {
  for (let i = 0; i < 60; i++) {
    const confete = document.createElement("span");

    confete.style.position = "fixed";
    confete.style.top = "-10px";
    confete.style.left = Math.random() * 100 + "vw";
    confete.style.width = "8px";
    confete.style.height = "14px";
    confete.style.background = ["#6f8e45", "#d3b35f", "#f0d98b", "#8b6a45"][Math.floor(Math.random() * 4)];
    confete.style.zIndex = "9999";
    confete.style.animation = `cair ${2 + Math.random() * 2}s linear forwards`;

    document.body.appendChild(confete);

    setTimeout(() => confete.remove(), 4500);
  }
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes cair {
  to {
    transform: translateY(110vh) rotate(720deg);
    opacity: 0;
  }
}`;
document.head.appendChild(style);

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();

  if (!nome) {
    mensagem.textContent = "Por favor, informe o nome do convidado.";
    mensagem.className = "erro";
    return;
  }

  const resposta = await fetch("/confirmar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome })
  });

  const dados = await resposta.json();

  mensagem.textContent = dados.mensagem;
  mensagem.className = dados.sucesso ? "sucesso" : "erro";

  if (dados.sucesso) {
    form.reset();
    soltarConfete();
  }
});

atualizarContador();
setInterval(atualizarContador, 1000);