import throttle from 'lodash.throttle';

const form = document.querySelector(`.feedback-form`);
console.log(form)
form.addEventListener(`input`, throttle(onInput, 500));
//застосовую throttle - контролює кількість разів, яку функція може бути викликана протягом певного проміжку часу
form.addEventListener(`submit`, onSubmit);

let LOCALSTORAGE_KEY = "feedback-form-state";

let dataForm = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
const { email, message } = form.elements;
//console.log(form.elements) [input, textarea, button, email: input, message: textarea]
downloadPage();// виклик ф-ї для перевірки: Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.

function onInput() {
  dataForm = { email: email.value, message: message.value };
  //console.log(dataForm)// збередження даних, що ввів користувач
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataForm));
  //запис до localStorage з ключем LOCALSTORAGE_KEY, значення перетвор в JSON
   console.log(localStorage)
}

function downloadPage() {
  if (dataForm) {
    email.value = dataForm.email || ``;
    console.log(dataForm.email)
    message.value = dataForm.message || ``;
    console.log(dataForm.message)
  }  
}

//Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
function onSubmit(e) {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(LOCALSTORAGE_KEY);
  e.currentTarget.reset();
  dataForm = {};
  console.log(dataForm)
}




/*Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.*/



