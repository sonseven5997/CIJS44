dividebytwo = (arr,f) => {
  let newArr = []
  f = (element) => {
    if (element%2 == 0) {
      newArr.push(element)
    }
  }
  for (let i=0; i<arr.length; i++) {
    f(arr[i])
  }
  return newArr
} 

differentElement = (a1,a2) => {
  let newArr = a1.concat(a2)
  let sortedArr = newArr.filter((item,index) => newArr.indexOf(item) === index)
  return sortedArr
}