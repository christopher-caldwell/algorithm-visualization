<template lang='pug'>
  v-container
    v-row(justify='space-between')
      v-col(cols=3)
        h1 Quick Sort
      v-col(cols=3 align='center')
        v-select(
          :items="allowableSpeeds"
          outlined
          label='Speed'
          v-model="speed"
        )
      v-col
        v-row(justify='end')
          v-col(align='center' cols=1)
            v-icon(@click="start") mdi-play
          v-col(align='center' cols=1)
            v-icon(@click="shuffle") mdi-shuffle
    v-row.bar-row
      v-col.bar-col
        div.bar(v-for="(bar, index) in bars" :style="{height: `${bar.height}%`, backgroundColor: determineBackgroundColor(bar)}")
    v-row
      v-col
        h2 Color Key:
    v-row
      v-col(cols=4)
        v-row
          v-col(cols=4)
            div.color-box.blue-box
            h3 Blue:
          v-col
            h3 Pivot Point
      v-col(cols=4)
        v-row
          v-col(cols=4)
            div.color-box.red-box
            h3 Red:
          v-col
            h3 Target Index
    
</template>

<script>
import { allowableSpeeds } from '@/data/constants'
import { createSource } from '@/util/'
import quickSort from '@/util/quickSort'
export default {
  name: 'QuickSort',
  data(){
    return {
      bars: [],
      speed: '',
      numberOfBars: 100,
      allowableSpeeds: Object.values(allowableSpeeds)
    }
  },
  methods: {
    async start(){
      console.log('start')
      const barsCopy = [...this.bars]
      const sortedBars = await quickSort(barsCopy, 0, barsCopy.length - 1, false, this.updateProgress, this.speed)
      console.log('sorted bars', sortedBars)
      // this.bars = sortedBars
      console.log('done')
    },
    updateProgress(newBarsPosition){
      this.bars = [...newBarsPosition]
    },
    shuffle(){
      this.bars = createSource(this.numberOfBars)
    },
    determineBackgroundColor(bar){
      if(bar.isPivot){
        return 'blue'
      } else if(bar.isTarget){
        return 'red'
      } else {
        return 'white'
      } 
    }
  },
  mounted(){
    this.shuffle()
  }
}
</script>

<style lang='sass'>
  .bar
    width: 10px
    // background-color: white
    margin: 0 3px
  .bar-col
    height: 100%
    display: flex
    align-items: flex-end
  .bar-row
    display: flex
    align-items: flex-end
    height: 65vh
  .color-box
    height: 20px
    width: 20px
    float: left
    margin-right: 20px
  .red-box
    background-color: red
  .blue-box
    background-color: blue
</style>