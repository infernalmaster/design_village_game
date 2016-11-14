const degToRad = Math.PI / 180;

export default function createField(size, filedImage) {
  const canvas = document.getElementById('trak');
  canvas.width = size.w;
  canvas.height = size.h;
  const ctx = canvas.getContext('2d');


  const area = {}

  area.x = (size.w - filedImage.width) / 2;
  area.y = (size.h - filedImage.height) / 2;
  area.w = filedImage.width;
  area.h = filedImage.height;


  function reset() {
    ctx.drawImage(filedImage, area.x, area.y);
  }


  function cut(combain) {
    ctx.translate(combain.x, combain.y);
    ctx.rotate(combain.angle * degToRad);
    ctx.translate(combain.w/2 - 40, -combain.h/2);
    ctx.clearRect(0, 0, 30, combain.h);
    // reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }


  function getArea() {
    // console.time('getGrassArea');
    let s = 0;
    const data = ctx.getImageData(area.x, area.y, area.w, area.h).data;;
    const dataSize = area.w * area.h * 4;
    for (let i = 1; i < dataSize; i += 4) {
      if (data[i]) {
        s++;
      }
    }
    // console.timeEnd('getGrassArea')
    return s;
  }

  return {
    cut,
    getArea,
    reset
  }
}
