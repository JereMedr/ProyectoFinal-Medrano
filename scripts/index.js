// el objeto Moneda de moneda.js
class Moneda {
    constructor(name, description, price,cantidad) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.cantidad = cantidad;
    }
}
let monedas = [];
let carrito = [];
loadMonedasFromJson();
llenarListaMonedas();
dibujarCarritoDOM();


function dibujarCarritoDOM(){
    const monedaCarrito = document.getElementById('productos-carrito');
console.log(monedaCarrito);
monedas.map((moneda) => {
    monedaCarrito.innerHTML += `
    <div class="item-cart"  id="peso">
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
    <button class="btn btn-danger">Vender</button>
    <p>${moneda.cantidad}</p>
    <button class="btn btn-success" onclick="comprarMoneda('${moneda.name}')">Comprar</button>
</div>`
});
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
function llenarListaMonedas(){
    for (let i = 0; i < localStorage.length; i++) {
        let monedaString = localStorage.getItem(localStorage.key(i));
        let monedaObject = JSON.parse(monedaString);
        monedas.push(monedaObject);
    }
    console.log(monedas);
}
function comprarMoneda(moneda){
    if (moneda == 'dolar'){
        addToCart('dolar');
    } else if (moneda == 'euro'){
        addToCart('euro');
    } else if (moneda == 'peso'){
        addToCart('peso');
    } else if  (moneda == 'bitcoin'){
        addToCart('bitcoin');
    } else if (moneda == 'ethereum'){
        addToCart('ethereum');
    }
}
//suma en uno la cantidad de la moneda seleccionada y la agrega al localStorage
function addToCart(moneda){
    for(moneda of monedas){
        if(moneda.name == moneda){
            moneda.cantidad = moneda.cantidad + 1;
            let monedaString = JSON.stringify(moneda);
            localStorage.setItem(moneda.name, monedaString);
        }
    }

    // let monedaString = localStorage.getItem(moneda);
    // let monedaObject = JSON.parse(monedaString);
    // monedaObject.cantidad = monedaObject.cantidad + 1;
    // monedaString = JSON.stringify(monedaObject);
    // localStorage.setItem(moneda, monedaString);
    
}


