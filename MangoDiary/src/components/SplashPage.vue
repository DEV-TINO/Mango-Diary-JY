<template>
  <div class="splash-page">
    <img src="/images/title.png" class="logo">
    <h4 @click="redirectToCalendar()" class="start">Touch to Start</h4>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToCalendar() {
      this.$router.push(this.$store.state.calendar)
    }
  }
}
</script>

<style scoped>
.splash-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: -8px;
}
.logo {
  margin-top: 200px;
  max-width: 100%;
  height: auto;
}
.start {
  text-align: center;
  margin-top: 300px;
}
</style>