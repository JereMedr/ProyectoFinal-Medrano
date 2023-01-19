// el objeto Moneda de moneda.js
class Moneda {
    constructor(name, description, price, cantidad) {
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
llenarListaMonedas();
dibujarTotalDOM();

function dibujarCarritoDOM() {
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

function dibujarTotalDOM() {
    totalCarrito.innerHTML += `
        <div class="d-flex justify-content-center" >
        <p>Total en pesos gastados :${localStorage.getItem('total')}</p>
    </div>
    <div class="d-flex justify-content-center">     
    <a href="./advertencia.html">
        <button class="card-cripto__button">Confirmar Compra</button>
    </a>
    </div>
    `
}
// lee el localStorage y los agrega a la lista de monedas
function llenarListaMonedas() {
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) != 'total'){
            let monedaString = localStorage.getItem(localStorage.key(i));
            let monedaObject = JSON.parse(monedaString);
            monedas.push(monedaObject);
        }
    }
    dibujarCarritoDOM();
}
// agregar las compras al localStorage
function comprarMoneda(moneda) {
    for (m of monedas) {
        if (m.name == moneda) {
            m.cantidad = m.cantidad + 1;
            localStorage.setItem(m.name, JSON.stringify(m));
        }
    }
    calcularTotal();
    actualizarDOM();
}
// quitar las compras del localStorage
function quitarMoneda(moneda) {
    for (m of monedas) {
        if (m.name == moneda && m.cantidad > 0) {
            m.cantidad = m.cantidad - 1;
            localStorage.setItem(m.name, JSON.stringify(m));
        }
    }
    calcularTotal();
    actualizarDOM();
}

function actualizarDOM() {
    monedaCarrito.innerHTML = '';
    dibujarCarritoDOM();
    totalCarrito.innerHTML = '';
    dibujarTotalDOM();
}

//en funcion de la cantidad de monedas, calcula el total y lo muestra en el DOM
function calcularTotal() {
    parcial = 0;
    auxiliar = 0;
    for (m of monedas) {
        auxiliar = m.cantidad * m.price;
        parcial = parcial + auxiliar;
    }
    localStorage.setItem('total', parcial);
    total = localStorage.getItem('total');
}