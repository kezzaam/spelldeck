// Sorting hat 

const button = document.getElementById('sortingButton')

button.addEventListener('click', function() {
  // get user input and store in name variable
  const name = document.getElementById('nameInput').value
  if (name) {
    // randomise
    const houseNum = Math.floor(Math.random() * 4);
    // array of house objects
    const houses = [
      { name: 'Gryffindor', color: '#5D131C', icon: 'images/gryffindor.png' },
      { name: 'Ravenclaw', color: '#0B314A', icon: 'images/ravenclaw.png' },
      { name: 'Hufflepuff', color: '#EEDE4B', icon: 'images/hufflepuff.png' },
      { name: 'Slytherin', color: '#234631', icon: 'images/slytherin.png' }
    ]
    const house = houses[houseNum]

    // change background colour according to house
    document.querySelector('#container').style.backgroundColor = house.color
    document.querySelector('.sticky-top').style.backgroundColor = house.color
    document.querySelector('footer').style.backgroundColor = house.color

    // elements
    const heading = document.querySelector('h2')
    const hat = document.querySelector('#sorting-hat')
    const input = document.getElementById('nameInput')
    const button = document.getElementById('sortingButton')
    const message = document.createElement('p')
    const houseIconContainer = document.createElement('div')
    const houseIcon = document.createElement('img')
    const houseName = document.createElement('h3')
    const houseInfo = document.createElement('div')

    // add response content
    houseIcon.src = house.icon 
    message.textContent = 'Congratulations, ' + name + '! You\'ve been sorted into ' + house.name + '!'
    houseName.textContent = house.name
    houseIconContainer.appendChild(houseIcon)
    houseInfo.appendChild(houseIconContainer)
    houseInfo.appendChild(houseName)
    document.querySelector('.col-md-6').appendChild(message)
    document.querySelector('.col-md-6').appendChild(houseInfo)

    // hide previous elements
    heading.style.display = 'none'
    hat.style.display = 'none'
    input.style.display = 'none'
    button.style.display = 'none'
  }
})



