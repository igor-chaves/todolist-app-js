const searchInput = document.querySelector('[data-js="searchContainer"] input')
const todoForm = document.querySelector('[data-js="formContainer"]')
const listContainer = document.querySelector('[data-js="listContainer"]')

const updateLocalStorage = (newItem, deleteItem) => {
   let inputsArray = []
   const existingItems = localStorage.getItem("items")

   // add item if newItem does not receives NULL as parameter
   if (newItem !== null) {
      if (existingItems) inputsArray = JSON.parse(existingItems)
      
      inputsArray.push(newItem)
      // updated array with new items on localStorage 
      localStorage.setItem("items", JSON.stringify(inputsArray))
      return
   }

   // remove item if newItem receives NULL as parameter
   inputsArray = JSON.parse(existingItems)

   const removeItemFromArray = (array, itemToRemove) => {
      // return an array without the deleted item
      return array.filter(item => item !== itemToRemove)
   }

   let newArr = removeItemFromArray(inputsArray, deleteItem)
   localStorage.setItem("items", JSON.stringify(newArr))
}

const createItem = inputValue => {
   listContainer.innerHTML += `
      <li data-item="${inputValue}" class="itemContainer">
         <span class="itemText">${inputValue}</span>
         <img data-delete-icon="${inputValue}" class="deleteIcon" src="./trash.svg">
      </li>
   `
}

const deleteItem = clickedElement => {
   if (clickedElement.dataset.deleteIcon) {
      // get a certain element and remove from DOM.
      // the removed element has the same value in the data attribute as the trash data attribute's value
      document.querySelector(`[data-item="${clickedElement.dataset.deleteIcon}"]`).remove()
   }
   updateLocalStorage(null, clickedElement.dataset.deleteIcon)
}

// search item
searchInput.addEventListener("input", e => {
   e.preventDefault()

   const inputValue = e.target.value.trim().toLowerCase()
   const todoListArray = Array.from(listContainer.children)

   // get an array with ALL items that not matches the value from input
   todoListArray
      .filter(item => !item.innerText.toLowerCase().includes(inputValue))
      .forEach(item => item.classList.add("hide"))
   
   // get an array with ALL items that matches the value from input
   todoListArray
      .filter(item => item.innerText.includes(inputValue))
      .forEach(item => item.classList.remove("hide"))
})

// insert new item
todoForm.addEventListener("submit", e => {
   e.preventDefault()

   const inputValue = e.target.input.value

   updateLocalStorage(inputValue, null)
   createItem(inputValue)

   e.target.reset()
})

// delete item
listContainer.addEventListener("click", e => {
   const clickedElement = e.target

   deleteItem(clickedElement)
})

if (localStorage.getItem("items")) {
   const existingItems = JSON.parse(localStorage.getItem("items"))
   existingItems.forEach(item => createItem(item))
}
