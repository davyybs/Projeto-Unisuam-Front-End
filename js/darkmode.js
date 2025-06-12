const botaoTema = document.getElementById('darkmode');

botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});