document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuario && usuario.nome) {
    const primeiroNome = usuario.nome.split(" ")[0];
    const navMenu = document.getElementById("navMenu");
    const usuarioLogado = document.getElementById("usuarioLogado");

    navMenu.style.display = "none";
    usuarioLogado.style.display = "flex";

    usuarioLogado.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${usuario.imagem || "Imagens/default-perfil.png"}"
             alt="Perfil"
             style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;" />
        <span style="color: var(--cor-texto-1); font-weight: 600;">${primeiroNome}</span>
        <button onclick="logout()" style="margin-left: 10px; padding: 6px 12px; border-radius: 8px; border: none; background: var(--cor-principal); color: white; cursor: pointer;">
          Sair
        </button>
      </div>
    `;
  }
});

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.reload();
}
