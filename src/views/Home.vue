<template lang='pug'>
  v-container
    v-row(justify='space-between')
      v-col(cols=3)
        h1 Quick Sort
      v-col(cols=3)
        v-text-field(
          outlined
          label='Number of bars'
          :value="numberOfBars"
          @input="updateBars"
        )
      v-col(align='center' cols=3)
        v-btn(@click="start") Start
    v-row.bar-row
      v-col.bar-col
        div.bar(v-for="(bar, index) in bars" :style="{height: `${bar}%`}")
</template>

<script>
import { createSource } from '@/util/generateSource'
import quickSort from '@/util/quickSort'
export default {
  name: 'Home',
  data(){
    return {
      bars: [],
      numberOfBars: Math.floor(Math.random() * 200)
    }
  },
  methods: {
    start(){
      console.log('start')
      const barsCopy = [...this.bars]
      const sortedBars = quickSort(barsCopy, 0, barsCopy.length - 1, true, this.updateProgress)
      console.log('sorted bars', sortedBars)
      this.bars = sortedBars
      console.log('done')
    },
    updateBars(newNumberOfBars){
      this.numberOfBars = newNumberOfBars
      this.bars = createSource(newNumberOfBars)
    },
    updateProgress(newBarPositions){
      this.bars = newBarPositions
    }
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