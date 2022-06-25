const stock = "./js/stock.json"  // URL del API
const container = document.getElementById('container')
const hayOfertas = document.getElementById('titulo-ofertas')
const template = document.getElementById('template').content   // template de los productos del catalogo
const fragment = document.createDocumentFragment()
const userName = document.getElementById('userName')
let newUser = sessionStorage.getItem("usuario")



// limpiar el catalogo en cada busqueda
function limpiarCatalogo() {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

// cargar las ofertas al cargar la pagina 

window.onload = async function ofertas() {
  const loginUser = document.getElementById('login')
  if (newUser) {
    userName.innerText = `Bienvenido, ${newUser}`;
    loginUser.style.display = "none";

  }



  let data = []
  let response = await fetch(stock)
  let names = await response.json()
  data = names

  const ofertas = data.flatMap(item => [{ family: item.family, name: item.name, image: item.image, price: item.price, description: item.description, id: item.id }])
  const promos = ofertas.filter(item => item.price < 14500 && item.price > 8000)
  const textTittle = document.createElement('h2') //agregar un titulo de ofertas
  textTittle.classList.add('h3-ofertas')
  textTittle.appendChild(document.createTextNode('Ofertas Especiales'))
  hayOfertas.appendChild(textTittle)

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
  const selector = data.flatMap(item => [{ family: item.family, name: item.name, image: item.image, price: item.price, description: item.description, id: item.id }])
  if (filter) {

    const filterArray = selector.filter(item => item.family === filter)
    pintarCards(filterArray)
    hayOfertas.removeChild(hayOfertas.firstChild)

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


  const newArray = data.flatMap(item => [{ name: item.name.toLowerCase(), image: item.image, price: item.price, description: item.description, id: item.id }])
  const filterArray = newArray.filter(item => item.description.toLowerCase().includes(input))  // busca en la descripcion para renderizar el elemento
  datos = filterArray

  pintarCards(filterArray)

})


// crear las cards de los productos 
const pintarCards = data => {
  data.filter(product => {

    template.querySelector('h4').textContent = product.name
    template.querySelector('h5').textContent = product.description
    template.querySelector('p').textContent = product.price
    template.querySelector('img').setAttribute("src", product.image)
    template.querySelector('.bttn-carro').dataset.id = product.id // obtener la id del producto
    const clone = template.cloneNode(true);
    fragment.appendChild(clone)

  })
  container.appendChild(fragment)
}


container.addEventListener("click", (e) => {
  addCarro(e)
})
// agregar productos al carrito


/*const btn = document.querySelector("btn-carro")*/

const carro = []
const cantidadCarro = document.getElementById('carro-cantidad')
const totalItems = document.getElementById('totalItems')

// cuenta la cantidad total de productos en el carro, y la imprime en el carrito

const countCarro = () => {
  let totalCarro = carro.length

  totalItems.innerText = totalCarro.toString()
  console.log(totalCarro)
}

// sumar los precios de los productos

const totalPrice = () => {
  let totalCompra = 0

  for (let item in carro) {
    totalCompra += carro[item].price * 1
  }

  console.log(totalCompra)
}

const addCarro = e => {



  if (e.target.classList.contains('bttn-carro')) {
    cargarCarro(e.target.parentElement)
  }
  e.stopPropagation()
}

const cargarCarro = item => {
  console.log(item)
  const carrito = {
    id: item.querySelector('.bttn-carro').dataset.id,
    name: item.querySelector('h4').textContent,
    price: item.querySelector('p').textContent,
    img: item.querySelector('img').src,

  }

  carro.push(carrito)
  console.log(carro)
  countCarro()
  totalPrice()
  localStorage.setItem('baseDeDatos', JSON.stringify(carro))
}
