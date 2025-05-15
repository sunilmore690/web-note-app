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
        class="margin-bottom10"
        style="height: 700px; overflow-y: scroll"
      ></vue-editor>
    </div>
    <div v-else style="height: 90vh; padding: 10px;overflow-y: scroll;">
      <h3>Title: {{ mynote.title }}</h3>
      <div>
        Tags:
        <el-tag v-for="tag1 in tags || []" :key="tag1 + 'def'">{{
          tag1
        }}</el-tag>
      </div>
      <div style="border-color: grey; border-width: 2px;">
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
<style >
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
</style>