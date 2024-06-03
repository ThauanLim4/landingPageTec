const sectionItens = document.getElementById('sectionItens')
const categories = document.querySelector('.categories')
const productsOfCategory = document.querySelector('.productsOfCategory')
const sectionProductsOfCategory = document.querySelector('.sectionProductsOfCategory')
const home = document.getElementById('home')
const recommendedProducts = document.getElementById('recommendedProducts')
const footer = document.getElementById('footer')

let itensOfCategory = document.querySelector('.itensOfCategory')
let linkItemCategoria = document.querySelectorAll('.linkItemCategoria')
let backToCategories = document.querySelector('.backToCategories')
let headerListItem = document.querySelectorAll('.headerListItem')
let headerList = document.querySelector('#headerList')


let observer = new IntersectionObserver((entries, observer) =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            console.log('o elemento '+entries+' está na tela')
        }
    })
}, {threshold: 0.1})

headerListItem.forEach((item, index) =>{
    item.addEventListener('',(i) =>{
        if(home){
            observer.observe(home)
            console.log(i)
        } 
        if (categories){
            observer.observe(categories)        
        } 
        if (recommendedProducts){
            observer.observe(recommendedProducts)
            
        } 
        if (footer) {
            observer.observe(footer)
        }
    
    })
    
    removeInView()
})




linkItemCategoria.forEach((item, index) => {
    item.addEventListener('click', (i) => {
        i.preventDefault()
        let valueAtribute = item.getAttribute('data-key')
        console.log(valueAtribute)

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


        console.log(returnValue)
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

function removeInView(){
    headerListItem.forEach(i =>{
        i.classList.remove('inView')
    })
}


