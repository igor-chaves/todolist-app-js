const searchInput = document.querySelector('[data-js="searchContainer"] input')
const todoForm = document.querySelector('[data-js="formContainer"]')
const listContainer = document.querySelector('[data-js="listContainer"]')


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

todoForm.addEventListener("submit", e => {
   e.preventDefault()

   const inputValue = e.target.input.value

   listContainer.innerHTML += `
   <li data-item="${inputValue}" class="itemContainer">
      <span class="itemText">${inputValue}</span>
      <img data-delete-icon="${inputValue}" class="deleteIcon" src="./trash.svg">
   </li>
   `

   e.target.reset()
})

listContainer.addEventListener("click", e => {
   const clickedElement = e.target

   if (clickedElement.dataset.deleteIcon) {
      // get a certain element e remove from DOM.
      // the removed element is the one that has the same value in the data attribute as the trash data attribue's value
      document.querySelector(`[data-item="${clickedElement.dataset.deleteIcon}"]`).remove()
   }
})
