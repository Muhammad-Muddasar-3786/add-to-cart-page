let cartIcon = document.querySelector('.cart-icon');
let body = document.querySelector('body');
let closBtn = document.querySelector('.close')
let productList = document.querySelector('.products-list');
let cartList = document.querySelector('.cart-list');
let iconSpan = document.querySelector('.cart-icon span');




let productListJSON = []
let carts = []


cartIcon.addEventListener('click',() => {
    body.classList.toggle('show-cart')
})
closBtn.addEventListener('click',() => {
    body.classList.toggle('show-cart')
})






const addProductsCartToHtml =  () => {
productList.innerHTML = '';
     
if (productListJSON.length > 0) {
    productListJSON.forEach( product => {
        let newProduct = document.createElement('div')
        newProduct.classList.add('item')
        newProduct.dataset.id = product.id

        newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>"${product.name}"</h2>
                <div class="price">${product.price}</div>
                <button class="add-to-cart">Add to Cart</button>`

                productList.appendChild( newProduct );
    })
}

}


productList.addEventListener('click',() => {
    let positionClick = event.target

    if (positionClick.classList.contains('add-to-cart')) {
        let productId = positionClick.parentElement.dataset.id
        addToCart(productId)
    }
})


const addToCart = (productId) => {
    let positionCartProduct = carts.findIndex((value) => value.productId == productId)

    if (carts.length <= 0) {
        carts = [
            {
                productId: productId,
                quantity: 1
            }
        ]
    }else
    if (positionCartProduct < 0){
        carts.push(
            {
                productId: productId,
                quantity: 1
            }
        )
                 
    } else
    { carts[positionCartProduct].quantity += 1}
   
    
     addCartToHtml()
}






const initAPP = () => {
fetch('products.json')
.then( response => response.json() )
.then( data => {
    productListJSON = data
    addProductsCartToHtml()
    
})
}
initAPP()