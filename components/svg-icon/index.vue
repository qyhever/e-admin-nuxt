<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    },
    svgClass() {
      if (this.name) {
        return 'svg-icon ' + this.name
      }
      return 'svg-icon'
    }
  }
}
</script>

<style scoped>
.svg-icon {
  /* display: block; */
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  overflow: hidden;
}
</style>
