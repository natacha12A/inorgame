// Seletores do popup da logo
const logo = document.getElementById("abrirLogoPopup");
const popupLogo = document.getElementById("popup-logo");
const btnSim = document.getElementById("btnLogoSim");
const btnNao = document.getElementById("btnLogoNao");

// Abrir popup ao clicar na logo
logo.addEventListener("click", () => {
  popupLogo.style.display = "flex";
});

// Botão NÃO → fecha o popup
btnNao.addEventListener("click", () => {
  popupLogo.style.display = "none";
});

// Botão SIM → redireciona
btnSim.addEventListener("click", () => {
  window.location.href = "./homeJogo.html"; // ajuste o link
});

// Fechar clicando fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === popupLogo) {
    popupLogo.style.display = "none";
  }
});
