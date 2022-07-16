<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterShow"
           @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name='sort22'>
          <div class="sort"
               v-show="show">
            <div class="all-sort-list2"
                 @mouseleave="changeIndexLeave"
                 @click="goSearch">
              <div class="item"
                   v-for="(c1,index) in categoryList"
                   :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(index)"
                    :class="{cur:currentIndex==index}">
                  <a :data-categoryName='c1.categoryName'
                     :data-category1Id='c1.categoryId'>{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix"
                     :style="{display:currentIndex==index?'block':'none'}">
                  <div class="subitem"
                       v-for="(c2) in c1.categoryChild"
                       :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName='c2.categoryName'
                           :data-category2Id='c2.categoryId'>{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild"
                            :key="c3.categoryId">
                          <a :data-categoryName='c3.categoryName'
                             :data-category3Id='c3.categoryId'>{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">QG超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>



<script>
import { mapState } from 'vuex';
import _ from 'lodash';
export default {
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1, // 记录目前鼠标所在类别的索引值
      show: true,       // 记录列表是否展开
    }
  },
  mounted () {
    // 设置列表在不同组件中默认展开与否
    if (this.$route.path != '/home')
      this.show = false;
  },
  computed: {
    // 第二种写法（对象写法）：借助mapState生成计算属性，从state中读取数据。原理是：mapState是一个函数，通过参数生成像上面的计算属性代码。
    ...mapState({
      categoryList: state => state.home.categoryList,
    })
  },
  methods: {
    // 鼠标进入时，修改currentIndex的值
    // changeIndex: function (n) {
    //   this.currentIndex = n,
    //     console.log(n)
    // },
    changeIndex: _.throttle(function (n) {
      this.currentIndex = n
    }, 50),

    // 鼠标移除时，修改currentIndex的值
    changeIndexLeave: function () {
      this.currentIndex = -1
    },

    // 跳转到search路由组件，同时传递参数：点击的分类名、商品ID、所处的分类级别
    goSearch (event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset;   // 节点有dataset属性，其内容是节点的自定义属性和值。数据类型是对象。
      // 根据当前节点有无categoryname属性，来判断是否是要跳转的标签
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: 'RouterSearch' };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        }
        else if (category2id) {
          query.category2Id = category2id;
        }
        else if (category3id) {
          query.category3Id = category3id;
        }
        location.query = query;

        // 如果跳转时，也有params参数需要传递，则一并传递过去
        if (this.$route.params) {
          location.params = this.$route.params || undefined;
        }
        this.$router.push(location);
      }
    },

    // search路由组件中，鼠标进入列表，展开列表
    enterShow: function () {
      this.show = true;
    },
    // search路由组件中，鼠标离开列表，关闭列表
    leaveShow: function () {
      if (this.$route.path != '/home') {
        this.show = false;
      }

    },
  }
}
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 511px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过度动画样式
    // 鼠标进入列表时的动画，以下分别是开始、结束状态、动画效果
    .sort22-enter {
      height: 0px;
    }
    .sort22-enter-to {
      height: 461px;
    }
    .sort22-enter-active {
      transition: all 0.5s linear;
    }

    // 鼠标离开列表时的动画，以下分别是开始、结束状态、动画效果
    .sort22-leave {
      height: 461px;
    }
    .sort22-leave-to {
      height: 0px;
    }
    .sort22-leave-active {
      transition: all 0.1s linear;
    }
  }
}
</style>