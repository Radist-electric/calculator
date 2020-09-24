const num = document.querySelector('#number'),
  expOut = document.querySelector('.calc__expression'),
  buttons = document.querySelectorAll('.calc__button');
let result = 0,
  counted = false;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    let val = this.getAttribute('name');
    if (+val >= 0 && +val <= 9) {
      changeInput(val);
    } else {
      defineOperation(val);
    }
  });
}

function changeInput(val) {
  if (counted == true) {
    num.value = '';
    expOut.textContent = '';
    counted = false;
  }
  num.value = num.value + val;
}

function defineOperation(val) {
  switch (val) {
    case 'div':
      console.log('Деление');
      checkCounted();
      if (num.value[0] == '-') {
        expOut.textContent = `${expOut.textContent}(${num.value})/`;
      } else {
        expOut.textContent = `${expOut.textContent}${num.value}/`;
      }
      num.value = '';
      break;
    case 'mul':
      console.log('Умножение');
      checkCounted();
      if (num.value[0] == '-') {
        expOut.textContent = `${expOut.textContent}(${num.value})*`;
      } else {
        expOut.textContent = `${expOut.textContent}${num.value}*`;
      }
      num.value = '';
      break;
    case 'minus':
      console.log('Вычитание');
      checkCounted();
      if (num.value[0] == '-') {
        expOut.textContent = `${expOut.textContent}(${num.value})-`;
      } else {
        expOut.textContent = `${expOut.textContent}${num.value}-`;
      }
      num.value = '';
      break;
    case 'plus':
      console.log('Сложение');
      checkCounted();
      if (num.value[0] == '-') {
        expOut.textContent = `${expOut.textContent}(${num.value})+`;
      } else {
        expOut.textContent = `${expOut.textContent}${num.value}+`;
      }
      num.value = '';
      break;
    case 'change':
      console.log('Смена знака');
      if (num.value.length > 0 && num.value[0] != '-') {
        num.value = '-' + num.value;
      } else {
        num.value = num.value.substring(1, num.value.length);
      }
      break;
    case 'dot':
      console.log('Десятичная точка');
      break;
    case 'del':
      console.log('Стереть число');
      checkCounted();
      if (num.value.length > 0) {
        num.value = num.value.slice(0, num.value.length - 1);
      }
      break;
    case 'reset':
      console.log('Сброс полей');
      num.value = '';
      expOut.textContent = '';
      break;
    case 'equal':
      console.log('Вычислить');
      if (num.value[0] == '-') {
        expOut.textContent = `${expOut.textContent}(${num.value})`;
      } else {
        expOut.textContent = `${expOut.textContent}${num.value}`;
      }
      result = eval(expOut.textContent);
      num.value = result;
      expOut.textContent = `${expOut.textContent}=${result}`;
      counted = true;
      break;
    default:
      console.log('Нет таких значений');
  }
}

function checkCounted() {
  if (counted == true) {
    expOut.textContent = '';
    counted = false;
  }
}