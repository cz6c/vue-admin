<template>
  <div>
    <div class="head">
      <span class="welcome">欢迎登录</span>
      <span class="name">MB售后产品服务管理平台</span>
    </div>
    <h4>轮胎业务</h4>
    <p>
      轮胎业务模块与2018年2月1日正式上线，结合微信端“轮胎一键换新商城”，成功带动轮胎线下销售服务的数字化转型，打通OEM端已触达延展瓶颈的库存及账单相关的关键系统，使得OEM系统可以通过本平台间接接通物流方提供的互联网进销存产品，从而支持经销商直接在本平台代购备货，享受更加友好的人机交互。此外，依托平台的订单模块及物流模块，系统实现了2h极速订购的供货流程，为终端客户带去了更加高效便利的服务。
    </p>
    <div class="charts">
      <span class="goods"
        ><span class="text">商品数据</span
        ><span class="count">{{ charts.goods_count }}</span></span
      >
      <span class="order"
        ><span class="text">订单数据</span
        ><span class="count">{{ charts.order_count }}</span></span
      >
      <span class="users"
        ><span class="text">门店数据</span
        ><span class="count">{{ charts.users_count }}</span></span
      >
    </div>
  </div>
</template>

<script>
import { getindex } from "network/home";

export default {
  name: "",
  data() {
    return {
      charts: {},
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    getindex().then((res) => {
      console.log(res);
      this.charts = res;
    });
  },
};
</script>

<style scoped>
.head {
  position: relative;
  height: 60px;
  background-color: #d6d6d6;
  line-height: 60px;
}
.welcome {
  font-size: 1.8em;
  font-weight: 700;
  margin: 0 30px;
}
.name {
  font-weight: 700;
  font-size: 0.9em;
  padding: 0 20px;
  border-left: solid 2px #333;
}
h4 {
  padding: 0 30px;
}
p {
  width: 50%;
  padding: 0 30px;
  font-size: 0.9em;
  line-height: 1.5;
}

.charts {
  display: flex;
  margin-top: 80px;
  height: 120px;
}
.goods,
.order,
.users {
  display: inline-block;
  flex: 1;
  height: 100%;
  background-color: #d6d6d6;
  line-height: 120px;
  text-align: center;
}
.order {
  margin: 0 120px;
}
.text {
  /* font-weight: 700; */
  font-size: 1.5em;
  margin: 30px;
}
.count {
  color: red;
  font-size: 1.2em;
}
</style>



 