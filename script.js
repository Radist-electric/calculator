const num = document.querySelector('#number'),
  expOut = document.querySelector('.calc__expression'),
  buttons = document.querySelectorAll('.calc__button');
let result = 0,
  counted = false;

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

/* Изменяем значение инпута при вводе чисел с клавиатцуры калькулятора */
function changeInput(val) {
  if (counted == true) {
    num.value = '';
    expOut.textContent = '';
    counted = false;
  }
  num.value = num.value + val;
}

/* Действия при нажатии кнопок калькулятора, которые являются не цифрами */
function defineOperation(val) {
  switch (val) {
    case 'div':
      console.log('Деление');
      checkCounted();
      divide();
      num.value = '';
      break;
    case 'mul':
      console.log('Умножение');
      checkCounted();
      multiply();
      num.value = '';
      break;
    case 'minus':
      console.log('Вычитание');
      checkCounted();
      minus();
      break;
    case 'plus':
      console.log('Сложение');
      checkCounted();
      plus();
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
      dot();
      break;
    case 'back':
      console.log('Стереть число');
      checkCounted();
      backspace();
      break;
    case 'del':
      console.log('Сброс полей');
      del();
      break;
    case 'equal':
      console.log('Вычислить');
      equal();
      break;
    default:
      console.log('Нет таких значений');
  }
}

/* Перед вводом числа проверяем, а не закончили ли мы счёт в предыдущем действии. Если закончили, то очищаем поле вывода. */
function checkCounted() {
  if (counted == true) {
    expOut.textContent = '';
    counted = false;
  }
}

/* Функция вычисления */
function equal() {
  console.log('equal()');
  if (num.value.length == 0) {
    return
  }
  console.log(num.value);
  if (num.value[0] == '-') {
    console.log('-');
    expOut.textContent = `${expOut.textContent}(${num.value})`;
  } else {
    console.log('not -');
    expOut.textContent = `${expOut.textContent}${num.value}`;
  }
  result = eval(expOut.textContent);
  console.log(result);
  num.value = result;
  console.log(num.value);
  expOut.textContent = `${expOut.textContent}=${result}`;
  console.log(expOut.textContent);
  counted = true;
  console.log('counted');
}

/* Функция сложения */
function plus() {
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
    } else {
      num.value = num.value + '.';
    }
  }
}

/* Проверить, не является ли последний символ в выражении математическим знаком, иначе новый знак не добавляем */
function checkLastSymbol() {
  let symbol = expOut.textContent[expOut.textContent.length - 1];
  console.log(symbol);
  return (num.value.length == 0 && (symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/' || symbol == undefined));
}




/* Слушаем нажатие кнопок клавиатуры */
document.addEventListener('keydown', function (event) {
  console.log(event.code);
  console.log(event.key);
  switch (event.key) {
    case 'Enter':
      console.log('Нажат Enter');

      break;
    case '+':
      console.log('Нажат +');
      plus();
      break;
    case '-':
      console.log('Нажат -');
      minus();
      break;
    case '*':
      console.log('Нажат *');
      multiply();
      break;
    case '/':
      console.log('Нажат /');
      divide();
      break;
    case 'Backspace':
      console.log('Нажат backspace');
      backspace();
      break;
    case 'Delete':
      console.log('Нажата delete');
      del();
      break;
    case '.':
      console.log('Нажата точка');
      dot();
      break;
    default:
      console.log('Нам не нужет такой код');
  }
});