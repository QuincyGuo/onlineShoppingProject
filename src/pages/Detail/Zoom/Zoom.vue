<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <!-- 鼠标移动事件 -->
    <div class="event"
         @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl"
           ref="big" />
    </div>
    <!-- 小图上待放大的区域：遮罩图层 -->
    <div class="mask"
         ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "ZoomA",
  props: ['skuImageList'],  // 来自父组件detail的商品图片数据
  data () {
    return {
      currendIndex: 0,
    }
  },
  computed: {
    // 避免skuImageList为空数组时，skuImageList[0].imgUrl会是undefined而报错。
    imgObj () {
      return this.skuImageList[this.currendIndex] || {};
    }
  },

  mounted () {
    // 全局事件总线，获取兄弟组件传过来的选中图片的索引值
    this.$bus.$on('getIndex', (index) => {
      console.log(11)
      this.currendIndex = index;
    })
  },

  methods: {
    handler (event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;

      // 计算遮罩图层随鼠标移动而产生的新的左上位置（以下所说的位置是相对于图片的左上角为（0，0），向右向下为正）
      let maskNewLeft = event.offsetX - mask.offsetWidth / 2;
      let maskNewTop = event.offsetY - mask.offsetHeight / 2;

      // 将新的位置赋给遮罩图层，产生其随鼠标移动的效果；但是注意遮罩图层不能出图片边界。
      // 鼠标出了左边界，mask的左位置就为0，不再往左移动；鼠标出了右边界，mask的左位置就为图片中间，不再往右移动
      // 鼠标出了上边界，mask的上位置就为0，不再往上移动；鼠标出了下边界，mask的上位置就为图片中间，不再往下移动
      if (maskNewLeft < 0)
        maskNewLeft = 0;
      if (maskNewLeft >= mask.offsetWidth)
        maskNewLeft = mask.offsetWidth;
      if (maskNewTop < 0)
        maskNewTop = 0;
      if (maskNewTop >= mask.offsetHeight)
        maskNewTop = mask.offsetHeight;

      mask.style.left = maskNewLeft + 'px';
      mask.style.top = maskNewTop + 'px';

      // 大图的原理是：有个big区域与小图一样大，位置移动到右边；big区域内有个等比放大两倍的大图；big区域不动，移动的是里面的大图，而大图在区域之外的部分是隐藏的
      // 鼠标移动时，让大图随着鼠标的移动进行相反方向两倍的移动，就相当于大图也在随着鼠标移动而动（左右手对着图片效果移动一下就明白了）
      big.style.left = -2 * maskNewLeft + 'px';
      big.style.top = -2 * maskNewTop + 'px';

    }
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>