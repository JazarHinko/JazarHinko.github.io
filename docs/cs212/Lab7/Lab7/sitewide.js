function main () {
  setupNavMenuSlideOpen()
  setupSpoilers()
}

function setupNavMenuSlideOpen () {
  const toggle = document.querySelector('.site-header .hamburger-button')
  const nav = document.querySelector('.site-header .site-nav')

  toggle.addEventListener('click', () => {
    nav.classList.toggle('slid-open')
  })
}

function setupSpoilers () {
  const spoilers = document.querySelectorAll('.spoiler')
  for (const spoiler of spoilers) {
    spoiler.classList.add('js-hidden')
    const revealButton = document.createElement('button')
    revealButton.classList.add('js-spoiler-button')
    revealButton.innerText = "Spoil"
    revealButton.addEventListener('click', () => {
      spoiler.classList.toggle('js-hidden')
      revealButton.innerText = spoiler.classList.contains('js-hidden') ?
                               "Spoil" : "Hide"
    })
    spoiler.insertAdjacentElement('beforebegin', revealButton)
  }
}

main()


