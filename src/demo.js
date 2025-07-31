export default () =>
  `// Welcome to Litecanvas Playground!
// Learn more tapping on the question mark (?) above.
// Join our discord: https://discord.com/invite/r2c3rGsvH3

// Start the engine
litecanvas({
  loop: { init, update, draw, tapped },
  pixelart: true
})

let bg, color, radius, posx, posy

// this function runs once at the beginning
function init() {
  bg = 0 // the color #0 (black)
  color = 3 // the color #3 (white)
  radius = W / 10 // canvas.width / 10
  posx = W / 2 // center X or canvas.width / 2
  posy = H / 2 // center Y or canvas.height / 2
}

// this function detect clicks/touches
function tapped(x, y) {
  // changes the circle position
  // based on the position of the tap
  posx = x
  posy = y
}

// put the game logic in this function
function update(dt) {
  // make the circle falls 200 pixels per second
  posy += 200 * dt
}

// put the game rendering in this function
function draw() {
  cls(bg) // clear the screen
  circfill(posx, posy, radius, color) // draw a circle
  text(10, 10, 'Tap anywhere') // draw a text
}
`;
