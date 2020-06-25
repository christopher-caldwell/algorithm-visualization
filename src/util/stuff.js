const findMiddleIndexOfPartition = (leftIndex, rightIndex) => {
  return Math.floor((leftIndex + rightIndex) / 2)
}

const swapElements = (arr, leftPointer, iterator) => {
  // capturing the value of the left pointer
  let temp = arr[leftPointer]
  arr[leftPointer] = arr[iterator]
  arr[iterator] = temp
}

const partition = (arr, left, right, isAscendingOrder) => {
  arr[left].isPivot = true
  let pivot = arr[left];
  let leftPointer = left;
  // starting at left +1 because left will be the pivot
  for (let iterator = left + 1; iterator <= right; iterator++) {
    arr[iterator].isTarget = true
    const evaluation = isAscendingOrder
      ? arr[iterator]['height'] < pivot['height']
      : arr[iterator]['height'] > pivot['height']
    //////////////////////////////////////////////////
    if (evaluation) {
      // increment the pointer because the proper evaluation has been made
      leftPointer++;
      swapElements(arr, leftPointer, iterator)
    }
  }

const determinePartitionIndexPosition = async (items, leftIndex, rightIndex, objectPropertyToSortBy) => {
  const pivotIndex = findMiddleIndexOfPartition(leftIndex, rightIndex)
  const pivotItem = items[pivotIndex][objectPropertyToSortBy]
  items[pivotIndex].isPivot = true
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
      items[leftIndexPointer].isTarget = true
      items[rightIndexPointer].isTarget = true
      swapElements(items, leftIndexPointer, rightIndexPointer);
      leftIndexPointer++;
      rightIndexPointer--;
    }
  }
  return leftIndexPointer;
}

const quickSortCenterPartition = (items, leftIndex, rightIndex, objectPropertyToSortBy) => {
  let index
  if (items.length > 1) {
    index = determinePartitionIndexPosition(items, leftIndex, rightIndex, objectPropertyToSortBy); //index returned from partition
    if (leftIndex < index - 1) { //more elements on the left side of the pivot
      quickSortCenterPartition(items, leftIndex, index - 1, objectPropertyToSortBy);
    }
    if (index < rightIndex) { //more elements on the right side of the pivot
      quickSortCenterPartition(items, index, rightIndex, objectPropertyToSortBy);
    }
  }
  return items;
}
