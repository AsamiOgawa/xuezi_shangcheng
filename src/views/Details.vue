<template>
  <div>
    <my-header></my-header>
    <main id="main" class="container">
      <!-- 面包屑导航区域开始 -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb small bg-transparent">
          <li class="breadcrumb-item">
            <a class="text-dark font-weight-bold small" href="#">首页</a>
          </li>
          <li class="breadcrumb-item">
            <a class="text-dark font-weight-bold small" href="#">学习用品</a>
          </li>
          <li
            class="breadcrumb-item text-dark font-weight-bold small active"
            aria-current="page"
          >笔记本电脑</li>
        </ol>
      </nav>
      <!-- 面包屑导航区域结束 -->
      <!-- 商品详情区域开始 -->
      <div class="container mb-5">
        <div class="row pr-3">
          <!-- 左侧预览图区域开始 -->
          <div id="preview" class="col pr-0">
            <div class="card bg-transparent mr-5 position-absolute">
              <!-- 预览图 md 区域开始 -->
              <img
                v-if="productDetails"
                class="card-img-top"
                :src="productDetails.pics[i].md"
                alt="Card image cap"
                id="mImg"
              />
              <loading v-else class="preview_md_loading" />
              <!-- 预览图 md 区域结束 -->
              <!-- 移动鼠标，展示大图区域开始 -->
              <div
                id="mask"
                class="position-absolute"
                v-show="show"
                :style="{top:moveTL.top,left:moveTL.left}"
              ></div>
              <div
                id="super-mask"
                class="position-absolute"
                @mouseover="toggle"
                @mouseout="toggle"
                @mousemove="moveImg"
              ></div>
              <div
                v-if="productDetails"
                id="div-lg"
                class="position-absolute"
                :style="{'background-image':`url(${productDetails.pics[i].lg})`,
                'background-position':`${bgLarge.X} ${bgLarge.Y}`}"
                v-show="show"
              ></div>
              <!-- 移动鼠标，展示大图区域结束 -->
              <!-- 预览缩略图区域开始 -->
              <div v-if="productDetails" class="card-body p-0 text-center">
                <!-- 缩略图向左移 -->
                <img
                  src="img/product_detail/hover-prev.png"
                  class="btn float-left btn-light border-0 p-1 pt-4 pb-4"
                  :class="{disabled:times===remainder}"
                  id="btnLeft"
                  @click="move(1)"
                />
                <!-- 缩略图列表 -->
                <div class="d-inline-block pt-2 mx-0 m-auto">
                  <ul
                    class="list-unstyled mb-0"
                    id="ulImgs"
                    :style="{
                      width: productDetails.pics.length * 62 + 'px',
                      'margin-left': -62 * times + 'px'
                      }"
                    @click="changeImg"
                  >
                    <li
                      class="float-left p-1"
                      v-for="(item, index) of productDetails.pics"
                      :key="index"
                    >
                      <img
                        :src="item.sm"
                        :data-md="item.md"
                        :data-lg="item.lg"
                        :data-i="index"
                        :class="{active: index === i}"
                      />
                    </li>
                  </ul>
                </div>
                <!-- 缩略图向右移 -->
                <img
                  src="img/product_detail/hover-next.png"
                  class="btn float-right btn-light border-0 p-1 pt-4 pb-4"
                  :class="{disabled: times===0}"
                  id="btnRight"
                  @click="move(-1)"
                />
              </div>
              <loading v-else class="preview_sm_loading" />
              <!-- 预览缩略图区域结束 -->
            </div>
          </div>
          <!-- 左侧预览图区域结束 -->
          <!-- 商品详情区域开始 -->
          <div id="details" class="col pl-0">
            <h6
              v-if="productDetails"
              id="ptitle"
              class="font-weight-bold"
              v-text="productDetails.product.title"
            ></h6>
            <loading v-else class="details_title" />
            <h6 v-if="productDetails">
              <a
                class="small text-dark font-weight-bold"
                href="javascript:;"
                id="p_sub_title"
                v-text="productDetails.product.subtitle"
              ></a>
            </h6>
            <loading v-else class="details_title" />
            <div v-if="productDetails" class="alert alert-secondary small" role="alert">
              <div>
                <span>学员售价：</span>
                <h2
                  class="d-inline text-primary font-weight-bold"
                  id="pprice"
                >{{productDetails.product.price | PF}}</h2>
              </div>
              <div>
                <span>服务承诺：{{productDetails.product.promise}}</span>
                <span id="ppromise"></span>
              </div>
            </div>
            <loading v-else class="details_price" />
            <!-- 客服 -->
            <p v-if="productDetails" class="mb-1">
              <span class="small">客服：</span>
              <span class="small">联系客服</span>
              <img class="mb-3" src="img/product_detail/kefuf.gif" />
            </p>
            <loading v-else class="details_customer" />
            <!-- 规格 -->
            <div v-if="productDetails">
              <div class="float-left small">规格：</div>
              <div class="float-left w-75 d-flex flex-column align-items-start" id="specs">
                <router-link
                  v-for="(item, index) of productDetails.specs"
                  :to="`/details/${item.lid}`"
                  class="btn btn-sm btn-outline-primary mb-2"
                  :key="index"
                  v-text="item.spec"
                ></router-link>
              </div>
              <div class="clearfix"></div>
            </div>
            <loading v-else class="details_spec" />
            <!-- 数量 -->
            <div v-if="productDetails" class="mt-2">
              <div class="float-left small">数量：</div>
              <div class="input-group mb-3 w-25">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary p-1" type="button">-</button>
                </div>
                <input
                  type="text"
                  value="1"
                  class="form-control"
                  placeholder
                  aria-label
                  aria-describedby="basic-addon1"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary p-1" type="button">+</button>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <loading v-else class="details_number" />
            <!-- 购买部分 -->
            <div>
              <a class="btn pt-3 pb-2 pl-5 pr-5 mr-2 fs" href="javascript:;">
                <h5>立即购买</h5>
              </a>
              <a class="btn btn-primary pt-3 mr-2 fs" href="javascript:;">
                <h5>
                  <img src="img/product_detail/product_detail_img7.png" alt /> 加入购物车
                </h5>
              </a>
              <a class="btn btn-primary pt-1 pb-1 collection fs" href="javascript:;">
                <img src="img/product_detail/product_detail_img6.png" />
                <br />收藏
              </a>
            </div>
          </div>
          <!-- 商品详情区域结束 -->
        </div>
      </div>
      <!-- 商品详情区域结束 -->
      <!-- 为你推荐区域开始 -->
      <div class="container mb-5">
        <h4 class="d-inline-block ml-3">为你推荐</h4>
        <h6 class="d-inline-block bg-dark text-white ml-2">大家都在看</h6>
        <div id="recommend" class="border pl-3">
          <ul class="list-unstyled" style="width: 1100px; margin-left:-220px;">
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img
                  class="card-img-top"
                  data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                  alt="Thumbnail [100%x225]"
                  src="img/product_detail/product_detail_1.png"
                  data-holder-rendered="true"
                />
                <div class="card-body p-0">
                  <p class="card-text text-center small">ThinkPad New S2 (20GUA00QCD)13.3英寸超霸</p>
                </div>
              </div>
            </li>
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img
                  class="card-img-top"
                  data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                  alt="Thumbnail [100%x225]"
                  src="img/product_detail/product_detail_2.png"
                  data-holder-rendered="true"
                />
                <div class="card-body p-0">
                  <p class="card-text text-center small">戴尔 DELL燃7000 R1605S 超霸</p>
                </div>
              </div>
            </li>
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img
                  class="card-img-top"
                  data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                  alt="Thumbnail [100%x225]"
                  src="img/product_detail/product_detail_3.png"
                  data-holder-rendered="true"
                />
                <div class="card-body p-0">
                  <p class="card-text text-center small">戴尔(DELL)魔方15MF Pro-R2505TSS灵</p>
                </div>
              </div>
            </li>
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img
                  class="card-img-top"
                  data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                  alt="Thumbnail [100%x225]"
                  src="img/product_detail/product_detail_4.png"
                  data-holder-rendered="true"
                />
                <div class="card-body p-0">
                  <p class="card-text text-center small">联想(Lenovo) YOGA900 (YOGA4 PRO)多彩版</p>
                </div>
              </div>
            </li>
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img
                  class="card-img-top"
                  data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                  alt="Thumbnail [100%x225]"
                  src="img/product_detail/product_detail_1.png"
                  data-holder-rendered="true"
                />
                <div class="card-body p-0">
                  <p class="card-text text-center small">ThinkPad New S2 (20GUA00QCD)13.3英寸超霸</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 为你推荐区域结束 -->
      <!-- 商品详情导航栏开始 -->
      <nav class="navbar flex-md-nowrap p-0 ml-3">
        <form class="form-inline pl-2">
          <button class="btn bg-transparent rounded-0 pt-3 pb-2 active" type="button">
            <h5>商品详情</h5>
          </button>
          <button class="btn bg-transparent rounded-0 pt-3 pb-2" type="button">
            <h5>商品评价</h5>
          </button>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item text-nowrap">
            <a class="btn btn-primary p-3 border-bottom" href="javascript:;">
              <h5>
                <img src="img/product_detail/product_detail_img7.png" alt /> 加入购物车
              </h5>
            </a>
          </li>
        </ul>
      </nav>
      <!-- 商品详情导航栏结束 -->
      <!-- 商品规格参数区域开始 -->
      <div v-if="productDetails" id="params" class="container">
        <div class="row mr-1">
          <!-- 左侧商品详情开始 -->
          <div class="col-md-10 pt-5">
            <a name="规格参数"></a>
            <h6 class="d-inline-block ml-3">
              规格参数
              <img src="img/product_detail/product_detail_icon_1.png" alt />
            </h6>
            <div class="pl-3">
              <ul class="list-unstyled">
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">商品名称：{{productDetails.product.lname}}</a>
                </li>
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">系统：{{productDetails.product.os}}</a>
                </li>
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">内存容量：{{productDetails.product.memory}}</a>
                </li>
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">分辨率：{{productDetails.product.resolution}}</a>
                </li>
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">显卡型号：{{productDetails.product.video_card}}</a>
                </li>
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">处理器：{{productDetails.product.cpu}}</a>
                </li>
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">显存容量：{{productDetails.product.video_memory}}</a>
                </li>
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">分类：{{productDetails.product.category}}}</a>
                </li>
                <li class="float-left mb-2">
                  <a class="text-muted small" href="#">硬盘容量：{{productDetails.product.disk}}</a>
                </li>
              </ul>
            </div>
            <a name="商品介绍"></a>
            <h6 class="d-inline-block mt-4 mb-3 ml-3">
              商品介绍
              <img src="img/product_detail/product_detail_icon_4.png" alt />
            </h6>
            <div>
              <div v-html="productDetails.product.details"></div>
            </div>
            <a name="售后保障"></a>
            <h6 class="d-inline-block mt-4 mb-3 ml-3">
              售后保障
              <img src="img/product_detail/product_detail_icon_3.png" alt />
            </h6>
            <div class="pl-3">
              <div>
                <p class="text-primary font-weight-bold">
                  <img src="img/product_detail/product_detail_img16.png" alt />
                  正品保障
                </p>
                <p class="small">达内学子商城向您保证所售商品均为正品行货，达内自营商品开具机打发票或电子发票。</p>
                <p class="text-primary font-weight-bold">
                  <img src="img/product_detail/product_detail_img16.png" alt />
                  全国联保
                </p>
                <p class="small">
                  凭质保证书及达内商城发票，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证。达内商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！
                  注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                </p>
              </div>
            </div>
            <a name="包装清单"></a>
            <h6 class="d-inline-block mt-4 mb-3 ml-3">
              包装清单
              <img src="img/product_detail/product_detail_icon_2.png" alt />
            </h6>
            <div class="pl-3">
              <p
                class="small"
              >笔记本 x1 适配器 x1 电源线 x1 电池 x1 说明书（电子版）x1 备注：笔记本电脑的背面只会标注此电脑的系列，例如： XPS 13-9360 ，如果您需要核实此电脑的具体配置型号是否与达内页面相符，可电话咨询达内厂商：800-858-2969</p>
            </div>
          </div>
          <!-- 左侧商品详情结束 -->
          <!-- 右侧规格参数导航开始 -->
          <div
            class="col-md-2 mb-4 pt-5 pl-2"
            :class="{'position-fixed':rightFixed}"
            :style="{top:navRightFixed.top,right:navRightFixed.right}"
          >
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#规格参数">
              <h5 class="text-dark mb-0">
                <img src="img/product_detail/product_detail_icon_g_1.png" alt /> 规格参数
              </h5>
            </a>
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#商品介绍">
              <h5 class="text-dark mb-0k">
                <img src="img/product_detail/product_detail_icon_t_1.png" alt /> 商品介绍
              </h5>
            </a>
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#售后保障">
              <h5 class="text-dark mb-0">
                <img src="img/product_detail/product_detail_icon_d_1.png" alt /> 售后保障
              </h5>
            </a>
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#包装清单">
              <h5 class="text-dark mb-0">
                <img src="img/product_detail/product_detail_icon_bao_1.png" alt /> 包装清单
              </h5>
            </a>
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#header">
              <h5 class="text-dark mb-0">
                <img src="img/product_detail/product_detail_icon_up_1.png" alt /> 回到顶部
              </h5>
            </a>
          </div>
          <!-- 右侧规格参数导航结束 -->
        </div>
      </div>
      <div v-else>加载中...</div>
      <!-- 商品规格参数区域结束 -->
    </main>
  </div>
