<template>
  <div>
    <el-upload :show-file-list="false" :http-request="Uploadfile">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <img width="100%" :src="pictureUrl" alt="" />
  </div>
</template>
<script>
import { ossToken } from "network/upload";
import axios from "axios";

export default {
  name: "Upload",
  data() {
    return {
      pictureUrl: "",
    };
  },
  methods: {
    //随机生成文件名，防止上传的文件重名
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        return (
          c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8"
        ).toString(16);
      });
    },
    //自定义上传
    Uploadfile(param) {
      console.log(param);
      let file = param.file; // 得到文件的内容
      console.log(file);
      // 获取oss签名
      ossToken().then((response) => {
        console.log(response);
        let policyData = response;
        console.log(policyData);
        let ossUrl = policyData.host; //填写自己OSS服务器的地址
        let accessUrl = policyData.dir + "/" + this.getUUID() + file.name; //设置上传的访问路径
        let sendData = new FormData(); // 上传文件的data参数
        sendData.append("OSSAccessKeyId", policyData.accessid);
        sendData.append("policy", policyData.policy);
        sendData.append("Signature", policyData.signature);
        //         sendData.append("keys", policyData.dir);
        sendData.append("key", accessUrl); //上传的文件路径
        sendData.append("success_action_status", 200); // 指定返回的状态码
        sendData.append("type", "image/jpeg");
        sendData.append("file", file);
        console.log(sendData);
        axios
          .post(ossUrl, sendData, {
            "Content-Type": "multipart/form-data",
          })
          .then((res) => {
            this.pictureUrl = ossUrl + "/" + accessUrl; //获得到的url需要将其存数据库中
            console.log("上传到阿里云的图片地址：" + ossUrl + "/" + accessUrl);
          });
      });
    },
  },
};
</script>