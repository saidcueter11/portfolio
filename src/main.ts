export {}

let lastScrollPosition = 0

const menuCollpased = document.querySelector('#menu-collapsed')
const menuExpanded = document.querySelector('#menu-expanded')
const homePage = document.querySelector('#homePage')
const header = document.querySelector('#header')

const menuToggle = (e:Event) => {
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
  if (window.scrollY > lastScrollPosition) {
    lastScrollPosition = window.scrollY
    header?.classList.remove('opacity-100')
    header?.classList.add('opacity-0')
    header?.classList.remove('shadow')
  } else {
    lastScrollPosition = window.scrollY
    header?.classList.remove('opacity-0')
    header?.classList.add('opacity-100')
    header?.classList.add('shadow')
  }

  if (window.scrollY === 0) header?.classList.remove('shadow')
}

menuCollpased?.addEventListener('click', (e) => menuToggle(e))
window.addEventListener('click', menuClose)
window.addEventListener('scroll', headerToggle)
