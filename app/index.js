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
        <button id='addtocart-button'>Add to Card</button>
      </div>
    `)
  })
}


$('#inventory-section').on('click', '#addtocart-button', function() {
  let itemObject = {}

  const title = $(this).siblings('#title').text();
  const price = $(this).siblings('#price').text();

  let newItemObject = Object.assign({}, itemObject, {
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
        <p>${parsedItem.title}</p>
        <p>${parsedItem.price}</p>
        `)

      })

      let total = price.reduce((a, b) => a + b, 0);
      $('#total').text(total)

  }
}


$('.expand-button').on('click', () => {
  $('.cart-items').toggleClass('hidden')
})


window.onload = getInventoryItems(), getCartItems();
