// Задание 1 

const btn = document.querySelector('.j-btn-test');


let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

console.log(scrollHeight)

let scrollWidth = Math.max(
  document.body.scrollWidth, document.documentElement.scrollWidth,
  document.body.offsetWidth, document.documentElement.offsetWidth,
  document.body.clientWidth, document.documentElement.clientWidth
);

console.log(scrollWidth)

  btn.addEventListener('click', () => {
    alert(`Высота: ${scrollHeight} Ширина: ${scrollWidth}`)
  });


