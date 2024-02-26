export default () =>
  `
litecanvas({
  fullscreen: true,
  antialias: false
});

function init () {
  color = 0
  x = CENTERX
  y = CENTERY
}

function update (dt) {
  color = ELAPSED * 32 % 16

  if (TAPPED) {
    x = TAPX
    y = TAPY
    sfx(7)
  }

  radius = rand() * y
}

function draw () {
  clear(0)
  circ(x, y, radius, color)
}
`.trim() + "\n";
