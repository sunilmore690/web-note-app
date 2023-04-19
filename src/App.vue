<template>
  <div>
    <div :style="{ marginBottom: '10px' }">
      <el-row>
        <el-col
        :sm="10"
          ><span :style="{ fontSize: '25px', fontWeight: 700 }">Take Note</span>
          &nbsp;<span
            >By <a href="https://sunilmore.com" target="_blank"> Sunil More</a>
          </span></el-col
        >
        <el-col :sm="6">&nbsp;</el-col>
        <el-col :sm="8">
          <BackupRestore/>
        </el-col>
      </el-row>
    </div>
    <div>
      <DashBoard msg="Hello Vue in CodeSandbox!" />
    </div>
  </div>
</template>

<script>
import DashBoard from "./components/DashBoard";
import BackupRestore from "./components/BackupRestore.vue";
export default {
  name: "App",
  components: {
    DashBoard,
    BackupRestore
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
