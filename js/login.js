const loginUser = document.getElementById('login')


loginUser.addEventListener('submit', (event) => {
  event.preventDefault()
  let user = document.getElementById('user').value
  sessionStorage.setItem('usuario', user)
  window.location.href = "../index.html"
})

