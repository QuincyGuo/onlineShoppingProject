<template>
  <div class="swiper-container"
       id="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(carousel) in list"
           :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';  // 引入Swiper的js包
export default {
  name: 'CarouselA',
  props: ['list'],	// 数据需要其他组件传递进来
  watch: {  // 此处也可以写在mounted里，因为组件本身没有发送请求数据行为，数据是由父组件传递过来的，和组件本身的DOM更新没有关系
    immediate: true,  // 此处要加这句是，这个数据是父组件传过来的，后面再没有变化过，所以watch监听不到变化，里面的语句没执行，所以轮播图不起作用。加上这句表示，数据立即监听，不论数据有无发生变化。
    bannerList: {   // 如果 bannerList 属性值发生改变，这个函数就会运行
      handler () {
        this.$nextTick(function () {
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
}
</script>

<style>
</style>