</template>

<script>
export default {
  props: ["lid"],
  data() {
    return {
      productDetails: null,
      i: 0, // 当前选中的商品图片(包括sm、md、lg)
      times: 0, // 控制缩略轮播图的次数
      remainder: 0, // 剩余未展示的商品缩略图数量
      show: false, // 控制大图商品图片和mask以及supermask
      moveTL: {
        // mask距离
        top: 0,
        left: 0
      },
      rightFixed: false
    };
  },
  created() {
    this.getProductDetails();
  },
  methods: {
    // 获取商品详情
    async getProductDetails() {
      const { data, status } = await this.axios.get(`/details?lid=${this.lid}`);
      if (status === 200) {
        this.productDetails = data;
        this.remainder = data.pics.length - 4;
        if (this.remainder < 0) {
          // 如果不存在剩余需要展示的商品缩略图，就重置剩余数量为0
          this.remainder = 0;
        }
      }
    },
    // 左/右移动缩略图事件
    move(i) {
      this.times += i;
      if (this.times < 0) {
        this.times = 0;
      }
      if (this.times > this.remainder) {
        this.times = this.remainder;
      }
    },
    // 点击缩略图，更改展示的商品图片(sm、md、lg)
    changeImg(e) {
      const el = e.target;
      if (el.nodeName === "IMG") {
        this.i = Number(el.dataset.i);
      }
    },
    // 鼠标进入/移出superMask元素事件
    toggle() {
      this.show = !this.show;
    },
    // 在superMask元素移动时展示large商品图事件
    moveImg(e) {
      let Y = e.offsetY - 88;
      let X = e.offsetX - 88;
      if (Y < 0) {
        Y = 0;
      } else if (Y > 176) {
        Y = 176;
      }
      if (X < 0) {
        X = 0;
      } else if (X > 176) {
        X = 176;
      } else if (Y <= 0 && X < 0) {
        X = 0;
      }
      this.moveTL.top = Y + "px";
      this.moveTL.left = X + "px";
    },
    // 滚动事件：当滚轮滑到商品导航栏时，将右侧的规格参数导航栏设置为固定定位，否则将取消
    handleScroll() {
      // 兼容处理，防止老IE获取不到当前页面的左上角到浏览器顶部的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let el = document.querySelector(".navbar.flex-md-nowrap");
      let productNavTop = el ? el.offsetTop : null;
      if (scrollTop > productNavTop) {
        this.rightFixed = true;
      } else {
        this.rightFixed = false;
      }
    }
  },
  watch: {
    lid() {
      this.getProductDetails();
      this.i = 0;
      this.times = 0;
    }
  },
  computed: {
    bgLarge() {
      return {
        Y: (-parseInt(this.moveTL.top) * 16) / 7 + "px",
        X: (-parseInt(this.moveTL.left) * 16) / 7 + "px"
      };
    },
    navRightFixed() {
      const screenWidth = document.body.clientWidth;
      if (this.rightFixed) {
        if (screenWidth >= 1263 && screenWidth < 1579) {
          return {
            top: 67.5 + "px",
            right: 65 + "px"
          };
        }
        if (screenWidth >= 1579) {
          return {
            top: 67.5 + "px",
            right: 173 + "px"
          };
        }
      }
      return "";
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
/*定制规格参数按钮的颜色*/
#details > div:nth-child(5) > div .btn-outline-secondary:hover {
  color: #0069d9;
  background-color: #f5f5f5;
  border-color: #e4393c;
}
#details > div:nth-child(5) > div .btn-outline-secondary.active {
  color: #6c757d;
  background-color: #f5f5f5;
  border-color: #e4393c;
  border-width: 2px;
}

/*定制数量按钮的颜色*/
#details > div:nth-child(6) .btn-outline-secondary {
  width: 30px;
}
#details > div:nth-child(6) .btn-outline-secondary:hover,
#details > div:nth-child(6) .btn-outline-secondary:active,
#details > div:nth-child(6) .btn-outline-secondary:focus {
  color: #6c757d;
  background-color: #f5f5f5;
  border-color: #0069d9;
  box-shadow: none;
}

