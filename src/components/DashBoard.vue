<template>
  <el-row>
    <el-col :span="8" :xs="24" class="sidelist-column" :style="{ display: isDeviceMobile && mode === 'view' ? 'none' : 'flex' }">
      <SideList
        @setnote="handleSetNote"
        @addnote="handleAddNote"
        @removenote="handleRemoveNote"
        :notes="notes"
        :note="note"
        :tags="tags"
      />
    </el-col>

    <el-col
      :span="16"
      :xs="24"
      v-if="isDeviceMobile"
      class="notemobile"
      :style="{ display: mode === 'view' ? 'block' : 'none' }"
    >      <div style="padding-bottom: 5px; display: flex; justify-content: space-between; align-items: center">
        <div style="flex: 1; text-align: left;">
          <i
            class="el-icon-back mobile-action-button"
            style="font-size: 20px; font-weight: 700"
            @click="changeMode('list')"
          ></i>
        </div>

        <!-- Date/Time display when not in edit mode -->
        <div v-if="!editMode && note.updated" style="flex: 2; text-align: center; font-size: 12px; color: #909399;">
          <div>{{ formatDate(note.updated) }}</div>
          <div>{{ formatTime(note.updated) }}</div>
        </div>

        <div style="flex: 1; display: flex; justify-content: flex-end; align-items: center;">
          <i
            class="el-icon-edit-outline mobile-action-button"
            v-if="!editMode"
            @click="editMode = true"
            style="font-size: 20px; font-weight: 700; margin-right: 20px;"
            title="Edit note"
          ></i>
          <i
            class="el-icon-view mobile-action-button"
            v-else
            @click="editMode = false"
            style="font-size: 20px; font-weight: 700; margin-right: 20px;"
            title="View mode"
          ></i>
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
                @click.stop="
                  handleRemoveNote(note);
                  changeMode('list');
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
              class="mobile-action-button"
            ></el-button>
          </el-popover>
        </div>
      </div>
      <Note
        :note="note"
        :editMode="editMode"
        @savenote="handleSaveNote"
        @updatetags="handleUpdateTags"
        :tags="tags"
      />
    </el-col>
    <el-col :span="16" :xs="24" v-else class="note">
      <Note
        :note="note"
        @savenote="handleSaveNote"
        @updatetags="handleUpdateTags"
        :tags="tags"
      />
    </el-col>
  </el-row>
</template>
<script>
import {
  saveNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNoteById,
} from "../idb.js";
import SideList from "./SideList";
import Note from "./NoteEditor";
const noteDef = {
  id: 1,
  title: "New Title",
  body: "content Goes Here",
  lastSaved: null,
};
export default {
  data() {
    return {
      note: {},
      notetemp: {},
      mode: "list",
      notes: [],
      tags: [],
      isMobile: window.isMobile,
      visible: false,
      editMode:false
    };
  },
  components: {
    SideList,
    Note,
  },
  methods: {
    checkIfMobile() {
      return window.innerWidth <= 800;
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    },
    formatTime(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    },
    changeMode(mode) {
      this.mode = mode;
    },
    handleSetNote(note) {
      this.note = note;
      this.mode = "view";

      // Default to view mode (not edit mode) in mobile view
      if (this.isDeviceMobile) {
        this.editMode = false;
      }
    },
    handleAddNote() {
      var id = "id" + Math.random().toString(16).slice(2);

      this.note = {
        ...noteDef,
        id,
        created: new Date(),
        updated: new Date(),
      };
      this.notes.unshift({ ...this.note });
      this.saveOrUpdateNote({ ...this.note });
      this.handleSetNote(this.note);
    },
    saveOrUpdateNote(note) {
      console.log("note", note);
      getNoteById(note.id)
        .then((obj) => {
          console.log("obj", obj);
          if (obj) {
            return updateNote(note);
          } else {
            return saveNote(note);
          }
        })
        .then((d) => {
          console.log("done", d);
        });
    },
    handleSaveNote(note) {
      this.notetemp = {
        ...note,
        created: note.created || new Date(),
        updated: new Date(),
      };
      const udpatetnote = { ...this.notetemp };
      this.notes = this.notes.map((obj) => {
        if (obj.id === udpatetnote.id) {
          return udpatetnote;
        }
        return obj;
      });
      // this.storeNotes
      this.saveOrUpdateNote(udpatetnote);
    },
    storeNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    async handleRemoveNote(note) {
      console.log("delete note", note, this.notes);
      this.notes = this.notes.filter((obj) => {
        return obj.id !== note.id;
      });
      if (this.note.id === note.id) {
        if (this.notes.length) {
          this.handleSetNote(this.notes[0]);
        } else {
          this.handleAddNote();
        }
      }

      await deleteNote(note.id);
    },
    handleUpdateTags(tags) {
      this.tags = [...new Set([...this.tags,...tags])];
      localStorage.setItem("tags", JSON.stringify(this.tags));
    },
  },
  computed: {
    isDeviceMobile() {
      return this.checkIfMobile();
    }
  },
  async mounted() {
    try {
      let notes = await getAllNotes();
      let tags = localStorage.getItem("tags");
      if (tags) {
        this.tags = JSON.parse(tags);
      }
      if (!notes) {
        this.handleAddNote();
      }
      this.notes = notes;
      if (this.notes.length) {
        if (!this.isDeviceMobile) this.handleSetNote(this.notes[0]);
      } else {
        this.handleAddNote();
      }

      // Add window resize event listener to update isMobile state
      this.resizeHandler = () => {
        this.isMobile = this.checkIfMobile();
      };

      window.addEventListener('resize', this.resizeHandler);
    } catch (e) {
      this.notes = [];
    }
  },
  beforeDestroy() {
    // Clean up event listener
    window.removeEventListener('resize', this.resizeHandler);
  },
};
</script>
<style scoped>
.notemobile {
  padding: 10px;
  position: fixed !important;
  top: 0;
  left: 0;
  background: var(--background-color, white);
  z-index: 400;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-sizing: border-box;
}

.note {
  padding-left: 10px;
}

/* Mobile view action buttons */
.mobile-action-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  margin: 0 5px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.mobile-action-button:hover {
  background-color: rgba(0,0,0,0.05);
}

.dark-mode .mobile-action-button {
  color: var(--icon-color); /* Use the softer icon color */
}

.dark-mode .mobile-action-button:hover {
  background-color: rgba(255,255,255,0.08); /* Reduced opacity for softer effect */
}

.sidelist-column {
  height: 100vh;
  overflow: hidden;
  max-height: 100vh;
  display: flex;
}

@media (max-width: 768px) {
  .sidelist-column {
    height: calc(100vh - 60px); /* Account for header */
    max-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Hide when in view mode */
  .sidelist-column[style*="display: none"] + .notemobile {
    height: 100vh;
  }
}
</style>