<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片主体 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="通过订单单号查找"
              prefix-icon="el-icon-search"
              @change="searchOrder_no"
              v-model="params.order_no"
              clearable
            >
            </el-input>
          </div>
        </el-col>
        <el-col :span="8" :offset="2">
          <div class="grid-content bg-purple">
            <el-select v-model="params.status" clearable placeholder="订单状态">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="order_no" label="单号"> </el-table-column>
        <el-table-column prop="user.name" label="用户名"> </el-table-column>
        <el-table-column prop="amount" label="总金额"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 1">待支付</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">已支付</el-tag>
            <el-tag type="info" v-if="scope.row.status == 3">已发货</el-tag>
            <el-tag type="warning" v-if="scope.row.status == 4">已收货</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 5">已过期</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          v-if="params.status == 1"
        >
        </el-table-column>
        <el-table-column
          prop="pay_time"
          label="支付时间"
          v-if="params.status == 2"
        >
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="支付类型"
          v-if="params.status == 2"
        >
        </el-table-column>
        <el-table-column
          prop="trade_no"
          label="支付单号"
          v-if="params.status == 2"
        >
        </el-table-column>
        <el-table-column
          prop="express_type"
          label="快递公司"
          v-if="params.status == 3"
        >
        </el-table-column>
        <el-table-column
          prop="express_no"
          label="快递单号"
          v-if="params.status == 3"
        >
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDetails(scope.row)"
            >
              详情
            </el-button>
            <el-button
              v-if="scope.row.status == 2"
              size="mini"
              type="primary"
              @click="handleShip(scope.row)"
            >
              发货
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="currentchange"
      >
      </el-pagination>
    </el-card>

    <!-- 详情弹窗 -->
    <el-dialog title="订单详情" v-model="dialogFormVisibleDetails" width="36%">
      <el-card
        shadow="always"
        v-for="(item, index) in Details"
        :key="index"
        style="margin-bottom: 16px"
      >
        <el-container>
          <el-aside width="200px"
            ><img :src="item.cover_url" alt="" style="width: 100px" />
          </el-aside>
          <el-main>
            <h4>{{ item.title }}</h4>
            <div class="goods">
              <span>单价： {{ item.price }}</span>
              <!-- 通过一个数组的index可以去拿到另一个数组中对应index的值 -->
              <!-- 当一些数据分布在两个数组对象中时 -->
              <span>数量： {{ Details1[index].num }}</span>
              <span>总价：{{ item.price * Details1[index].num }}</span>
            </div>
          </el-main>
        </el-container>
      </el-card>
    </el-dialog>

    <!-- 发货弹窗 -->
    <el-dialog title="发货" v-model="dialogFormVisibleShip" width="36%">
      <el-form
        :model="shipForm"
        label-width="80px"
        :rules="shipFormRules"
        ref="shipFormRef"
      >
        <el-form-item label="快递公司" prop="express_type">
          <el-select v-model="shipForm.express_type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" prop="express_no">
          <el-input v-model="shipForm.express_no"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reset">重 置</el-button>
          <el-button type="primary" @click="tureClick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getOrder, ship } from "@/network/order";

export default {
  name: "",
  data() {
    return {
      //订单数据对象
      tableData: [],
      total: 0,
      //query请求数据
      params: {
        current: "",
        order_no: "",
        status: "",
        include: "goods,user,orderDetails",
      },
      //订单状态
      options1: [
        {
          value: "1",
          label: "待支付",
        },
        {
          value: "2",
          label: "已支付",
        },
        {
          value: "3",
          label: "已发货",
        },
        {
          value: "4",
          label: "已收货",
        },
        {
          value: "5",
          label: "已过期",
        },
      ],
      //详情弹窗
      dialogFormVisibleDetails: false,
      Details: [],
      Details1: [],
      //发货弹窗
      dialogFormVisibleShip: false,
      id: "",
      shipForm: {
        express_type: "",
        express_no: "",
      },
      shipFormRules: {
        express_type: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        express_no: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
      //发货公司
      options: [
        {
          value: "SF",
          label: "顺丰",
        },
        {
          value: "YTO",
          label: "圆通",
        },
        {
          value: "YD",
          label: "韵达",
        },
      ],
    };
  },
  watch: {
    //监听params.status，每次变化都去重新获取列表数据
    "params.status": {
      handler(newName, oldName) {
        this.getOrders();
      },
    },
  },
  methods: {
    //获取订单列表
    getOrders() {
      getOrder(this.params).then((res) => {
        this.tableData = res.data;
        console.log(res.data);
        this.total = res.meta.pagination.total;
      });
    },
    //页码改变重新去加载
    currentchange(page) {
      this.params.current = page;
      this.getOrders();
    },
    //通过订单号进行筛选
    searchOrder_no() {
      this.getOrders();
    },
    //订单详情弹窗
    handleDetails(e) {
      this.dialogFormVisibleDetails = true;
      this.Details = e.goods.data;
      this.Details1 = e.orderDetails.data;
    },
    //发货弹窗
    handleShip(e) {
      this.dialogFormVisibleShip = true;
      this.id = e.id;
    },
    //重置
    reset() {
      this.$refs.shipFormRef.resetFields();
    },
    //确认发货
    tureClick() {
      this.$refs.shipFormRef.validate((vali) => {
        if (!vali) return;
        console.log(this.shipForm);
        ship(this.id, this.shipForm).then((res) => {
          this.$message({
            showClose: true,
            message: "发货成功",
            type: "success",
          });
          this.dialogFormVisibleShip = false;
          this.$refs.shipFormRef.resetFields();
          //发货成功加载发货列表数据
          //this.params.status = 3;
          //this.getOrders();
        });
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style scoped>
.el-row {
  margin: 20px 0 30px 0;
}
</style>