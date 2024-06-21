const menuHamburguer = document.querySelector('.menuHamburguer')
const menuCart = document.querySelector('.menuCart')
let closeMenu = document.querySelector('.closeMenu')
let headerListMobile = document.querySelector('.headerListMobile')
let btnViewProduct = document.querySelectorAll('.btnViewProduct')
let closeWindow = document.querySelector('.closeWindow')
let btnAddToCart = document.querySelectorAll('.addToCart')


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

menuCart.addEventListener('click', () =>{
    let sectionMenuCart = document.querySelector('.sectionMenuCart')
    let cabecalhoCart = document.querySelector('.cabecalhoCart')
    let closeMenuCart = cabecalhoCart.querySelector('.closeMenu')
    document.body.style.overflowY = 'hidden'
    setTimeout(() => {
        sectionMenuCart.classList.add('onScreen')
    }, 300)

    closeMenuCart.addEventListener('click', () =>{
        closeCart()
    })

})

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
        document.body.style.overflowY = 'hidden'
        setTimeout(() => {
            floatWindow.style.opacity = '1'
        }, 500)
        let iResult = (i.target.parentElement.getAttribute('data-index'))
        console.log(iResult)
        let div = listProducts[iResult]
        console.log(div)

        imgProductFW.src = div.childNodes[1].src
        titleProductFW.innerHTML = div.childNodes[3].innerText
        priceProductFW.innerHTML = div.childNodes[5].innerText
        characteristicsProductFW.innerHTML = div.childNodes[7].innerHTML

        // btnAddToCart.forEach((btnElement) =>{
        //     btnElement.addEventListener('click', (onlyElement) =>{
        //         closeWindowFloat()
        //         let areaProductCart = document.querySelector('.areaProductCart').cloneNode(true)
        //         let areaCartItens = document.querySelector('.areaCartItens')
        //         let areaCartProducts = document.querySelector('.areaCartProducts')
        //         areaCartItens.style.display = 'none'

        //         if(areaCartItens.style.display == 'none'){
        //             document.querySelector('.seeProducts').style.display = 'none'
        //         } 

        //         console.log(titleProductFW)

        //         areaProductCart.querySelector('.imgProductCart').src = imgProductFW.src
        //         areaProductCart.querySelector('.nameAIP').innerHTML = titleProductFW.textContent
        //         areaProductCart.querySelector('.priceAIP').innerHTML = priceProductFW.textContent
        
        //         areaCartProducts.append(areaProductCart)
        //     })
        // })
        
    })

    closeWindow.addEventListener('click', () => {
        closeWindowFloat()
    })
})

btnAddToCart.forEach((btnElement) =>{
    const floatWindow = document.getElementById('floatWindow')
    let imgProductFW = floatWindow.querySelector('.imgProductFW')
    let titleProductFW = floatWindow.querySelector('.titleProductFW')
    let priceProductFW = floatWindow.querySelector('.priceProductFW')

    btnElement.addEventListener('click', (onlyElement) =>{
        closeWindowFloat()
        let areaProductCart = document.querySelector('.areaProductCart').cloneNode(true)
        let areaCartItens = document.querySelector('.areaCartItens')
        let areaCartProducts = document.querySelector('.areaCartProducts')
        areaCartItens.style.display = 'none'

        if(areaCartItens.style.display == 'none'){
            document.querySelector('.seeProducts').style.display = 'none'
        } 

        areaProductCart.querySelector('.imgProductCart').src = imgProductFW.src
        areaProductCart.querySelector('.nameAIP').innerHTML = titleProductFW.textContent
        areaProductCart.querySelector('.priceAIP').innerHTML = priceProductFW.textContent

        areaCartProducts.append(areaProductCart)
    })
})



function closeMenuMobile() {
    let menuMobile = document.querySelector('.menuMobile')
    menuMobile.classList.remove('onScreen')
    document.body.style.overflowY = 'scroll'
}

function closeCart() {
    let menuMobile = document.querySelector('.sectionMenuCart')
    menuMobile.classList.remove('onScreen')
    document.body.style.overflowY = 'scroll'
}

function closeWindowFloat() {
    const floatWindow = document.getElementById('floatWindow')
    document.body.style.overflowY = 'auto'

    floatWindow.style.opacity = '0'
    setTimeout(() => {
        floatWindow.style.display = 'none'
    }, 300)
}



