const keycode = require('keycode');

const controls = {
  forward: false,
  backward: false,
  left: false,
  right: false,
}

const btnMapping = [
  {
    keys: ['up', 'w'],
    control: 'forward',
  },
  {
    keys: ['down', 's'],
    control: 'backward',
  },
  {
    keys: ['left', 'a'],
    control: 'left',
  },
  {
    keys: ['right', 'd'],
    control: 'right',
  },
]

function onKeyDown(ev) {
  const key = keycode(ev);

  btnMapping.forEach(({ keys, control }) => {
    if (keys.indexOf(key) !== -1) {
      controls[control] = true;
    }
  });
}

function onKeyUp(ev) {
  const key = keycode(ev);

  btnMapping.forEach(({ keys, control }) => {
    if (keys.indexOf(key) !== -1) {
      controls[control] = false;
    }
  });
}

export default function createControls() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  return controls;
}