<template lang='pug'>
  v-container
    v-row(justify='space-between')
      v-col(cols=3)
        h1 Quick Sort
      v-col(cols=3 align='start')
        div(:style="{width: '80%'}")
          v-select(
            :items="allowablePartitionPlacements"
            outlined
            label='Partition Placement'
            v-model="partitionPlacement"
          )
      v-col(cols=3 align='start')
        div(:style="{width: '80%'}")
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
      v-col(cols=4)
        v-row
          v-col(cols=7)
            h3 Resulting Time:
          v-col
            h3 {{ displayTime }}
    
</template>

<script>
import { allowableSpeeds, allowablePartitionPlacements } from '@/data/constants'
import { createSource } from '@/util/'
import { quickSortCenterPartition, quickSortLeftPartition } from '@/util/quickSort'
export default {
  name: 'QuickSort',
  data(){
    return {
      bars: [],
      speed: 0,
      partitionPlacement: 'Left',
      numberOfBars: 100,
      elapsedTime: 0,
      allowableSpeeds: Object.values(allowableSpeeds),
      allowablePartitionPlacements
    }
  },
  computed: {
    displayTime(){
      if(!this.elapsedTime){
        return ''
      } else {
        const formattedTime = (this.elapsedTime / 1000).toFixed(2)
        return `${formattedTime} seconds`
      }
    }
  },
  methods: {
    async start(){
      console.log('start')
      const beginTime = Date.now()
      const barsCopy = [...this.bars]
      const sortedBars = this.partitionPlacement === 'Left'
        ? await quickSortLeftPartition(barsCopy, 0, barsCopy.length - 1, false, this.updateProgress, this.speed)
        : await quickSortCenterPartition(barsCopy, 0, barsCopy.length - 1, false, this.updateProgress, this.speed)
      const endTime = Date.now()
      const resultingTime = endTime - beginTime
      this.elapsedTime = resultingTime
      console.log('sorted bars', sortedBars)
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