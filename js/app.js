const stock = "./js/stock.json"  // URL del API
const container = document.getElementById('container')
const template = document.getElementById('template').content   // template de los productos del catalogo
const fragment = document.createDocumentFragment()





// limpiar el catalogo en cada busqueda
function limpiarCatalogo() {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

// cargar las ofertas al cargar la pagina 

window.onload = async function ofertas() {
  let data = []
  let response = await fetch(stock)
  let names = await response.json()
  data = names

  const ofertas = data.flatMap(item => [{ family: item.family, name: item.name, image: item.image, price: item.price, description: item.description }])
  const promos = ofertas.filter(item => item.price < 14500 && item.price > 8000)
  pintarCards(promos)

}


// filtrar con el select para elegir productos por categorias
async function filtro() {
  limpiarCatalogo()
  const product = document.getElementById('select')
  const filter = product.value;
  let data = []
  let response = await fetch(stock)
  let names = await response.json()
  data = names
  const selector = data.flatMap(item => [{ family: item.family, name: item.name, image: item.image, price: item.price, description: item.description }])
  if (filter) {

    const filterArray = selector.filter(item => item.family === filter)
    pintarCards(filterArray)
    dataCarro = filterArray
  }
}


// recojer los datos del form

const form = document.getElementById('form')



// buscar productos con el formulario

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  limpiarCatalogo()
  const input = document.getElementById('search').value.toLowerCase()
  let data = []

  if (input) {
    let response = await fetch(stock)
    let names = await response.json()
    data = names
    //console.log(data) //recorre el array cuando se busca algo en el input
  }

  const newArray = data.flatMap(item => [{ name: item.name.toLowerCase(), image: item.image, price: item.price, description: item.description }])
  const filterArray = newArray.filter(item => item.description.toLowerCase().includes(input))  // busca en la descripcion para renderizar el elemento
  datos = filterArray

  pintarCards(filterArray)

})


// crear las cards de los productos 
const pintarCards = data => {
  data.filter(product => {

    template.querySelector('h4').textContent = product.name
    template.querySelector('h5').textContent = product.description
    template.querySelector('p').textContent = `$ ${product.price}`
    template.querySelector('img').setAttribute("src", product.image)
    const clone = template.cloneNode(true);
    fragment.appendChild(clone)

  })
  container.appendChild(fragment)
}

// agregar productos al carrito


const btn = document.querySelectorAll('.bttn-carro')

const carro = []


function addCarro () {
  const nameProduct = template.querySelector('h4').textContent
  const imageProduct = template.querySelector('img').src
  const priceProduct = template.querySelector('p').textContent

  carro.push({"name": nameProduct, "image": imageProduct, "price": priceProduct })

  localStorage.setItem('BaseDeDatos', JSON.stringify(carro.flatMap(item => ({ name: item.name, image: item.image, price: item.price }))))
  
}

//crear lista del carrito



