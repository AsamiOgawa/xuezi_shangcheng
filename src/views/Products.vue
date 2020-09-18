<template>
  <div>
    <my-header></my-header>
    <main id="main" class="container">
      <div class="pb-2 text-center">
        <img class="d-block mx-auto mb-4 w-100" src="img/index/index_guild.png" />
      </div>
      <div class="row">
        <div class="col-md-9">
          <h5 class="mb-3 p-2 text-muted">笔记本电脑</h5>
          <div id="plist" class="row bg-white ml-1 mr-1 pt-2 pl-2">
            <div :style="bg404" class="w-100 my-5" v-show="products.length===0"></div>
            <!-- 商品列表项区域开始 -->
            <div class="col-md-4 p-1" v-for="item of products" :key="item.lid">
              <div class="card mb-4 box-shadow pr-2 pl-2" @click="productHandler">
                <router-link :to="`/details/${item.lid}`">
                  <img class="card-img-top" :src="item.md" />
                </router-link>
                <div class="card-body p-0">
                  <h5 class="text-primary">{{item.price | PF}}</h5>
                  <p class="card-text">
                    <router-link
                      :to="`/details/${item.lid}`"
                      class="text-muted small"
                      title="Apple MacBook Air 13.3英寸笔记本 银色(Core i5 处理器/8GB内存/128GB SSD闪存 MMGF2CH/A)"
                      v-text="item.title"
                    ></router-link>
                  </p>
                  <div class="d-flex justify-content-between align-items-center p-2 pt-0">
                    <button class="btn btn-outline-secondary p-0 border-0" type="button">-</button>
                    <input type="text" class="form-control p-1 text-center" value="1" />
                    <button class="btn btn-outline-secondary p-0 border-0" type="button">+</button>
                    <a class="btn btn-primary float-right ml-1 pl-1 pr-1" href="cart.html">加入购物车</a>
                  </div>
                </div>
              </div>
            </div>
            <!-- 商品列表项区域结束 -->
          </div>
          <h6 class="mb-3 p-2 text-muted small" v-show="products.length">
            <nav aria-label="Page navigation example">
              <ul class="pagination mb-0 justify-content-end">
                <li class="page-item" :class="{disabled: !pno}" @click="changePage(-1)">
                  <router-link
                    class="page-link bg-transparent"
                    :to="`/products/${this.$attrs.kw}`"
                  >上一页</router-link>
                </li>
                <li
                  class="page-item"
                  :class="{active: pno + 1 === item}"
                  v-for="item of pageCount"
                  :key="item"
                  @click="pageHandler(item - 1)"
                >
                  <router-link
                    class="page-link"
                    :class="{'bg-transparent': pno + 1 !== item, 'border-primary': pno + 1 === item}"
                    :to="`/products/${$attrs.kw}`"
                    v-text="item"
                  ></router-link>
                </li>
                <li
                  class="page-item"
                  :class="{disabled: pno === pageCount-1}"
                  @click="changePage(1)"
                >
                  <router-link
                    class="page-link bg-transparent"
                    :to="`/products/${this.$attrs.kw}`"
                  >下一页</router-link>
                </li>
              </ul>
            </nav>
          </h6>
        </div>
        <div class="col-md-3 pl-0">
          <h5 class="justify-content-between align-items-center mb-1 text-muted p-2">
            <img src="img/foodstore/foodstore_icon2.png" alt /> 商家公告
          </h5>
          <div class="bg-white small p-4 text-muted mb-3">
            <p>本店推出全网最低价套餐，保证比其他平台的价格要低！</p>
            <p>不要葱、姜、蒜等这些忌口暂时无法坐不了，敬请谅解！</p>
            <p>晚上10点以后订餐需另加送餐费2元！谢谢合作！</p>
          </div>
          <ul id="cart" class="list-group mb-3">
            <!-- <ul id="cart" class="list-group mb-3 position-fixed"> -->
            <li class="p-0 list-group-item d-flex justify-content-between lh-condensed">
              <h6
                class="w-100 d-flex justify-content-between align-items-center mb-0 text-muted p-2"
              >
                购物车
                <a class="btn btn-link text-muted" href="#">清空</a>
              </h6>
            </li>
            <li class="p-0 list-group-item d-flex justify-content-between lh-condensed">
              <div class="input-group input-group-sm mt-1 mb-1">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text text-truncate bg-white p-1 border-0 d-inline-block"
                    title="戴尔DELL灵越游匣15PR-5645B 15.6英寸游戏笔记本电脑(i5-7300HQ 8G 128GSSD+1T GTX1050 4G独显 FHD)黑"
                  >戴尔DELL灵越游匣15PR-5645B 15.6英寸游戏笔记本电脑(i5-7300HQ 8G 128GSSD+1T GTX1050 4G独显 FHD)黑</span>
                  <button class="btn btn-outline-secondary p-0 border-0" type="button">-</button>
                </div>
                <input
                  type="text"
                  class="form-control p-1"
                  aria-label="Small"
                  value="10"
                  aria-describedby="inputGroup-sizing-sm"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary p-0 border-0" type="button">+</button>
                  <span class="input-group-text bg-white border-0 p-0 pl-1">¥59990.00</span>
                </div>
              </div>
            </li>
            <li class="p-0 list-group-item d-flex justify-content-between lh-condensed">
              <div class="input-group input-group-sm mt-1 mb-1">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text text-truncate bg-white p-1 border-0 d-inline-block"
                    title="Apple MacBook Air 13.3英寸笔记本 银色(Core i5 处理器/8GB内存/256GB SSD闪存 MMGG2CH/A)"
                  >Apple MacBook Air 13.3英寸笔记本 银色(Core i5 处理器/8GB内存/256GB SSD闪存 MMGG2CH/A)</span>
                  <button class="btn btn-outline-secondary p-0 border-0" type="button">-</button>
                </div>
                <input
                  type="text"
                  class="form-control p-1"
                  aria-label="Small"
                  value="10"
                  aria-describedby="inputGroup-sizing-sm"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary p-0 border-0" type="button">+</button>
                  <span class="input-group-text bg-white border-0 p-0 pl-1">¥69880.00</span>
                </div>
              </div>
            </li>
            <li class="p-0 list-group-item bg-secondary text-right">
              <img class="mb-2" src="img/foodstore/foodstore_car_2.png" alt />
              <h4 class="d-inline-block text-white pt-2 m-0">￥129870.00</h4>
              <a class="btn btn-lg btn-primary float-right ml-1 pl-0 pr-0" href="cart.html">去结算</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import bgurl from "../../public/img/404/no-data.png";
