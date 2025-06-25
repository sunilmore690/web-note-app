<template>
  <el-row>
    <div v-if="editMode" style="height: calc(100vh - 80px); overflow-y: hidden; max-width: 100%; overflow-x: hidden; display: flex; flex-direction: column;">
      <!-- Title input -->
      <div style="margin-bottom: 10px; flex-shrink: 0;">
        <el-input
          placeholder="Title goes here ..."
          v-model="mynote.title"
          @change="saveNote"
        ></el-input>
      </div>
      
      <!-- Tags input -->
      <div style="margin-bottom: 10px; flex-shrink: 0;">
        <el-select
          @change="saveNote"
          style="width: 100%"
          v-model="mynote.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Enter your tags here..."
        >
          <el-option
            v-for="tag in tags || []"
            :key="tag"
            :label="tag"
            :value="tag"
          >
          </el-option>
        </el-select>
      </div>

      <!-- Content Type Controls -->
      <div style="margin-bottom: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <el-button-group size="small">
          <el-button 
            :type="activeContent === 'text' ? 'primary' : 'default'" 
            @click="switchContent('text')"
            icon="el-icon-edit">
            Text
          </el-button>
          <el-button 
            :type="activeContent === 'canvas' ? 'primary' : 'default'" 
            @click="switchContent('canvas')"
            icon="el-icon-brush">
            Canvas
          </el-button>
        </el-button-group>
        
        <!-- Canvas Actions -->
        <div v-if="activeContent === 'text'" style="display: flex; gap: 5px;">
          <el-button 
            @click="addCanvasSection" 
            icon="el-icon-plus" 
            size="small" 
            type="success">
            Add Drawing
          </el-button>
        </div>

        <div v-if="activeContent === 'canvas'" style="display: flex; gap: 5px;">
          <el-button 
            @click="saveCurrentCanvas" 
            icon="el-icon-check" 
            size="small" 
            type="success">
            Save Drawing
          </el-button>
          <el-button 
            @click="cancelCanvasEdit" 
            icon="el-icon-close" 
            size="small">
            Cancel
          </el-button>
        </div>
      </div>

      <!-- Text Editor -->
      <div v-if="activeContent === 'text'" style="flex: 1; min-height: 0; display: flex; flex-direction: column;">
        <vue-editor 
          ref="editor" 
          v-model="mynote.body" 
          style="flex: 1; min-height: 0;"
          @text-change="saveNote">
        </vue-editor>
        
        <!-- Embedded Canvas Sections -->
        <div v-if="mynote.canvasSections && mynote.canvasSections.length > 0" 
             style="max-height: 200px; overflow-y: auto; margin-top: 10px; border-top: 1px solid #dcdfe6; padding-top: 10px;">
          <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #606266;">Drawings ({{ mynote.canvasSections.length }})</h4>
          <div v-for="(canvas, index) in mynote.canvasSections" :key="'canvas-' + index" 
               style="margin-bottom: 15px; border: 1px solid #ebeef5; border-radius: 4px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 12px; color: #909399;">Drawing {{ index + 1 }} - {{ formatDate(canvas.timestamp) }}</span>
              <div>
                <el-button @click="editCanvas(index)" icon="el-icon-edit" size="mini" type="primary">Edit</el-button>
                <el-button @click="removeCanvas(index)" icon="el-icon-delete" size="mini" type="danger">Remove</el-button>
              </div>
            </div>
            <div style="text-align: center;">
              <img :src="canvas.imageData" style="max-width: 100%; max-height: 150px; border-radius: 4px; border: 1px solid #ddd;" />
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas Editor -->
      <FabricCanvas 
        v-if="activeContent === 'canvas'"
        ref="fabricCanvas"
        style="flex: 1; min-height: 0;"
        @canvas-updated="onCanvasUpdated"
        @canvas-saved="saveCurrentCanvas"
        :canvas-data="currentCanvasData"
        :show-controls="true"
      />
    </div>
    
    <!-- View mode -->
    <div v-else style="height: calc(100vh - 80px); padding: 10px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; max-width: 100%;">
      <h3>{{ mynote.title }}</h3>
      <div style="margin-bottom: 15px;">
        <span style="font-weight: 500;">Tags: </span>
        <el-tag v-for="tag1 in mynote.tags || []" :key="tag1 + 'view'" style="margin-right: 5px;">{{
          tag1
        }}</el-tag>
      </div>
      
      <!-- Content Type Badge -->
      <div style="margin-bottom: 15px;" v-if="mynote.canvasSections && mynote.canvasSections.length > 0">
        <el-tag type="success" size="small">
          Mixed Content ({{ mynote.canvasSections.length }} drawing{{ mynote.canvasSections.length !== 1 ? 's' : '' }})
        </el-tag>
      </div>

      <div style="border: 1px solid #dcdfe6; border-radius: 4px; padding: 15px; max-width: 100%; overflow-x: hidden;">
        <!-- Text Content -->
        <div v-if="mynote.body && mynote.body.trim()" v-html="mynote.body" style="max-width: 100%; overflow-wrap: break-word; word-wrap: break-word; margin-bottom: 20px;"></div>
        
        <!-- Canvas Drawings -->
        <div v-if="mynote.canvasSections && mynote.canvasSections.length > 0">
          <h4 style="margin: 20px 0 15px 0; font-size: 16px; color: #606266; border-bottom: 1px solid #ebeef5; padding-bottom: 8px;">
            Drawings
          </h4>
          <div v-for="(canvas, index) in mynote.canvasSections" :key="'view-canvas-' + index" 
               style="margin-bottom: 20px; text-align: center;">
            <div style="margin-bottom: 8px; font-size: 12px; color: #909399;">
              Drawing {{ index + 1 }} - {{ formatDate(canvas.timestamp) }}
            </div>
            <img :src="canvas.imageData" alt="Drawing" style="max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
          </div>
        </div>
        
        <!-- Empty state -->
        <div v-if="!mynote.body?.trim() && (!mynote.canvasSections || mynote.canvasSections.length === 0)" 
             style="text-align: center; color: #909399; padding: 40px 20px;">
          <i class="el-icon-document" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          <p>No content available</p>
          <p style="font-size: 12px;">Switch to edit mode to add text or drawings</p>
        </div>
      </div>
    </div>
  </el-row>
