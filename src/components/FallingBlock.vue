<template>
  <div>
    <Block :block="block"
           :top="blockDropboxTop"
           :ref="'block'"
           :index="index"
           :isPaused="isPaused"
    />
  </div>
</template>

<script>
import { FINISH_FALLING, TEETER_TOTTER_WIDTH } from '@/constants';
import Block from './Block.vue';

export default {
  name: 'FallingBlock',
  props: {
    block: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
    timeOut: {
      type: Number,
    },
  },
  components: {
    Block,
  },
  data() {
    return {
      blockWindowBottom: 0,
      blockDropboxTop: this.block.height,
      timer: 0,
    };
  },
  computed: {
    isPaused() {
      return this.$store.state.isPaused;
    },
    swingBending() {
      return this.$store.getters.swingBending;
    },
    blockFinalPosition() {
      const { top, bottom } = this.getSwingCoords();
      return this.swingBending >= 0
        ? top + ((bottom - top) / 2) * (1 - this.block.offset / (TEETER_TOTTER_WIDTH / 2))
        : bottom - ((bottom - top) / 2) * (1 - this.block.offset / (TEETER_TOTTER_WIDTH / 2));
    },
  },
  methods: {
    getSwingCoords() {
      const { top, bottom } = document.querySelector('.swing')
        .getBoundingClientRect();
      return {
        top,
        bottom,
      };
    },
    incrementBlockDropboxTop() {
      this.blockDropboxTop += 20;
    },
  },
  // eslint-disable-next-line consistent-return
  updated() {
    if (this.isPaused) return clearTimeout(this.timer);
    if (this.index !== 0) {
      // eslint-disable-next-line consistent-return
      return;
    }

    this.blockWindowBottom = this.$refs.block.getBlockBottomCoordinates();
    this.timer = setTimeout(() => {
      if (this.blockWindowBottom >= this.blockFinalPosition - 20) {
        clearTimeout(this.timer);
        this.$store.dispatch(FINISH_FALLING);
        this.$emit('finished-falling');
        return;
      }
      this.incrementBlockDropboxTop();
    }, this.timeOut);
  },
};
</script>
