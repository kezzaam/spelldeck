
// book animation - adds li elements for pages 
let bookPages = document.getElementById("book-pages")
for (let i = 0; i < 18; i++) {
  let li = document.createElement("li")
  bookPages.appendChild(li)
}

// Show modal when book is clicked
const bookElement = document.querySelector('.book')
const modalElement = new bootstrap.Modal(document.querySelector('#not-muggle-modal'))

bookElement.addEventListener('click', () => {
  modalElement.show()
})

// Handle checkbox confirmation
const confirmButton = document.querySelector('#not-muggle-confirm')

confirmButton.addEventListener('click', () => {
  const checkBox = document.querySelector('#not-muggle-checkbox')
  if (checkBox.checked) {
    // User is not a muggle
    console.log("User is not a muggle")
    // font awesome icon change lock to unlock
    const lockIcon = document.querySelector('.fa-lock')
    lockIcon.classList.remove('fa-lock')
    lockIcon.classList.add('fa-unlock')
    // Navigate to spelldeck.html page after 1 second
    setTimeout(() => {
      window.location.href = "spelldeck.html"
    }, 1000)
  } else {
    // User is a muggle
    console.log("User is a muggle")
  }

  modalElement.hide()
})