<template>
  <!-- Top Bar Buttons --> 
  <div id="top-bar">
    <!-- Import Image File button -->
    <md-button 
      id="import-image-file" 
      class="md-raised md-primary md-accent" 
      @click="importImageFile"
    >Import Image File</md-button>
    <!-- ENABLED Clear Image button -->
    <md-button 
      id="clear-image" 
      class="md-raised md-primary md-accent" 
      @click="clearImage"
      v-if="imageExists"
    >Clear Image</md-button>
    <!-- DISABLED Clear Image button -->
    <md-button 
      id="clear-image" 
      class="md-raised md-primary md-accent" 
      v-else disabled
    >Clear Image</md-button>
  </div>
</template>

<script>
  import importImageFileFunc from '../../utils/importImageFile.util.js';
  import clearImageAlert from '../../utils/clearImageAlert.util.js'

  export default {
    name: 'top-bar',
    methods: {
      // removes imported background image from CenterCanvas component
      clearImage() {
        const response = clearImageAlert();
        if (response === 0) {
          this.$store.dispatch('clearImage');
        }
      },
      // electron function to grab the image path from local machine
      importImageFile() {
        const file = importImageFileFunc();
        this.$store.dispatch('importImageFile', file);
      },
    },
    computed: {
      // checks if background image exists. accessed to conditionally toggle 'clear image' button from Disabled to Enabled
      imageExists() {
        return this.$store.getters.getImagePath.length;
      }
    }
  }
</script>

<style>
  #top-bar {
    background-color: #3e3e3e;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65px;
    width: 100%;
  }
</style>