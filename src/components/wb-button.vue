<template>
  <div class="button" :style="buttonStyle" @click="click">
    <text class="text" :style="textStyle">{{text}}</text>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonStyle: Object,
    textStyle: Object,
  },
  methods: {
    click(event) {
      if (this.disabled === false) {
        this.$emit('click', event)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../style/wb.scss";

.button {
  width: $wb-btn--width;
  height: $wb-btn--height;
  align-items: center;
  justify-content: center;
  border-radius: $wb-nb10;
}

.text {
  text-overflow: ellipsis;
  lines: 1;
  font-size: $wb-fs22;
  color: $color-primary;
}
</style>