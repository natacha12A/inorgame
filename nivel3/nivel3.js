const compostos = document.querySelectorAll(".composto");
const categorias = document.querySelectorAll(".categoria");
const progress = document.getElementById("progress");
const bixinho = document.getElementById("bixinho-triste");

const popupFinal = document.getElementById("popup-final");
const popupErro = document.getElementById("popup-erro");
const popupTemporario = document.getElementById("popup-temporario");

const btnErroSim = document.getElementById("btnErroSim");
const btnErroNao = document.getElementById("btnErroNao");
const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");

// Seleciona a logo e o popup da logo
const logo = document.querySelector("header img");
const popupLogo = document.getElementById("popup-logo");
const btnLogoSim = document.getElementById("btnLogoSim");
const btnLogoNao = document.getElementById("btnLogoNao");

// Abre popup ao clicar na logo
logo.addEventListener("click", () => {
  popupLogo.style.display = "flex";
});

// Botão SIM: volta para o menu (ou pode recarregar a página principal)
btnLogoSim.addEventListener("click", () => {
  window.location.href = "./index.html"; // ou outra página de menu
});

// Botão NÃO: fecha o popup
btnLogoNao.addEventListener("click", () => {
  popupLogo.style.display = "none";
});

// Fecha o popup ao clicar fora da caixa
window.addEventListener("click", (e) => {
  if (e.target === popupLogo) {
    popupLogo.style.display = "none";
  }
});


let acertos = 0;
let erros = 0;
const total = compostos.length; 

// 🔹 Eventos de arrastar
compostos.forEach(composto => {
  composto.addEventListener("dragstart", dragStart);
});

categorias.forEach(cat => {
  cat.addEventListener("dragover", dragOver);
  cat.addEventListener("dragleave", dragLeave);
  cat.addEventListener("drop", drop);
});

function dragStart(e) {
  e.dataTransfer.setData("tipo", e.target.dataset.tipo);
  e.target.classList.add("dragging");
}

function dragOver(e) { 
  e.preventDefault(); 
  this.classList.add("over"); 
}

function dragLeave(e) { 
  this.classList.remove("over"); 
}

function drop(e) {
  e.preventDefault();
  this.classList.remove("over");
  const tipo = e.dataTransfer.getData("tipo");
  const compostoEl = document.querySelector(".dragging");

  if (this.dataset.tipo === tipo) {
    // ACERTO
    this.classList.add("correto");

    if (this.dataset.tipo === "óxido") {
      if (!this.armazenados) this.armazenados = [];
      const clone = compostoEl.cloneNode(true);
      clone.classList.remove("dragging");
      this.appendChild(clone);
      compostoEl.remove();
      this.armazenados.push(clone);

      if (this.armazenados.length === 2) {
        setTimeout(() => {
          this.armazenados.forEach(c => c.remove());
          this.remove();
          acertos += 2;
          atualizarProgresso();
          checarFimDeJogo();
        }, 800);
      }
    } else {
      setTimeout(() => {
        compostoEl.remove();
        this.remove();
        acertos++;
        atualizarProgresso();
        checarFimDeJogo();
      }, 600);
    }
  } else {
    // ERRO
    this.classList.add("errado");
    erros++;
    bixinho.style.display = "block";

    const compostoNome = compostoEl.dataset.composto;

    // 🔹 Mostra popup do composto correspondente
    mostrarPopupComposto(compostoNome);

    setTimeout(() => {
      this.classList.remove("errado");
      bixinho.style.display = "none";
    }, 1500);
  }
}

function atualizarProgresso() {
  progress.style.width = (acertos/total)*100 + "%";
}

function checarFimDeJogo() {
  if(acertos >= total) {
    if(erros === 0) {
      popupTemporario.style.display = "flex";
      setTimeout(() => {
        popupTemporario.style.display = "none";
        mostrarPopupFinalComFogos();
      }, 5000);
    } else {
      popupErro.style.display = "flex";
    }
  }
}

function mostrarPopupFinalComFogos() {
  popupFinal.style.display = "flex";
  const canvas = document.getElementById("fireworksCanvas");
  canvas.width = popupFinal.offsetWidth;
  canvas.height = popupFinal.offsetHeight;
  iniciarFogosChamativos(canvas);
}

// ---------------- Popups de composto ----------------
function mostrarPopupComposto(compostoNome) {
  const popup = document.getElementById(`popup-${compostoNome}`);
  if (popup) popup.style.display = "flex";
}

function fecharPopup(id) {
  const popup = document.getElementById(id);
  if (popup) popup.style.display = "none";
}

// Fecha popup ao clicar fora
window.addEventListener("click", (e) => {
  if(e.target.classList.contains("popup")) e.target.style.display = "none";
});

// ---------------- Fogos ----------------
let intervalFogos;
function iniciarFogosChamativos(canvas) {
  const ctx = canvas.getContext("2d");
  const particles = [];
  const colors = ["#ffcc00","#ff4444","#44ff44","#44ccff","#ff44ff","#ff8800","#ff66ff"];

  function criarParticula(x, y){
    const tamanho = Math.random()*5+3;
    const velocidade = Math.random()*7+3;
    const angulo = Math.random()*2*Math.PI;
    const cor = colors[Math.floor(Math.random()*colors.length)];
    return {x,y,tamanho,velocidade,angulo,cor,alpha:1,decay:0.015};
  }

  function explodir(){
    const x = Math.random()*canvas.width;
    const y = Math.random()*canvas.height/2;
    const qtd = 80 + Math.random()*40;
    for(let i=0;i<qtd;i++){
      particles.push(criarParticula(x,y));
    }
  }

  function animar(){
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += Math.cos(p.angulo)*p.velocidade;
      p.y += Math.sin(p.angulo)*p.velocidade;
      p.alpha -= p.decay;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.tamanho,0,2*Math.PI);
      ctx.fillStyle = `rgba(${hexToRgb(p.cor)},${p.alpha})`;
      ctx.fill();

      if(p.alpha <= 0) particles.splice(i,1);
    }
    requestAnimationFrame(animar);
  }

  function hexToRgb(hex){
    hex = hex.replace("#",""); 
    const bigint = parseInt(hex,16);
    const r = (bigint>>16)&255;
    const g = (bigint>>8)&255;
    const b = bigint&255;
    return `${r},${g},${b}`;
  }

  intervalFogos = setInterval(explodir, 300);
  animar();
}

function pararFogos(){ 
  clearInterval(intervalFogos); 
}

// ---------------- Eventos popups finais ----------------
btnErroSim.addEventListener("click", () => location.reload());
btnErroNao.addEventListener("click", () => popupErro.style.display="none");

btnSim.addEventListener("click", () => location.reload());
btnNao.addEventListener("click", () => popupFinal.style.display = "none");
