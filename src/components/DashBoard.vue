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
    <el-col :span="16" :xs="24">
      <Note
        :note="note"
        @savenote="handleSaveNote"
        @updatetags="handleUpdateTags"
        :tags="tags"
    /></el-col>
  </el-row>
</template>
<script>
import SideList from "./SideList";
import Note from "./Note";
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
      notes: [],
      tags: [],
    };
  },
  components: {
    SideList,
    Note,
  },
  methods: {
    handleSetNote(note) {
      this.note = note;
    },
    handleAddNote() {
      this.note = {
        ...noteDef,
        id: this.notes.length + 1,
        created: new Date(),
      };
      this.notes.push({ ...this.note });
      this.storeNotes();
    },
    handleSaveNote(note) {
      this.note = note;
      this.note.updated = new Date();
      this.notes = this.notes.map((obj) => {
        if (obj.id === note.id) {
          return note;
        }
        return obj;
      });
      this.storeNotes();
    },
    storeNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    handleRemoveNote(note) {
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
      this.storeNotes();
    },
    handleUpdateTags(tags) {
      tags = [...this.tags, ...tags];
      this.tags = [...new Set(tags)];
      localStorage.setItem("tags", JSON.stringify(this.tags));
    },
  },
  mounted() {
    try {
      let notes = localStorage.getItem("notes");
      let tags = localStorage.getItem("tags");
      if (tags) {
        this.tags = JSON.parse(tags);
      }
      if (!notes) {
        this.handleAddNote();
      } else {
        notes = JSON.parse(notes);
      }
      this.notes = notes;
      if (this.notes.length) {
        this.handleSetNote(this.notes[0]);
      } else {
        this.handleAddNote();
      }
    } catch (e) {
      this.notes = [];
    }
  },
};
</script>