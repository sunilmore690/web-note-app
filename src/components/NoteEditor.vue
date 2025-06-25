<template>
  <el-row>
    <div v-if="editMode" style="height: calc(100vh - 80px); overflow-y: hidden; max-width: 100%; overflow-x: hidden; display: flex; flex-direction: column;">
      <div style="margin-bottom: 10px; flex-shrink: 0;">
        <el-input
          placeholder="Title goes here ..."
          v-model="mynote.title"
          @change="saveNote"
        ></el-input>
      </div>
      <div style="margin-bottom: 10px; flex-shrink: 0;">
        <el-select
          @change="saveNote"
          style="width: 100%"
          v-model="mynote.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Enter your tags here..."
        >
          <el-option
            v-for="tag in tags || []"
            :key="tag"
            :label="tag"
            :value="tag"
          >
          </el-option>
        </el-select>
      </div>
      <vue-editor
        ref="editor"
        v-model="mynote.body"
        class="margin-bottom10"
        style="flex: 1; min-height: 0;"
      ></vue-editor>
    </div>
    <div v-else style="height: calc(100vh - 80px); padding: 10px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; max-width: 100%;">
      <h3>{{ mynote.title }}</h3>
      <div>
        Tags:
        <el-tag v-for="tag1 in tags || []" :key="tag1 + 'def'">{{
          tag1
        }}</el-tag>
      </div>
      <div style="border-color: grey; border-width: 2px; max-width: 100%; overflow-x: hidden;">
        <div v-html="mynote.body" style="max-width: 100%; overflow-wrap: break-word; word-wrap: break-word;"></div>
      </div>
    </div>
  </el-row>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    note: Object,
    tags: Array,
    editMode: {
      name: "editMode",
      default: true,
    },
  },

  data() {
    return {
      mynote: {
        tags: [],
      },
      // editMode: true,
      saveTimeout: null,
      isMobile: /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent),
    };
  },
  components: {
    VueEditor,
  },
  watch: {
    note() {
      console.log("this.mynote", this.mynote);
      console.log("this.note", this.note);
      // if(this.mynote.id && this.note.id !== this.mynote.id){
      //   this.saveNote();
      // }
      this.mynote = Object.assign({}, this.note);
      this.updateTitleFromBodyIfNeeded();
    },
    'mynote.body'() {
      this.updateTitleFromBodyIfNeeded();
    }
  },
  methods: {
    updateTitleFromBodyIfNeeded() {
      // If title is empty or just "New Title", extract from body
      if (!this.mynote.title || this.mynote.title.trim() === '' || this.mynote.title === 'New Title') {
        if (this.mynote.body && this.mynote.body.trim() !== '') {
          // Remove HTML tags and get first line
          const textContent = this.mynote.body.replace(/<[^>]*>/g, '').trim();
          const firstLine = textContent.split('\n')[0].trim();

          if (firstLine && firstLine.length > 0) {
            // Limit title length to 50 characters
            this.mynote.title = firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
          }
        }
      }
    },
    startSaveTimeout() {
      if (this.saveTimeout !== null) return;
      this.saveTimeout = setInterval(() => {
        if (this.mynote.body !== this.note.body) {
          this.saveNote();
        }
      }, 1000);
    },
    clearSaveTimeout() {
      clearInterval(this.saveTimeout);
      this.saveTimeout = null;
    },
    saveNote() {
      this.$emit("savenote", { ...this.mynote });
      this.saveTags();
    },
    saveTags() {
      this.$emit("updatetags", this.mynote.tags);
      // this.saveNote();
    },
  },
  mounted() {
    this.startSaveTimeout();
  },
  destroyed() {
    this.clearSaveTimeout();
    this.$emit("");
  },
};
</script>
<style>
.note {
  padding-left: 20px;
}

.quillWrapper {
  overflow: hidden !important;
  height: 100% !important;
  max-height: 100% !important;
  max-width: 100%;
  display: flex !important;
  flex-direction: column !important;
}

.ql-container {
  flex: 1 !important;
  height: auto !important;
  max-height: 100% !important;
  max-width: 100%;
  overflow: hidden !important;
}

.ql-editor {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  max-height: 100% !important;
  height: 100% !important;
}

/* Make sure editor content wraps properly */
.ql-editor {
  overflow-wrap: break-word;
  word-wrap: break-word;
  max-width: 100%;
}

/* Make sure images don't overflow */
.ql-editor img {
  max-width: 100%;
  height: auto;
}

/* Dark mode styles for editor */
.dark-mode .ql-editor {
  color: var(--editor-text);
  background-color: var(--editor-background);
}

.dark-mode .ql-toolbar.ql-snow {
  border-color: var(--border-color);
  background-color: var(--editor-background);
}

.dark-mode .ql-toolbar.ql-snow .ql-picker-label,
.dark-mode .ql-toolbar.ql-snow .ql-picker-options {
  background-color: var(--editor-background);
  color: var(--text-color);
}

.dark-mode .ql-snow .ql-stroke {
  stroke: var(--icon-color); /* Use softer icon color */
}

.dark-mode .ql-snow .ql-fill {
  fill: var(--icon-color); /* Use softer icon color */
}

.dark-mode .ql-snow.ql-toolbar button:hover,
.dark-mode .ql-snow .ql-toolbar button:hover,
.dark-mode .ql-snow.ql-toolbar button.ql-active,
.dark-mode .ql-snow .ql-toolbar button.ql-active,
.dark-mode .ql-snow.ql-toolbar .ql-picker-label:hover,
.dark-mode .ql-snow .ql-toolbar .ql-picker-label:hover,
.dark-mode .ql-snow.ql-toolbar .ql-picker-label.ql-active,
.dark-mode .ql-snow .ql-toolbar .ql-picker-label.ql-active,
.dark-mode .ql-snow.ql-toolbar .ql-picker-item:hover,
.dark-mode .ql-snow .ql-toolbar .ql-picker-item:hover,
.dark-mode .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
.dark-mode .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
  color: #79a9d6; /* Softer blue for active states */
}

.dark-mode .ql-snow.ql-toolbar button:hover .ql-stroke,
.dark-mode .ql-snow .ql-toolbar button:hover .ql-stroke,
.dark-mode .ql-snow.ql-toolbar button.ql-active .ql-stroke,
.dark-mode .ql-snow .ql-toolbar button.ql-active .ql-stroke,
.dark-mode .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.dark-mode .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
.dark-mode .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.dark-mode .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.dark-mode .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.dark-mode .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
.dark-mode .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.dark-mode .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
  stroke: #79a9d6; /* Softer blue for active states */
}

/* Style the view mode in dark theme */
.dark-mode h3 {
  color: var(--text-color);
}
</style>