const home = document.getElementById('home')
const categories = document.getElementById('categories')
const sectionItens = document.getElementById('sectionItens')
const sectionProductsOfCategory = document.querySelector('#sectionProductsOfCategory')
const productsOfCategory = document.querySelector('.productsOfCategory')
const allProducts = document.getElementById('sectionAllProducts')
const areaProducts = document.querySelector('.areaProducts')

const recommendedProducts = document.getElementById('recommendedProducts')
const footer = document.getElementById('footer')

let itensOfCategory = document.querySelector('.itensOfCategory')
let linkItemCategoria = document.querySelectorAll('.linkItemCategoria')
let backToCategories = document.querySelector('.backToCategories')
let headerListItem = document.querySelectorAll('.headerListItem')
let headerList = document.querySelector('.headerList')


let observer = new IntersectionObserver((entries, observer) => {
    if (entries.some(entry => entry.isIntersecting)) {
        let element = entries[0].target.id
        headerList.querySelector(`.${element}`).classList.add('inView')
    } else {
        removeInView()
    }
}, { threshold: 0.5,})

observer.observe(home)
observer.observe(categories)
// observer.observe(recommendedProducts)
observer.observe(footer)


linkItemCategoria.forEach((item, index) => {
    item.addEventListener('click', (i) => {
        i.preventDefault()
        let valueAtribute = item.getAttribute('data-key')

        let returnValue = hardwares.filter((element) => element.indexOf(valueAtribute))
        let selectedCategory = hardwares[valueAtribute]

        categories.classList.add('hidden')
        setTimeout(() => {
            categories.style.display = 'none'
            productsOfCategory.style.transform = 'translateX(0%)'
            sectionProductsOfCategory.style.transform = 'translateX(0%)'
        }, 1000)
        sectionProductsOfCategory.style.display = 'flex'
        productsOfCategory.style.display = 'grid'

        selectedCategory.map((product, index) => {
            let indentifierCategory = document.querySelector('.indentifierCategory')
            let itemProduct = document.querySelector('.model .itemProductCategory').cloneNode(true)

            itemProduct.setAttribute('data-index', index)
            itemProduct.querySelector('.imgCategory').setAttribute('src', `${product.img}`)
            itemProduct.querySelector('.titleCategory').innerHTML = product.name
            itemProduct.querySelector('.priceCategory').innerHTML = `R$ ${product.price.toFixed(2)}`

            productsOfCategory.append(itemProduct)

            switch (valueAtribute) {
                case '0':
                    indentifierCategory.innerHTML = 'placa de vídeo'
                    console.log('ok')
                    break;

                case '1':
                    indentifierCategory.innerHTML = 'processador'
                    console.log('ok')
                    break;

                case '2':
                    indentifierCategory.innerHTML = 'placa mãe'
                    console.log('ok')
                    break;

                case '3':
                    indentifierCategory.innerHTML = 'armazenamento'
                    console.log('ok')
                    break;

                case '4':
                    indentifierCategory.innerHTML = 'gabinete'
                    console.log('ok')
                    break;

                case '5':
                    indentifierCategory.innerHTML = 'fonte de alimentação'
                    console.log('ok')
                    break;

                case '6':
                    indentifierCategory.innerHTML = 'monitor'
                    console.log('ok')
                    break;

                case '7':
                    indentifierCategory.innerHTML = 'som'
                    console.log('ok')
                    break;

                case '8':
                    indentifierCategory.innerHTML = 'perífericos'
                    console.log('ok')
                    break;
            }

            backToCategories.addEventListener('click', returnToCategories)


        })
    })
})

function returnToCategories() {
    categories.classList.remove('hidden')
    productsOfCategory.style.transform = 'translateX(-200%)'
    sectionProductsOfCategory.style.transform = 'translateX(-200%)'

    setTimeout(() => {
        categories.style.display = 'flex'
        sectionProductsOfCategory.style.display = 'none'
        productsOfCategory.style.display = 'none'
        productsOfCategory.innerHTML = ''
    }, 1000)
}

function removeInView() {
    headerListItem.forEach(i => {
        i.classList.remove('inView')
    })
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let allProductsList = []
hardwares.forEach(products => {
    allProductsList = allProductsList.concat(products)
})

shuffle(allProductsList)

let listProducts = []

allProductsList.map((product, index) => {
    let itemProduct = document.querySelector('.model .itemProductAll').cloneNode(true)

    itemProduct.setAttribute('data-index', index)
    itemProduct.querySelector('.imgCategory').setAttribute('src', `${product.img}`)
    itemProduct.querySelector('.titleCategory').innerHTML = product.name
    itemProduct.querySelector('.priceCategory').innerHTML = `R$ ${product.price.toFixed(2)}`
    itemProduct.querySelector('.characteristicsCategory').innerHTML = product.characteristics

    areaProducts.append(itemProduct)
    listProducts.push(itemProduct)
})

console.log(listProducts)