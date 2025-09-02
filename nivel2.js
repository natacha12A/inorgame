// ------------------- VARIÁVEIS -------------------
const compostos = document.querySelectorAll(".composto");
const categorias = document.querySelectorAll(".categoria");
const progress = document.getElementById("progress");
const bixinho = document.getElementById("bixinho-triste");
const bixinhoImg = document.getElementById("bixinho-img");

// Popups existentes
const popup = document.getElementById("popup");
const fecharPopup = document.getElementById("fecharPopup");
const popupText = document.querySelector(".popup-text");

const popupFinal = document.getElementById("popup-final");
const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");

const popupErro = document.getElementById("popup-erro");
const btnErroOk = document.getElementById("btnErroOk");

// Popup logo
const logo = document.getElementById("logo");
const popupLogo = document.getElementById("popup-logo");
const btnLogoSim = document.getElementById("btnLogoSim");
const btnLogoNao = document.getElementById("btnLogoNao");

// Controle do jogo
let acertos = 0;
const total = compostos.length;
let houveErro = false;
let ultimaMensagemErro = "";

// Mensagens de erro
const mensagensErro = {
   ácido: "HCl é um Ácido. Ácidos em solução aquosa liberam íons H⁺ (HCl → H⁺ + Cl⁻).",
   base: "Mg(OH)₂ é uma Base. Bases liberam íons OH⁻ em solução aquosa.",
   sal: "NaCl é um Sal. Sais vêm da neutralização entre um ácido e uma base.",
   óxido: "CO₂ é um Óxido. Óxidos contêm oxigênio ligado a outro elemento."
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
  e.dataTransfer.setData("texto", e.target.innerText);
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
    setTimeout(() => {
      compostoEl.remove();
      this.remove();
    }, 600);

    acertos++;
    atualizarProgresso();
    bixinho.style.display = "none";

    // FIM DO JOGO
    if (acertos === total) {
      setTimeout(() => {
        if (houveErro) {
          popupErro.style.display = "flex";
        } else {
          popupFinal.style.display = "flex";
        }
      }, 600);
    }
  } else {
    // ERRO
    this.classList.add("errado");
    ultimaMensagemErro = mensagensErro[tipo];

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
bixinhoImg.addEventListener("click", () => {
  if (ultimaMensagemErro) {
    popupText.textContent = ultimaMensagemErro;
    popup.style.display = "flex";
  }
});

fecharPopup.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

// ------------------- POPUP FINAL -------------------
btnSim.addEventListener("click", () => { location.reload(); });
btnNao.addEventListener("click", () => { popupFinal.style.display = "none"; });

// ------------------- POPUP ERRO FINAL -------------------
btnErroOk.addEventListener("click", () => { popupErro.style.display = "none"; });

// ------------------- POPUP LOGO -------------------
// Abrir popup ao clicar na logo
// Abrir popup ao clicar na logo
logo.addEventListener("click", () => {
  popupLogo.style.display = "flex";
});

// Botão NÃO fecha o popup
btnLogoNao.addEventListener("click", () => {
  popupLogo.style.display = "none";
});

// Botão SIM redireciona
btnLogoSim.addEventListener("click", () => {
  window.location.href = "index.html";
});
