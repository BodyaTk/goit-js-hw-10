// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('[name="delay"]');

const userValue = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(input.value);
  const shouldResolve = form.elements.state.value;
  if (!shouldResolve) {
    iziToast.warning({
      position: 'topCenter',
      message: '❗ Please select Fulfilled or Rejected before starting',
    });
    return;
  }
  event.preventDefault();
  userValue(delay, shouldResolve)
    .then(item =>
      iziToast.success({
        position: 'topCenter',
        message: `✅ Fulfilled promise in ${item}ms`,
      })
    )
    .catch(error =>
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topCenter',
      })
    );
  form.reset();
});
