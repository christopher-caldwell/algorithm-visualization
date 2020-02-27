import shuffle from 'simple-array-shuffler'

export const waitForMs = msToWait => {
  return new Promise(resolve => setTimeout(resolve, msToWait))
}

export const swapElements = (arr, leftPointer, iterator) => {
  // capturing the value of the left pointer
  let temp = arr[leftPointer]
  arr[leftPointer]= arr[iterator]
  arr[iterator] = temp
}

export const createSource = numberOfBars => {
  const output = []
  for(let i = 0; i < numberOfBars; i++){
    output[i] = {
      height: i + 1,
      isPivot: false,
      isActive: false
    }
  }

  return shuffle(output)
}
