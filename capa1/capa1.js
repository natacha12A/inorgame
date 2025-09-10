// ---------- POPUP REGRAS ----------
const popupRegras = document.getElementById("popup");
const btnFecharRegras = document.getElementById("fecharPopup");
const btnAbrirRegras = document.getElementById("abrirPopup");

btnAbrirRegras.addEventListener("click", () => {
    popupRegras.classList.add("ativo");
});

btnFecharRegras.addEventListener("click", () => {
    popupRegras.classList.remove("ativo");
});

// ---------- POPUP LOGO ----------
const popupLogo = document.getElementById("popup-logo");
const logo = document.querySelector(".logo");
const btnLogoNao = document.getElementById("btnLogoNao");
const btnLogoSim = document.getElementById("btnLogoSim");

logo.addEventListener("click", () => popupLogo.classList.add("ativo"));
btnLogoNao.addEventListener("click", () => popupLogo.classList.remove("ativo"));
btnLogoSim.addEventListener("click", () => {
    window.location.href = "./homeJogos.html"; // muda para a página desejada
});

// ---------- POPUP ÁTOMO (opcional) ----------
const popupAtom = document.getElementById("popupAtom");
const logoAtom = document.querySelector(".logo-atom");

if (logoAtom && popupAtom) {
    logoAtom.addEventListener("click", () => popupAtom.classList.add("ativo"));
}

// ---------- FECHAR POPUPS CLICANDO FORA ----------
window.addEventListener("click", (event) => {
    if (event.target === popupRegras) popupRegras.classList.remove("ativo");
    if (event.target === popupLogo) popupLogo.classList.remove("ativo");
    if (popupAtom && event.target === popupAtom) popupAtom.classList.remove("ativo");
});

// ---------- BOTÕES "NÃO" (fecha popup) ----------
document.querySelectorAll(".btn-nao").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".popup").classList.remove("ativo");
    });
});

// ---------- BOTÕES "SIM" (caso não tenha ação especial) ----------
document.querySelectorAll(".btn-sim").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".popup").classList.remove("ativo");
    });
});
