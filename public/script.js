const form = document.getElementById("formConfirmacao");
const mensagem = document.getElementById("mensagem");
const inputNome = document.getElementById("nome");

const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

const dataFesta = new Date("2026-08-18T18:00:00-03:00");

function doisDigitos(valor) {
  return String(valor).padStart(2, "0");
}

function atualizarContador() {
  const agora = new Date();
  const diferenca = dataFesta - agora;

  if (diferenca <= 0) {
    diasEl.textContent = "00";
    horasEl.textContent = "00";
    minutosEl.textContent = "00";
    segundosEl.textContent = "00";
    return;
  }

  const segundosTotais = Math.floor(diferenca / 1000);
  const dias = Math.floor(segundosTotais / (60 * 60 * 24));
  const horas = Math.floor((segundosTotais % (60 * 60 * 24)) / (60 * 60));
  const minutos = Math.floor((segundosTotais % (60 * 60)) / 60);
  const segundos = segundosTotais % 60;

  diasEl.textContent = doisDigitos(dias);
  horasEl.textContent = doisDigitos(horas);
  minutosEl.textContent = doisDigitos(minutos);
  segundosEl.textContent = doisDigitos(segundos);
}

function soltarConfete() {
  const cores = ["#6f8e45", "#d3b35f", "#f0d98b", "#8b6a45", "#ffffff"];

  for (let i = 0; i < 70; i++) {
    const confete = document.createElement("span");
    confete.className = "confetti-piece";
    confete.style.left = Math.random() * 100 + "vw";
    confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    confete.style.animationDuration = 2.4 + Math.random() * 2.2 + "s";
    confete.style.animationDelay = Math.random() * 0.25 + "s";
    confete.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confete);

    setTimeout(() => {
      confete.remove();
    }, 5200);
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = inputNome.value.trim();
  const botao = form.querySelector("button");

  mensagem.textContent = "";
  mensagem.className = "mensagem";

  if (!nome) {
    mensagem.textContent = "Por favor, informe o nome do convidado.";
    mensagem.classList.add("erro");
    return;
  }

  botao.disabled = true;
  botao.textContent = "Confirmando...";

  try {
    const resposta = await fetch("/confirmar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome })
    });

    const dados = await resposta.json();

    mensagem.textContent = dados.mensagem;

    if (dados.sucesso) {
      mensagem.classList.add("sucesso");
      form.reset();
      soltarConfete();
    } else {
      mensagem.classList.add("erro");
    }

  } catch (error) {
    mensagem.textContent = "Não foi possível confirmar agora. Tente novamente.";
    mensagem.classList.add("erro");
  } finally {
    botao.disabled = false;
    botao.textContent = "Confirmar presença";
  }
});

atualizarContador();
setInterval(atualizarContador, 1000);
