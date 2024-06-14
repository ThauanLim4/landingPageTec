const menuHamburguer = document.querySelector('.menuHamburguer')
let closeMenu = document.querySelector('.closeMenu')
let headerListMobile = document.querySelector('.headerListMobile')
let btnViewProduct = document.querySelectorAll('.btnViewProduct')
let closeWindow = document.querySelector('.closeWindow')


menuHamburguer.addEventListener('click', () => {
    let menuMobile = document.querySelector('.menuMobile')
    document.body.style.overflowY = 'hidden'
    setTimeout(() => {
        menuMobile.classList.add('onScreen')
    }, 300)

    closeMenu.addEventListener('click', () => {
        closeMenuMobile()
    })

    headerListMobile.querySelectorAll('.headerListItem').forEach((headerListItem) => {
        headerListItem.addEventListener('click', () => {
            closeMenuMobile()
        })
    })
})

function closeMenuMobile() {
    let menuMobile = document.querySelector('.menuMobile')
    menuMobile.classList.remove('onScreen')
    document.body.style.overflowY = 'scroll'
}

function closeWindowFloat() {
    const floatWindow = document.getElementById('floatWindow')
    floatWindow.style.opacity = '0'
    setTimeout(() => {
        floatWindow.style.display = 'none'
    }, 300)
}

function openFloatWindow() {
    btnViewProduct.forEach(item => {
        const floatWindow = document.getElementById('floatWindow')
        let imgProductFW = document.querySelector('.imgProductFW')
        let titleProductFW = document.querySelector('.titleProductFW')
        let priceProductFW = document.querySelector('.priceProductFW')
        let descriptionProductFW = document.querySelector('.descriptionProductFW')
        let characteristicsProductFW = document.querySelector('.characteristicsProductFW')

        item.addEventListener('click', (i) => {
            i.preventDefault()
            floatWindow.style.display = 'block'
            setTimeout(() => {
                floatWindow.style.opacity = '1'
            }, 500)
            let iResult = (i.target.parentElement.getAttribute('data-index'))
            console.log(iResult)
            let div = listProducts[iResult]
            console.log(div)

            imgProductFW.src = div.childNodes[1].src
            titleProductFW.innerHTML = div.childNodes[3].innerHTML
            priceProductFW.innerHTML = div.childNodes[5].innerHTML
            characteristicsProductFW.innerHTML = div.childNodes[7].innerHTML
        })

        closeWindow.addEventListener('click', () => {
            closeWindowFloat()
        })
    })
}


openFloatWindow()
