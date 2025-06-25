<template>
  <div class="fabric-canvas-container">
    <!-- Canvas Controls -->
    <div class="canvas-controls" v-if="showControls">
      <div class="control-group">
        <el-button-group size="small">
          <el-button @click="setDrawingMode" :type="isDrawingMode ? 'primary' : 'default'" icon="el-icon-edit">
            Draw
          </el-button>
          <el-button @click="setSelectionMode" :type="!isDrawingMode ? 'primary' : 'default'" icon="el-icon-s-operation">
            Select
          </el-button>
        </el-button-group>
      </div>

      <div class="control-group">
        <el-button @click="addText" icon="el-icon-edit-outline" size="small">Text</el-button>
        <el-button @click="addRect" icon="el-icon-s-grid" size="small">Rectangle</el-button>
        <el-button @click="addCircle" icon="el-icon-news" size="small">Circle</el-button>
      </div>

      <div class="control-group">
        <el-color-picker v-model="brushColor" @change="updateBrushColor" size="small"></el-color-picker>
        <span class="control-label">Brush:</span>
        <el-slider
          v-model="brushWidth"
          :min="1"
          :max="20"
          @change="updateBrushWidth"
          style="width: 80px;"
        ></el-slider>
      </div>

      <div class="control-group">
        <el-button @click="deleteSelected" icon="el-icon-delete" size="small" type="danger">Delete</el-button>
        <el-button @click="clearCanvas" icon="el-icon-refresh-left" size="small">Clear</el-button>
        <el-button @click="saveCanvas" icon="el-icon-check" size="small" type="success">Save</el-button>
      </div>
    </div>

    <!-- Canvas Container -->
    <div class="canvas-wrapper" :style="canvasWrapperStyle">
      <canvas ref="fabricCanvas" :id="canvasId"></canvas>
    </div>
  </div>
</template>

<script>
import * as fabric from 'fabric';

