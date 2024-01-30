<template>
  <div class="statistics-page">
    <header>
      <img src="/images/logo.png" class="logo">
      <div>
        <select v-model="$store.state.selectedYear" @change="updateCalendar">
          <option v-for="year in yearRange" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div>
        <select v-model="$store.state.selectedMonth" @change="updateCalendar">
          <option v-for="month in 12" :key="month" :value="month">{{ $store.state.monthNames[month - 1] }}</option>
        </select>
      </div>
    </header>

    <div>
      <div class="most-selected-container">
        <img src="/images/colored/angry.jpg" class="most-selected-emoji">
          <div class="left-align-content">
            <h4 class="selected-month">화나는 달</h4>
            <p class="detail">화나는 날 : {{ 18 }}일</p>
            <p class="detail">화나는 일이 많았던 이번 한 달 어쩌구<br>다음 달은 좀 더 행복한 하루 저쩌구</p>
          </div>
      </div>
      <table class="statistic-table">
          <tr>
            <th class="statistic-label">순위</th>
            <th class="statistic-label">이모지</th>
            <th></th>
          </tr>
          <tr>
            <td class="statistic-detail">2</td>
            <td>
                <img src="/images/colored/depressed.jpg" class="selected-image">
            </td>
            <td class="emoji-details">우울한 날 : {{ 12 }}일</td>
          </tr>
          <tr>
            <td class="statistic-detail">3</td>
            <td>
                <img src="/images/grey/pleased.jpg" class="selected-image">
            </td>
            <td class="emoji-details">기쁜 날 : {{ 0 }}일</td>
          </tr>
          <tr>
            <td class="statistic-detail">3</td>
            <td>
                <img src="/images/grey/happy.jpg" class="selected-image">
            </td>
            <td class="emoji-details">행복한 날 : {{ 0 }}일</td>
          </tr>
          <tr>
            <td class="statistic-detail">3</td>
            <td>
                <img src="/images/grey/sad.jpg" class="selected-image">
            </td>
            <td class="emoji-details">슬픈 날 : {{ 0 }}일</td>
          </tr>
      </table>
    </div>
    <footer class="menu-bar">
        <div class="banner">MANGO</div>
        <div class="icon" @click="goToCalendar()">
          <font-awesome-icon icon="far fa-calendar" />
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    yearRange() {
      return Array.from({ length: 10 }, (_, index) => this.$store.state.currentYear - index)
    }
  },
  methods: {
    updateStatistics() {
    },
    goToCalendar() {
      this.$router.push(this.$store.state.calendar)
    },
  },
  mounted() {
    this.$store.commit('getToday')
  },
}
</script>

<style scoped>
.statistics-page {
  text-align: center;
  height: 844px;
  width: 390px;
  position: relative;
}
.logo {
  margin-top: 16px;
  margin-bottom: 25px;
  width: 100px;
  height: auto;
}
.most-selected-emoji{
  margin-top: 23px;
  width:140px;
  height: 110px;
}
.most-selected-container{
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 25px;
}
.left-align-content{
  text-align: left;
}
.emoji-details{
  text-align: left;
  padding-left: 15px;
  font-size: 15px;
}
.selected-image{
  width: 70px;
  height: auto;
}
.selected-month {
  font-size: 20px;
  margin-bottom: 15px;
}
.detail {
  font-size: 13px;
  margin-top: -5px;
}
.statistic-table {
  margin-left: 20px;
}
.statistic-detail {
  font-size: 18px;
}
.statistic-label {
  font-size: 20px;
  padding: 15px;
}
.menu-bar {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 200, 0);
}
.icon {
  font-size: 26px;
  color: white;
  margin-left: 65px;
  margin-bottom: 5px;
  margin-right: -88px;
}
.banner {
  font-family: 'HCRDotum';
  font-size: 28px;
  margin-top: -3px;
}
</style>