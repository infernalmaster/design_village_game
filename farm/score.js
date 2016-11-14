export default function createScore() {

  const scoreEl = document.getElementById('score');


  let initArea;
  let endCb;

  function reset(initArea_, endCb_) {
    initArea = initArea_;
    endCb = endCb_;
  }

  function update(area) {

    let percents = (1 - area / initArea) * 100;

    if (percents > 99.99) {
      percents = 100;
      endCb();
    }

    scoreEl.textContent = `${Math.floor(percents)}%`;
  }


  return {
    update,
    reset
  }
}
