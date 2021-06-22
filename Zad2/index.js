// Wiem, że można używać getElementById i inne slektory, ale wolę używać jednego uniwersalnego selectora
const boxes = document.querySelector('#boxes');
const input = document.querySelector('#controls > input');
const createButton = document.querySelector('[data-action="create"]');
const destroyButton = document.querySelector('[data-action="destroy"]');

let inputValue = 0;

const generateRGB = () => {
  const base = 255;
  const r = Math.random;
  return `rgb(${Math.round(base * r())}, ${Math.round(base * r())}, ${Math.round(base * r())})`;
};

const onInputChange = (e) => {
  inputValue = e.target.value;
  console.log(inputValue);
};

const createBoxes = (amount) => {
  // biorę wysokość ostatniego boxa z boxes. Jeżeli nie instieje ustawiam defaultową wartość = 30
  let baseDimension = parseInt(boxes.lastChild?.style.height) + 10 || 30;

  if (amount > 0) {
    for (let id = 0; id < amount; id++) {
      if (id > 0) {
        baseDimension += 10;
      }

      // Tworze div i dodaję do boxes
      const color = generateRGB();
      const div = document.createElement('div');
      div.style.cssText = `height:${baseDimension}px;width:${baseDimension}px;background-color:${color}`;
      boxes.appendChild(div);
    }
  }
};

const destroyBoxes = () => {
  // w większości przypadków omijałbym innerHTML, ale w tym przypadku to jest najprostrza i najbardziej wydajna metoda
  boxes.innerHTML = '';
};

// Dodaj event listenery po inicjalizacji window
window.onload = () => {
  input.addEventListener('change', onInputChange);
  createButton.addEventListener('click', () => createBoxes(inputValue));
  destroyButton.addEventListener('click', destroyBoxes);
};
