
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
cardsCarBody.classList.add('card-body');
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

// Insert the info
cardsCardBody.appendChild(cardImg);
cardsCardBody.appendChild(cardTitle);
cardsCardBody.appendChild(cardPrice);
cardsCardBody.appendChild(cardButton);
cards.appendChild(cardsCardBody);
DOMitems.appendChild(cards);
});
}

     /**
            * Dibuja todos los productos guardados en el carrito
            */
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
        })
    }
}
