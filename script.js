
window.onload = function (){ 

// Variables
data = [
    {
        id:1,
        name: "JUG",
        img: 'img/jugs.jpg',
        price: 24.99,
        description: "Pottery jugs"
    },
    {
        id:2,
        name: "BOWL",
        img: 'img/bowls.jpg',
        price: 30.99,
        description: "Pottery Bowls"
    }
    ,
    {
        id:3,
        name: "CUP",
        img: 'img/cups.jpg',
        price: 14.99,
        description: "Pottery Cups"
    }
    ,
    {
        id:4,
        name: "POT",
        img: 'img/pot.jpg',
        price: 7.99,
        description: "Flowerpot"
    }
]
let carrito = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMtotalProduct = document.querySelector('#totalProducts');
const DOMdeleteButton = document.querySelector('#boton-vaciar');


// start
addItmetoCart();
render_list_of_items();
calcularTotal();

// Functions

function render_list_of_items(){
    // dibuja los productos a partir de la base de datos
    data.forEach((info) => {
        // struttura
const cards = document.createElement('div');
cards.classList.add('card', 'col-sm-4', "m-2");
        // body
const cardsCardBody = document.createElement('div');
cardsCardBody.classList.add('card-body');
        //card title
const cardTitle = document.createElement('h5');
cardTitle.classList.add('card-title');
cardTitle.textContent = info.name;
        // Img
const cardImg = document.createElement('img');
cardImg.classList.add('img', 'col-12');
cardImg.setAttribute('src', info.img);
        // description
const cardDescription = document.createElement('p');
cardDescription.classList.add('card-text');
cardDescription.textContent = info.description;
        // price
const cardPrice = document.createElement('p');
cardPrice.classList.add('card-text');
cardPrice.textContent = info.price + '€';
        //Button
const cardButton = document.createElement('button');
cardButton.classList.add('btn', 'btn-secondary');
cardButton.textContent = '+ ADD TO CART';
cardButton.setAttribute('marcador', info.id);
cardButton.addEventListener('click', addProductstoCart);

// Insert the info
cardsCardBody.appendChild(cardImg);
cardsCardBody.appendChild(cardTitle);
cardsCardBody.appendChild(cardDescription);
cardsCardBody.appendChild(cardPrice);
cardsCardBody.appendChild(cardButton);
cards.appendChild(cardsCardBody);
DOMitems.appendChild(cards);
});
}

/*** Dibuja todos los productos guardados en el carrito */
      function addItmetoCart() {
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
              // Boton Delete
              const addItem = document.createElement('button');
              addItem.classList.add('btn', 'btn-danger');
              addItem.textContent = 'delete';
              addItem.style.marginLeft = '2rem';
              addItem.dataset.item = item;
              addItem.addEventListener('click', deleteItemCart);
              // Mezclamos nodos
              cards.appendChild(addItem);
              DOMcarrito.appendChild(cards);
        });
    }
//***Event to add producto al carrito */
function addProductstoCart(evento){
// add card to Cart
carrito.push(evento.target.getAttribute('marcador'))
// Calculo el total
calcularTotal();
// actualizar Cart
addItmetoCart();

}

function calcularTotal(){
    totalPrice = 0;
    totalProducts = 0;
    carrito.forEach((item)=>{
        const miItem = data.filter((itemData)=>{
            return itemData.id === parseInt(item);
        });
        totalPrice = totalPrice + miItem[0].price;
        totalProducts = totalProducts + 1;
    });
    DOMtotal.textContent = totalPrice.toFixed(2);
    DOMtotalProduct.textContent = totalProducts;
}
function deleteItemCart(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    addItmetoCart();
    // Calculamos de nuevo el precio
    calcularTotal();
}

function deleteCart() {
    // Limpiamos los productos guardados
    carrito = [];
    addItmetoCart();
    calcularTotal();
}
// Evento 
DOMdeleteButton.addEventListener('click', deleteCart);
}
