const getInventoryItems = () => {
  fetch('/api/v1/inventory', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(inventoryItems => prependInventoryItems(inventoryItems))
  .catch(error => {error})
}

const prependInventoryItems = (array) => {
  array.map(inventoryItem => {
    return $('#inventory-section').prepend(`
      <div id='inventory-item'>
        <p id='title'>${inventoryItem.title}</p>
        <p id='description'>${inventoryItem.description}</p>
        <img id='item-image' src='${inventoryItem.image}'>
        <p id='price'>$${inventoryItem.price}</p>
        <button id='addtocart-button'>Add to Cart</button>
      </div>
    `)
  })
}


$('#inventory-section').on('click', '#addtocart-button', function() {
  const title = $(this).siblings('#title').text();
  const price = $(this).siblings('#price').text();

  let newItemObject = Object.assign({}, {
    title,
    price
  })

  const storeItem = JSON.stringify(newItemObject)

  localStorage.setItem(title, storeItem)

  getCartItems();
})

const getCartItems = () => {
  let price = []
  $('.cart-items').empty()

  if(localStorage.length === 0) {
    $('.cart-items').append(`
      <div>There are no items in your cart</div>
    `)
  } else {
    const localStorageKeys = Object.keys(localStorage)

    const storageItems = localStorageKeys.map(key => {
      return localStorage.getItem(key)
    })


    storageItems.map(storageItem => {
      const parsedItem = JSON.parse(storageItem)

      price.push(parseFloat(parsedItem.price.replace('$', '')))

      return $('.cart-items').append(`
        <p>Item: ${parsedItem.title}</p>
        <p>Item Price: ${parsedItem.price}</p>
        `)
      })

      let total = price.reduce((a, b) => a + b, 0);
      $('#total').text(`Total: $${total}`)

  }
}

$('#cart-icon-section').on('click', () => {
  $('#item-info-cart').toggleClass('active');
  $('#cart-icon-section').toggleClass('active');
})

$('#order-history').on('click', () => {
  $('#order-section').toggleClass('active');
  $('#order-history').toggleClass('active');
})

const getOrders = () => {
  $('.order-section').empty();

  fetch('/api/v1/order_history', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(orders => {
    orders.map(order => {
      let dateCreated = order.created_at.split('T')[0]

      return $('#order-section').prepend(`
          <p class="order-info">${order.total_price}</p>
          <p class="order-info">Order Date: ${dateCreated}</p>
        `)
      })
  })
}

$('#checkout-button').on('click', () => {
  const total = $('#total').text();

  if(localStorage.length === 0) {
    alert('There are no items in your cart')
  } else {
    fetch('/api/v1/order_history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        total_price: total,
      })
    })
    .then(() => getOrders())
  }
})




window.onload = getInventoryItems(), getCartItems(), getOrders();
