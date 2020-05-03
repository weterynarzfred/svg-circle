// number of lines
const n = 211;
const r = 90;

// prepare the svg
const svg = document.getElementsByTagName('svg')[0];
const elements = [];
for (let i = 0; i < n; i++) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svg.appendChild(path);
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  svg.appendChild(circle);
  elements.push([path, circle]);
}

// do magic
let t = -Math.PI / 2;
let p, m;
function animate() {
  t = (t + 0.001) % (Math.PI * 2);
  p = (Math.sin(t) + 1) * 2;
  m = smoothStep(Math.sin(p * Math.PI) / 200) * 1200 + 1;
  const fac = smoothStep(p) + 1;
  elements.forEach((element, i) => {
    const color = `rgb(${getColor(i, 0)}, ${getColor(i, 1) - 100}, ${getColor(i, 2) - 150})`;
    element[0].setAttribute('d', `M${getPoint(fac, i / n)}L${getPoint(1, i / n)}`);
    element[0].setAttribute('stroke', color);
    element[1].setAttribute('cx', `${getX(fac, i / n)}`);
    element[1].setAttribute('cy', `${getY(fac, i / n)}`);
    element[1].setAttribute('fill', color);
  });
  requestAnimationFrame(animate);
}

// utils
const getPoint = (speed, offset) => `${getX(speed, offset)} ${getY(speed, offset)}`;
const getX = (speed, offset) => Math.cos((p + offset * Math.PI * 2) * speed * m) * r;
const getY = (speed, offset) => Math.sin((p + offset * Math.PI * 2) * speed * (2 - m)) * r;
const smoothStep = a => (Math.sin((2 * a + 1) * Math.PI / 2) * Math.sign(Math.cos((2 * a + 1) * Math.PI / 2)) - 1) / 2 + Math.round(a + 0.5);
const getColor = (i, h) => (Math.sin(p * (30 + h) + (i * 2 / n) * Math.PI) / 2 + 0.5) * 105 + 150;

// do
animate();
