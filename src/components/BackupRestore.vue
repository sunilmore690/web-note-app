<template>
  <div>
    <el-button @click="backup" round size="medium"
      ><i class="el-icon-download"></i>&nbsp;Backup</el-button
    >
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="uploadBackup"
    />&nbsp;
    <el-popover placement="top" width="160" v-model="visible">
      <p>Are you sure to Restore this?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false"
          >cancel</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="
            openFileInput();
            visible = false;
          "
          >confirm</el-button
        >
      </div>
      <el-button  round size="medium" slot="reference">
      <i class="el-icon-upload"></i> &nbsp;Restore</el-button
    >
    </el-popover>

    
  </div>
</template>
  
  <script>
import { addOrUpdateRecord, getAllNotes } from "@/idb";

export default {
    data() {
    return {
    //   close: false,
      visible: false,
    };
  },
  methods: {
    async backup() {
      // Open the IndexedDB database
      const notes = await getAllNotes();
      const tags = JSON.parse(window.localStorage.getItem("tags"));
      const blob = new Blob([JSON.stringify({ notes, tags })], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      // Download the JSON file
      const a = document.createElement("a");
      a.href = url;
      a.download = "noteapp.sunilmore.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    async uploadBackup() {
      const file = this.$refs.fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const { notes, tags } = JSON.parse(reader.result);
          console.log("notes", notes);
          console.log("tags", tags);
          if (Array.isArray(notes)) {
            await Promise.all(notes.map((note) => addOrUpdateRecord(note)));
          }
          if (Array.isArray(tags)) {
            window.localStorage.setItem("tags", JSON.stringify(tags));
          }
          alert('Restore done')
          window.location.reload();
        } catch (e) {
          console.error(e);
          alert("Something went wrong whiel doing restore");
        }
      };
      reader.readAsText(file);
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>
  