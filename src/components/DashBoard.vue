<template>
  <el-row>
    <el-col :span="8" :xs="24">
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
      v-if="isMobile"
      class="notemobile"
      :style="{ display: mode === 'view' ? 'inherit' : 'none' }"
    >
      <div style="padding-bottom: 5px">
        <i
          class="el-icon-back"
          style="font-size: 20px; font-weight: 700"
          @click="changeMode('list')"
        ></i>

        <div style="margin-left: 60%">

          <i

            :class="`el-icon-${editMode ? 'view':'edit'}`"
            @click="editMode=!editMode"
            style="font-size: 20px; font-weight: 700; margin-right: 20px;"
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
    changeMode(mode) {
      this.mode = mode;
    },
    handleSetNote(note) {
      this.note = note;
      this.mode = "view";
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
        if (!this.isMobile) this.handleSetNote(this.notes[0]);
      } else {
        this.handleAddNote();
      }
    } catch (e) {
      this.notes = [];
    }
  },
};
</script>
<style scoped>
.notemobile {
  padding: 5px;
  position: fixed !important;
  top: 0px;
  left: 0px;
  background: white;
  z-index: 400;
  /* padding-right: 5px !important; */
  width: 100%;
}
.note {
  padding-left: 10px;
}
</style>