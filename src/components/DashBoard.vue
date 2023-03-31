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
      <div style="padding-bottom: 5px" @click="changeMode('list')">
        <i class="el-icon-back"></i> Back
      </div>
      <Note
        :note="note"
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
import { saveNote, getAllNotes, updateNote, deleteNote ,getNoteById} from "../idb.js";
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
      notetemp : {},
      mode: "list",
      notes: [],
      tags: [],
      isMobile: window.isMobile
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
      this.mode = 'view';
    },
    handleAddNote() {
      var id = "id" + Math.random().toString(16).slice(2)

      this.note = {
        ...noteDef,
        id,
        created: new Date(),
        updated: new Date(),
      };
      this.notes.push({ ...this.note });
      this.saveOrUpdateNote({...this.note})
    },
    saveOrUpdateNote(note){
      console.log('note',note)
       getNoteById(note.id).then(obj=>{
        console.log('obj',obj)
          if(obj){
            return updateNote(note)
          }else {
            return saveNote(note)
          }
       }).then((d)=>{
           console.log('done',d)
       })
    },
    handleSaveNote(note) {
      this.notetemp = {...note,created:note.created || new Date(),updated:new Date()}
      const udpatetnote = {...this.notetemp}
      this.notes = this.notes.map((obj) => {
        if (obj.id === udpatetnote.id) {
          return udpatetnote;
        }
        return obj;
      });
      // this.storeNotes
      this.saveOrUpdateNote(udpatetnote)
    },
    storeNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    async handleRemoveNote(note) {
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
      await deleteNote(note.id)
    },
    handleUpdateTags(tags) {
      tags = [...this.tags, ...tags];
      this.tags = [...new Set(tags)];
      localStorage.setItem("tags", JSON.stringify(this.tags));
    },
  },
  async mounted() {
    try {
      let notes = await  getAllNotes()
      let tags = localStorage.getItem("tags");
      if (tags) {
        this.tags = JSON.parse(tags);
      }
      if (!notes) {
        this.handleAddNote();
      }
      this.notes = notes;
      if (this.notes.length) {
        if(!this.isMobile) this.handleSetNote(this.notes[0]);
        
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
  position: fixed !important;
  top: 10px;
  background: white;
  padding-right: 5px !important;
  width: 97vw;
}
.note{
  padding-left: 10px;
}
</style>