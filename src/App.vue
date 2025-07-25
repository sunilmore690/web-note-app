<template>
  <div class="app-container" :class="{'dark-mode': isDarkMode, 'light-mode': !isDarkMode}">
    <div :style="{ marginBottom: '10px'}">
      <el-dialog title="About Us" :visible.sync="dialogVisible" width="90%" >
        <p :style="{fontSize:'medium'}">
          Welcome to NoteWapp! We are a team of developers dedicated to
          providing you with a user-friendly and efficient note-taking
          experience. Our app comes equipped with a variety of features to make
          your note-taking experience as smooth as possible. With our app,  <br> <br>
           <ul>
             <li> Store Notes Offline - Your notes are saved locally on your device </li>
             <li> Sort Notes By Created and Updated Date </li>
             <li> Search the notes by Title or Tag </li>
             <li> Filter the notes by tag </li>
             <li> Backup and Restore your notes - Download your notes as a JSON file for backup and restore them anytime</li>
             <li> Dark and Light Mode Support </li>
             <li> Rich Text Editor with formatting options </li>
             <li> Auto-title generation from note content </li>
             <li> Mobile-responsive design for seamless use on any device </li>
           </ul>
           To ensure that your notes are always safe and
          secure, our app offers a local backup and restore function. You can download
          all your notes as a JSON file to your device and restore them whenever
          necessary. This gives you complete control over your data and ensures your notes
          are always protected and portable. <br><br>

          NoteWapp works entirely offline - no internet connection required! Your privacy
          is our priority, and all your notes stay on your device unless you choose to
          create backups. <br><br>

          Thank you for choosing NoteWapp. We hope our app will
          help you stay organized and productive!

          <br><br>

          For any query, contact <a href="mailto:sunilmore690@gmail.com?subject=NoteWapp - Query">Send an email</a>

        </p>
      </el-dialog>
      <el-row>
        <el-col :span="24" class="header-container">
          <!-- Desktop layout -->
          <div v-if="!isMobile()" class="desktop-header">
            <div class="app-title">
              <span :style="{ fontSize: '25px', fontWeight: 700 }">NoteWapp</span>
            </div>
            <div class="center-controls">
              <div class="theme-toggle-container">
                <i class="el-icon-sunny" :class="{'active-icon': !isDarkMode}"></i>
                <el-switch
                  v-model="isDarkMode"
                  @change="toggleDarkMode"
                  active-color="#444444"
                  inactive-color="#8e99a5"
                  class="theme-switch"
                ></el-switch>
                <i class="el-icon-moon" :class="{'active-icon': isDarkMode}"></i>
              </div>
              <el-button type="text" @click="dialogVisible = true">About Us</el-button>
              <el-button v-if="showInstallButton" type="primary" size="small" @click="installApp" class="install-button">
                <i class="el-icon-download"></i> Install App
              </el-button>
            </div>
            <div class="backup-controls">
              <BackupRestore />
            </div>
          </div>

          <!-- Mobile layout -->
          <div v-else class="mobile-header">
            <div class="mobile-row">
              <span class="mobile-title" :style="{ fontSize: '22px', fontWeight: 700 }">NoteWapp</span>
              <div class="theme-toggle-container mobile">
                <i class="el-icon-sunny mobile-icon" :class="{'active-icon': !isDarkMode}"></i>
                <el-switch
                  v-model="isDarkMode"
                  @change="toggleDarkMode"
                  active-color="#444444"
                  inactive-color="#8e99a5"
                  class="theme-switch"
                  size="small"
                ></el-switch>
                <i class="el-icon-moon mobile-icon" :class="{'active-icon': isDarkMode}"></i>
              </div>
              <el-button type="text" size="small" @click="dialogVisible = true">About Us</el-button>
              <el-button v-if="showInstallButton" type="primary" size="mini" @click="installApp" class="install-button-mobile">
                <i class="el-icon-download"></i>
              </el-button>
            </div>
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
      isDarkMode: false,
      deferredPrompt: null,
      showInstallButton: false
    };
  },
  methods : {
    isMobile(){
      return window.innerWidth <= 800;
    },
    toggleDarkMode() {
      // We're now using v-model directly with the switch, no need to toggle
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
        document.body.style.backgroundColor = '#f2f2f2'; /* Updated to match theme.css */
      }
    },
    installApp() {
      // Hide the install button
      this.showInstallButton = false;
      
      // Show the installation prompt
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          
          // Clear the saved prompt since it can't be used again
          this.deferredPrompt = null;
        });
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

    // PWA Installation
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      
      // Show the install button
      this.showInstallButton = true;
    });

    // Hide the install button when the app is installed
    window.addEventListener('appinstalled', () => {
      console.log('App was installed');
      this.showInstallButton = false;
    });
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
  max-width: 100%;
  overflow-x: hidden;
}

