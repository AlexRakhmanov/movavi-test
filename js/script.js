let startPosition = document.querySelector('.shopping-cart').getBoundingClientRect().top;

window.addEventListener("scroll", () => {
	if (document.querySelector('html').scrollTop >= startPosition) {
		if (!document.querySelector('.shopping-cart').classList.contains("fixed")) {
			document.querySelector('.shopping-cart').classList.add('fixed');
		}
	} else {
		document.querySelector('.shopping-cart').classList.remove('fixed');
	}
});

let cart = [];
let totalPrice = 0;
let id = 0;
let initCart = JSON.parse(localStorage.getItem('cart')) || [];

initCart.forEach((good) => {
	addToCart(good.name, good.price)
});

function makeProductNode(id, name, price) {
	return `<div id="cart-item-${id}" class="shopping-basket__software-package">
							<img class="shopping-basket__img" src="img/close.png" alt="X" onclick="removeFromCart(${id})">
							<p class="shopping-basket__description">${name}</p>
							<p class="shopping-basket__price">${price} руб.</p>
						</div>`;
}

function removeFromCart(id) {
	cart = cart.filter((item) => { return item.id !== id });
	document.getElementById('cart-item-' + id).remove();
	calcCartSum();
	saveCart();
}

let buttons = document.querySelectorAll(".item__add");

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		let price = parseInt(button.getAttribute('data-price'));
		let name = button.getAttribute('data-name');

		addToCart(name, price)
	});
});

function addToCart(name, price) {
	cart.push({ id, name, price });
	let goods = document.querySelector('.shopping-cart__goods');
	goods.innerHTML += makeProductNode(id, name, price);
	calcCartSum();
	saveCart();
	id++;
}

function calcCartSum() {
	totalPrice = cart.reduce((acc, item) => {
		return acc + item.price;
	}, 0);
	document.querySelector('.shopping-basket__sum--total-price').innerText = `${totalPrice} руб.`;
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelector(".shopping-cart__button").addEventListener("click", () => {
	let messageAdd = `Вы добавили в корзину: ${cart.reduce((acc, item) => { return acc += `${item.name} | `; }, '')} на сумму: ${totalPrice} руб.`;
	alert(messageAdd);
});


