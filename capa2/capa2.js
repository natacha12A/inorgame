// ---------- POPUP REGRAS ----------
const abrirBtn = document.getElementById("abrirPopup");
const fecharBtn = document.getElementById("fecharPopup");
const popup = document.getElementById("popup");

abrirBtn.addEventListener("click", () => popup.classList.add("ativo"));
fecharBtn.addEventListener("click", () => popup.classList.remove("ativo"));

// ---------- POPUP LOGO ----------
const logo = document.querySelector(".logo");
const popupLogo = document.getElementById("popup-logo");
const btnLogoNao = document.getElementById("btnLogoNao");
const btnLogoSim = document.getElementById("btnLogoSim");

logo.addEventListener("click", () => popupLogo.classList.add("ativo"));
btnLogoNao.addEventListener("click", () => popupLogo.classList.remove("ativo"));
btnLogoSim.addEventListener("click", () => {
  window.location.href = "homeJogos.html";
});

// ---------- POPUP ÁTOMO (se existir) ----------
const popupAtom = document.getElementById("popupAtom");
const logoAtom = document.querySelector(".logo-atom");

if (logoAtom && popupAtom) {
  logoAtom.addEventListener("click", () => popupAtom.classList.add("ativo"));
}

// ---------- FECHAR POPUPS CLICANDO FORA ----------
window.addEventListener("click", (event) => {
  if (event.target === popup) popup.classList.remove("ativo");
  if (event.target === popupLogo) popupLogo.classList.remove("ativo");
  if (popupAtom && event.target === popupAtom) popupAtom.classList.remove("ativo");
});


// ---------- BOTÕES "NÃO" (fecha popup) ----------
document.querySelectorAll(".btn-nao").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".popup").style.display = "none";
  });
});

// ---------- BOTÕES "SIM" (padrão fecha, se não tiver ação especial) ----------
document.querySelectorAll(".btn-sim").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".popup").style.display = "none";
  });
});
