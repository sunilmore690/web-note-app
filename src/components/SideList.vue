<template>
  <el-row>
    <div>
      <el-row v-if="!isMobile">
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
      <el-row v-else style="margin-bottom: 10px">
        <el-col :span="12" style="padding-top: 5px;">
          <div>
            <span style="padding-left: 10px; padding-right: 20px"
              >{{ mynotes.length }} / {{ notes.length }} Notes</span
            >
          </div>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-dropdown trigger="click" @command="handleSortCommand" style="margin-right: 15px">
            <span class="el-dropdown-link">
              {{ getSortLabel() }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in sortOptions" :key="item.value" :command="item.value">
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click" @command="handleTagSelect" style="margin-right: 5px">
            <span class="el-dropdown-link">
              Tags<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="tag in tags" :key="tag + 'mobile'" :command="tag">
                <el-checkbox v-model="tagSelection[tag]" @change.stop>{{ tag }}</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item divided command="apply">Apply Filters</el-dropdown-item>
              <el-dropdown-item command="clear">Clear Filters</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row v-if="isMobile">
        <el-col :span="3" :offset="2" style="padding-top: 5px;">
          <span
            @click="dialogVisible = true"
            style="
              text-align: right;
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
        <el-col :span="5" v-if="false">
          <!-- Remove duplicate Add Note button -->
          <el-button size="small" round @click="addNote()" class="add-note-btn"
            >+ Add Note</el-button
          >
        </el-col>
      </el-row>

      <el-row v-show="!isMobile">
        <el-col :span="24">
          <div class="button-container">
            <div class="left-buttons">
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
                  :disabled="!note"
                ></el-button>
              </el-popover>
            </div>
            <div class="right-buttons">
              <el-button size="small" round @click="addNote()" class="add-note-btn"
                >+ Add Note</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>

      <div style="margin-bottom: 10px">
        <el-input placeholder="search notes ..." v-model="search" clearable>
        </el-input>
      </div>
      <div class="note-list">
        <div
          v-for="noteobj in mynotes"
          @click.prevent="setNote(noteobj)"
          :key="noteobj.id"
          class="note-item"
        >
          <note-unit
            :noteobj="noteobj"
            :note="note"
            @removenote="handleRemove"
          ></note-unit>
        </div>
      </div>

      <!-- Mobile Bottom Action Bar -->
      <div v-if="isMobile" class="mobile-bottom-bar">
        <el-button type="primary" icon="el-icon-plus" circle @click="addNote()"></el-button>
        <el-button type="info" icon="el-icon-search" circle @click="focusSearch"></el-button>
        <el-button v-if="note" type="danger" icon="el-icon-delete" circle @click="confirmDelete"></el-button>
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
      tagSelection: {},
      deleteConfirmVisible: false
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

  methods: {
    addNote() {
      this.$emit("addnote");
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
    getSortLabel() {
      const option = this.sortOptions.find(opt => opt.value === this.sortBy);
      return option ? option.label : 'Sort';
    },
    handleSortCommand(command) {
      this.sortBy = command;
    },
    handleTagSelect(command) {
      if (command === 'apply') {
        this.selectedTags = Object.keys(this.tagSelection).filter(tag => this.tagSelection[tag]);
        this.handleTagChange();
      } else if (command === 'clear') {
        this.selectedTags = [];
        this.tagSelection = {};
        this.mynotes = this.notes;
      } else {
        // Toggle the tag selection
        this.tagSelection[command] = !this.tagSelection[command];
      }
    },
    focusSearch() {
      this.$nextTick(() => {
        const searchInput = this.$el.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      });
    },
    confirmDelete() {
      this.$confirm('Are you sure you want to delete this note?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.handleRemove(this.note);
      }).catch(() => {
        // Cancelled
      });
    }
  },
  mounted() {
    this.sortNotes();
    // Initialize tagSelection object
    if (this.tags && this.tags.length) {
      this.tags.forEach(tag => {
        this.$set(this.tagSelection, tag, false);
      });
    }
  },
  components: {
    NoteUnit,
    BackupRestore
  },
};
</script>
<style scoped>
.note-list {
  overflow-y: auto;
  max-height: 80vh;
}

.note-item {
  margin-bottom: 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.search-container {
  margin-bottom: 15px;
}

.note-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--card-background);
  padding: 10px;
  box-shadow: 0 -2px 10px var(--shadow-color);
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.mobile-bottom-bar .el-button {
  margin: 0 5px;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--text-color);
}

/* Button alignment styling */
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 5px 0;
}

.left-buttons {
  display: flex;
  align-items: center;
}

.right-buttons {
  display: flex;
  align-items: center;
}

/* Hide delete button when no note is selected */
.el-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .note-list {
    max-height: calc(100vh - 200px);
    padding-bottom: 70px;
  }
}
</style>