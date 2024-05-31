export default () =>
  `// Welcome to litecanvas playground!
// Learn more tapping on the question mark above.
// Join our discord community:
// https://discord.com/invite/r2c3rGsvH3
litecanvas()

function init () {
  color = 0
  x = CENTERX
  y = CENTERY
  t = 0
}

function update (dt) {
  color = ELAPSED * 32

  if (TAPPED || TAPPING) {
    x = TAPX
    y = TAPY
  }

  // play a random sound every 5 seconds
  if (t > 5) {
    sfx(randi(0, 7))
    t -= 5
  }
  t += dt

  radius = rand() * y
}

function draw () {
  clear(0)
  linewidth(4)
  circ(x, y, radius, color)
}
`.trim() + "\n";
