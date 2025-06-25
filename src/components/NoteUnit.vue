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
    checkIfMobile() {
      return window.innerWidth <= 800;
    },
    handleMouseEnter(){
      if(!this.checkIfMobile()){
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
  box-shadow: 0 5px 12px 0#e4e4e461;
  cursor: pointer;
  border-radius: 15px;
  border: none;
  margin-bottom: 5px;
  width: 100%;
  transition: all 0.2s ease;
}

.note-list-unit.active {
  background-color: #e1e1e1;
  color: #333;
  border-right: 3px solid #409EFF;
}

.dark-mode .note-list-unit {
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
  background-color: var(--card-background);
  color: var(--text-color);
}

.dark-mode .note-list-unit.active {
  background: #4d4d4d; /* More distinct background color for dark mode */
  color: #e8e8e8;
  border-right: 3px solid #5696d1; /* Blue accent for better visibility */
}

@media (max-width: 768px) {
  .note-list-unit {
    margin-bottom: 8px;
    border-radius: 10px;
  }
}
</style>