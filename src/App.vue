<template>
  <div>
    <div :style="{marginBottom:'10px'}">
      <span :style="{ fontSize: '25px', fontWeight: 700 }">Take Note</span>
      &nbsp;<span>By <a href="https://sunilmore.com" target="_blank">  Sunil More</a> </span>
    </div>
    <div>
      <DashBoard msg="Hello Vue in CodeSandbox!" />
    </div>
  </div>
</template>

<script>
import DashBoard from "./components/DashBoard";

export default {
  name: "App",
  components: {
    DashBoard,
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
