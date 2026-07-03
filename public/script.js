const form=document.getElementById("formConfirmacao");
const mensagem=document.getElementById("mensagem");
const dataFesta=new Date("2026-08-18T18:00:00-03:00");

function doisDigitos(valor){return String(valor).padStart(2,"0")}

function atualizarContador(){
  const agora=new Date();
  const diferenca=dataFesta-agora;
  if(diferenca<=0){
    document.getElementById("dias").textContent="00";
    document.getElementById("horas").textContent="00";
    document.getElementById("minutos").textContent="00";
    document.getElementById("segundos").textContent="00";
    return;
  }
  const totalSegundos=Math.floor(diferenca/1000);
  const dias=Math.floor(totalSegundos/86400);
  const horas=Math.floor((totalSegundos%86400)/3600);
  const minutos=Math.floor((totalSegundos%3600)/60);
  const segundos=totalSegundos%60;
  document.getElementById("dias").textContent=doisDigitos(dias);
  document.getElementById("horas").textContent=doisDigitos(horas);
  document.getElementById("minutos").textContent=doisDigitos(minutos);
  document.getElementById("segundos").textContent=doisDigitos(segundos);
}

function soltarConfete(){
  const cores=["#6f8e45","#d3b35f","#f2d989","#8b6a45","#ffffff"];
  for(let i=0;i<70;i++){
    const confete=document.createElement("span");
    confete.className="confete";
    confete.style.left=Math.random()*100+"vw";
    confete.style.background=cores[Math.floor(Math.random()*cores.length)];
    confete.style.animationDuration=2.2+Math.random()*2.2+"s";
    confete.style.animationDelay=Math.random()*0.2+"s";
    document.body.appendChild(confete);
    setTimeout(()=>confete.remove(),5000);
  }
}

form.addEventListener("submit",async function(event){
  event.preventDefault();
  const nome=document.getElementById("nome").value.trim();
  const botao=form.querySelector("button");
  mensagem.textContent="";
  mensagem.className="";

  if(!nome){
    mensagem.textContent="Por favor, informe o nome do convidado.";
    mensagem.className="erro";
    return;
  }

  botao.disabled=true;
  botao.textContent="Confirmando...";

  try{
    const resposta=await fetch("/confirmar",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({nome})
    });
    const dados=await resposta.json();
    mensagem.textContent=dados.mensagem;
    mensagem.className=dados.sucesso?"sucesso":"erro";

    if(dados.sucesso){
      form.reset();
      soltarConfete();
    }
  }catch(error){
    mensagem.textContent="Não foi possível confirmar agora. Tente novamente.";
    mensagem.className="erro";
  }finally{
    botao.disabled=false;
    botao.textContent="Confirmar presença";
  }
});

atualizarContador();
setInterval(atualizarContador,1000);
