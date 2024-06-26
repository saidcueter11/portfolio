export { }

let lastScrollPosition = 0

// Menu elements
const menuCollpased = document.querySelector('#menu-collapsed')
const menuExpanded = document.querySelector('#menu-expanded')

// Pages
// const homePage = document.querySelector('#homePage')
const aboutPage = document.querySelector('#aboutPage')
const projectPage = document.querySelector('#projectPage')
const contactPage = document.querySelector('#contactPage')
const experiencePage = document.querySelector('#experiencePage')
const header = document.querySelector('#header')

// Form elements
const contactName = document.querySelector('#contactName')
const emailForm = document.querySelector('#emailForm')
const contactEmail = document.querySelector('#contactEmail')
const contactComment = document.querySelector('#contactComment')
const successEmailMssg = document.querySelector('#successEmailMssg')
const sendIcon = document.querySelector('#sendIcon')
const spinnerIcon = document.querySelector('#spinnerIcon')
const sendBtn = document.querySelector('#send-btn')
const failedEmailMssg = document.querySelector('#failedEmailMssg')

const pageTransition = (page) => {
  page.classList.remove('opacity-0')
  page.classList.remove('translate-y-5')
  page.classList.add('opacity-100')
  page.classList.add('translate-y-0')
}

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.target.id === 'aboutPage' && entry.isIntersecting) pageTransition(aboutPage)
    if (entry.target.id === 'experiencePage' && entry.isIntersecting) pageTransition(experiencePage)
    if (entry.target.id === 'projectPage' && entry.isIntersecting) pageTransition(projectPage)
    if (entry.target.id === 'contactPage' && entry.isIntersecting) pageTransition(contactPage)
  })
}

const observer = new IntersectionObserver(callback, { root: null, rootMargin: '0px', threshold: 0.3 })

observer.observe(aboutPage)
observer.observe(experiencePage)
observer.observe(projectPage)
observer.observe(contactPage)

const menuToggle = (e) => {
  e.stopPropagation()

  menuExpanded?.classList.toggle('z-50')
  menuExpanded?.classList.toggle('-translate-x-full')
}

const menuClose = () => {
  menuExpanded?.classList.add('-translate-x-full')
  menuExpanded?.classList.remove('z-50')
}

const headerToggle = () => {
  // Scrolling Down
  if (window.scrollY > lastScrollPosition) {
    lastScrollPosition = window.scrollY
    header?.classList.add('opacity-0')
    header?.classList.remove('backdrop-blur')
    header?.classList.remove('shadow-lg')
  } else {
    // Scrolling Up
    lastScrollPosition = window.scrollY
    header?.classList.remove('opacity-0')
    header?.classList.add('backdrop-blur')
    header?.classList.add('shadow-lg')
  }

  // Top of the screen
  if (window.scrollY <= 50) {
    header?.classList.remove('shadow-lg')
    header?.classList.remove('opacity-0')
    header?.classList.remove('backdrop-blur')
    header?.classList.remove('bg-green-teal-dark/90')
  }
}

menuCollpased?.addEventListener('click', (e) => menuToggle(e))
window.addEventListener('click', menuClose)
window.addEventListener('scroll', headerToggle)

window.addEventListener('DOMContentLoaded', function () {
  const textName = document.getElementById('typing-name')
  const nameBlinker = document.getElementById('name-blinker')
  const titleBlinker = document.getElementById('title-blinker')
  const textTitle = document.getElementById('typing-title')
  const descriptionContainer = this.document.getElementById('description-container')

  const myName = 'Said Cueter.'
  const title = 'Hello World! My name is'
  let myNameIndex = 0
  let titleIndex = 0

  function typeText () {
    if (titleIndex < title.length) {
      textTitle.innerHTML += title.charAt(titleIndex)
      titleIndex++
      setTimeout(typeText, 50)
    }

    if (titleIndex === title.length) {
      titleBlinker.innerHTML = ''
      nameBlinker.innerHTML = '|'
    }

    if (myNameIndex < myName.length && titleIndex === title.length) {
      textName.innerHTML += myName.charAt(myNameIndex)
      myNameIndex++
      setTimeout(typeText, 100)
    }

    if (myNameIndex === myName.length) {
      setTimeout(
        descriptionContainer.classList.add('opacity-100'),
        200
      )
    }
  }

  typeText()
})

emailForm.addEventListener('submit', async function (event) {
  event.preventDefault()

  sendIcon.classList.add('hidden')
  spinnerIcon.classList.remove('hidden')
  spinnerIcon.classList.add('block')
  sendBtn.disabled = true

  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: contactName.value,
        senderEmail: contactEmail.value,
        message: contactComment.value
      })
    })

    const result = await response.text()
    console.log(result)

    if (response.ok) {
      failedEmailMssg.classList.add('hidden')
      successEmailMssg.classList.remove('hidden')
      successEmailMssg.classList.add('opacity-100')
      emailForm.reset()
      sendBtn.disabled = false

      spinnerIcon.classList.remove('block')
      spinnerIcon.classList.add('hidden')

      sendIcon.classList.remove('hidden')
      sendIcon.classList.add('block')
    } else {
      failedEmailMssg.classList.remove('hidden')
      failedEmailMssg.classList.add('block')
      failedEmailMssg.classList.add('opacity-100')
      successEmailMssg.classList.add('hidden')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('An error occurred while sending the email.')
  }
})
