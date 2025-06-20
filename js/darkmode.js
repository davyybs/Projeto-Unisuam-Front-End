// Aplica o modo salvo quando carregar a página
document.addEventListener("DOMContentLoaded", () => {
  aplicarModoSalvo();

  const botaoTema = document.getElementById("darkmode");
  botaoTema.addEventListener("click", alternarModoEscuro);
});

// Função que vai aplicar o modo salvo
function aplicarModoSalvo() {
  const modoEscuroAtivo = localStorage.getItem("modoEscuro") === "true";
  document.body.classList.toggle("dark-mode", modoEscuroAtivo);
}

// Função para alternar o modo e salvar no localStorage
function alternarModoEscuro() {
  const ativado = document.body.classList.toggle("dark-mode");
  localStorage.setItem("modoEscuro", ativado);
}
