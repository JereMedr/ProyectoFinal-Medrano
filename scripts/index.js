// el objeto Moneda de moneda.js
class Moneda {
    constructor(name, description, price,cantidad) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.cantidad = cantidad;
    }
}
const monedaCarrito = document.getElementById('productos-carrito');
const totalCarrito = document.getElementById('total-carrito');
let monedas = [];
let total = 0;
loadMonedasFromJson();
llenarListaMonedas();
dibujarCarritoDOM();
dibujarTotalDOM();
function dibujarCarritoDOM(){
monedas.map((moneda) => {
    monedaCarrito.innerHTML += `
    <div class="item-cart"  id="${moneda.name}-id">
    <img src="./assets/img/${moneda.name}.png" class="cart-cripto__img" alt="${moneda.name}">
    <div>
        <h4>${moneda.name}</h4>
    <p>
        ${moneda.description}
    </p>
    <p class="text-center">
        Valor en pesos: $${moneda.price}
    </p>
    </div>
    <button class="btn btn-danger" onclick="quitarMoneda('${moneda.name}')">Vender</button>
    <p class='cantidad' id="${moneda.name}-cantidad-id">${moneda.cantidad}</p>
    <button class="btn btn-success" onclick="comprarMoneda('${moneda.name}')">Comprar</button>
</div>`
});
}

function dibujarTotalDOM(){
        totalCarrito.innerHTML += `
        <div class="d-flex justify-content-center" >
        <p>Total en pesos gastados :${total}</p>
    </div>
    <div class="d-flex justify-content-center">     
    <a href="./advertencia.html">
        <button class="card-cripto__button">Confirmar Compra</button>
    </a>
    </div>
    `
    }
// lee el archivo data.json y los agrega a localStorage
function loadMonedasFromJson(){
    const xhttp = new XMLHttpRequest();
xhttp.open("GET", 'data.json', true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        for (let i = 0; i < data.length; i++) {
            let moneda = new Moneda(data[i].name, data[i].description, data[i].price, data[i].cantidad);
            let monedaString = JSON.stringify(moneda);
            localStorage.setItem(data[i].name, monedaString);
        }
    }
}
}
// lee el localStorage y los agrega a la lista de monedas
function llenarListaMonedas(){
    for (let i = 0; i < localStorage.length; i++) {
        let monedaString = localStorage.getItem(localStorage.key(i));
        let monedaObject = JSON.parse(monedaString);
        monedas.push(monedaObject);
    }
    console.log(monedas);
}

function comprarMoneda(moneda){
    for(m of monedas){
        if(m.name == moneda){
            m.cantidad = m.cantidad + 1;
        }
    }
    calcularTotal();
    console.log(monedas);
    actualizarDOM();
}

function quitarMoneda(moneda){
    for(m of monedas){
        if(m.name == moneda && m.cantidad > 0){
            m.cantidad = m.cantidad - 1;
        }
    }
    calcularTotal();
    console.log(monedas);
    actualizarDOM();
}

function actualizarDOM(){
    monedaCarrito.innerHTML = '';
    dibujarCarritoDOM();
    totalCarrito.innerHTML = '';
    dibujarTotalDOM();
}

//en funcion de la cantidad de monedas, calcula el total y lo muestra en el DOM
function calcularTotal(){
    parcial = 0;
    auxiliar = 0;
    for(m of monedas){
        auxiliar = m.cantidad * m.price;
        parcial = parcial + auxiliar;
    }
    total = parcial;
}