/*定制立即购买按钮背景色*/
#details > div:nth-child(7) > a:first-child {
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
}

/*定制放大镜样式*/
#preview > .card > .card-body > div {
  width: 248px;
  overflow: hidden;
}
#preview > .card > .card-body > div > ul {
  transition: margin-left 0.5s linear;
}
#preview > .card > .card-body > div > ul > li {
  width: 62px;
  height: 62px;
}
#preview > .card > .card-body > div > ul img {
  width: 52px;
  height: 52px;
}
#preview > .card > .card-body > div > ul img:hover {
  border: 1px solid #e4393c;
}

#preview > .card > .card-body > div > ul img.active {
  border: 1px solid #e4393c;
}
#preview > div > img {
  width: 354px;
}
#mask {
  width: 176px;
  height: 176px;
  background-color: #ffa;
  opacity: 0.5;
}
#super-mask {
  width: 352px;
  height: 352px;
}
#div-lg {
  width: 400px;
  height: 400px;
  left: 354px;
  z-index: 1000;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

/*定制为你推荐部分的样式*/
#recommend {
  width: 915px;
  border-color: 1px solid rgba(0, 0, 0, 0.125);
  overflow: hidden;
}
#recommend > ul > li {
  width: 220px;
}

/*订制商品详情部分的样式*/
#main > nav.navbar {
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  box-shadow: 0px 3px 6px #ccc;
}
#main > nav.navbar .active {
  margin-top: 2px;
  border-bottom: 3px solid #0069d9;
}
#params .col-md-2 > .btn {
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  box-shadow: 0px 3px 4px #ccc;
}
#params .col-md-10 > div > ul > li {
  width: 237px;
}

/*设置商品预览图的加载中样式*/
#preview .preview_md_loading {
  width: 352px;
  height: 352px;
  background-color: #d2d3d5;
}
#preview .preview_sm_loading {
  width: 350px;
  height: 80px;
  background-color: #e3e4e7;
}

#details .details_title {
  background-color: #e3e4e7;
  height: 37.33px;
  margin-bottom: 8px;
}

#details .details_price {
  background-color: #e3e4e7;
  height: 68.67px;
  margin-bottom: 16px;
}

#details .details_customer {
  background-color: #e3e4e7;
  width: 89.62px;
  height: 31px;
  margin-bottom: 4px;
}

#details .details_spec {
  background-color: #e3e4e7;
  width: 346.5px;
  height: 124.67px;
}

#details .details_number {
  background-color: #e3e4e7;
  width: 153.91px;
  height: 38px;
  margin-top: 8px;
}
</style>