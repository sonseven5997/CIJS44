console.log('Hello world!')
let str = 'day la 1 string'
console.log(str.startsWith('day'))

let a = new Array()
let arr = [1,2,3,4]
arr.push(6)
arr.unshift(0)
arr.pop()
console.log(arr)

let x2 = (number) => number*2

console.log(x2(10))

let arr2 = [2,4,6,8,10]
let arr3 = []

// for(let i=0; i<arr2.length; i++){
//     arr3.push(x2(arr2[i]))
// }

arr3 = arr2.map(x => x2(x))

console.log(arr3)

let buttonDemo = document.getElementById('demo')
let heading1 = document.querySelector('h1')
buttonDemo.addEventListener('click', (e) => {
    console.log('Button clicked')
    heading1.style = 'display : none'
})