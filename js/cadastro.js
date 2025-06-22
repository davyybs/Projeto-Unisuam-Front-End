// Formata a data no formato DD/MM/AAAA
function formatarData(input) {
  let valor = input.value.replace(/\D/g, "");
  if (valor.length > 2) valor = valor.slice(0, 2) + "/" + valor.slice(2);
  if (valor.length > 5) valor = valor.slice(0, 5) + "/" + valor.slice(5, 9);
  input.value = valor;
}

// Formata telefone no formato (+55)XX-XXXXXXXX ou (+55)XX-9XXXXXXXX
function formatarTelefone(input) {
  let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número

  // Remove o 55 inicial, se já tiver
  if (valor.startsWith("55")) {
    valor = valor.slice(2);
  }

  let ddd = valor.slice(0, 2);
  let numero = valor.slice(2);

  let telefoneFormatado = "(+55)";

  if (numero.length > 0) {
    telefoneFormatado += ddd + "-";

    if (numero.length > 8) {
      // Celular com 9 dígitos
      telefoneFormatado += numero.slice(0, 9);
    } else {
      // Fixo ou incompleto
      telefoneFormatado += numero.slice(0, 8);
    }
  } else if (ddd.length > 0) {
    telefoneFormatado += ddd;
  }

  input.value = telefoneFormatado.slice(0, 18); // Limita tamanho máximo
}

// Controla a cor dos selects conforme valor selecionado
document.querySelectorAll("select.cadBox").forEach((select) => {
  select.addEventListener("change", function () {
    if (this.value !== "") {
      this.style.color = "var(--cor-input)";
    } else {
      this.style.color = "var(--cor-placeholder)";
    }
  });

  // Inicializa a cor correta ao carregar
  if (select.value === "") {
    select.style.color = "var(--cor-placeholder)";
  } else {
    select.style.color = "var(--cor-input)";
  }
});

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

  const overlayMensagem = document.getElementById("overlayMensagem");
  const mensagemDiv = document.getElementById("mensagem");

  function mostrarMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = "mensagem " + tipo;
    overlayMensagem.classList.add("show");
  }

  function esconderMensagem() {
    overlayMensagem.classList.remove("show");
  }

  // Fecha a mensagem se clicar fora da caixa
  overlayMensagem.addEventListener("click", (e) => {
    if (e.target === overlayMensagem) {
      esconderMensagem();
    }
  });

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
    const celularRegex = /^\(\+55\)\d{2}-9\d{8}$/; // Celular 9 dígitos
    const fixoRegex = /^\(\+55\)\d{2}-\d{8}$/;     // Fixo 8 dígitos

    if (!celularRegex.test(telefoneCelular)) {
      erros.push("Telefone celular deve estar no formato (+55)XX-9XXXXXXXX.");
    }
    if (!fixoRegex.test(telefoneFixo)) {
      erros.push("Telefone fixo deve estar no formato (+55)XX-XXXXXXXX.");
    }

    // Validação do email (login) - 6 letras alfabéticas
    const loginRegex = /^[A-Za-z]{6}$/;
    if (!loginRegex.test(email)) {
      erros.push("O login (email) deve conter exatamente 6 letras alfabéticas.");
    }

    // Validação da senha - 8 letras alfabéticas
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
      mostrarMensagem("Cadastro feito com sucesso! Vá para o Login.", "sucesso");
      form.reset();

      // Opcional: resetar a cor dos selects ao limpar o form
      document.querySelectorAll("select.cadBox").forEach((select) => {
        select.style.color = "var(--cor-placeholder)";
      });
    }
  });
});
