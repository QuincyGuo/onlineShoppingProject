<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 导航分类的面包屑 -->
            <li class="with-x"
                v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x"
                v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x"
                v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 商品属性的面包屑 -->
            <li class="with-x"
                v-for="(attr,index) in searchParams.props"
                :key="index">{{attr.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTrademark=trademarkShow
                        @getAttr=attrShow />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active:orderLabelOne}"
                    @click="changeOrder(1)">
                  <a>综合 <span v-show="orderLabelOne"><span v-show="orderLabelAsc">↑</span><span v-show="orderLabelDesc">↓</span></span></a>
                </li>
                <li :class="{active:orderLabelTwo}"
                    @click="changeOrder(2)">
                  <a>价格 <span v-show="orderLabelTwo"><span v-show="orderLabelAsc">↑</span><span v-show="orderLabelDesc">↓</span></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"
                  v-for="(good) in goodsList"
                  :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank"
                       href="item.html"
                       title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html"
                       target="_blank"
                       class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);"
                       class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器组件 -->
          <PaginationA :pageNo="searchParams.pageNo"
                       :pageSize="searchParams.pageSize"
                       :total="total"
                       :continues="5"
                       @getPageNo=pageNoShow />

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'RouterSearch',
  components: {
    SearchSelector
  },
  data () {
    return {
      // 传给服务器的参数
      searchParams: {
        category1Id: "",    // 导航栏选择的一级分类的id
        category2Id: "",    // 二级分类的id
        category3Id: "",    // 三级分类的id
        categoryName: "",    // 导航栏选择的分类名
        keyword: "",        // 搜索框的关键字
        order: "1:desc",    // 商品结果的排序顺序
        pageNo: 1,          // 当前是第几页
        pageSize: 10,        // 每页展现的商品数量
        props: [],          // 搜索子选择组件的选择参数
        trademark: ""        // 搜索子选择组件的品牌
      }
    }
  },

  // 由home进入search时，把携带在路由里面的参数，拿出来赋值给search组件的searchParams属性
  beforeMount () {
    // 参数在路由跳转时都存放在路由属性中
    // this.searchParams.category1Id = this.$route.query.categorylid;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;

    // 更简便的写法 Object.assign，将后面两个参数中与第一个参数同名的参数复制进第一个参数里
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted () {
    // 派发一个action，通知Vuex发请求，获取数据，存储于仓库当中
    // 获取搜索结果商品数据
    this.getData();
  },

  computed: {
    // getters不分是home、search模块，统一都是vuex对外暴露的取数据方法
    // 此处这种写法，要求组件和vuex的计算属性同名，都是goodsList
    ...mapGetters(['goodsList']),

    // 哪个排序标签选中
    orderLabelOne () {
      return this.searchParams.order.indexOf('1') != -1;  // orderLabelOne为true表示选中排序标签1
    },
    orderLabelTwo () {
      return this.searchParams.order.indexOf('2') != -1;
    },
    orderLabelAsc () {
      return this.searchParams.order.indexOf('asc') != -1;  // orderLabelAsc为true表示选中排序标签为升序
    },
    orderLabelDesc () {
      return this.searchParams.order.indexOf('desc') != -1;
    },

    // 获取search模块展示的商品一共有多少条数据
    ...mapState({
      total: state => state.search.searchList.total
    }),
  },
  methods: {
    // 向服务器发送网络请求
    getData () {
      this.$store.dispatch('getSearchList', this.searchParams);
    },

    // 去除分类导航栏对应的面包屑导航，同时把id也要去掉，然后再次发服务器请求，再改变地址栏路径
    removeCategoryName () {
      // 属性为空的参数还是会被传给服务器，所以如果为了优化性能，将非必需的空参数设为undefined，该参数就不会传给服务器。
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;

      this.getData();

      // 自己路由跳转自己，目的是改变路径中的参数；但是只是删除自身所代表的参数，其余参数不能被删除
      if (this.$route.params)
        this.$router.push({ name: 'RouterSearch', params: this.$route.params })
    },

    // 去除搜索关键字对应的面包屑导航，然后再次发服务器请求，再改变地址栏路径
    removeKeyword () {
      this.searchParams.keyword = undefined;
      this.getData();
      if (this.$route.query)
        this.$router.push({ name: 'RouterSearch', query: this.$route.query });
      this.$bus.$emit('clearSearchInput')	// 触发清空搜索框的自定义事件
    },

    // 去除选择品牌对应的面包屑导航，然后再次发服务器请求
    removeTrademark () {
      this.searchParams.trademark = undefined;
      this.getData();
    },

    // 去除选择商品属性对应的面包屑导航，然后再次发服务器请求
    removeAttr (index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },


    // 点击品牌，获得子组件传递过来的数据，整理参数，向服务器发送请求，
    trademarkShow (trademark) {
      // 整理要发请求的参数searchParams
      this.searchParams.trademark = trademark.tmId + ':' + trademark.tmName;
      // 再次发起请求
      this.getData();
    },

    // 点击商品属性，获得子组件传递过来的数据，整理参数，向服务器发送请求，
    attrShow (attr, attrValue) {
      // 整理要发请求的参数searchParams
      let attrInfo = attr.attrId + ':' + attrValue + ':' + attr.attrName;
      // 数组去重（同一属性，只响应点击事件一次，后续的点击不再整理参数并发请求）
      if (this.searchParams.props.indexOf(attrInfo) == -1) {
        this.searchParams.props.push(attrInfo);
      }
      // 再次发起请求
      this.getData();
    },

    // 点击排序，更换order参数，向服务器发送请求；index参数表示当前点击的是哪个排序（综合1或者价格2）
    changeOrder (index) {
      let orderNow = this.searchParams.order.split(':');
      // 如果点击的是另一个排序，则默认设置为降序操作
      if (orderNow[0] != index)
        this.searchParams.order = index + ':desc';
      else {
        // 如果点击的还是当前的排序，则改变其升降顺序
        if (orderNow[1] == 'desc')
          this.searchParams.order = index + ':asc';
        else if (orderNow[1] == 'asc')
          this.searchParams.order = index + ':desc';
      }
      // 再次发起请求
      this.getData();
    },

    // 点击分页器中的页码，获得分页子组件传递过来的当前页码，整理参数，向服务器发送请求，
    pageNoShow (pageNo) {
      // 整理要发请求的参数searchParams
      this.searchParams.pageNo = pageNo;
      // 再次发起请求
      this.getData();
    }
  },


  // 监听路由的变化，实现search页面中，点击分类导航菜单或者搜索框输入的页面变化
  watch: {
    $route () {
      // 每一次请求前，需要给123级的分类id置空，因为路由传参时，只会传选中的那个分类id过去，而上一次选的分类id如果与此次的选择不是处于同一级分类就会还在，影响发请求的参数
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
      // 不重置categoryName是因为每次选择分类时，都会带一个新的分类名，已经实现了覆盖；同理，关键字也是，每次点击搜索时，关键字也会被此时输入框的文字覆盖。
      // 所以，这里的搜索逻辑是，点击分类时，上次的关键字也会被纳入搜索条件。

      // 发送请求之前，整理要发请求的参数searchParams
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次发起请求
      this.getData();
    },
  }

}
</script>

<style scoped lang='less'>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 0px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
