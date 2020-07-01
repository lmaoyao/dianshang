<template>
  <div>
     <el-aside :width="isCollapse ?'64px':'200px'">
    <div class="toogle-button" @click="toogleClick">|||</div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened='true'
      :collapse="isCollapse"
      :collapse-transition="false"
      router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理员</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="list"> 
                <i class="el-icon-menu"></i>
                超级管理员
              </el-menu-item>
              <el-menu-item index="1-2">
                 <i class="el-icon-menu"></i>
                地区管理员
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>投诉管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="commodity">投诉查询</el-menu-item>
              <el-menu-item index="querylist">订单查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="index">上传订单</el-menu-item>
              <el-menu-item index="query">查询订单</el-menu-item>
              <el-menu-item index="3-3">代发货订单</el-menu-item>
              <el-menu-item index="3-4">退款维权订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="statistics">统计信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>线下管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">线下数据</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">客户分析</el-menu-item>
              <el-menu-item index="5-2">商品分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
    </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //左侧菜单数据
      menulist:{},
    
      //是否折叠
      isCollapse:false,
    }
  },
  created(){
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //点击实现菜单的折叠和展开
    toogleClick(){
      this.isCollapse =! this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
.el-aside{
       height: 100%;
      background-color: #333744;
    }
  .toogle-button{
      background-color: #4a5064;
      font-size: 10px;
      line-height: 20px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
     .el-menu{
    border-right: none;
  }
</style>