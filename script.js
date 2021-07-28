const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const buttons = document.querySelectorAll('.btn');
const btnNext = document.querySelector('.btn-next');
const inputs = document.querySelectorAll('.filters input');
const setProps = document.documentElement.style;
const image = new Image();
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const fullscreen = document.querySelector('.fullscreen');
let ind = 0;

window.addEventListener('load', loadPicture);
document.querySelector('.btn-reset').addEventListener('click', resetFilters);
document.querySelector('.btn-save').addEventListener('click', savePicture);
btnNext.addEventListener('click', loadPicture);
document.querySelector('.editor').addEventListener('click', changeBackgroundButtons);
document.querySelector('input[type="file"]').addEventListener('change', downloadPicture);
document.querySelector('.filters').addEventListener('input', setFilter);
fullscreen.addEventListener('click', fullscreenToggle);

function fullscreenToggle() {
  if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    };
};

function resetFilters() {
  inputs.forEach(input => {
    context.filter = `${input.name}(${input.value = 0}${input.dataset.sizing})`;
    context.drawImage(image, 0, 0);
    input.name === 'saturate'
      ? input.value = 100
      : input.value = 0;
    input.name === 'saturate'
      ? input.nextElementSibling.value = 100
      : input.nextElementSibling.value = 0;
  })
};

function changeBackgroundButtons({ target: { parentElement, tagName, classList } }) {
  if (tagName === 'BUTTON') {
    buttons.forEach(b => { b.classList.remove('btn-active') })
    classList.add('btn-active')
  };

  if (tagName === 'INPUT') {
    buttons.forEach(b => { b.classList.remove('btn-active') })
    parentElement.classList.add('btn-active');
  };
};

function downloadPicture(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = () => {
    image.src = reader.result;
  }
  reader.onerror = () => {
    console.log(reader.error);
  };
};

function savePicture(e) {
  let link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
};

function setFilter(e) {
  const suffixCssProps = e.target.dataset.sizing || '';
  const nameCssProps = e.target.name
  const valueCssProps = e.target.value
  const outputValue = e.target.nextElementSibling
  outputValue.value = valueCssProps

  context.filter = `${nameCssProps}(${valueCssProps}${suffixCssProps})`;
  context.drawImage(image, 0, 0);
};

function getLinkImg() {
  const linkFragment = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
  const date = new Date();
  const time = date.getHours();

  if (time >= 6 && time <= 12) { return linkFragment + "morning/" }
  if (time > 12 && time <= 18) { return linkFragment + "day/" }
  if (time > 18 && time <= 24) { return linkFragment + "evening/" }
  if (time >= 0 && time < 6) { return linkFragment + "night/" }
};

function loadPicture() {
  const index = ind % images.length;
  const imageSrc = getLinkImg() + images[index];
  const context = canvas.getContext("2d");

  image.setAttribute('crossOrigin', 'anonymous');
  image.src = imageSrc;
  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
  };
  ind++;
};
