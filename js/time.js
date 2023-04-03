// Display current time using Day.js
const displayCurrentTime = () => {
    const currentTime = dayjs().format('MMMM DD, YYYY HH:mm')
    document.getElementById('date-display').innerHTML = currentTime
  }
  
  // Cycle through random dates within the last thousand years
  const cycleDates = () => {
    const randomYear = Math.floor(Math.random() * 1000) + 1023
    const randomDate = dayjs().year(randomYear).subtract(Math.floor(Math.random() * 365), 'day')
    document.getElementById('date-display').innerHTML = randomDate.format('MMMM DD, YYYY')
  }
  
  // Set interval for cycling dates
  let intervalId;
  const startCycle = () => {
    intervalId = setInterval(() => {
      cycleDates()
    }, 1000)
  }
  
  // Stop interval for cycling dates and set date back to current time
  const stopCycle = () => {
    clearInterval(intervalId)
    displayCurrentTime()
  }
  
  // Event listeners for hovering and clicking
  const timeTurner = document.getElementById('time-turner')
  timeTurner.addEventListener('mouseenter', startCycle)
  timeTurner.addEventListener('mouseleave', stopCycle)
  
  // Initial display of current time
  displayCurrentTime()
  