export default () =>
  `litecanvas()

function init () {
  color = 0
  x = CENTERX
  y = CENTERY
}

function update (dt) {
  color = ELAPSED * 32

  if (TAPPED) {
    x = TAPX
    y = TAPY
    sfx(randi(0, 7))
  }

  radius = rand() * y
}

function draw () {
  clear(0)
  circ(x, y, radius, color)
}
`.trim() + "\n";