</template>
<script>
import { VueEditor } from "vue2-editor";
import FabricCanvas from "./FabricCanvas.vue";

export default {
  props: {
    note: Object,
    tags: Array,
    editMode: {
      name: "editMode",
      default: true,
    },
  },
  data() {
    return {
      mynote: {
        tags: [],
        canvasSections: [], // Array of canvas drawings
      },
      activeContent: 'text', // 'text' or 'canvas'
      currentCanvasData: null,
      editingCanvasIndex: -1, // -1 means new canvas, >=0 means editing existing
      saveTimeout: null,
      isMobile: /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent),
    };
  },
  components: {
    VueEditor,
    FabricCanvas
  },
  watch: {
    note() {
      console.log("this.mynote", this.mynote);
      console.log("this.note", this.note);
      this.mynote = Object.assign({}, this.note);
      
      // Ensure canvasSections array exists
      if (!this.mynote.canvasSections) {
        this.mynote.canvasSections = [];
      }
      
      this.updateTitleFromBodyIfNeeded();
    },
    'mynote.body'() {
      if (this.activeContent === 'text') {
        this.updateTitleFromBodyIfNeeded();
      }
    }
  },
  methods: {
    updateTitleFromBodyIfNeeded() {
      // If title is empty or just "New Title", extract from body or canvas
      if (!this.mynote.title || this.mynote.title.trim() === '' || this.mynote.title === 'New Title') {
        if (this.mynote.body && this.mynote.body.trim() !== '') {
          // Extract from text content
          const textContent = this.mynote.body.replace(/<[^>]*>/g, '').trim();
          const firstLine = textContent.split('\n')[0].trim();
          
          if (firstLine && firstLine.length > 0) {
            this.mynote.title = firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
          }
        } else if (this.mynote.canvasSections && this.mynote.canvasSections.length > 0) {
          // Generate title for canvas content
          const canvasCount = this.mynote.canvasSections.length;
          this.mynote.title = `Drawing${canvasCount > 1 ? 's' : ''} (${canvasCount})`;
        }
      }
    },

    switchContent(type) {
      this.activeContent = type;
      if (type === 'canvas' && this.editingCanvasIndex === -1) {
        // Prepare for new canvas
        this.currentCanvasData = null;
      }
    },

    addCanvasSection() {
      this.editingCanvasIndex = this.mynote.canvasSections.length;
      this.currentCanvasData = null;
      this.activeContent = 'canvas';
    },

    editCanvas(index) {
      this.editingCanvasIndex = index;
      this.currentCanvasData = this.mynote.canvasSections[index];
      this.activeContent = 'canvas';
    },

    onCanvasUpdated(canvasData) {
      // Store the current canvas data
      this.currentCanvasData = canvasData;
    },

    saveCurrentCanvas() {
      if (!this.currentCanvasData) {
        this.$message.warning('No canvas data to save');
        return;
      }

      // Ensure canvasSections array exists
      if (!this.mynote.canvasSections) {
        this.mynote.canvasSections = [];
      }

      if (this.editingCanvasIndex >= 0) {
        if (this.editingCanvasIndex < this.mynote.canvasSections.length) {
          // Update existing canvas
          this.$set(this.mynote.canvasSections, this.editingCanvasIndex, this.currentCanvasData);
        } else {
          // Add new canvas
          this.mynote.canvasSections.push(this.currentCanvasData);
        }
      }

      // Update title if needed
      this.updateTitleFromBodyIfNeeded();
      
      // Save the note
      this.saveNote();
      
      // Switch back to text view
      this.activeContent = 'text';
      this.editingCanvasIndex = -1;
      this.currentCanvasData = null;

      this.$message.success('Drawing saved successfully');
    },

    cancelCanvasEdit() {
      this.activeContent = 'text';
      this.editingCanvasIndex = -1;
      this.currentCanvasData = null;
    },

    removeCanvas(index) {
      this.$confirm('Are you sure you want to delete this drawing?', 'Confirm Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.mynote.canvasSections.splice(index, 1);
        this.saveNote();
        this.$message.success('Drawing deleted successfully');
      }).catch(() => {
        // User cancelled
      });
    },

    formatDate(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    startSaveTimeout() {
      if (this.saveTimeout !== null) return;
      this.saveTimeout = setInterval(() => {
        if (this.mynote.body !== this.note.body) {
          this.saveNote();
        }
      }, 1000);
    },
    
    clearSaveTimeout() {
      clearInterval(this.saveTimeout);
      this.saveTimeout = null;
    },
    
    saveNote() {
      this.$emit("savenote", { ...this.mynote });
      this.saveTags();
    },
    
    saveTags() {
      this.$emit("updatetags", this.mynote.tags);
    },
  },
  mounted() {
    this.startSaveTimeout();
  },
  destroyed() {
    this.clearSaveTimeout();
    this.$emit("");
  },
};
</script>
<style>
.note {
  padding-left: 20px;
}

