<template lang='pug'>
  v-container
    v-row(justify='space-between')
      v-col
        h2 Merge Sort
      v-col.hide-portrait-phone(cols=3  align='start')
        div(:style="{width: '80%'}")
          v-select(
            dense
            hide-details
            :items="allowablePartitionPlacements"
            outlined
            label='Pivot Point'
            v-model="partitionPlacement"
          )
      v-col.hide-portrait-phone(cols=3 align='start')
        div(:style="{width: '90%'}")
          v-select(
            dense
            hide-details
            :items="allowableSpeeds"
            outlined
            label='Speed'
            v-model="speed"
          )
      v-col.hide-portrait-phone
        v-row(justify='end')
          v-col(align='center' cols=6 md=2)
            v-icon(@click="start") mdi-play
          v-col(align='center' cols=6 md=2)
            v-icon(@click="shuffle") mdi-shuffle
    v-row.hide-above-portait
      v-col
        h3 Please rotate your device for the best experience
    v-row.bar-row.hide-portrait-phone
      v-col.bar-col
        div.bar(v-for="(bar, index) in bars" :style="{height: `${bar.height}%`, backgroundColor: determineBackgroundColor(bar)}")
    v-row.hide-portrait-phone
      v-col
        h4 Color Key:
    v-row.hide-portrait-phone
      v-col(cols=4)
        v-row
          v-col(cols=5 md=3)
            div.color-box.blue-box
            h5 Blue:
          v-col
            h5 Pivot Point
      v-col(cols=4)
        v-row
          v-col(cols=5 md=3)
            div.color-box.red-box
            h5 Red:
          v-col
            h5 Target Index
      v-col(cols=4)
        v-row
          v-col(cols=5)
            h5 Resulting Time:
          v-col
            h5 {{ displayTime }}
    
</template>

<script>
import { allowableSpeeds, allowablePartitionPlacements } from '@/data/constants'
import { createSource } from '@/util/'
import mergeSort from '@/util/mergeSort'
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
      const sortedBars = await mergeSort(barsCopy, this.updateProgress, this.speed)
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
    align-items: center
  .bar-row
    display: flex
    align-items: flex-end
    height: 55vh
  .color-box
    height: 15px
    width: 15px
    float: left
    margin-right: 20px
    @media screen and (min-width: 600px)
      margin-right: 10px
  .red-box
    background-color: red
  .blue-box
    background-color: blue
  .hide-portrait-phone
    @media screen and (max-width: 600px)
      display: none
  .hide-above-portait
    @media screen and (min-width: 600px)
      display: none
  
</style>