.app-container {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 0 10px;
}

/* Apply some base dark mode styles */
.dark-mode {
  background-color: #1a1a1a;
  color: #d4d4d4; /* Softened from #f5f5f5 */
}

.light-mode {
  background-color: #e4e4e461;
  color: #2c3e50;
}

/* Fix for content that might cause horizontal scrolling */
body, html {
  max-width: 100%;
  overflow-x: hidden;
}

/* Theme switch styles */
.theme-switch {
  margin: 0;
  position: relative;
  z-index: 1;
}

.el-switch {
  height: 20px;
  line-height: 20px;
}

.dark-mode .el-switch__label {
  color: #d4d4d4;
}

/* Header layout */
.header-container {
  margin-bottom: 15px;
}

.desktop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.app-title {
  flex: 1;
  text-align: left;
}

.center-controls {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backup-controls {
  flex: 1;
  text-align: right;
}

/* Additional styles for dark mode switch */
.dark-mode .el-switch__core {
  border-color: #555;
  background-color: #444;
}

.dark-mode .el-switch.is-checked .el-switch__core {
  border-color: #444;
  background-color: #555;
}

/* Theme toggle with icons */
.theme-toggle-container {
  display: flex;
  align-items: center;
  margin: 0 5px;
  position: relative;
  min-width: 90px; /* Ensure enough space for the switch and icons */
}

.el-icon-sunny, .el-icon-moon {
  font-size: 18px;
  color: #8e99a5;
  margin: 0 8px;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;
  margin-left: 10px;
  z-index: 2; /* Ensure icons stay above the switch */
}

.el-icon-sunny {
  margin-right: 12px; /* More space between sun icon and switch */
}

.el-icon-moon {
  margin-left: px; /* More space between moon icon and switch */
}

.active-icon {
  color: #606266;
  transform: scale(1.2);
}

.dark-mode .el-icon-sunny {
  color: #8e99a5;
}

.dark-mode .el-icon-moon.active-icon {
  color: #d4d4d4;
}

/* Mobile icon adjustments */
.theme-toggle-container.mobile {
  margin: 0 2px;
  min-width: 70px; /* Smaller minimum width for mobile */
}

.mobile-icon {
  font-size: 14px;
  margin: 0 3px;
}

.theme-toggle-container.mobile .el-icon-sunny {
  margin-right: 8px;
}

.theme-toggle-container.mobile .el-icon-moon {
  margin-left: 8px;
}

/* Mobile header styles */
.mobile-header {
  width: 100%;
}

.mobile-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
}

.mobile-title {
  margin-right: 5px;
}

/* Install button styles */
.install-button {
  margin-left: 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.install-button i {
  margin-right: 5px;
}

.install-button-mobile {
  margin-left: 5px;
  padding: 5px 10px;
}

.dark-mode .install-button,
.dark-mode .install-button-mobile {
  background-color: #5696d1;
  border-color: #5696d1;
}

.dark-mode .install-button:hover,
.dark-mode .install-button-mobile:hover {
  background-color: #4d85b8;
  border-color: #4d85b8;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  #app {
    margin-top: 10px;
    padding: 0;
  }

  .app-container {
    padding: 0 5px;
  }

  .theme-switch {
    transform: scale(0.8);
  }

  .mobile-icon {
    font-size: 14px;
    margin: 0 3px;
  }

  .mobile-row {
    padding: 5px 0;
    margin-bottom: 10px;
  }

  .el-button--text {
    padding: 7px 10px;
    font-size: 13px;
  }

  .dark-mode .el-button--text {
    color: #d4d4d4;
  }

  /* Ensure all elements respect container width */
  img, table, pre, code, .el-input, .el-select, .el-button {
    max-width: 100%;
    box-sizing: border-box;
  }

  /* Force word wrapping for all text content */
  * {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .el-switch__label {
    display: none !important;
  }
}

/* Global Custom Scrollbar Styling */
::-webkit-scrollbar {
  width: 6px; /* Thin scrollbar */
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}

/* Dark mode scrollbar */
.dark-mode ::-webkit-scrollbar-thumb {
  background-color: rgba(200, 200, 200, 0.2);
}

.dark-mode ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(200, 200, 200, 0.4);
}

/* Firefox scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(144, 147, 153, 0.3) transparent;
}

.dark-mode * {
  scrollbar-color: rgba(200, 200, 200, 0.2) transparent;
}
</style>
