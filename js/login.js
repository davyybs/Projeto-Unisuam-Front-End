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
      // Salvando nome e imagem (se quiser adicionar imagem depois)
      const usuarioLogado = {
        nome: dadosSalvos.nome,
        imagem: null // ou uma URL se tiver imagem de perfil
      };

      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

      mostrarMensagem("Login realizado com sucesso!", "sucesso");

      // Redireciona após pequeno delay
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      mostrarMensagem("Email ou senha incorretos.", "erro");
    }
  });
});
