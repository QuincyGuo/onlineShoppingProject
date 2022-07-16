<template>
  <div class="pagination">
    <!-- 前半部分 -->
    <button @click="prePageClick">上一页</button>
    <!-- 当连续页码的起始start大于1时，才显示这个初始的1；当start大于2时，才显示'...' -->
    <button v-if="startNumAndEndNum.start > 1"
            @click="pageOneClick"
            :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <!-- 显示continues个连续的页码 -->
    <button v-for="(index) in continues"
            :key="index"
            @click="pageClick(startNumAndEndNum.start + index - 1)"
            :class="{active:pageNo==startNumAndEndNum.start + index - 1}">{{startNumAndEndNum.start + index - 1}}</button>

    <!-- 后半部分 -->
    <!-- 当连续页码的结束end小于totalPage时，才显示'...'；当end小于totalPage-1时，才显示这个最后一页totalPage -->
    <button v-if="startNumAndEndNum.end < totalPage -1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage"
            @click="pageEndClick"
            :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button @click="nextPageClick">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "PaginationA",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总共的页数
    totalPage () {
      return Math.ceil(this.total / this.pageSize);	// 向上取整
    },

    // 连续页码中的起始与结束位置
    startNumAndEndNum () {
      const { pageNo, totalPage, continues } = this;
      let start = 0, end = 0;

      // 1、非常规情况：总页数小于等于连续页码数
      if (continues >= totalPage) {
        start = 1; end = totalPage;
      }
      // 2、常规情况：总页数大于连续页码数
      else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 3、非常规情况：当前页小于连续页码除以2，start会小于1
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 4、非常规情况：当前页大于 totalPage - 连续页码除以2，end会大于totalPage
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    }
  },
  methods: {
    // 点击上一页
    prePageClick () {
      if (this.pageNo > 1)
        this.$emit('getPageNo', this.pageNo - 1);
    },

    // 点击第一页
    pageOneClick () {
      this.$emit('getPageNo', 1);
    },

    // 点击中间的连续页
    pageClick (index) {
      this.$emit('getPageNo', index);
    },

    // 点击最后一页
    pageEndClick () {
      this.$emit('getPageNo', this.totalPage);
    },

    // 点击下一页
    nextPageClick () {
      if (this.pageNo < this.totalPage)
        this.$emit('getPageNo', this.pageNo + 1);
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e1251b;
      color: #fff;
    }
  }
}
</style>
