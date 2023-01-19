class Moneda {
    constructor(name, description, price, cantidad) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.cantidad = cantidad;
    }
}

loadMonedasFromJson()

function loadMonedasFromJson() {
    // Si el localStorage está vacío, se cargan las monedas desde el archivo data.json
    if (localStorage.length == 0) {
        fetch('data.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    let moneda = new Moneda(data[i].name, data[i].description, data[i].price, data[i].cantidad);
                    let monedaString = JSON.stringify(moneda);
                    localStorage.setItem(data[i].name, monedaString);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

