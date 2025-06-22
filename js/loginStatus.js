document.addEventListener("DOMContentLoaded", function () {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const navMain = document.querySelector(".nav-main ul");
  const perfilContainer = document.getElementById("perfil-container");
  const perfilNome = document.getElementById("perfil-nome");
  const perfilImg = document.getElementById("perfil-img");
  const perfilBtn = document.getElementById("perfil-btn");
  const menuPerfil = document.getElementById("menu-perfil");
  const logoutBtn = document.getElementById("logout-btn");

  if (usuarioLogado) {
    // Oculta botões de login e cadastro
    navMain.innerHTML = "";

    // Mostra botão com nome e imagem
    const primeiroNome = usuarioLogado.nome.split(" ")[0];
    perfilNome.textContent = primeiroNome;
    if (usuarioLogado.imagem) {
      perfilImg.src = usuarioLogado.imagem;
    }

    perfilContainer.style.display = "block";

    // Toggle do menu de perfil
    perfilBtn.addEventListener("click", () => {
      menuPerfil.style.display = menuPerfil.style.display === "block" ? "none" : "block";
    });

    // Logout
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      window.location.reload(); // ou redirecionar
    });

    // Fecha menu se clicar fora
    document.addEventListener("click", function (e) {
      if (!perfilContainer.contains(e.target)) {
        menuPerfil.style.display = "none";
      }
    });
  }
});
