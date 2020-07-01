<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">{{shouye}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{guanli}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{liebiao}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
  <div slot="header" class="clearfix" style="height:800px;overflow:scroll">
    <slot></slot>
  </div>
</el-card>
  </div>
</template>
<script>
export default {
  props:['shouye','guanli','liebiao']
}
</script>
<style lang="less" scoped>
  .el-breadcrumb{
    margin-bottom: 10px;
  }
  .el-card__header{
    height: 900px;
    // overflow: auto;
  }
</style>