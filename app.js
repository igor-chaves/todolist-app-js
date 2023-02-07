const todoForm = document.querySelector('[data-js="formContainer"]')
const searchForm = document.querySelector('[data-js="searchForm"]')
const listContainer = document.querySelector('[data-js="listContainer"]')


searchForm.addEventListener("submit", e => {
   e.preventDefault()

   const inputValue = e.target.input.value
   const todoListArray = Array.from(listContainer.children)

   todoListArray.filter(item => {
      item.innerText === inputValue ? item.classList.add("display") : item.classList.remove("hide")
   })
})


todoForm.addEventListener("submit", e => {
   e.preventDefault()

   const inputValue = e.target.input.value

   listContainer.innerHTML += `
   <li class="itemContainer">
      <span class="itemText">${inputValue}</span>
      <img class="deleteIcon" src="./trash.svg">
   </li>
   `

   e.target.reset()
})

listContainer.addEventListener("click", e => {
   const clickedElement = e.target

   // delete element that contains "deleteIcon" as class
   if (clickedElement.classList.contains("deleteIcon")) clickedElement.parentElement.remove()
})
