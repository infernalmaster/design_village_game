import createControls from './controls';
import createField from './field';
import createCombain from './combain';
import createTimer from './timer';
import createScore from './score';


function initGameDOM() {
  const gameEl = document.getElementById('game');

  const ww = gameEl.offsetWidth;
  const wh = gameEl.offsetHeight;

  const size = {
    w: 1920,
    h: 1920 * wh / ww,
  }

  const scale = gameEl.offsetWidth / size.w;
  gameEl.style.transform = `scale(${scale}) translate(-${(size.w - ww)/2/scale}px, -${(size.h - wh)/2/scale}px)`;
  gameEl.style.width = `${size.w}px`;
  gameEl.style.height = `${size.h}px`;

  return size;
}
const size = initGameDOM();


const instruction = document.querySelector('.js-instruction-popup');
instruction.onclick = () => instruction.style.display = 'none';



const filedImage = new Image();
filedImage.onload = () => {
  const grass = createField(size, filedImage);
  const controls = createControls();
  const combain = createCombain(size);
  const timer = createTimer();
  const score = createScore();


  const resultPopup = document.querySelector('.js-result-popup');
  const shareBtn = document.querySelector('.js-share');
  const popupTimer = document.querySelector('.js-popup-timer');
  let isGameRunning;

  function gameEnd() {
    isGameRunning = false;
    resultPopup.style.display = 'block';

    const result = timer.getFormatedTimer();
    popupTimer.textContent = result;
    const msg = `Мій результат ${result} с`;
    shareBtn.href = 'https://www.facebook.com/dialog/feed?' +
      'app_id=145634995501895&display=popup' +
      `&amp;description=${encodeURI(msg)}&link=http%3A%2F%2Fpromo.designvillage.com.ua`;
  }



  function reset() {
    resultPopup.style.display = 'none';
    isGameRunning = true;

    grass.reset();

    score.reset(grass.getArea(), gameEnd);

    combain.reset();
    timer.reset();

    draw(combain);
    score.update(grass.getArea());
    timer.nextTickAndDraw();

  }

  reset();


  Array.prototype.slice
    .call(document.querySelectorAll('.js-restart'), 0)
    .forEach(el => el.onclick = reset);


  function draw() {
    const i = combain.draw();

    grass.cut(combain);

    if (i === 7 || i === 14) {
      setTimeout(() => score.update(grass.getArea()));
    }
  }


  function tick() {
    requestAnimationFrame(tick);

    if (isGameRunning) {
      // console.time('tick');
      timer.nextTickAndDraw();

      if (controls.forward || controls.backward) {
        timer.startIfNotStared();
        combain.update(controls);
        draw();
      }
      // console.timeEnd('tick');
    }
  }
  tick();
}
filedImage.src = 'farm/field.png';
