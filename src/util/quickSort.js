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

export const quickSortLeftPartition = async (arr, left, right, isAscendingOrder, callback, waitDuration) => {
  if(left < right) {
    let q = await partition(arr, left, right, isAscendingOrder, callback, waitDuration);
    await quickSortLeftPartition(arr, left, q, isAscendingOrder, callback, waitDuration);
    await quickSortLeftPartition(arr, q + 1, right, isAscendingOrder, callback, waitDuration);
  }
  return arr
}


const findMiddleIndexOfPartition = (leftIndex, rightIndex) => {
  return Math.floor((leftIndex + rightIndex) / 2)
}

// const leftIndexIncrementor = (items, leftIndexPointer, objectPropertyToSortBy, pivotItem) => {
//   let leftIndexTarget = items[leftIndexPointer]
//   if(objectPropertyToSortBy){
//     leftIndexTarget = leftIndexTarget[objectPropertyToSortBy]
//   }
//   while (leftIndexTarget < pivotItem) {
//     leftIndexPointer++;
//     leftIndexIncrementor(items, leftIndexPointer, objectPropertyToSortBy, pivotItem)
//   }
// }

// const rightIndexDecrement = (items, rightIndexPointer, objectPropertyToSortBy, pivotItem) => {
//   let rightIndexTarget = items[rightIndexPointer]
//   if(objectPropertyToSortBy){
//     rightIndexTarget = rightIndexTarget[objectPropertyToSortBy]
//   }
//   while (rightIndexTarget > pivotItem) {
//     rightIndexPointer--;
//     rightIndexDecrement(items, rightIndexPointer, objectPropertyToSortBy, pivotItem)
//   }
// }

// const standardPartitionHandler = (leftIndexPointer, rightIndexPointer, items, pivotItem, objectPropertyToSortBy) => {
//   while (leftIndexPointer <= rightIndexPointer) {
//     while (items[leftIndexPointer][objectPropertyToSortBy] < pivotItem) {
//       leftIndexPointer++;
//     }
//     while (items[rightIndexPointer][objectPropertyToSortBy] > pivotItem) {
//       rightIndexPointer--;
//     }
//     if (leftIndexPointer <= rightIndexPointer) {
//       swapElements(items, leftIndexPointer, rightIndexPointer);
//       leftIndexPointer++;
//       rightIndexPointer--;
//     }
//   }
// }

const determinePartitionIndexPosition = async (items, leftIndex, rightIndex, objectPropertyToSortBy, callback, timeToWait) => {
  resetColor(items, callback, true)
  const pivotIndex = findMiddleIndexOfPartition(leftIndex, rightIndex)
  const pivotItem = items[pivotIndex][objectPropertyToSortBy]
  items[pivotIndex].isPivot = true
  callback(items)
  let leftIndexPointer = leftIndex
  let rightIndexPointer = rightIndex
  while (leftIndexPointer <= rightIndexPointer) {
    while (items[leftIndexPointer][objectPropertyToSortBy] < pivotItem) {
      leftIndexPointer++;
    }
    while (items[rightIndexPointer][objectPropertyToSortBy] > pivotItem) {
      rightIndexPointer--;
    }
    if (leftIndexPointer <= rightIndexPointer) {
      // promise.all
      resetColor(items, callback)
      items[leftIndexPointer].isTarget = true
      items[rightIndexPointer].isTarget = true
      await waitForMs(timeToWait)
      callback(items)
      swapElements(items, leftIndexPointer, rightIndexPointer);
      leftIndexPointer++;
      rightIndexPointer--;
    }
  }
  return leftIndexPointer;
}

export const quickSortCenterPartition = async (items, leftIndex, rightIndex, objectPropertyToSortBy, callback, timeToWait) => {
  let index
  if (items.length > 1) {
      index = await determinePartitionIndexPosition(items, leftIndex, rightIndex, objectPropertyToSortBy, callback, timeToWait); //index returned from partition
      if (leftIndex < index - 1) { //more elements on the left side of the pivot
          await quickSortCenterPartition(items, leftIndex, index - 1, objectPropertyToSortBy, callback, timeToWait);
      }
      if (index < rightIndex) { //more elements on the right side of the pivot
          await quickSortCenterPartition(items, index, rightIndex, objectPropertyToSortBy, callback, timeToWait);
      }
  }
  return items;
}