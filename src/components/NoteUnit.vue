<template>
  <div @mouseover="close = true" @mouseleave="close = false">
    <el-card
      class="box-card note-list-unit"
      :class="{ active: note.id === noteobj.id }"
    >
      <div v-show="close" style="position: absolute">
        <el-popover placement="top" width="160" v-model="visible">
          <p>Are you sure to delete this?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false"
              >cancel</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="
                handleDeleteNote(note);
                visible = false;
              "
              >confirm</el-button
            >
          </div>
          <el-button slot="reference" type="danger" size="small" round
            >X</el-button
          >
        </el-popover>
      </div>
      <span style="font-weight: bold">{{ noteobj.title | trim(40) }}</span>
      <el-row style="font-size: smaller; padding-top: 10px">
        <el-col :span="12">Created :{{ noteobj.created | formatDate }}</el-col>
        <el-col :span="12">Updated : {{ noteobj.updated | formatDate }}</el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ["noteobj", "note"],
  data() {
    return {
      close: false,
      visible: false,
    };
  },
  methods: {
    handleDeleteNote(note) {
      this.$emit("removenote", note);
    },
  },
  filters: {
    trim(value = "", count = 10) {
      if (value.length <= 30) {
        return value;
      }
      return value.slice(0, count) + "...";
    },
    formatDate(date) {
      try {
        if (!date) {
          date = new Date();
        }
        let month = date.toLocaleString("default", { month: "short" });
        return `${date.getDate()}-${month}-${date.getFullYear()}`;
      } catch (e) {
        date = new Date();
        let month = date.toLocaleString("default", { month: "short" });
        return `${date.getDate()}-${month}-${date.getFullYear()}`;
      }
    },
  },
};
</script>
<style scoped>
.note-list-unit {
  cursor: pointer;
}
.note-list-unit.active {
  background: grey;
  color: white;
}
</style>