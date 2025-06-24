<template>
  <div class="app-container" :class="{'dark-mode': isDarkMode, 'light-mode': !isDarkMode}">
    <div :style="{ marginBottom: '10px'}">
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

        <el-col :sm="6">
          <BackupRestore v-show="isMobile() ? false:true"/> 
        </el-col>
        <el-col :sm="2">
          <div class="theme-toggle" @click="toggleDarkMode">
            <i :class="isDarkMode ? 'el-icon-moon' : 'el-icon-sunny'" class="theme-toggle-icon"></i>
            <span style="margin-left: 5px">{{ isDarkMode ? 'Dark' : 'Light' }}</span>
          </div>
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
      isDarkMode: false
    };
  },
  methods : {
    isMobile(){
      return window.isMobile;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
      this.applyTheme();
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.body.style.backgroundColor = '#1a1a1a';
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        document.body.style.backgroundColor = '#e4e4e461';
      }
    }
  },
  mounted() {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme === 'true') {
      this.isDarkMode = true;
    } else if (savedTheme === 'false') {
      this.isDarkMode = false;
    } else {
      // If no saved preference, check system preference
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    this.applyTheme();

    // Listen for changes in system color scheme
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
          this.isDarkMode = e.matches;
          this.applyTheme();
        }
      });
    }
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

.theme-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.dark-mode .theme-toggle {
  color: #f5f5f5;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark-mode .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-toggle-icon {
  font-size: 20px;
}

/* Apply some base dark mode styles */
.dark-mode {
  background-color: #1a1a1a;
  color: #f5f5f5;
}

.light-mode {
  background-color: #e4e4e461;
  color: #2c3e50;
}
</style>
