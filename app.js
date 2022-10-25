const elems = {
  canvas: document.querySelector('#canvas'),
  score: document.querySelector('#score-val'),
  fruit: document.querySelector('.fruit'),
  start: document.querySelector('#start-btn'),
  lives: document.querySelectorAll('#lives img'),
  livesBadge: document.querySelector('#lives'),
}

const fruits = [
  'apple.png',
  'banana.png',
  'cherries.png',
  'grapes.png',
  'mango.png',
  'orange.png',
  'peach.png',
  'pear.png',
  'watermelon.png'
]

const state = {
  score: 0,
  lives: 3,
  position: 0,
  fruit: fruits[0],
  timer: null,
  speed: 1,
}

let animating = false

const getRandom = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const start = () => {
  elems.livesBadge.style.opacity = 1
  randomizeTheFruit()
  randomizeFruitPos()

  if (!state.timer)
    state.timer = setInterval(animate, 10)
}

const randomizeTheFruit = () => {
  state.fruit = fruits[getRandom(0, fruits.length-1)]
  elems.fruit.style.backgroundImage = `url(images/${state.fruit})`
}

const randomizeFruitPos = () => {
  let left = getRandom(0, elems.canvas.clientWidth - elems.fruit.clientWidth)

  elems.fruit.style.left = left + 'px'
}

const animate = () => {
  state.position += state.speed

  elems.fruit.style.top = state.position + 'px'

  if (state.position > elems.canvas.clientHeight) {
    decrementLives()
  }
}

const decrementLives = () => {
  if (--state.lives > 0) {
    elems.lives[state.lives].style.opacity = 0.4
    start()
    resetPosition()
  } else {
    clearInterval(state.timer)
    alert('sorry you lost')
    location.reload()
  }
  
}

const resetPosition = () => {
  state.position = -elems.fruit.clientHeight
}

elems.fruit.onmouseover = () => {
  if (! animating) {
    animating = true
    elems.fruit.classList.add('sliced')
    setTimeout(() => {
      resetPosition()
      start()
      elems.fruit.classList.remove('sliced')
      animating = false
    }, 600)
  }
}

elems.start.onclick = start