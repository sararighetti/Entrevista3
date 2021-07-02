
window.onload = function (){ 

// Productos 
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
// variables
let carrito = [];
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMtotalProduct = document.querySelector('#totalProducts');

// start
addItemtoCart();
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
    cardPrice.textContent = 'Price: ' + info.price + '€';
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
/*** Dibuja en el carrito todos los productos selecionados */
function addItemtoCart() {
    // Vacio todo el html
    DOMcarrito.textContent = '';
    // Button Remove all products
    const DeleteAllButton = document.createElement('button');
    DeleteAllButton.classList.add('btn', 'btn-danger' , 'm-3')
    DeleteAllButton.textContent = 'Remove all Products';
    DeleteAllButton.addEventListener('click', deleteCart);  
    // Quito los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Genero los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
    // Obtenemos el item que necesitamos de la variable data
    const miItem = data.filter((itemData) => {
    // ¿Coincide las id? 
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
    cards.textContent = ` ${numeroUnidadesItem} x ${miItem[0].name} - ${miItem[0].price}€`;
    const imgCards= document.createElement('img');
    imgCards.classList.add('img', 'col-4', 'm-2');
    imgCards.setAttribute('src', miItem[0].img);
    imgCards.textContent =` ${miItem[0].img}`;
    // Boton Delete item desde el carrito
    const addRemoveItem = document.createElement('button');
    addRemoveItem.classList.add('btn', 'btn-secondary', 'm-4');
    addRemoveItem.textContent = 'Remove';
    addRemoveItem.style.marginLeft = '1rem';
    addRemoveItem.dataset.item = item;
    addRemoveItem.addEventListener('click', removeItem);   
    // Boton add Item desde el carrito
    const addItemButton = document.createElement('button');
    addItemButton.classList.add('btn', 'btn-secondary');
    addItemButton.textContent = 'Add';
    addItemButton.style.marginLeft = '1rem';
    addItemButton.setAttribute('marcador', item);
    addItemButton.addEventListener('click', addProductstoCart);          
    // Mezclamos nodos
    cards.appendChild(imgCards); 
    cards.appendChild(addRemoveItem);
    cards.appendChild(addItemButton);
    DOMcarrito.appendChild(cards);
    DOMcarrito.appendChild(DeleteAllButton);
});
}
//***Agregar producto al carrito desde la card de producto */
function addProductstoCart(evento){
    // add card to Cart
    carrito.push(evento.target.getAttribute('marcador'))
    // Calculo el total
    calcularTotal();
    // actualizar Cart
    addItemtoCart();
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
function removeItem(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    addItemtoCart();
    // Calculamos de nuevo el precio
    calcularTotal();
}
function deleteCart() {
    // Elimina todo los productos dal carrito
    carrito = [];
    addItemtoCart();
    calcularTotal();
}
}
