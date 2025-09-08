// ------------------- VARIÁVEIS -------------------
const compostos = document.querySelectorAll(".composto");
const categorias = document.querySelectorAll(".categoria");
const progress = document.getElementById("progress");
const bixinho = document.getElementById("bixinho-triste");

const popup = document.getElementById("popup");
const fecharPopup = document.getElementById("fecharPopup");
const popupText = document.querySelector(".popup-text");

const popupFinal = document.getElementById("popup-final");
const btnSimFinal = document.getElementById("btnSim");
const btnNaoFinal = document.getElementById("btnNao");

const popupErro = document.getElementById("popup-erro");
const btnErroSim = document.getElementById("btnErroSim");
const btnErroNao = document.getElementById("btnErroNao");

const logo = document.getElementById("logo");
const popupLogo = document.getElementById("popup-logo");
const btnLogoSim = document.getElementById("btnLogoSim");
const btnLogoNao = document.getElementById("btnLogoNao");

// Controle do jogo
let acertos = 0;
const total = compostos.length;
let houveErro = false;

// Mensagens de erro
const mensagensErro = {
   ácido: "HCl se chama Ácido clorídrico e é formado por hidrogênio (H) e cloro (Cl). É ácido porque libera íons H⁺ em água.",
   base: "Mg(OH)₂ se chama Hidróxido de magnésio e é composto por magnésio (Mg), oxigênio (O) e hidrogênio (H). É uma base, pois libera íons OH⁻ em água.",
   sal: "NaCl se chama Cloreto de sódio. Formado por sódio (Na) e cloro (Cl). É um sal, pois resulta da neutralização entre um ácido e uma base.",
   óxido: "CO₂ se chama Dióxido de carbono. Formado por carbono (C) e oxigênio (O). É um óxido, pois contém oxigênio ligado a outro elemento."
};

// ------------------- EVENTOS DRAG & DROP -------------------
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

function dragLeave() {
  this.classList.remove("over");
}

function drop(e) {
  e.preventDefault();
  this.classList.remove("over");

  const compostoEl = document.querySelector(".dragging");
  if (!compostoEl) return;

  const tipoArrastado = compostoEl.dataset.tipo;

  if (this.dataset.tipo === tipoArrastado) {
    // ACERTO
    this.classList.add("correto");
    setTimeout(() => {
      compostoEl.remove();
      this.classList.remove("correto");
      this.style.display = "none"; // categoria também some
    }, 600);

    acertos++;
    atualizarProgresso();
    bixinho.style.display = "none";

    // FIM DO JOGO
    if (acertos === total) {
      // Esconde todos os containers de categorias
      document.querySelectorAll('.categorias, .cate2, .cate3').forEach(el => el.style.display = 'none');

      setTimeout(() => {
        if (houveErro) {
          popupErro.style.display = "flex";
        } else {
          mostrarPopupFinalComFogos();
        }
      }, 600);
    }

  } else {
    // ERRO → abre popup
    this.classList.add("errado");
    popupText.textContent = mensagensErro[tipoArrastado];
    popup.style.display = "flex";

    bixinho.style.display = "block";
    setTimeout(() => { bixinho.style.display = "none"; }, 1500);
    setTimeout(() => { this.classList.remove("errado"); }, 1200);

    houveErro = true;
  }

  compostoEl.classList.remove("dragging");
}

// ------------------- PROGRESSO -------------------
function atualizarProgresso() {
  const progresso = (acertos / total) * 100;
  progress.style.width = `${progresso}%`;
}

// ------------------- POPUP BIXINHO -------------------
fecharPopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// ------------------- POPUP FINAL -------------------
btnSimFinal.addEventListener("click", () => { location.reload(); });
btnNaoFinal.addEventListener("click", () => { popupFinal.style.display = "none"; pararFogos(); });

// ------------------- POPUP ERRO FINAL -------------------
if(btnErroSim) btnErroSim.addEventListener("click", () => location.reload());
if(btnErroNao) btnErroNao.addEventListener("click", () => popupErro.style.display = "none");

// ------------------- POPUP LOGO -------------------
logo.addEventListener("click", () => {
  popupLogo.style.display = "flex";
});
btnLogoNao.addEventListener("click", () => {
  popupLogo.style.display = "none";
});
btnLogoSim.addEventListener("click", () => {
  window.location.href = "index.html";
});

// ---------------- Fogos ----------------
function mostrarPopupFinalComFogos() {
  popupFinal.style.display = "flex";
  const canvas = document.getElementById("fireworksCanvas");
  canvas.width = popupFinal.offsetWidth;
  canvas.height = popupFinal.offsetHeight;
  iniciarFogosChamativos(canvas);
}

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
