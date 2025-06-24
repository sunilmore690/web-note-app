<template>
  <div class="app-container" :class="darkMode ? 'dark-mode' : 'light-mode'">
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
             <li> Dark Mode for comfortable reading</li>
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
        <el-col :sm="8" :xs="12"
          ><span :style="{ fontSize: '25px', fontWeight: 700 }">Note App</span>
          &nbsp;<span
            >By <a href="https://sunilmore.com" target="_blank"> Sunil More</a>
          </span>
         &nbsp;&nbsp;  <el-button type="text" @click="dialogVisible = true"
            >About Us</el-button
          ></el-col
        >

        <el-col :sm="4" :xs="12">
          <BackupRestore v-show="isMobile() ? false:true"/> 
        </el-col>
        <el-col :sm="4" :xs="12" class="theme-toggle-container">
          <div class="theme-switch-wrapper">
            <i class="el-icon-moon theme-icon"></i>
            <el-switch
              v-model="darkMode"
              @change="toggleDarkMode"
              active-color="#1a1a1a"
              inactive-color="#555555"
              class="theme-switch"
            ></el-switch>
            <i class="el-icon-sunny theme-icon"></i>
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
      darkMode: false
    };
  },
  created() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkMode = savedTheme === 'dark';
    } else {
      // Check if user's device prefers dark mode
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode = prefersDark;
    }

    // Apply theme to document body
    this.applyTheme();
  },
  methods: {
    isMobile() {
      return window.isMobile;
    },
    toggleDarkMode() {
      // Save user preference
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
      this.applyTheme();
    },
    applyTheme() {
      // Apply theme to document body for global styling
      document.body.classList.toggle('dark-mode', this.darkMode);
      document.body.classList.toggle('light-mode', !this.darkMode);
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
  margin-top: 30px;
}

.theme-toggle-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.theme-switch-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.theme-icon {
  margin: 0 8px;
  font-size: 18px;
  color: var(--icon-color);
  transition: all 0.3s ease;
}

.el-icon-moon {
  color: #555;
}

.el-icon-sunny {
  color: #E6A23C;
}

.dark-mode .el-icon-moon {
  color: #555;
}

.dark-mode .el-icon-sunny {
  color: #E6A23C;
}

.theme-switch {
  transform: scale(1.2);
}

.app-container {
  min-height: 100vh;
  padding: 10px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .theme-toggle-container {
    justify-content: center;
    margin-top: 10px;
  }

  .theme-switch {
    transform: scale(1);
  }

  #app {
    margin-top: 15px;
  }
}
</style>
