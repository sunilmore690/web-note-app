<template>
  <el-row>
    <div style="margin-bottom: 10px">
      <el-row>
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
            <span style="padding-right: 20px"
              >{{ mynotes.length }} / {{ notes.length }} Notes</span
            >
            <el-button
              size="small"
              round
              @click="addNote()"
              class="add-note-btn"
              >+ Add Note</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 10px">
      <el-input placeholder="search notes ..." v-model="search" clearable>
      </el-input>
    </div>
    <div style="height: 75vh; overflow-y: auto">
      <div
        v-for="noteobj in mynotes"
        @click="setNote(noteobj)"
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
export default {
  props: ["notes", "note", "tags"],
  data() {
    return {
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
  },
  components: {
    NoteUnit,
  },
};
</script>
<style scoped>
</style>