const menuHamburguer = document.querySelector('.menuHamburguer')
let closeMenu = document.querySelector('.closeMenu')
let headerListMobile = document.querySelector('.headerListMobile')

menuHamburguer.addEventListener('click', () =>{
    let menuMobile = document.querySelector('.menuMobile')
    document.body.style.overflowY = 'hidden'
    setTimeout(() =>{
        menuMobile.classList.add('onScreen')
    }, 300)

    closeMenu.addEventListener('click', () =>{
        closeMenuMobile()
    })

    headerListMobile.querySelectorAll('.headerListItem').forEach((headerListItem) =>{
        headerListItem.addEventListener('click', () =>{
            closeMenuMobile()
        })
    })
})

function closeMenuMobile(){
    let menuMobile = document.querySelector('.menuMobile')
    menuMobile.classList.remove('onScreen')
    document.body.style.overflowY = 'scroll'

}


