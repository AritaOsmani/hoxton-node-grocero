// import './style.css'
import './styles/index.css'
import './styles/reset.css'


type AvailableProduct = {
  id: string
  name: string
  price: number
  quantity: number
}

type BasketItem = {
  id: string
  name: string
  quantity: number
}

type State = {
  availableProducts: AvailableProduct[]
  basket: BasketItem[]
}

const state: State = {
  availableProducts: [
    {
      id: '001',
      name: 'beetroot',
      price: 0.35,
      quantity: 3
    },
    {
      id: '002',
      name: 'carrot',
      price: 0.55,
      quantity: 2
    },
    {
      id: '003',
      name: 'apple',
      price: 0.45,
      quantity: 5
    },
    {
      id: '004',
      name: 'apricot',
      price: 0.65,
      quantity: 4
    },
    {
      id: '005',
      name: 'avocado',
      price: 1.1,
      quantity: 6
    },
    {
      id: '006',
      name: 'bananas',
      price: 1.2,
      quantity: 10
    },
    {
      id: '007',
      name: 'bell-pepper',
      price: 0.25,
      quantity: 2
    },
    {
      id: '008',
      name: 'berry',
      price: 0.85,
      quantity: 8
    },
    {
      id: '009',
      name: 'blueberry',
      price: 0.95,
      quantity: 8
    },
    {
      id: '010',
      name: 'eggplant',
      price: 1.2,
      quantity: 5
    }
  ],
  basket: [],


}
const listElementContainer: HTMLUListElement | null = document.querySelector('.item-list.cart--item-list');
const listContainer: HTMLUListElement | null = document.querySelector('.item-list.store--item-list');

function addItemToBasket(product: AvailableProduct) {
  if (product.quantity === 0) {
    return;
  }
  const item: BasketItem = {
    id: product.id,
    name: product.name,
    quantity: 1
  }

  const index = state.basket.findIndex(function (name) {
    return (name.name === product.name);
  });
  if (index === -1) {
    state.basket.push(item);
  } else {
    increaseQuantity(state.basket[index])

  }
  decreaseQuantity(product);
}


function removeItemFromBasket(product: BasketItem) {
  state.basket = state.basket.filter(function (item) {
    return item.id != product.id;
  })
}

function increaseQuantity(item: AvailableProduct | BasketItem) {
  item.quantity++;
}
function decreaseQuantity(item: AvailableProduct | BasketItem) {
  item.quantity--;
}
function render() {
  renderStoreItems();
  renderCartItems();
  renderTotal();
}
function renderStoreItems() {
  if (listContainer === null) return
  listContainer.innerHTML = '';
  for (const product of state.availableProducts) {
    createStoreItems(product);
  }
}

function renderCartItems() {
  if (listElementContainer === null) return
  listElementContainer.innerHTML = '';
  for (const product of state.basket) {

    const listItem: HTMLLIElement | undefined = createCartItems(product);
    if (listItem === undefined) return
    listElementContainer.append(listItem);
  }
}
function renderTotal() {

  const spanEl: HTMLSpanElement | null = document.querySelector('.total-number');
  if (spanEl === null) return
  spanEl.textContent = '£' + getTotal().toFixed(2);
}
function createStoreItems(product: AvailableProduct) {
  if (listContainer === null) return
  const listItem = document.createElement('li');

  const container = document.createElement('div');
  container.setAttribute('class', 'store--item-icon');

  const imageEl = document.createElement('img');
  imageEl.setAttribute('src', `assets/icons/${product.id}-${product.name}.svg`);
  imageEl.setAttribute('alt', product.name);

  const buttonEl = document.createElement('button');
  buttonEl.textContent = 'Add to cart';

  addButtonListener(buttonEl, product);

  container.append(imageEl, buttonEl);

  listItem.append(container);
  listContainer.append(listItem);
}
function createCartItems(product: BasketItem) {
  const listItem = document.createElement('li');

  const imageEl = document.createElement('img');
  imageEl.setAttribute('class', 'cart--item-icon');
  imageEl.setAttribute('src', `assets/icons/${product.id}-${product.name}.svg`);
  imageEl.setAttribute('alt', product.name);

  const itemName = document.createElement('p');
  itemName.textContent = product.name;

  const removeButton = document.createElement('button');
  removeButton.classList.add('quantity-btn', 'remove-btn', 'center');
  // removeButton.setAttribute('class', 'center');
  removeButton.textContent = '-';

  removeButton.addEventListener('click', function () {
    decreaseQuantity(product);
    const storeItem = state.availableProducts.find(function (storeItem) {
      return storeItem.id === product.id;
    })

    if (storeItem === undefined) return

    increaseQuantity(storeItem);
    if (product.quantity === 0) {
      removeItemFromBasket(product);

    }
    render()
  })

  const spanEl: HTMLSpanElement | null = document.createElement('span');

  spanEl.setAttribute('class', 'quantity-text.center');
  if (spanEl === null) return
  spanEl.textContent = product.quantity.toString();

  const addButton = document.createElement('button');
  addButton.classList.add('quantity-btn', 'add-btn', 'center');
  addButton.textContent = '+';

  addButton.addEventListener('click', function () {

    const storeItem = state.availableProducts.find(function (storeItem) {
      return storeItem.id === product.id;
    })

    if (storeItem === undefined) return

    addItemToBasket(storeItem);

    render();
  })

  listItem.append(imageEl, itemName, removeButton, spanEl, addButton);
  return listItem;

}

function addButtonListener(button: HTMLButtonElement, product: AvailableProduct) {
  button.addEventListener('click', function () {
    if (product.quantity === 0) {
      render();
    } else {
      addItemToBasket(product);
      render();
    }


  })
}
function getTotal() {
  let total = 0;
  for (const item of state.basket) {
    const product = state.availableProducts.find(function (product) {
      return product.id === item.id;
    })

    if (product !== undefined) {
      total += product.price * item.quantity;
    }


  }
  return total;
}

render();

