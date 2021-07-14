const query = (element) => { return document.querySelector(element); }
const queryAll = (element) => { return document.querySelectorAll(element); }

pizzaJson.map((item, index) => {
  let pizzaIndex = index;
  let pizzaItem = query('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img' ).setAttribute('src', item.img);
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
  pizzaItem.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault();
    const modal = query('.pizzaWindowArea');
    const nome = query('.pizzaInfo h1');
    const pizzaDescription = query('.pizzaInfo--desc');
    const pizzaImg = query('.pizzaBig img'); 
    
    modal.classList.add('active');
    nome.innerHTML = pizzaJson[pizzaIndex].name;
    pizzaDescription.innerHTML = pizzaJson[pizzaIndex].description;
    pizzaImg.setAttribute('src', pizzaJson[pizzaIndex].img);
  });

  const pizzaArea = query('.pizza-area').append(pizzaItem);
});