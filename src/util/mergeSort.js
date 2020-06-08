import { waitForMs } from './index' //

const waitAndUpdateState = async (waitDuration, callback, baseSortedArray, firstArray, secondArray) => {
  // resetColor(baseSortedArray, callback)
  // resetColor(firstArray, callback)
  // resetColor(secondArray, callback)
  await waitForMs(waitDuration)
  // firstArray[0].isPivot = true
  // secondArray[0].isTarget = true
  const progressArray =  baseSortedArray.concat(firstArray, secondArray)
  callback(progressArray)
}

const mergeSort = async (firstArray, secondArray, callback, waitDuration) => {
  const sortedArray = []
  while(firstArray.length && secondArray.length){
    await waitAndUpdateState(waitDuration, callback, sortedArray, firstArray, secondArray)
    if(firstArray[0]['height'] < secondArray[0]['height']){
      sortedArray.push(firstArray[0])
      firstArray.shift()
    } else {
      sortedArray.push(secondArray[0])
      secondArray.shift()
    }
  }
  return sortedArray.concat(firstArray, secondArray)
}

const beginSorting = async (arrayToSort, callback, waitDuration) => {
  if (arrayToSort.length < 2) {
    return arrayToSort;
  }
  const partitionIndex = Math.floor(arrayToSort.length / 2)
  const [ leftPartition, rightPartition ] = await Promise.all([
    beginSorting(arrayToSort.slice(0, partitionIndex), callback, waitAndUpdateState),
    beginSorting(arrayToSort.slice(partitionIndex), callback, waitAndUpdateState)
  ])
  const sortedArray = await mergeSort(leftPartition, rightPartition, callback, waitDuration)
  return sortedArray
}

export default beginSorting