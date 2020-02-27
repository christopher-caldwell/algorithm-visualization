import { swapElements, waitForMs } from './index'

const resetColor = (arr, callback, isPivotReset) => {
  if(isPivotReset){
    arr.forEach(item => {
      item.isPivot = false 
      item.isTarget = false 
    })
    callback(arr)
  } else {
    arr.forEach(item => {
      item.isTarget = false 
    })
    callback(arr)
  }
}

const partition = async (arr, left, right, isAscendingOrder, callback, waitDuration) => {
  resetColor(arr, callback, true)
  arr[left].isPivot = true
  callback(arr)
  let pivot = arr[left];
  let  leftPointer = left;
  // starting at left +1 because left will be the pivot
  for(let iterator = left + 1; iterator <= right; iterator++){
    resetColor(arr, callback)
    arr[iterator].isTarget = true
    await waitForMs(waitDuration)
    callback(arr)
    const evaluation = isAscendingOrder
      ? arr[iterator]['height'] < pivot['height']
      : arr[iterator]['height'] > pivot['height']
    //////////////////////////////////////////////////
    if (evaluation){
      // increment the pointer because the proper evaluation has been made
        leftPointer++;
        swapElements(arr, leftPointer, iterator)
    }
  }

  
  // moving the pivot value
  // capturing the value at the left pointer
  const temp = arr[leftPointer];
  arr[leftPointer] = arr[left];
  arr[left] = temp;
  return leftPointer;

}

const sorting = async (arr, left, right, isAscendingOrder, callback, waitDuration) => {
  if(left < right) {
    let q = await partition(arr, left, right, isAscendingOrder, callback, waitDuration);
    await sorting(arr, left, q, isAscendingOrder, callback, waitDuration);
    await sorting(arr, q + 1, right, isAscendingOrder, callback, waitDuration);
  }
  return arr
}



export default sorting