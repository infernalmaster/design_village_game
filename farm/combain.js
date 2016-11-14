const degToRad = Math.PI / 180;

const obstacles = [
  [865, 305],
  [1112, 442],
  [582, 543],
  [606, 589],
  [1260, 669],
  [1318, 695],
]

export default function createCombain(size) {
  const el = document.getElementById('combain');
  const elShadow = document.getElementById('combainShadow');

  let i = 0;

  const combain = {
    w: 154, h: 130,
    x: 0, y: 0, angle: 0,

    speed: 2,
    alngleSpeed: 2,


    update(controls) {
      const direction = controls.forward ? 1 : -1;
      const angleDirection = controls.left ? -1 : controls.right ? 1 : 0;

      const nextX = combain.x + Math.cos(combain.angle * degToRad) * combain.speed * direction;
      const nextY = combain.y + Math.sin(combain.angle * degToRad) * combain.speed * direction;
      const nextAngle = combain.angle + angleDirection * combain.alngleSpeed * direction;


      let isColided = false;
      const aRad = -degToRad * nextAngle;
      const cosA = Math.cos(aRad)
      const sinA = Math.sin(aRad)

      obstacles.forEach(([x, y]) => {
        const x1 = x;
        const y1 = y + (size.h - 1080) / 2;

        const x2 = x1 - nextX;
        const y2 = y1 - nextY;


        const x3 = x2 * cosA - y2 * sinA;
        const y3 = x2 * sinA + y2 * cosA;

        if (
          (27 < x3 && x3 < 77 && -65 < y3 && y3 < 65) ||
          (-77 < x3 && x3 < 27 && -35 < y3 && y3 < 35)
        ) {
          isColided = true;
        }
      });

      if (!isColided) {
        combain.x = nextX;
        combain.y = nextY;
        combain.angle = nextAngle;
      }
    },

    reset() {
      combain.x = 100;
      combain.y = size.h - 100;
      combain.angle = -90;
    },

    draw() {
      changePosition(elShadow, combain.x - 10, combain.y + 10, combain.angle);

      changePosition(el, combain.x, combain.y, combain.angle);

      let p;
      if (i < 5) {
        p = '0';
      } else if (i < 10) {
        p = '-154px';
      } else {
        p = '-308px';
      }

      i += 1;
      if (i === 15) {
        i = 0;
      }

      el.style.backgroundPositionX = p;

      return i;
    }
  }

  return combain;
}

function changePosition(el, x, y, angle) {
  el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
}
