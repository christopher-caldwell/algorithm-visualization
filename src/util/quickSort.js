// const testSet = [56,12,121,11,57]

function swapElements(arr, leftPointer, iterator){
  // capturing the value of the left pointer
  let temp = arr[leftPointer];
  arr[leftPointer]= arr[iterator];
  arr[iterator] = temp;
}

function partition(arr, left, right, isAscendingOrder, callback){
  let pivot = arr[left];
  let  leftPointer = left;
  // starting at left +1 because left will be the pivot
  for(let iterator = left + 1; iterator <= right; iterator++){
    const evaluation = isAscendingOrder
      ? arr[iterator] < pivot
      : arr[iterator] > pivot
    //////////////////////////////////////////////////
    if (evaluation){
      // increment the pointer because the proper evaluation has been made
        leftPointer++;
        swapElements(arr, leftPointer, iterator)
        callback(arr)
    }
  }

  
  // moving the pivot value
  // capturing the value at the left pointer
  const temp = arr[leftPointer];
  arr[leftPointer] = arr[left];
  arr[left] = temp;

  return leftPointer;

}

function sorting(arr, left, right, isAscendingOrder, callback){
  if(left < right) {
    let q = partition(arr, left, right, isAscendingOrder, callback);
    sorting(arr, left, q, isAscendingOrder, callback);
    sorting(arr, q + 1, right, isAscendingOrder, callback);
  }
  return arr
}



export default sorting