export default () =>
  `// Welcome to litecanvas playground!
// Learn more tapping on the question mark (?) above.
// Our discord: https://discord.com/invite/r2c3rGsvH3
litecanvas()

// this function run once
// before the game starts
function init() {
  bg = 0
  color = 3
  radius = 32
  posx = CENTERX
  posy = CENTERY
  speed = HEIGHT
}

// this function detect touches/clicks
function tapped(x, y) {
  posx = x
  posy = y
}

// this function controls the game logic
function update(dt) {
  posy += speed * dt
  if (posy > HEIGHT - radius) {
    posy = HEIGHT - radius
  }
}

// this function render the game scene
function draw() {
  cls(bg) // clear the screen
  circfill(posx, posy, radius, color) // draw a circle
}
`;
