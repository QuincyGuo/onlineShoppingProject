<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <FloorA v-for="(floor) in floorList"
            :key="floor.id"
            :list='floor'></FloorA>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import FloorA from './Floor'
import { mapState } from 'vuex'
export default {
  name: 'RouterHome',
  components: {
    ListContainer,
    FloorA,
  },

  // 这里将floor组件数据的发送请求和获取到数据写到home组件中，而不是写到floor组件里，是因为由mock返回的数据floorList是一个数组，包含两个对象，分别是两个floor组件的数据。
  mounted () {
    // 派发一个action，通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch('getFloorList');
  },
  computed: {
    ...mapState({
      // 获取到floor数据并存储到floorList计算属性中
      floorList: state => state.home.floorList,
    }),


  },
}
</script>

<style scoped lang='less'>
</style>
