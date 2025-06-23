document.addEventListener("DOMContentLoaded", function () {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const navMain = document.querySelector(".nav-main ul");
  const perfilContainer = document.getElementById("perfil-container");
  const perfilNome = document.getElementById("perfil-nome");
  const perfilImg = document.getElementById("perfil-img");
  const perfilBtn = document.getElementById("perfil-btn");
  const menuPerfil = document.getElementById("menu-perfil");
  const logoutBtn = document.getElementById("logout-btn");
  const menuMobile = document.querySelector(".menu-mobile nav ul");
  const nightModeImg = document.querySelector(".nightMode");

  function aplicarEstiloNightMode() {
    if (usuarioLogado && nightModeImg) {
      if (window.innerWidth >= 321 && window.innerWidth <= 576) {
        nightModeImg.style.marginRight = "-20px";
      } else {
        nightModeImg.style.marginRight = "";
      }
    }
  }

  if (usuarioLogado) {
    // Oculta apenas login e cadastro na versão desktop
    const desktopLinks = navMain.querySelectorAll("li");
    desktopLinks.forEach(link => {
      const texto = link.textContent.trim().toLowerCase();
      if (texto === "login" || texto === "cadastre-se") {
        link.style.display = "none";
      }
    });

    // Oculta login e cadastro no menu mobile
    const mobileLinks = menuMobile.querySelectorAll("a");
    mobileLinks.forEach(link => {
      const texto = link.textContent.trim().toLowerCase();
      if (texto === "login" || texto === "cadastre-se") {
        link.style.display = "none";
      }
    });

    // Adiciona perfil no menu mobile se ainda não existir
    if (!document.getElementById("perfil-mobile")) {
      const primeiroNome = usuarioLogado.nome.split(" ")[0];

      const perfilMobileLi = document.createElement("li");
      perfilMobileLi.id = "perfil-mobile";
      perfilMobileLi.style.color = "#ffffff";
      perfilMobileLi.style.fontWeight = "bold";
      perfilMobileLi.style.padding = "20px 8%";
      perfilMobileLi.style.textAlign = "right";
      perfilMobileLi.style.cursor = "pointer";
      perfilMobileLi.textContent = primeiroNome + " (Sair)";

      perfilMobileLi.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.reload();
      });

      menuMobile.appendChild(perfilMobileLi);
    }

    // Mostra botão com nome e imagem na versão desktop
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

    // Logout desktop
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      window.location.reload();
    });

    // Fecha menu se clicar fora
    document.addEventListener("click", function (e) {
      if (!perfilContainer.contains(e.target)) {
        menuPerfil.style.display = "none";
      }
    });

    aplicarEstiloNightMode();
    window.addEventListener("resize", aplicarEstiloNightMode);
  }
});
