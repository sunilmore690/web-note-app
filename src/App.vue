<template>
  <div>
    <div :style="{ marginBottom: '10px' }">
      <el-dialog title="About Us" :visible.sync="dialogVisible" width="90%" >
        <p :style="{fontSize:'medium'}">
          Welcome to the  Note App! We are a team of developers dedicated to
          providing you with a user-friendly and efficient note-taking
          experience. Our app comes equipped with a variety of features to make
          your note-taking experience as smooth as possible. With our app,  <br> <br>
           <ul>
             <li> Store Notes Offline </li>
             <li> Sort Notes By Created and Updated Date </li>
             <li> Search the notes by Title or Tag </li>
             <li> Filter the notes by tag </li>
             <li> Backup and Restore your notes</li>
           </ul>
           To ensure that your notes are always safe and
          secure, our app also offers a backup and restore function. This means
          you can backup your notes to the cloud and restore them whenever
          necessary, giving you peace of mind knowing that your notes are always
          protected. <br><br>Thank you for choosing PWA Note app. We hope our app will
          help you stay organized and productive!

          <br><br>

          For any query , contact <a href="mailto:sunilmore690@gmail.com?subject=Note App Contact">Send an email</a>

        </p>
      </el-dialog>
      <el-row>
        <el-col :sm="10"
          ><span :style="{ fontSize: '25px', fontWeight: 700 }">Take Note</span>
          &nbsp;<span
            >By <a href="https://sunilmore.com" target="_blank"> Sunil More</a>
          </span>
         &nbsp;&nbsp;  <el-button type="text" @click="dialogVisible = true"
            >About Us</el-button
          ></el-col
        >
        <el-col :sm="2">&nbsp;</el-col>
        <el-col :sm="6">
          <BackupRestore /> 
        </el-col>
        <el-col :sm="2">
          
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
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: {
    DashBoard,
    BackupRestore,
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
