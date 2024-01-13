<template>
  <div class="splash-page">
    <img src="/images/logo.png" class="logo">
    <h4 @click="redirectToCalendar" class="start">Touch to Start</h4>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToCalendar() {
      this.$router.push('/calendar');
    }
  }
}
</script>

<style scoped>
.splash-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 844px;
  width: 390px;
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