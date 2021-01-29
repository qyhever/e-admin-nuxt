<template>
  <div class="container">
    user
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    onClick() {
      this.$api.user.getUsers()
        .then(res => {
          console.log(res)
        })
        .catch(console.log)
    }
  }
}
</script>
