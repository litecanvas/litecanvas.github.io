export default () =>
  `// Welcome to litecanvas playground!
// Learn more tapping on the question mark (?) above.
// Join our discord: https://discord.com/invite/r2c3rGsvH3

let x, y, size, speed, color

litecanvas()

// run once before the game starts
function init() {
  x = CX
  y = CY
  size = 32
  speed = 250
  color = 4
}

// called when touches/clicks happens
function tapped(tapx, tapy) {
  x = tapx
  y = tapy
}

// this function controls the game logic
function update(dt) {
  x += speed * dt * (iskeydown('D') - iskeydown('A'))
  y += speed * dt * (iskeydown('S') - iskeydown('W'))
}

// this function render the game scene
function draw() {
  cls(0)
  rectfill(x, y, size, size, color)
  text(0, 0, 'use WASD keys or taps/clicks')
}
`;