.quillWrapper {
  overflow: hidden !important;
  height: 100% !important;
  max-height: 100% !important;
  max-width: 100%;
  display: flex !important;
  flex-direction: column !important;
}

.ql-container {
  flex: 1 !important;
  height: auto !important;
  max-height: 100% !important;
  max-width: 100%;
  overflow: hidden !important;
}

.ql-editor {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  max-height: 100% !important;
  height: 100% !important;
}

/* Make sure editor content wraps properly */
.ql-editor {
  overflow-wrap: break-word;
  word-wrap: break-word;
  max-width: 100%;
}

/* Make sure images don't overflow */
.ql-editor img {
  max-width: 100%;
  height: auto;
}

/* Dark mode styles for editor */
.dark-mode .ql-editor {
  color: var(--editor-text);
  background-color: var(--editor-background);
}

.dark-mode .ql-toolbar.ql-snow {
  border-color: var(--border-color);
  background-color: var(--editor-background);
}

.dark-mode .ql-toolbar.ql-snow .ql-picker-label,
.dark-mode .ql-toolbar.ql-snow .ql-picker-options {
  background-color: var(--editor-background);
  color: var(--text-color);
}

.dark-mode .ql-snow .ql-stroke {
  stroke: var(--icon-color); /* Use softer icon color */
}

.dark-mode .ql-snow .ql-fill {
  fill: var(--icon-color); /* Use softer icon color */
}

.dark-mode .ql-snow.ql-toolbar button:hover,
.dark-mode .ql-snow .ql-toolbar button:hover,
.dark-mode .ql-snow.ql-toolbar button.ql-active,
.dark-mode .ql-snow .ql-toolbar button.ql-active,
.dark-mode .ql-snow.ql-toolbar .ql-picker-label:hover,
.dark-mode .ql-snow .ql-toolbar .ql-picker-label:hover,
.dark-mode .ql-snow.ql-toolbar .ql-picker-label.ql-active,
.dark-mode .ql-snow .ql-toolbar .ql-picker-label.ql-active,
.dark-mode .ql-snow.ql-toolbar .ql-picker-item:hover,
.dark-mode .ql-snow .ql-toolbar .ql-picker-item:hover,
.dark-mode .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
.dark-mode .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
  color: #79a9d6; /* Softer blue for active states */
}

.dark-mode .ql-snow.ql-toolbar button:hover .ql-stroke,
.dark-mode .ql-snow .ql-toolbar button:hover .ql-stroke,
.dark-mode .ql-snow.ql-toolbar button.ql-active .ql-stroke,
.dark-mode .ql-snow .ql-toolbar button.ql-active .ql-stroke,
.dark-mode .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.dark-mode .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
.dark-mode .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.dark-mode .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.dark-mode .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.dark-mode .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
.dark-mode .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.dark-mode .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
  stroke: #79a9d6; /* Softer blue for active states */
}

/* Style the view mode in dark theme */
.dark-mode h3 {
  color: var(--text-color);
}
</style>