export default {
  name: 'FabricCanvas',
  props: {
    canvasData: {
      type: [String, Object],
      default: null
    },
    showControls: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      canvas: null,
      isDrawingMode: true,
      brushColor: '#000000',
      brushWidth: 2,
      canvasId: `fabric-canvas-${Math.random().toString(36).substr(2, 9)}`
    };
  },
  computed: {
    canvasWrapperStyle() {
      return {
        width: '100%',
        height: '100%',
        border: '1px solid #dcdfe6',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: 'white'
      };
    }
  },
  mounted() {
    this.initCanvas();
    this.$nextTick(() => {
      this.resizeCanvas();
      if (this.canvasData) {
        this.loadCanvasData();
      }
    });

    // Handle window resize
    window.addEventListener('resize', this.resizeCanvas);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas);
    if (this.canvas) {
      this.canvas.dispose();
    }
  },
  watch: {
    canvasData(newData) {
      if (newData && this.canvas) {
        this.loadCanvasData();
      }
    }
  },
  methods: {
    initCanvas() {
      const canvasElement = this.$refs.fabricCanvas;
      
      this.canvas = new fabric.Canvas(canvasElement, {
        isDrawingMode: this.isDrawingMode,
        backgroundColor: 'white',
        selection: !this.isDrawingMode
      });

      // Set initial brush properties
      this.canvas.freeDrawingBrush.width = this.brushWidth;
      this.canvas.freeDrawingBrush.color = this.brushColor;

      // Canvas event listeners
      this.canvas.on('path:created', () => {
        this.emitCanvasData();
      });

      this.canvas.on('object:modified', () => {
        this.emitCanvasData();
      });

      this.canvas.on('object:removed', () => {
        this.emitCanvasData();
      });

      this.canvas.on('object:added', () => {
        this.emitCanvasData();
      });
    },

    resizeCanvas() {
      if (!this.canvas) return;

      const container = this.$el.querySelector('.canvas-wrapper');
      if (!container) return;

      const containerWidth = container.clientWidth - 2; // Account for border
      const containerHeight = container.clientHeight - 2;

      this.canvas.setDimensions({
        width: containerWidth,
        height: containerHeight
      });

      this.canvas.renderAll();
    },

    setDrawingMode() {
      this.isDrawingMode = true;
      this.canvas.isDrawingMode = true;
      this.canvas.selection = false;
      this.canvas.forEachObject(obj => {
        obj.selectable = false;
      });
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    },

    setSelectionMode() {
      this.isDrawingMode = false;
      this.canvas.isDrawingMode = false;
      this.canvas.selection = true;
      this.canvas.forEachObject(obj => {
        obj.selectable = true;
      });
      this.canvas.renderAll();
    },

    updateBrushColor() {
      if (this.canvas && this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.color = this.brushColor;
      }
    },

    updateBrushWidth() {
      if (this.canvas && this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.width = this.brushWidth;
      }
    },

    addText() {
      const text = new fabric.IText('Click to edit', {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: this.brushColor
      });
      this.canvas.add(text);
      this.canvas.setActiveObject(text);
      this.setSelectionMode();
    },

    addRect() {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 60,
        fill: 'transparent',
        stroke: this.brushColor,
        strokeWidth: 2
      });
      this.canvas.add(rect);
      this.canvas.setActiveObject(rect);
      this.setSelectionMode();
    },

    addCircle() {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 50,
        fill: 'transparent',
        stroke: this.brushColor,
        strokeWidth: 2
      });
      this.canvas.add(circle);
      this.canvas.setActiveObject(circle);
      this.setSelectionMode();
    },

    deleteSelected() {
      const activeObjects = this.canvas.getActiveObjects();
      if (activeObjects.length) {
        activeObjects.forEach(obj => {
          this.canvas.remove(obj);
        });
        this.canvas.discardActiveObject();
      }
    },

    clearCanvas() {
      this.canvas.clear();
      this.canvas.backgroundColor = 'white';
      this.emitCanvasData();
    },

    saveCanvas() {
      this.emitCanvasData();
      this.$emit('canvas-saved');
    },

    getCanvasData() {
      if (!this.canvas) return null;
      
      return {
        json: this.canvas.toJSON(),
        imageData: this.canvas.toDataURL('image/png'),
        timestamp: new Date().toISOString()
      };
    },

    loadCanvasData() {
      if (!this.canvasData || !this.canvas) return;

      try {
        let jsonData;
        if (typeof this.canvasData === 'string') {
          // If it's a string, try to parse it
          jsonData = JSON.parse(this.canvasData);
        } else if (this.canvasData.json) {
          // If it's an object with json property
          jsonData = this.canvasData.json;
        } else {
          // If it's already a JSON object
          jsonData = this.canvasData;
        }

        this.canvas.loadFromJSON(jsonData, () => {
          this.canvas.renderAll();
          // Restore drawing mode state
          if (this.isDrawingMode) {
            this.setDrawingMode();
          } else {
            this.setSelectionMode();
          }
        });
      } catch (error) {
        console.error('Error loading canvas data:', error);
      }
    },

    emitCanvasData() {
      const data = this.getCanvasData();
      this.$emit('canvas-updated', data);
    }
  }
};
</script>

<style scoped>
.fabric-canvas-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.canvas-controls {
  padding: 10px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  background: var(--background-color, white);
  flex-shrink: 0;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-label {
  font-size: 12px;
  color: #606266;
  margin-right: 5px;
}

.canvas-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
}

/* Dark mode styles */
.dark-mode .canvas-controls {
  background: var(--background-color);
  border-bottom-color: var(--border-color);
}

.dark-mode .control-label {
  color: var(--text-color);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .canvas-controls {
    padding: 8px;
    gap: 10px;
  }
  
  .control-group {
    gap: 5px;
  }
  
  .el-slider {
    width: 60px !important;
  }
  
  .control-label {
    font-size: 11px;
  }
}

/* Ensure canvas takes full space */
canvas {
  display: block;
}
</style>
