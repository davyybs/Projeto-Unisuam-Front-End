document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = document.querySelectorAll(".cadBox");
  const nomeInput = inputs[0];
  const telefoneCelularInput = inputs[5];
  const emailInput = inputs[6];
  const telefoneFixoInput = inputs[7];
  const senhaInput = inputs[8];
  const confirmarSenhaInput = inputs[9];
  const submitBtn = document.querySelector(".submitBoxCad");
  const mensagemDiv = document.getElementById("mensagem");

  function mostrarMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = "mensagem " + tipo;
  }

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const telefoneCelular = telefoneCelularInput.value.trim();
    const email = emailInput.value.trim();
    const telefoneFixo = telefoneFixoInput.value.trim();
    const senha = senhaInput.value.trim();
    const confirmarSenha = confirmarSenhaInput.value.trim();

    const erros = [];

    // Verificar campos vazios
    let camposVazios = false;
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        camposVazios = true;
      }
    });

    if (camposVazios) {
      erros.push("Preencha todos os campos antes de continuar.");
    }

    // Validação do nome
    if (nome.length < 15 || nome.length > 60) {
      erros.push("O nome deve ter entre 15 e 60 caracteres.");
    }

    // Validação dos telefones
    const telefoneRegex = /^\(\+55\)\d{2}-\d{8}$/;
    if (!telefoneRegex.test(telefoneCelular)) {
      erros.push("Telefone celular deve estar no formato (+55)XX-XXXXXXXX.");
    }
    if (!telefoneRegex.test(telefoneFixo)) {
      erros.push("Telefone fixo deve estar no formato (+55)XX-XXXXXXXX.");
    }

    // Validação do email (login)
    const loginRegex = /^[A-Za-z]{6}$/;
    if (!loginRegex.test(email)) {
      erros.push(
        "O login (email) deve conter exatamente 6 letras alfabéticas."
      );
    }

    // Validação da senha
    const senhaRegex = /^[A-Za-z]{8}$/;
    if (!senhaRegex.test(senha)) {
      erros.push("A senha deve conter exatamente 8 letras alfabéticas.");
    }

    // Confirmação de senha
    if (senha !== confirmarSenha) {
      erros.push("As senhas não coincidem.");
    }

    // Mostrar erros ou sucesso
    if (erros.length > 0) {
      mostrarMensagem(erros.join("\n"), "erro");
    } else {
      const dadosCadastro = {
        nome,
        telefoneCelular,
        email,
        telefoneFixo,
        senha,
      };

      localStorage.setItem("cadastroUsuario", JSON.stringify(dadosCadastro));
      mostrarMensagem("Cadastro salvo com sucesso no localStorage!", "sucesso");
      form.reset();
    }
  });
});
