
window.onload = function (){ 

// Variables
data = [
    {
        id:1,
        name: "JUG",
        img: 'src="img/jugs.jpg" alt="jug"',
        price: 24.99,
        description: "Pottery jugs"
    },
    {
        id:2,
        name: "BOWL",
        img: 'src="img/bowls.jpg" alt="bowls"',
        price: 30.99,
        description: "Pottery Bowls"
    }
    ,
    {
        id:3,
        name: "BOWL",
        img: 'src="img/bowls.jpg" alt="bowls"',
        price: 30.99,
        description: "Pottery Bowls"
    }
]
let carrito = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;

// start
renderizarCarrito();
renderizarProductos();

// Functions

function renderizarProductos(){
    // dibuja los productos a partir de la base de datos
    data.forEach((info) => {
        // struttura
const cards = document.createElement('div');
cards.classList.add('card', 'col-sm-4');
        // body
const cardsCardBody = document.createElement('div');
cardsCardBody.classList.add('card-body');
        //card title
const cardTitle = document.createElement('h5');
cardTitle.classList.add('card-title');
cardTitle.textContent = info.name;
        // Img
const cardImg = document.createElement('img');
cardImg.classList.add('img');
cardImg.setAttribute('src', info.img);
        // price
const cardPrice = document.createElement('p');
cardPrice.classList.add('card-text');
cardPrice.textContent = info.price + '€';
        //Button
const cardButton = document.createElement('button');
cardButton.classList.add('btn', 'btn-secondary');
cardButton.textContent = '+';
cardButton.setAttribute('marcador', info.id);
cardButton.addEventListener('click', addProductstoCart);

// Insert the info
cardsCardBody.appendChild(cardImg);
cardsCardBody.appendChild(cardTitle);
cardsCardBody.appendChild(cardPrice);
cardsCardBody.appendChild(cardButton);
cards.appendChild(cardsCardBody);
DOMitems.appendChild(cards);
});
}

/*** Dibuja todos los productos guardados en el carrito */
      function renderizarCarrito() {
        // Vacio todo el html
        DOMcarrito.textContent = '';
        // Quito los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable data
            const miItem = data.filter((itemData) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemData.id === parseInt(item);
            });
              // Cuenta el número de veces que se repite el producto
              const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
             // Creamos el nodo del item del carrito
             const cards = document.createElement('li');
             cards.classList.add('list-group-item', 'text-right', 'mx-2');
             cards.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - ${miItem[0].price}€`;
        })
    }
//***Event to add producto al carrito */
function addProductstoCart(evento){
// add card to Cart
carrito.push(evento.target.getAttribute('marcador'))
// Calculo el total
calcularTotal();
// actualizar Cart
renderizarCart();
// actualizar LocalStorage
guardarCartEnLocalStorage();
}

function calcularTotal(){
    total = 0;
    carrito.forEach((item)=>{
        const miItem = data.filter((itemData)=>{
            return itemData.id === parseInt(item);
        });
        total = total + miItem[0].price;
    });
    DOMtotal.textContent = total.toFixed(2);
}
function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function guardarCartEnLocalStorage() {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}
}