export default {
  data() {
    return {
      // 商品列表，目前只需要商品lid、价格、标题
      products: [],
      pno: 0, // 当前商品列表页数
      pageCount: 1, // 商品列表总页数
      bg404: {
        // 未查到相关商品时，设置商品的404背景图
        backgroundImage: `url(${bgurl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "191px"
      }
    };
  },
  created() {
    this.getProducts(this.$attrs);
  },
  methods: {
    // 获取商品列表
    async getProducts({ kw, pno = 0 }) {
      this.products = []; // 发送请求前，必须先把当前的商品列表清空
      const { data, status } = await this.axios.get("/products", {
        params: { kw, pno }
      });
      if (status === 200) {
        this.pno = data.pno - 0;
        this.pageCount = data.pageCount;
        data.data.forEach(item => {
          let obj = {};
          obj["lid"] = item["lid"];
          obj["title"] = item["title"];
          obj["price"] = item["price"];
          obj["md"] = item["md"];
          this.products.push(obj);
        });
      }
    },
    // 监听点击商品的数量/加入购物车事件
    productHandler(e) {
      const el = e.target; // 获取点击的元素

      if (el.nodeName === "BUTTON" && el.innerHTML === "-") {
        // this.
      }
    },
    // 点击分页数字按钮，跳转第n页
    pageHandler(pno) {
      if (pno !== this.pno) {
        this.getProducts({ ...this.$attrs, pno });
      }
    },
    // 点击上/下一页按钮，跳转页面
    changePage(n) {
      this.pno += n;
      if (this.pno < 0) {
        this.pno = 0;
        return;
      }
      if (this.pno >= this.pageCount) {
        this.pno = this.pageCount - 1;
        return;
      }
      this.getProducts({ ...this.$attrs, pno: this.pno });
    }
  },
  watch: {
    $route() {
      this.getProducts(this.$attrs);
    }
  }
};
</script>

<style scoped>
/*定制小购物车部分样式*/
#main > div.row > div > h5,
#main > div.row > div > h6,
#cart > li:first-child > h6 {
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
}
#cart .input-group-text {
  width: 90px;
}
#cart input.form-control {
  width: 25px !important;
  flex: none;
}
#cart .input-group .btn,
#plist button.btn {
  width: 20px;
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
}
#cart .input-group-append > .input-group-text {
  width: 80px;
}
#cart.position-fixed {
  top: 100px;
  right: 100px;
}

/*定制商品列表部分的样式*/
/*#plist button.btn{
  }*/
#plist input.form-control {
  width: 30px;
}
#plist + h6 .page-link {
  border-color: #bbb;
}
#plist + h6 .page-link:hover {
  border-color: #007bff;
}
#plist + h6 .page-item.disabled {
  opacity: 0.5;
}
.mb-3.p-2.text-muted.small * {
  transition: 0.2s;
}
</style>