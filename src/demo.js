export default () =>
  `// Welcome to litecanvas playground!
// Learn more tapping on the question mark above
// or join our discord community: https://discord.com/invite/r2c3rGsvH3
litecanvas()

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
  linewidth(4)
  circ(x, y, radius, color)
}
`.trim() + "\n";
