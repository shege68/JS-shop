// 1. добавити обробник на кнопки "ADD TO CARD", реалізувати делегування
// 2. реалізувати лічильник добавлених товарів в корзину
// 3. реалізувати 2 секундну блокіровку усіх кнопок між натисканнями
// 4. отримати ціну з батьківського вузла, розпарсити її за допомогою регулярки
// 5. ціну виводити в кнопку на час блокування вмісто основного тексту, потім відновити початковий текст
// 6. реалізувати підрахунок усіх товарів, добавлених в корзину, врахувати помилку JS при роботі з дробовою частиною.

const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;
  let restoreHTML = null;

  if (typeof target !== 'object') return;
  if (!target.matches('.item-actions__cart')) return;

  incrementCounter(cartCounterLabel, ++cartCounter);

  cartPrice = getPrise(target, cartPrice, getMockData);

  restoreHTML = target.innerHTML;
  target.innerHTML = `Added ${cartPrice} $`;

  disableControls(target, contentContainer, btnClickHandler);

  setTimeout(() => {
    target.innerHTML = restoreHTML;
    enableControls(target, contentContainer, btnClickHandler);
  }, interval);

}

contentContainer.addEventListener('click', btnClickHandler);

function incrementCounter($label, cn) {
  $label.innerHTML = `${cn}`;
  if (cn === 1) $label.style.display = 'block';
}

function getMockData(t) {
  return +t.parentElement
    .previousElementSibling
    .innerHTML
    .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');
}

function getPrise(t, p, cb) {
  return Math.round((p + cb(t)) * 100) / 100;
}

function disableControls(t, $el, fn) {
  t.disabled = true;
  $el.removeEventListener('click', fn);
}

function enableControls(t, $el, fn) {
  t.disabled = false;
  $el.addEventListener('click', fn);
}