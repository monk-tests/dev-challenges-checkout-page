const items = [
    {
        img: '/assets/photo1.png',
        name: 'Vintage Backbag',
        price: 94.99,
        discountPrice: 54.99,
        quantity: 1,
    },
    {
        img: '/assets/photo2.png',
        name: 'Levi Shoes',
        price: 124.99,
        discountPrice: 74.99,
        quantity: 1,
    },
]
const shippingCost = 19

const itemsContainerEl = document.querySelector('.items')
const totalPriceEl = document.querySelector('.total-price')
const successMessageEl = document.querySelector('.success-message')
const formEl = document.querySelector('form')
const checkboxEl = document.querySelector('.checkbox-container')
const countryInputEl = document.querySelector('.country')

const renderItems = function (itemsArr) {
    itemsContainerEl.innerHTML = ''

    itemsArr.forEach((item) => {
        const itemEl = `
        <div class="item">
            <picture>
                <img src="${item.img}" alt="" />
            </picture>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-price">
                ${item.discountPrice} <span>${item.price}</span>
                </p>
                <div>
                    <button class="quantity-button">-</button>
                    <p>${item.quantity}</p>
                    <button class="quantity-button">+</button>
                </div>
            </div>
        </div>
        `
        itemsContainerEl.insertAdjacentHTML('beforeend', itemEl)
        renderTotalPrice(itemsArr)
    })
}
const renderTotalPrice = function (itemsArr) {
    let totalPrice = 0
    totalPrice += shippingCost
    itemsArr.forEach((item) => {
        const price = item.discountPrice * item.quantity
        totalPrice += price
    })
    totalPrice = totalPrice.toFixed(2)
    totalPriceEl.textContent = `$${totalPrice}`
}

const modifyItemQuantity = function (e) {
    const btn = e.target
    if (!btn.classList.contains('quantity-button')) return
    const itemName = btn
        .closest('.item-details')
        .querySelector('.item-name').textContent

    const item = items.filter(item => item.name === itemName)[0]
    if(!item) return

    switch(btn.textContent) {
        case '+' :
            item.quantity+= 1
            break;
        case '-' :
            if(item.quantity === 0) return
            item.quantity-= 1
            break
    }
    renderItems(items)
}

window.addEventListener('load', () => {
    renderItems(items)
    itemsContainerEl.addEventListener('click', modifyItemQuantity)
})

checkboxEl.addEventListener('click',()=>{
    checkboxEl.querySelector('.checkbox').classList.toggle('check')
})

formEl.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log('submit')
    successMessageEl.classList.add('active')
    setTimeout(() => {
        successMessageEl.classList.remove('active')
    }, 3000);
})

countryInputEl.addEventListener('click', ()=>{
    const value = countryInputEl.value
    console.log('c', value)
    if(value === '0') {
        countryInputEl.classList.remove('selected')
    }
    else {
        countryInputEl.classList.add('selected')
    }
})
