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

  // check taps/clicks
  if (TAPPED || TAPPING) {
    x = TAPX
    y = TAPY

    // play sound
    sfx(0)
  }

  radius = rand() * y
}

function draw () {
  clear(0)
  linewidth(4)
  circ(x, y, radius, color)
}
`.trim() + "\n";
