"use strict";(self["webpackChunksell"]=self["webpackChunksell"]||[]).push([[77],{77:function(s,t,i){i.r(t),i.d(t,{default:function(){return x}});var a=function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",[i("TypeNav"),i("ListContainer"),s._l(s.floorList,(function(s){return i("FloorA",{key:s.id,attrs:{list:s}})}))],2)},l=[],e=function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"list-container"},[i("div",{staticClass:"sortList clearfix"},[i("div",{staticClass:"center"},[i("div",{staticClass:"swiper-container",attrs:{id:"mySwiper"}},[i("div",{staticClass:"swiper-wrapper"},s._l(s.bannerList,(function(s){return i("div",{key:s.id,staticClass:"swiper-slide"},[i("img",{attrs:{src:s.imgUrl}})])})),0),i("div",{staticClass:"swiper-pagination"}),i("div",{staticClass:"swiper-button-prev"}),i("div",{staticClass:"swiper-button-next"})])]),s._m(0)])])},c=[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"right"},[a("div",{staticClass:"news"},[a("h4",[a("em",{staticClass:"fl"},[s._v("商城快报")]),a("span",{staticClass:"fr tip"},[s._v("更多 >")])]),a("div",{staticClass:"clearix"}),a("ul",{staticClass:"news-list unstyled"},[a("li",[a("span",{staticClass:"bold"},[s._v("[特惠]")]),s._v("备战开学季 全民半价购数码 ")]),a("li",[a("span",{staticClass:"bold"},[s._v("[公告]")]),s._v("备战开学季 全民半价购数码 ")]),a("li",[a("span",{staticClass:"bold"},[s._v("[特惠]")]),s._v("备战开学季 全民半价购数码 ")]),a("li",[a("span",{staticClass:"bold"},[s._v("[公告]")]),s._v("备战开学季 全民半价购数码 ")]),a("li",[a("span",{staticClass:"bold"},[s._v("[特惠]")]),s._v("备战开学季 全民半价购数码 ")])])]),a("ul",{staticClass:"lifeservices"},[a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("话费")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("机票")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("电影票")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("游戏")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("彩票")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("加油站")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("酒店")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("火车票")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("众筹")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("理财")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("礼品卡")])]),a("li",{staticClass:"life-item"},[a("i",{staticClass:"list-item"}),a("span",{staticClass:"service-intro"},[s._v("白条")])])]),a("div",{staticClass:"ads"},[a("img",{attrs:{src:i(5324)}})])])}],r=i(4665),n=i(4794),o={name:"ListContainer",mounted(){this.$store.dispatch("getBannerList")},computed:{...(0,r.rn)({bannerList:s=>s.home.bannerList})},watch:{bannerList:{handler(){this.$nextTick((function(){new n.Z(".swiper-container",{loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}))}}}},v=o,C=i(3736),p=(0,C.Z)(v,e,c,!1,null,"575d7146",null),m=p.exports,d=function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"floor"},[i("div",{staticClass:"py-container"},[i("div",{staticClass:"title clearfix"},[i("h3",{staticClass:"fl"},[s._v(s._s(s.list.name))]),i("div",{staticClass:"fr"},[i("ul",{staticClass:"nav-tabs clearfix"},s._l(s.list.navList,(function(t,a){return i("li",{key:a,class:[0==a?"active":""]},[i("a",{attrs:{href:t.url,"data-toggle":"tab"}},[s._v(s._s(t.text))])])})),0)])]),i("div",{staticClass:"tab-content"},[i("div",{staticClass:"tab-pane"},[i("div",{staticClass:"floor-1"},[i("div",{staticClass:"blockgary"},[i("ul",{staticClass:"jd-list"},s._l(s.list.keywords,(function(t,a){return i("li",{key:a},[s._v(s._s(t))])})),0),i("img",{attrs:{src:s.list.imgUrl}})]),i("div",{staticClass:"floorBanner"},[i("CarouselA",{attrs:{list:s.list.carouselList}})],1),i("div",{staticClass:"split"},[i("span",{staticClass:"floor-x-line"}),i("div",{staticClass:"floor-conver-pit"},[i("img",{attrs:{src:s.list.recommendList[0]}})]),i("div",{staticClass:"floor-conver-pit"},[i("img",{attrs:{src:s.list.recommendList[1]}})])]),i("div",{staticClass:"split center"},[i("img",{attrs:{src:s.list.bigImg}})]),i("div",{staticClass:"split"},[i("span",{staticClass:"floor-x-line"}),i("div",{staticClass:"floor-conver-pit"},[i("img",{attrs:{src:s.list.recommendList[2]}})]),i("div",{staticClass:"floor-conver-pit"},[i("img",{attrs:{src:s.list.recommendList[3]}})])])])])])])])},f=[],u={name:"FloorA",props:["list"]},_=u,b=(0,C.Z)(_,d,f,!1,null,"b77c80c8",null),g=b.exports,h={name:"RouterHome",components:{ListContainer:m,FloorA:g},mounted(){this.$store.dispatch("getFloorList")},computed:{...(0,r.rn)({floorList:s=>s.home.floorList})}},w=h,L=(0,C.Z)(w,a,l,!1,null,"64bc19cc",null),x=L.exports},5324:function(s,t,i){s.exports=i.p+"img/ad1.19bb382d.png"}}]);
//# sourceMappingURL=77.21f4a961.js.map