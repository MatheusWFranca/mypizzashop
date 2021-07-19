const query = (element) => {
  return document.querySelector(element);
}
const queryAll = (element) => {
  return document.querySelectorAll(element);
}
let quantity = 1;
let pizzaIndex = 0;

const pizzaQuantity = query('.pizzaInfo--qt');
const pizzaName = query('.pizzaInfo h1');
const pizzaDescription = query('.pizzaInfo--desc');
const pizzaImg = query('.pizzaBig img');
const pizzaPrice = query('.pizzaInfo--actualPrice');
const pizzaSize = queryAll('.pizzaInfo--size');
const pizzaSelected = query('.pizzaInfo--size.selected');
const close = query('.pizzaWindowArea');
const addButton = query('.pizzaInfo--addButton');
const cancelButton = queryAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton');
const aside = query('aside');
const cartArea = query('.cart');
const cart = [];


pizzaJson.map((item, index) => {
  let pizzaItem = query('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault();
    quantity = 1;
    pizzaIndex = index;

    const modal = queryAll('.pizzaWindowArea, .pizzaInfo--cancelMobileButton');
    modal.forEach((item) => {
      item.classList.add('active');
    })
    pizzaName.innerHTML = item.name;
    pizzaDescription.innerHTML = item.description;
    pizzaImg.setAttribute('src', item.img);
    pizzaPrice.innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaSize.forEach((size, sizeIndex) => {
      if (sizeIndex === 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[index].sizes[sizeIndex];
    });
  });
  const pizzaArea = query('.pizza-area').append(pizzaItem);

});

// Fechar modal


function closeModal() {
  close.classList.remove('active');
}

cancelButton.forEach((button) => {
  button.addEventListener('click', closeModal)
});

// Adicionar e retirar quantidade

const removePizza = query('.pizzaInfo--qtmenos');
const addPizza = query('.pizzaInfo--qtmais');

removePizza.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    pizzaQuantity.innerHTML = quantity;
  }
});

addPizza.addEventListener('click', () => {
  quantity++;
  pizzaQuantity.innerHTML = quantity;
});

pizzaSize.forEach((size) => {
  size.addEventListener('click', (event) => {
    query('.pizzaInfo--size.selected').classList.remove('selected');
    event.currentTarget.classList.add('selected');
  });
});

addButton.addEventListener('click', () => {
  let size = +query('.pizzaInfo--size.selected').getAttribute('data-key');
  let identifier = `${pizzaJson[pizzaIndex].id}${size}`
  let index = cart.findIndex((item) => {
    return item.identifier === identifier;
  });
  if (index > -1) {
    cart[index].qtd += quantity;
  } else {
    cart.push({
      identifier: identifier,
      id: pizzaJson[pizzaIndex].id,
      size: size,
      qtd: quantity,
    });
  };
  updateCart();
  closeModal();
});

function updateCart() {
  if(cart.length > 0) {
    aside.classList.add('show');
    cartArea.innerHTML = '';
    for(let i in cart) {
      let pizzaItem = pizzaJson.find((item) => { return item.id == cart[i].id; })
      const cartItem = query('.models .cart--item').cloneNode(true);
      let pizzaSize = cart[i].size;
      if(cart[i].size == 0) {
        pizzaSize = '(P)'
      } else if(cart[i].size == 1) {
        pizzaSize = '(M)'
      } else {
        pizzaSize = '(G)'
      }
      cartItem.querySelector('img').setAttribute('src', pizzaItem.img);
      cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} ${pizzaSize}`;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;
      cartArea.appendChild(cartItem);
    }
  } else {
    aside.classList.remove('show');
  }
}

