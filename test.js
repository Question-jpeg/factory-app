// // const pushItem = async (id) => {
// //   let counter = 0;

// //   const aboba = setInterval(() => {
// //     console.log(id, ++counter);
// //     if (counter === 10) clearInterval(aboba)
// //   }, 1000);
// // };

// // pushItem(1)
// // setTimeout(() => {
// //   pushItem(2)
// // }, 3500);

// // const a = {
// //   4: { index: 0, list: [['a-b'], ['a-c']] }
// // }

// // const { index, list } = a[4]
// // a[4].index++
// // console.log(index);
// // console.log(a[4].index);

// const b = []

// console.log('[]', b[5]);
// b[5] = 'test'
// console.log('b[5]', b);
// console.log('b[4]', b[4]);
// console.log('b[5]', b[5]);

// const a = setTimeout(() => {
//   console.log("alo");
// }, 3000);

// setTimeout(() => {
//   clearInterval(a);
// }, 2000);

// console.log(0 ?? 1);

const a = {
  a: 1,
  b: 2,
  c: 3,
};

Object.keys(a).forEach((key) => (a[key] = { value: a[key] }));
console.log(a);
