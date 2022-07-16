<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(skuImage,index) in skuImageList"
           :key="skuImage.id">
        <img :src="skuImage.imgUrl"
             :class="{active:currentIndex==index}"
             @click="changeCurrentIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  data () {
    return {
      // 选中第几张图片
      currentIndex: 0,
    }
  },
  props: ['skuImageList'],

  watch: {
    skuImageList: {
      handler () {
        this.$nextTick(function () {
          new Swiper('.swiper-container', {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // 设置slider容器能够同时显示的sliders数量
            slidesPerView: 3,
            // 设置slider容器下，sliders多少数量为一组，也就是一次翻页，翻多少张slides过去
            slidesPerGroup: 1,

          })
        })
      }
    }
  },

  methods: {
    changeCurrentIndex (index) {
      // 点击图片，更换currentIndex为被点击图片的index
      this.currentIndex = index;
      // 通知放大镜兄弟组件，当前点击了哪个图片
      this.$bus.$emit('getIndex', this.currentIndex);
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>