<template>
  <el-row>
    <div v-if="editMode">
      <div style="margin-bottom: 10px">
        <el-input
          placeholder="Title goes here ..."
          v-model="mynote.title"
          @change="saveNote"
        ></el-input>
      </div>
      <div style="margin-bottom: 10px">
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
        class="margin-bottom10 note-editor quill-editor-container"
        style="height: 700px; overflow-y: scroll"
        :use-custom-image-handler="true"
      ></vue-editor>
    </div>
    <div
      v-else
      class="note-viewer"
      style="height: 90vh; padding: 10px; overflow-y: scroll"
    >
      <h3>Title: {{ mynote.title }}</h3>
      <div>
        Tags:
        <el-tag v-for="tag1 in tags || []" :key="tag1 + 'def'">{{
          tag1
        }}</el-tag>
      </div>
      <div class="note-content">
        <div v-html="mynote.body"></div>
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
    },
  },
  methods: {
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
  overflow: unset !important;
  height: 75vh !important;
}
.ql-container {
  height: 70vh !important;
}

.note-editor {
  /* Add your dark mode styles for the editor here */
  background-color: #121212;
  color: #ffffff;
}

.note-viewer {
  /* Add your dark mode styles for the viewer here */
  background-color: #121212;
  color: #ffffff;
}

.note-content {
  /* Add any additional styles for the note content in dark mode */
  color: #ffffff;
}

.margin-bottom10 {
  margin-bottom: 10px;
}

/* Additional editor styling */
.vue-editor >>> .ql-container {
  min-height: 300px;
}

/* Ensure proper text color in editor */
.vue-editor >>> .ql-editor p,
.vue-editor >>> .ql-editor h1,
.vue-editor >>> .ql-editor h2,
.vue-editor >>> .ql-editor h3,
.vue-editor >>> .ql-editor h4,
.vue-editor >>> .ql-editor h5,
.vue-editor >>> .ql-editor h6,
.vue-editor >>> .ql-editor ul,
.vue-editor >>> .ql-editor ol,
.vue-editor >>> .ql-editor blockquote {
  color: inherit;
}

/* Ensure toolbar icons are visible in dark mode */
.dark-mode .quill-editor-container >>> .ql-toolbar.ql-snow .ql-formats button .ql-stroke {
  stroke: #ffffff;
}

.dark-mode .quill-editor-container >>> .ql-toolbar.ql-snow .ql-formats button .ql-fill {
  fill: #ffffff;
}

.dark-mode .quill-editor-container >>> .ql-toolbar.ql-snow .ql-picker-label {
  color: #ffffff;
}

.dark-mode .quill-editor-container >>> .ql-toolbar.ql-snow .ql-picker-label svg .ql-stroke {
  stroke: #ffffff;
}
</style>