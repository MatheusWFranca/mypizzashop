const query = (element) => {
  return document.querySelector(element);
}
const queryAll = (element) => {
  return document.querySelectorAll(element);
}

let quantity = 1;


pizzaJson.map((item, index) => {
  let pizzaItem = query('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault();
    quantity = 1;

    const modal = query('.pizzaWindowArea');
    const pizzaName = query('.pizzaInfo h1');
    const pizzaDescription = query('.pizzaInfo--desc');
    const pizzaImg = query('.pizzaBig img');
    const pizzaPrice = query('.pizzaInfo--actualPrice');
    const pizzaSize = queryAll('.pizzaInfo--size');
    const pizzaSelected = query('.pizzaInfo--size.selected');
    const pizzaQuantity = query('.pizzaInfo--qt');

    modal.classList.add('active');
    pizzaName.innerHTML = item.name;
    pizzaDescription.innerHTML = item.description;
    pizzaImg.setAttribute('src', item.img);
    pizzaPrice.innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaSelected.classList.remove('selected');
    pizzaSize.forEach((size, sizeIndex) => {
      if (sizeIndex === 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[index].sizes[sizeIndex];
    });
    pizzaQuantity.innerHTML = quantity;

  });

  const pizzaArea = query('.pizza-area').append(pizzaItem);
});