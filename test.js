// const pushItem = async (id) => {
//   let counter = 0;

//   const aboba = setInterval(() => {
//     console.log(id, ++counter);
//     if (counter === 10) clearInterval(aboba)
//   }, 1000);
// };

// pushItem(1)
// setTimeout(() => {
//   pushItem(2)
// }, 3500);


const a = {
  4: { index: 0, list: [['a-b'], ['a-c']] }
}

const { index, list } = a[4]
a[4].index++
console.log(index);
console.log(a[4].index);
