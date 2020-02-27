<template lang='pug'>
  v-container
    v-row(justify='space-between')
      v-col(cols=3)
        h1 Quick Sort
      v-col(cols=3)
        v-text-field(
          select
          :items="[]"
          outlined
          label='Speed'
          v-model="speed"
        )
      v-col(align='center' cols=3)
        v-btn(@click="start") Start
    v-row.bar-row
      v-col.bar-col
        div.bar(v-for="(bar, index) in bars" :style="{height: `${bar}%`}")
</template>

<script>
import { createSource } from '@/util/'
// import { swapElements } from '@/util/quickSort'
export default {
  name: 'Home',
  data(){
    return {
      bars: [],
      speed: '',
      numberOfBars: 150
    }
  },
  methods: {
    async start(){
      console.log('start')
      const barsCopy = [...this.bars]
      const sortedBars = await this.quickSort(barsCopy, 0, barsCopy.length - 1, true, this.updateProgress)
      console.log('sorted bars', sortedBars)
      // this.bars = sortedBars
      console.log('done')
    },
    waitOn(ms){
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async swapElements(arr, leftPointer, iterator){
      // capturing the value of the left pointer
      let temp = arr[leftPointer];
      arr[leftPointer]= arr[iterator];
      arr[iterator] = temp;
      await this.waitOn(100)
      this.bars = [...arr]
    },
    async partition(arr, left, right, isAscendingOrder){
      let pivot = arr[left];
      let  leftPointer = left;
      // starting at left +1 because left will be the pivot
      for(let iterator = left + 1; iterator <= right; iterator++){
        // await waitFor(200)
        const evaluation = isAscendingOrder
          ? arr[iterator] < pivot
          : arr[iterator] > pivot
        //////////////////////////////////////////////////
        if (evaluation){
          // increment the pointer because the proper evaluation has been made
            leftPointer++;
            await this.swapElements(arr, leftPointer, iterator)
        }
      } 
      // moving the pivot value
      // capturing the value at the left pointer
      const temp = arr[leftPointer];
      arr[leftPointer] = arr[left];
      arr[left] = temp;

      return leftPointer;
    },
    async quickSort(arr, left, right, isAscendingOrder){
      if(left < right) {
        let q = await this.partition(arr, left, right, isAscendingOrder);
        await this.quickSort(arr, left, q, isAscendingOrder);
        await this.quickSort(arr, q + 1, right, isAscendingOrder);
      }
      return arr
    },
  },
  mounted(){
    this.bars = createSource(this.numberOfBars)
  }
}
</script>

<style lang='sass'>
  .bar
    width: 10px
    background-color: white
    margin: 0 3px
  .bar-col
    height: 100%
    display: flex
    align-items: flex-end
  .bar-row
    display: flex
    align-items: flex-end
    height: 75vh
</style>