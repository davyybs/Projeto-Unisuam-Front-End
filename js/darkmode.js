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

document.addEventListener("DOMContentLoaded", () => {
  aplicarModoSalvo();

  const botaoTema = document.getElementById("darkmode");
  botaoTema.addEventListener("click", alternarModoEscuro);
});
function aplicarModoSalvo() {
  const modoEscuroAtivo = localStorage.getItem("modoEscuro") === "true";
  document.body.classList.toggle("dark-mode", modoEscuroAtivo);
  trocarImagem(modoEscuroAtivo);
}
function alternarModoEscuro() {
  const ativado = document.body.classList.toggle("dark-mode");
  localStorage.setItem("modoEscuro", ativado);
  trocarImagem(ativado);
}
function trocarImagem(escuro) {
  const imagem = document.getElementById('imagemModo');
  if (imagem) {
    if (escuro) {
      imagem.src = 'imagens/smscelularesb.png';
    } else {
      imagem.src = 'imagens/smscelulares.png'; 
    }
  }
}
