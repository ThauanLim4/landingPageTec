const menuHamburguer = document.querySelector('.menuHamburguer')
const menuCart = document.querySelector('.menuCart')
const sectionMenuCart = document.querySelector('.sectionMenuCart')
let closeMenu = document.querySelector('.closeMenu')
let headerListMobile = document.querySelector('.headerListMobile')
let btnViewProduct = document.querySelectorAll('.btnViewProduct')
let closeWindow = document.querySelector('.closeWindow')
let btnAddToCart = document.querySelectorAll('.addToCart')
let areaCartProducts = document.querySelector('.areaCartProducts')


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

menuCart.addEventListener('click', () => {
    let sectionMenuCart = document.querySelector('.sectionMenuCart')
    let cabecalhoCart = document.querySelector('.cabecalhoCart')
    let closeMenuCart = cabecalhoCart.querySelector('.closeMenu')
    document.body.style.overflowY = 'hidden'
    setTimeout(() => {
        sectionMenuCart.classList.add('onScreen')
    }, 300)

    closeMenuCart.addEventListener('click', () => {
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
        let buyProductFW = floatWindow.querySelector('.buyProductFW')
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

        buyProductFW.addEventListener('click', () => {
            let productPurchased = document.querySelector('.productPurchased')

            let descProductsPurchased = document.querySelector('.descProductsPurchased span')
        
            closeWindowFloat()
            productPurchased.style.display = 'flex'
            setTimeout(() => {
                productPurchased.style.opacity = 1
            }, 500)
            descProductsPurchased.innerHTML = titleProductFW.textContent

            setTimeout(() => {
                productPurchased.style.opacity = 0
                setTimeout(() => {
                    productPurchased.style.display = 'none'
                }, 1000)
            }, 4000)
            console.log('ta funfando')
        })
    })

    closeWindow.addEventListener('click', () => {
        closeWindowFloat()
    })
})

btnAddToCart.forEach((btnElement) => {
    const floatWindow = document.getElementById('floatWindow')
    let imgProductFW = floatWindow.querySelector('.imgProductFW')
    let titleProductFW = floatWindow.querySelector('.titleProductFW')
    let priceProductFW = floatWindow.querySelector('.priceProductFW')
    let buyProduct = sectionMenuCart.querySelector('.buyProduct')
    let productPurchased = document.querySelector('.productPurchased')
    let descProductsPurchased = document.querySelector('.descProductsPurchased span')


    btnElement.addEventListener('click', (onlyElement) => {
        closeWindowFloat()
        let areaProductFW = document.querySelector('.areaProductFW')
        let areaProductCart = document.querySelector('.areaProductCart').cloneNode(true)
        let areaCartItens = document.querySelector('.areaCartItens')
        let areaCartProducts = document.querySelector('.areaCartProducts')
        let less = areaProductCart.querySelectorAll('.less')
        let more = areaProductCart.querySelectorAll('.more')
        let quant = areaProductCart.querySelector('.quant')
        let removeItemMob = areaProductCart.querySelectorAll('.removeItem')

        let qtItens = 1


        areaCartItens.style.display = 'none'

        if (areaCartItens.style.display == 'none') {
            document.querySelector('.seeProducts').style.display = 'none'
        }

        areaProductCart.querySelector('.imgProductCart').src = imgProductFW.src
        areaProductCart.querySelector('.nameAIP').innerHTML = titleProductFW.textContent
        areaProductCart.querySelector('.priceAIP').innerHTML = priceProductFW.textContent
        quant.innerHTML = qtItens

        areaCartProducts.append(areaProductCart)
        console.log(areaCartProducts)

        less.forEach(lessEle => {
            lessEle.addEventListener('click', () => {
                if (qtItens > 1) {
                    qtItens--
                    quant.innerHTML = qtItens
                    console.log(qtItens)
                }
            })
        })

        more.forEach(moreEle => {
            moreEle.addEventListener('click', () => {
                setTimeout(() => {
                    qtItens++
                    quant.innerHTML = qtItens
                    console.log(qtItens)
                }, 500);

            })

        })

        removeItemMob.forEach(removeMobEle => {
            removeMobEle.addEventListener('click', () => {
                console.log('tá funcionando')
                areaProductCart.remove()
            })
        })

        buyProduct.addEventListener('click', () => {
            if (areaCartProducts != '') {
                closeCart()
                productPurchased.style.display = 'flex'
                setTimeout(() => {
                    productPurchased.style.opacity = 1
                }, 500)
                descProductsPurchased.innerHTML = areaCartProducts.children.length

                setTimeout(() => {
                    areaCartProducts.innerHTML = ''
                    productPurchased.style.opacity = 0
                    setTimeout(() => {
                        productPurchased.style.display = 'none'
                    }, 1000)
                }, 4000)


                console.log('ta liberado')
            }
        })
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



