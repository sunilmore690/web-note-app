<template>
  <el-row>
    <div >
      <el-row v-if="!isDeviceMobile">
        <el-col :span="8">
          <div style="text-align: left">
            <el-select v-model="sortBy" placeholder="Select">
              <el-option
                v-for="item in sortOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <el-select
            @change="handleTagChange"
            v-model="selectedTags"
            multiple
            collapse-tags
            style="margin-left: 20px"
            placeholder="Tags"
          >
            <el-option
              v-for="tag in tags"
              :key="tag + 'sidenote'"
              :label="tag"
              :value="tag"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <div style="text-align: right">
            <span style="padding-left: 10px; padding-right: 20px"
              >{{ mynotes.length }} / {{ notes.length }} Notes</span
            >
          </div>
        </el-col>
      </el-row>
      <el-row v-else style="margin-bottom: 10px; display: flex; align-items: center;">
        <el-col :span="12" style="text-align: left; padding-top: 5px;">
          <div>
            <span style="padding-left: 10px; padding-right: 20px"
              >{{ mynotes.length }} / {{ notes.length }} Notes</span
            >
          </div>
        </el-col>
        <el-col :span="6" style="text-align: center; padding-top: 5px;">
          <span
            @click="dialogVisible = true"
            style="
              font-size: large;
              padding: 5px;
              border-radius: 6px;
            "
            ><i class="el-icon-s-operation"></i
          ></span>
          <el-dialog title="Action" :visible.sync="dialogVisible" width="100vw">
            <el-row >
              <el-col :span="12">
                <div style="text-align: left">
                  <el-select v-model="sortBy" placeholder="Select">
                    <el-option
                      v-for="item in sortOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <el-select
                  @change="handleTagChange"
                  v-model="selectedTags"
                  multiple
                  collapse-tags
                  style="margin-left: 20px"
                  placeholder="Tags"
                >
                  <el-option
                    v-for="tag in tags"
                    :key="tag + 'sidenote'"
                    :label="tag"
                    :value="tag"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="24" style="padding-top: 20px;">
                <BackupRestore/>
              </el-col>
            </el-row>
          </el-dialog>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-button size="small" round @click="addNote()" class="add-note-btn"
            >+ Add Note</el-button
          >
        </el-col>
      </el-row>

      <el-row v-if="!isDeviceMobile" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center">
        <el-col :span="12" style="text-align: left">
          <el-popover
            placement="top"
            width="160"
            v-model="visible"
          >
            <p>Are you sure to delete this?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false"
                >cancel</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="
                  handleRemove(note);
                  visible = false;
                "
                >confirm</el-button
              >
            </div>
            <el-button
              slot="reference"
              icon="el-icon-delete"
              round
              size="mini"
              :disabled="!note || !note.id"
              :class="{'delete-btn': true, 'disabled': !note || !note.id}"
            ></el-button> </el-popover
        ></el-col>
        <el-col :span="12" style="text-align: right">
          <el-button size="small" round @click="addNote()" class="add-note-btn"
            >+ Add Note</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 10px">
      <el-input placeholder="search notes ..." v-model="search" clearable>
      </el-input>
    </div>
    <div style="max-height: calc(100vh - 200px);; overflow-y: auto">
      <div
        v-for="noteobj in mynotes"
        @click.prevent="setNote(noteobj)"
        :key="noteobj.id"
      >
        <note-unit
          :noteobj="noteobj"
          :note="note"
          @removenote="handleRemove"
        ></note-unit>
      </div>
    </div>
  </el-row>
</template>
<script>
import NoteUnit from "./NoteUnit";
import BackupRestore from "./BackupRestore.vue";
export default {
  props: ["notes", "note", "tags"],
  data() {
    return {
      dialogVisible: false,
      isMobile: window.isMobile,
      visible: false,
      mynotes: [],
      sortOptions: [
        {
          label: "Last Updated Notes",
          value: "updatedDesc",
        },
        {
          label: "Old Created Notes",
          value: "createdAsc",
        },
        {
          label: "Oldest  Updated Notes",
          value: "updatedAsc",
        },
        {
          label: "Latest  Created Notes",
          value: "createdDesc",
        },
      ],
      search: "",
      close: false,
      sortBy: "updatedDesc",
      selectedTags: [],
    };
  },
  watch: {
    notes() {
      this.mynotes = this.notes;
    },
    sortBy() {
      this.sortNotes();
    },
    search() {
      if (!this.search) {
        this.mynotes = this.notes;
        return;
      }
      if (!this.search.trim()) return;
      if (this.search.length < 3) return;
      this.mynotes = this.mynotes.filter((note) => {
        const title = note.title || "";
        return (
          title.match(new RegExp(this.search, "i")) ||
          (Array.isArray(note.tags) && note.tags.includes(this.search))
        );
      });
    },
  },
  computed: {
    isDeviceMobile() {
      return this.checkIfMobile();
    }
  },

  methods: {
    addNote() {
      this.$emit("addnote");
    },
    checkIfMobile() {
      return window.innerWidth <= 800;
    },
    sortNotes() {
      this.mynotes = this.mynotes.sort((a, b) => {
        a.created = a.created ? new Date(a.created) : new Date();
        a.updated = a.updated ? new Date(a.updated) : new Date();
        b.updated = b.updated ? new Date(b.updated) : new Date();
        b.created = b.created ? new Date(b.created) : new Date();
        if (this.sortBy === "createdAsc") {
          return a.created.getTime() - b.created.getTime();
        }
        if (this.sortBy === "createdDesc") {
          return b.created.getTime() - a.created.getTime();
        }
        if (this.sortBy === "updatedAsc") {
          return a.updated.getTime() - b.updated.getTime();
        }
        if (this.sortBy === "updatedDesc") {
          return b.updated.getTime() - a.updated.getTime();
        }
        return a.title;
      });
    },
    setNote(note) {
      this.$emit("setnote", note);
    },
    handleRemove(note) {
      console.log("handleRemove", note);
      this.$emit("removenote", note);
    },
    handleTagChange() {
      if (!this.selectedTags.length) {
        this.mynotes = this.notes;
        return;
      }
      this.mynotes = this.mynotes.filter((note) => {
        return (
          Array.isArray(note.tags) &&
          note.tags.some((tag) => this.selectedTags.includes(tag))
        );
      });
    },
  },
  mounted() {
    this.sortNotes();

    // Ensure isMobile is correctly set
    this.isMobile = this.checkIfMobile();

    // Add window resize event listener to update isMobile state
    window.addEventListener('resize', () => {
      this.isMobile = this.checkIfMobile();
    });
  },
  beforeDestroy() {
    // Clean up event listener
    window.removeEventListener('resize', () => {
      this.isMobile = this.checkIfMobile();
    });
  },
  components: {
    NoteUnit,
    BackupRestore
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 10px;
}

/* Button alignment styles */
.add-note-btn {
  margin-left: auto;
}

.delete-btn {
  transition: opacity 0.2s;
}

.delete-btn.disabled {
  opacity: 0.5;
}

/* Ensure proper spacing between buttons on mobile */
@media (max-width: 768px) {
  .el-button {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  /* Hide delete button in mobile view */
  .delete-btn {
    display: none !important;
  }
}
</style>