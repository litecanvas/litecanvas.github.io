export default () =>
  `// Welcome to litecanvas playground!
// Learn more tapping on the question mark above.
// Join our discord community:
// https://discord.com/invite/r2c3rGsvH3
litecanvas({
  loop: { init, update, draw, tapped },
})

function init() {
  // this function run once
  // before the game starts
  bg = 0
  color = 3
  radius = 32
  posx = CENTERX
  posy = CENTERY
}

// this function detect taps/clicks
// and changes the circle position
function tapped(x, y) {
  posx = x
  posy = y
}

// this function controls the game logic
function update(dt) {
  // make the circle falls 100 pixels per second
  posy += 100 * dt
}

// this function render the game scene
function draw() {
  cls(bg) // clear the screen
  circfill(posx, posy, radius, color) // draw a circle
}
`.trim() + "\n";
