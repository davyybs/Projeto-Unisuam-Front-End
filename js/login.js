document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = document.querySelector(".loginBox.email");
  const senhaInput = document.querySelector(".loginBox.password");
  const submitBtn = document.querySelector(".submitBox");

  // Cria elementos de overlay de mensagem se não existirem
  let overlay = document.getElementById("overlayMensagem");
  let mensagem = document.getElementById("mensagem");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlayMensagem";
    overlay.className = "overlay-mensagem";
    mensagem = document.createElement("div");
    mensagem.id = "mensagem";
    mensagem.className = "mensagem";
    overlay.appendChild(mensagem);
    document.body.appendChild(overlay);
  }

  function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
    overlay.classList.add("show");
  }

  function esconderMensagem() {
    overlay.classList.remove("show");
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      esconderMensagem();
    }
  });

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    const dadosSalvos = JSON.parse(localStorage.getItem("cadastroUsuario"));

    if (!dadosSalvos) {
      mostrarMensagem("Nenhum usuário cadastrado encontrado.", "erro");
      return;
    }

    if (email === dadosSalvos.email && senha === dadosSalvos.senha) {
      mostrarMensagem("Login realizado com sucesso!", "sucesso");
      // Redirecionar para a página principal após o login
      setTimeout(() => {
        window.location.href = "index.html"; // ou a página desejada
      }, 2000);
    } else {
      mostrarMensagem("Email ou senha incorretos.", "erro");
    }
  });
});
