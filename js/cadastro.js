function formatarData(input) {
  let valor = input.value.replace(/\D/g, "");
  if (valor.length > 2) valor = valor.slice(0, 2) + "/" + valor.slice(2);
  if (valor.length > 5) valor = valor.slice(0, 5) + "/" + valor.slice(5, 9);
  input.value = valor;
}

 document.querySelectorAll("select.cadBox").forEach((select) => {
    select.addEventListener("change", function () {
      if (this.value !== "") {
        this.style.color = "var(--cor-input)";
      } else {
        this.style.color = "var(--cor-placeholder)";
      }
    });

    // inicializa a cor correta ao carregar
    if (select.value === "") {
      select.style.color = "var(--cor-placeholder)";
    } else {
      select.style.color = "var(--cor-input)";
    }
  });