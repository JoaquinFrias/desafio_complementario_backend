(function (){
    const socket = io();

    let formadd = document.getElementById('addprod')

    formadd.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const newProduct = {
            title: document.getElementById('titleprod').value,
            description: document.getElementById('descprod').value,
            code: document.getElementById('codeprod').value,
            price: document.getElementById('priceprod').value,
            stock: document.getElementById('stockprod').value,
            category: document.getElementById('catprod').value
        };
    
        socket.emit('addProduct', newProduct)
        formadd.reset();
    });

    let formdelete = document.getElementById('deleteprod');
    let inputid = document.getElementById('idprod')

    formdelete.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const productId = inputid.value;
        socket.emit('deleteProduct', productId)
        formdelete.reset();
    });

        socket.on('listProducts', (products)=>{
            const divProducts = document.getElementById('divRealTimeProd');
            divProducts.innerText='';
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
})();

console.log('Hola desde el realTimeProducts.js');
