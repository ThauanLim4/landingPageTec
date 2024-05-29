const sectionItens = document.getElementById('sectionItens')

placasDeVideo.map((item, index) =>{
    let itemCategoria = document.querySelector('.model .itemCategoria').cloneNode(true)

    itemCategoria.setAttribute('data-index', index)
    itemCategoria.querySelector('.imgItemCategoria').src = item.id
    itemCategoria.querySelector('.titleItemCategoria').innerHTML = item.name
    itemCategoria.querySelector('.priceItem').innerHTML = item.price

    sectionItens.prepend(itemCategoria)
})