
const contenedorCarro = document.getElementById('container-carro')
const fragmento = document.createDocumentFragment()

window.addEventListener('load', () => {  
    const contenedor = document.getElementById('contenedor')
    const div = document.createElement('div')
    const data = JSON.parse(localStorage.getItem('baseDeDatos'))

   data && data.map(item => {
        const h4 = document.createElement('h4')
        const img = document.createElement('img')
        const h6 = document.createElement('h6')
        h4.appendChild(document.createTextNode(item.name))
        h6.appendChild(document.createTextNode(item.price))
        img.src = item.image
        div.appendChild(h4)
        div.appendChild(h6)
        div.appendChild(img)
        contenedor.appendChild(div)
    })
})