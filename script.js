const num = document.querySelector('#number'),
  expOut = document.querySelector('.calc__expression'),
  buttons = document.querySelectorAll('.calc__button');
let result = 0,
  counted = false,
  inputFocused = false;

/* Определяем, есть ли фокус на поле ввода */
num.onfocus = function () {
  inputFocused = true;
}
num.onblur = function () {
  inputFocused = false;
}

/* Прослушиваем события нажатие на кнопки калькулятора */
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
/* Прослушиваем ввод символов с клавиатуры и вырезаем всё, кроме чисел */
num.oninput = function () {
  num.value = num.value.replace(/[^.\d]+/g, "").replace(/^([^\.]*\.)|\./g, '$1');
}

/* Изменяем значение инпута при вводе чисел с клавиатуры калькулятора */
function changeInput(val) {
  if (counted == true) {
    num.value = '';
    expOut.textContent = '';
    counted = false;
  }
  num.value = num.value + val;
}

/* Действия при нажатии кнопок калькулятора, которые не являются цифрами */
function defineOperation(val) {
  switch (val) {
    case 'div':
      divide();
      break;
    case 'mul':
      multiply();
      break;
    case 'minus':
      minus();
      break;
    case 'plus':
      plus();
      break;
    case 'change':
      changeSign();
      break;
    case 'dot':
       dot();
      break;
    case 'back':
      checkCounted();
      backspace();
      break;
    case 'del':
      del();
      break;
    case 'equal':
      equal();
      break;
    default:
      console.log('Нет таких значений');
  }
}

/* Функция вычисления */
function equal() {
  if (num.value.length == 0 || counted == true) {
    return
  }
  if (num.value[0] == '-') {
    expOut.textContent = `${expOut.textContent}(${num.value})`;
  } else {
    expOut.textContent = `${expOut.textContent}${num.value}`;
  }
  result = eval(expOut.textContent);
  if (result == Infinity || result == -Infinity) {
    result = 'Бесконечность';
  }
  num.value = result;
  expOut.textContent = `${expOut.textContent}=${result}`;
  counted = true;
}

/* Функция сложения */
function plus() {
  checkCounted();
  if (!checkLastSymbol()) {
    if (num.value[0] == '-') {
      expOut.textContent = `${expOut.textContent}(${num.value})+`;
    } else {
      expOut.textContent = `${expOut.textContent}${num.value}+`;
    }
  }
  num.value = '';
}

/* Функция вычитания */
function minus() {
  checkCounted();
  if (!checkLastSymbol()) {
    if (num.value[0] == '-') {
      expOut.textContent = `${expOut.textContent}(${num.value})-`;
    } else {
      expOut.textContent = `${expOut.textContent}${num.value}-`;
    }
  }
  num.value = '';
}

/* Функция умножения */
function multiply() {
  checkCounted();
  if (!checkLastSymbol()) {
    if (num.value[0] == '-') {
      expOut.textContent = `${expOut.textContent}(${num.value})*`;
    } else {
      expOut.textContent = `${expOut.textContent}${num.value}*`;
    }
  }
  num.value = '';
}

/* Функция деления */
function divide() {
  checkCounted();
  if (!checkLastSymbol()) {
    if (num.value[0] == '-') {
      expOut.textContent = `${expOut.textContent}(${num.value})/`;
    } else {
      expOut.textContent = `${expOut.textContent}${num.value}/`;
    }
  }
  num.value = '';
}

/* Функция backspace */
function backspace() {
  if (inputFocused) {
    return
  }
  if (num.value.length > 0) {
    num.value = num.value.slice(0, num.value.length - 1);
  }
}

/* Функция очистки полей */
function del() {
  num.value = '';
  expOut.textContent = '';
}

/* Функция добавления десятичной точки */
function dot() {
  if (!num.value.match(/\./)) {
    if (num.value.length == 0) {
      num.value = num.value + '0.';
    } else if (num.value != 'Бесконечность') {
      num.value = num.value + '.';
      counted = false;
      expOut.textContent = '';
    }
  }
}

/* Функция смены знака числа */
function changeSign() {
  checkCounted();
  if (num.value.length > 0 && num.value[0] != '-') {
    num.value = '-' + num.value;
  } else {
    num.value = num.value.substring(1, num.value.length);
  }
}

/* Перед вводом числа проверяем, а не закончили ли мы счёт в предыдущем действии. Если закончили, то очищаем поле вывода. */
function checkCounted() {
  if (counted == true) {
    expOut.textContent = '';
    counted = false;
    if(num.value == 'Бесконечность') {
      num.value = '';
    }
  }
}

/* Проверить, не является ли последний символ в выражении математическим знаком, иначе новый знак не добавляем */
function checkLastSymbol() {
  let symbol = expOut.textContent[expOut.textContent.length - 1];
  return (num.value.length == 0 && (symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/' || symbol == undefined));
}

/* Слушаем нажатие кнопок клавиатуры */
document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'Enter':
      equal();
      break;
    case '=':
      equal();
      break;
    case '+':
      plus();
      break;
    case '-':
      minus();
      break;
    case '*':
      multiply();
      break;
    case '/':
      divide();
      break;
    case 'Backspace':
      backspace();
      break;
    case 'Delete':
      del();
      break;
    case '.' || ',':
      dot();
      break;
    case 'Control':
      changeSign();
      break;
    default:
      if (+event.key >= 0 && +event.key <= 9 && inputFocused == false) {
        changeInput(event.key);
      } else {
        console.log('Нам не нужет такой код');
      }
  }
});