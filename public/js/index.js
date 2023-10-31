(function () {
    const socket = io();

    fetch('api/products')
        .then(response => response.json())
        .then(products => {
            const divProducts = document.getElementById('divProducts');
            
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <p id="idprod">id: ${product.id}</p>
                `;
                divProducts.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error al obtener los productos:', error));
})();

console.log('Hola desde el index.js');
