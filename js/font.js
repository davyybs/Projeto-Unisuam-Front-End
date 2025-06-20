let tamanhoFonteAtual = 16;

function alterarFonte(delta) {
  tamanhoFonteAtual += delta;
  if (tamanhoFonteAtual < 10) tamanhoFonteAtual = 10;
  if (tamanhoFonteAtual > 30) tamanhoFonteAtual = 30;
  document.body.style.fontSize = tamanhoFonteAtual + "px";
}

function resetarFonte() {
  tamanhoFonteAtual = 16;
  document.body.style.fontSize = tamanhoFonteAtual + "px";
}

function toggleControles() {
  const controles = document.getElementById("mnr-fonte");
  if (controles.style.display === "none") {
    controles.style.display = "block";
  } else {
    controles.style.display = "none";
  }
}
