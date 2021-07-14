const query = (element) => { return document.querySelector(element); }
const queryAll = (element) => { return document.querySelectorAll(element); }

pizzaJson.map((item, index) => {
  let pizzaItem = query('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img' ).setAttribute('src', item.img);
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
  pizzaItem.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault();
    const modal = query('.pizzaWindowArea');
    modal.classList.add('active');
  })

  const pizzaArea = query('.pizza-area').append(pizzaItem);
  return pizzaItem;
});