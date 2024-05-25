export { }

let lastScrollPosition = 0

const menuCollpased = document.querySelector('#menu-collapsed')
const menuExpanded = document.querySelector('#menu-expanded')
const homePage = document.querySelector('#homePage')
const aboutPage = document.querySelector('#aboutPage')
const projectPage = document.querySelector('#projectPage')
const experiencePage = document.querySelector('#experiencePage')
const experienceError = document.querySelector('#experienceError')
const header = document.querySelector('#header')

const pageTransition = (page) => {
  page.classList.remove('opacity-0')
  page.classList.remove('translate-y-5')
  page.classList.add('opacity-100')
  page.classList.add('translate-y-0')
}

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.target.id === 'aboutPage' && entry.isIntersecting) pageTransition(aboutPage)
    if (entry.target.id === 'projectPage' && entry.isIntersecting) pageTransition(projectPage)
    if (entry.target.id === 'experiencePage' && entry.isIntersecting) {
      pageTransition(experiencePage)
      setTimeout(() => {
        experienceError.classList.remove('opacity-0')
        experienceError.classList.add('opacity-100')
      }, 2000)
    }
  })
}

const observer = new IntersectionObserver(callback, { root: null, rootMargin: '0px', threshold: 0.3 })

observer.observe(aboutPage)
observer.observe(projectPage)
observer.observe(experiencePage)

const menuToggle = (e) => {
  e.stopPropagation()

  homePage?.classList.toggle('blur')

  menuExpanded?.classList.toggle('invisible')
  menuExpanded?.classList.toggle('opacity-60')
  menuExpanded?.classList.toggle('z-10')

  document.body.classList.toggle('fixed')
}

const menuClose = () => {
  homePage?.classList.remove('blur')

  menuExpanded?.classList.add('invisible')
  menuExpanded?.classList.remove('opacity-60')
  menuExpanded?.classList.remove('z-10')

  document.body.classList.remove('fixed')
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
  if (window.scrollY <= 5) {
    header?.classList.remove('shadow-lg')
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
      descriptionContainer.classList.add('opacity-100')
    }
  }

  typeText()
})
