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
  return Math.floor((rightIndex + leftIndex) / 2)
}

const ascendingOrderSort = (items, leftIndex, rightIndex, objectPropertyToSortBy, pivotItem) => {
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
          swapElements(items, leftIndexPointer, rightIndexPointer);
          leftIndexPointer++;
          rightIndexPointer--;
      }
  }
  return leftIndex
}

const descendingOrderSort = (items, leftIndex, rightIndex, objectPropertyToSortBy, pivotItem) => {
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
          swapElements(items, rightIndexPointer, leftIndexPointer);
          leftIndexPointer++;
          rightIndexPointer--;
      }
  }
  return leftIndex
}

const determinePartitionIndexPosition = (items, leftIndex, rightIndex, objectPropertyToSortBy, isSortingInAscendingOrder) => {
  const pivotIndex = findMiddleIndexOfPartition(leftIndex, rightIndex)
  const pivotItem = items[pivotIndex][objectPropertyToSortBy]
  let leftIndexPointer
  if(isSortingInAscendingOrder){
    leftIndexPointer = ascendingOrderSort(items, leftIndex, rightIndex, objectPropertyToSortBy, pivotItem)
  } else {
    leftIndexPointer = descendingOrderSort(items, leftIndex, rightIndex, objectPropertyToSortBy, pivotItem)
  }
  return leftIndexPointer;
}

export const quickSortCenterPartition = (items, leftIndex, rightIndex, objectPropertyToSortBy, isSortingInAscendingOrder) => {
  if (items.length < 1) { return items }
  let index
  index = determinePartitionIndexPosition(items, leftIndex, rightIndex, objectPropertyToSortBy, isSortingInAscendingOrder); 
  // more elements on the left side of the pivot
  if (leftIndex < index - 1) { 
    quickSortCenterPartition(items, leftIndex, index - 1, objectPropertyToSortBy, isSortingInAscendingOrder);
  }
  //more elements on the right side of the pivot
  if (index < rightIndex) { 
    quickSortCenterPartition(items, index, rightIndex, objectPropertyToSortBy);
  }
  return items;
}