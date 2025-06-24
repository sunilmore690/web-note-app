<template>
  <div
  @mouseenter="handleMouseEnter"
   @mouseleave="close = false"
    @contextmenu="close = true;$event.preventDefault()"
    style="margin-bottom: 8px;padding:3px"
  >
    <el-card
      class=" note-list-unit"
      :class="{ active: note.id === noteobj.id }"
    >
      <div v-show="false" style="position: absolute">
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
          <el-button slot="reference" type="danger" size="large" round
            @click.stop="">X</el-button
          >
        </el-popover>
      </div>
      <span style="font-weight: bold">{{ noteobj.title | trim(40) }}</span>
      <el-row style="font-size: smaller; padding-top: 10px">
        <!-- <el-col :span="12">Created :{{ noteobj.created | updatedFormatDate }}</el-col> -->
        <el-col :span="12">{{ noteobj.updated | updatedFormatDate }}</el-col>
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
    handleMouseEnter(){
      if(!window.isMobile){
        this.close = true;
      }
    }
  },
  filters: {
    trim(value = "", count = 10) {
      if (value.length <= 30) {
        return value;
      }
      return value.slice(0, count) + "...";
    },
    updatedFormatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diff = (now.getTime() - date.getTime()) / 1000;

      if (diff < 60) {
        return Math.floor(diff) + "s ago";
      } else if (diff < 60 * 60) {
        const minutes = Math.floor(diff / 60);
        return minutes === 1 ? "1 m ago" : minutes + "m ago";
      } else if (diff < 60 * 60 * 24) {
        const hours = Math.floor(diff / (60 * 60));
        return hours === 1 ? "1 h ago" : hours + "h ago";
      } else if (diff < 60 * 60 * 24 * 5) {
        const days = Math.floor(diff / (60 * 60 * 24));
        return days === 1 ? "1 d ago" : days + "d ago";
      } else {
        const currentDate = new Date();
        if( currentDate.getFullYear() === date.getFullYear() ){
          const options = { day: 'numeric', month: 'long' };
          return date.toLocaleDateString(undefined, options);
        } else {
          const options = { year: "numeric", month: "long", day: "numeric" };
         return date.toLocaleDateString("en-US", options);
        }

      }
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
  /* box-shadow: 0 5px 12px var(--shadow-color); */
  cursor: pointer;
  border-radius: 15px;
  border: none;
  /* transition: all 0.3s ease; */
}
.note-list-unit.active {
  background: #e0e0e0;
  color: #333333;
}

/* .note-list-unit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px var(--shadow-color);
} */

.dark-mode .note-list-unit {
  background-color: var(--card-background);
  color: var(--text-color);
}

.dark-mode .note-list-unit.active {
  background: #444444;
  color: #ffffff;
}
</style>