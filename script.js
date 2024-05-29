<<<<<<< HEAD
const { json } = require("body-parser")
=======
// $(document).ready(function(){
//     $('.menuButton').on('click', function(){
//         $('#menu').toggleClass('active')
//         $('.menuButton').toggleClass('fa-x')
//     })
// })
>>>>>>> parent of 1a49e78 (att 3)

const botaoMenu = document.querySelector('.menuButton')

botaoMenu.addEventListener('click', function(){
    let menu = document.getElementById('menu')
    menu.classList.toggle('active')
    botaoMenu.classList.toggle('fa-x')
<<<<<<< HEAD
    botaoMenu.style.transition = 'all ease-in 0.2s'
})

const categorias = document.getElementById('categorias')
const recommendedProducts = document.getElementById('recommendedProducts')

const api = fetch('.components/data/info.json') 
=======
})
>>>>>>> parent of 1a49e78 (att 3)
