let btnMenu = document.getElementById('btn-menu');
let menuMobile = document.getElementById('menu-mobile');
let fechar = document.getElementById('fechar')

btnMenu.addEventListener('click', ()=> {
    menuMobile.classList.add('abrir-menu')
})

fechar.addEventListener('click', ()=> {
    menuMobile.classList.remove('abrir-menu')
})

