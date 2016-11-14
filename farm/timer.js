export default function createTimer() {
  const el = document.getElementById('timer');


  let startTimestamp;
  let diff;

  function reset() {
    startTimestamp = 0;
    diff = 0;
  }

  function startIfNotStared() {
    if (!startTimestamp) {
      startTimestamp = new Date().getTime();
    }
  }

  function nextTickAndDraw() {
    if (startTimestamp) {
      diff = (new Date().getTime() - startTimestamp);
    }

    el.textContent = getFormatedTimer();
  }

  function getFormatedTimer() {
    return formatTime(diff);
  }


  return {
    startIfNotStared,
    nextTickAndDraw,
    reset,
    getFormatedTimer
  }
}

function formatTime(miliseconds) {
  const m = Math.floor((miliseconds / 1000 % 3600) / 60);

  const s = miliseconds / 1000 % 60;

  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s.toFixed(2) : s.toFixed(2)}`;
}