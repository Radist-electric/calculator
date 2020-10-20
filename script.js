const num = document.querySelector('#number'),
  expOut = document.querySelector('.calc__expression'),
  buttons = document.querySelectorAll('.calc__button');
let result = 0,
  counted = false;
// inputFocused = false;

/* Определяем, есть ли фокус на поле ввода */
// num.onfocus = function () {
//   inputFocused = true;
// }
// num.onblur = function () {
//   inputFocused = false;
// }

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
// num.oninput = function () {
//   num.textContent = num.textContent.replace(/[^.\d]+/g, "").replace(/^([^\.]*\.)|\./g, '$1');
// }

/* Изменяем значение инпута при вводе чисел с клавиатуры калькулятора */
function changeInput(val) {
  if (counted == true) {
    num.textContent = '';
    expOut.textContent = '';
    counted = false;
  }
  if (num.textContent == '0') {
    num.textContent = ''
  } else if (num.textContent == '-0') {
    num.textContent = '-'
  }
  num.textContent = num.textContent + val;
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
  if (num.textContent.length == 0 || counted == true) {
    return
  }
  checkInput();
  if (num.textContent[0] == '-') {
    expOut.textContent = `${expOut.textContent}(${num.textContent})`;
  } else {
    expOut.textContent = `${expOut.textContent}${num.textContent}`;
  }
  result = eval(expOut.textContent);
  if (result == Infinity || result == -Infinity || isNaN(result)) {
    result = 'Бесконечность';
  }
  num.textContent = result;
  expOut.textContent = `${expOut.textContent}=${result}`;
  counted = true;
}

/* Функция сложения */
function plus() {
  checkCounted();
  checkInput();
  if (!checkLastSymbol()) {
    if (num.textContent[0] == '-') {
      expOut.textContent = `${expOut.textContent}(${num.textContent})+`;
    } else {
      expOut.textContent = `${expOut.textContent}${num.textContent}+`;
    }
  }
  num.textContent = '';
}

/* Функция вычитания */
function minus() {
  checkCounted();
  checkInput();
  if (!checkLastSymbol()) {
    if (num.textContent[0] == '-') {
      expOut.textContent = `${expOut.textContent}(${num.textContent})-`;
    } else {
      expOut.textContent = `${expOut.textContent}${num.textContent}-`;
    }
  }
  num.textContent = '';
}

/* Функция умножения */
function multiply() {
  checkCounted();
  checkInput();
  if (!checkLastSymbol()) {
    if (num.textContent[0] == '-') {
      expOut.textContent = `${expOut.textContent}(${num.textContent})*`;
    } else {
      expOut.textContent = `${expOut.textContent}${num.textContent}*`;
    }
  }
  num.textContent = '';
}

/* Функция деления */
function divide() {
  checkCounted();
  checkInput();
  if (!checkLastSymbol()) {
    if (num.textContent[0] == '-') {
      expOut.textContent = `${expOut.textContent}(${num.textContent})/`;
    } else {
      expOut.textContent = `${expOut.textContent}${num.textContent}/`;
    }
  }
  num.textContent = '';
}

/* Функция backspace */
function backspace() {
  // if (inputFocused) {
  //   return
  // }
  if (num.textContent.length > 1) {
    num.textContent = num.textContent.slice(0, num.textContent.length - 1);
  } else {
    num.textContent = '0'
  }
}

/* Функция очистки полей */
function del() {
  num.textContent = '0';
  expOut.textContent = '';
}

/* Функция добавления десятичной точки */
function dot() {
  checkCounted();
  if (!num.textContent.match(/\./)) {
    if (num.textContent.length == 0) {
      num.textContent = '0.'
    } else if (num.textContent != 'Бесконечность') {
      num.textContent = num.textContent + '.';
      counted = false;
      // expOut.textContent = '';
    }
  }
}

/* Функция смены знака числа */
function changeSign() {
  checkCounted();
  let len = num.textContent.length;
  if (num.textContent == '-') {
    num.textContent = '0'
  } else if (num.textContent == '0') {
    num.textContent = '-'
  } else if (len == 0 || (len > 0 && num.textContent[0] != '-')) {
    num.textContent = '-' + num.textContent;
  } else {
    num.textContent = num.textContent.substring(1, len);
  }
}

/* Перед вводом числа проверяем, а не закончили ли мы счёт в предыдущем действии. Если закончили, то очищаем поле вывода. */
function checkCounted() {
  if (counted == true) {
    expOut.textContent = '';
    counted = false;
    if (num.textContent == 'Бесконечность') {
      num.textContent = '';
    }
  }
}

/* Проверить, не является ли последний символ в выражении математическим знаком, иначе новый знак не добавляем */
function checkLastSymbol() {
  let symbol = expOut.textContent[expOut.textContent.length - 1];
  return (num.textContent.length == 0 && (symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/' || symbol == undefined));
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
      if (+event.key >= 0 && +event.key <= 9) {
        changeInput(event.key);
      } else {
        console.log('Нам не нужет такой код');
      }
  }
});

function checkInput() {
  if (num.textContent == '-' || num.textContent == '-.') {
    num.textContent = '0'
  }
  if (eval(num.textContent) == '0' || eval(num.textContent) == '-0') {
    num.textContent = '0'
  }
}