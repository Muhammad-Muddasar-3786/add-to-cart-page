let cartIcon = document.querySelector('.cart-icon');
let body = document.querySelector('body');
let closBtn = document.querySelector('.close')
let productList = document.querySelector('.products-list');
let cartList = document.querySelector('.cart-list');
let cartIconSpan = document.querySelector('.cart-icon span');





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
    {
         carts[positionCartProduct].quantity += 1
        }
        addCartToHtml()
        addCartToMemory()

}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts))
}

const addCartToHtml = () => {
cartList.innerHTML = ''
let totalQuantity = 0
if (carts.length > 0) {
    carts.forEach(cart =>{
        totalQuantity = totalQuantity + cart.quantity
        let newCart = document.createElement('div')
        newCart.classList.add('item')
        newCart.dataset.id = cart.productId
        // let positionProduct = productList.findIndex((value) => value.Id == cart.productId)
        // let info = productList[positionProduct]
      
        

        newCart.innerHTML = `
         <div class="image">
                    <img src="" alt="">
                </div>
                <div class="name">
                    Name
                </div>

                <div class="total-price">
                    
               </div>

                <div class="quantity">
                    <span>-</span>
                    <span>${cart.quantity}</span>
                    <span>+</span>
                </div>
`
cartList.appendChild(newCart)

    })
}
cartIconSpan.innerText = totalQuantity
}


cartList.addEventListener('click',(e) => {
let positionClick = e.target
if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    let productId = positionClick.parentElement.dataset.id
    let type = 'minus'
    if (positionClick.classList.contains('plus')) {
        type = 'plus'
        changeQuantity(productId, type)
    }
}
})

const changeQuantity = (productId, type) => {
    let positionItemInCart = carts.findIndex((value) => value.productId == productId)
    if (positionItemInCart > 0) {

        switch (type) {
            case plus:
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity - 1
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange
                }else {
                    carts.splice(positionItemInCart, 1)
                }
                break;
        }
        
    }
    addCartToMemory()
    addCartToHtml()
}






const initAPP = () => {
fetch('products.json')
.then( response => response.json() )
.then( data => {
    productListJSON = data
    addProductsCartToHtml()
    if (localStorage.getItem('cart')) {
        carts = JSON.parse(localStorage.getItem('cart'))
        addCartToHtml()
    }
    
})
}
initAPP()