
const contenedorCarro = document.getElementById('container-carro')
const contenedor = document.getElementById('contenedor')
const data = JSON.parse(localStorage.getItem('baseDeDatos'))
const templateCarro = document.getElementById('renderCarro').content
const fragmento = document.createDocumentFragment()
const valorTotal = document.getElementById('totalCompra')

window.addEventListener('load', () => {  
    const carrito = data.filter(item => [{ id: item.id, name: item.name, image: item.image, price: item.price}])
        console.log(carrito)
        imprimirCarro(carrito)
    })

// crear la carta de cada producto en el carrito
const imprimirCarro = data => {
    data.map(product => {
      templateCarro.querySelector('.btn-sm').dataset.id=product.id // otorgarle el id al boton
      templateCarro.querySelector('h4').textContent = product.name
      templateCarro.querySelector('p').textContent = `$ ${product.price}`
      const clonar = templateCarro.cloneNode(true);
      fragmento.appendChild(clonar)
  
    })
    contenedorCarro.appendChild(fragmento)
  }

  // sumar los precios de los productos

const totalCompraCarro = () => {
    let totalCompra = 0
  
    for(let item in data){
      totalCompra += data[item].price * 1
    }
    
    valorTotal.innerHTML = `Total: $ ${totalCompra}`
    console.log(totalCompra)
  } 

  totalCompraCarro()

  const finalizarPedido = () => {
    localStorage.removeItem('baseDeDatos')
    window.location.href = "../index.html"
  }

  



  // borrar productos del carrito 
  const quitarCarro = () => {
    let bttn = document.querySelector('.btn-sm').dataset.id  // obtener la id del boton
    console.log(bttn)
  
      
     const quitar = data.filter(item => item.id === bttn)
     data.shift(quitar)  //quitar elemento del array del carrito
    localStorage.setItem('baseDeDatos', JSON.stringify(data)) //modificar el localStorage
    location.reload()  //recargar La pagina con el nuevo array para renderizar el carrito
  }
  

  
  