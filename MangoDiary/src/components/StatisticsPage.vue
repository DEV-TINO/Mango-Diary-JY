<template>
  <div class="statistics-page">
    <header>
      <img src="/images/logo.png" class="logo">
      <div class="select-month">
        <div class="left-select-month">
          <font-awesome-icon icon="chevron-left" class="last-month"/>
          <div class="month-block">
            <div class="month-name"><b>{{ this.$store.state.selectedMonth }}</b></div>
            <div class="year-block">
              <div class="year">{{ this.$store.state.selectedYear }}</div>
              <div class="month">{{ this.$store.state.monthNames[this.$store.state.selectedMonth - 1] }}</div>
            </div>
          </div>
        </div>
        <font-awesome-icon icon="chevron-right" class="next-month"/>
      </div>
    </header>
    <div>
      <div class="most-selected-container">
        <img src="/images/colored/angry.jpg" class="most-selected-emoji">
        <div class="left-align-content">
          <h4 class="selected-month">화나는 달</h4>
          <p class="detail">화남 망고 {{ 18 }}개</p>
          <p class="detail">어려움과 화남을 뒤로하고,<br>새로운 달을 긍정적으로 맞이해봐요</p>
        </div>
      </div>
      <table class="statistic-table">
          <tr>
            <td>
                <img src="/images/colored/depressed.jpg" class="selected-image">
            </td>
            <td class="emoji-details">우울 망고 {{ 12 }}개</td>
          </tr>
          <tr>
            <td>
                <img src="/images/grey/pleased.jpg" class="selected-image">
            </td>
            <td class="emoji-details">기쁨 망고 {{ 0 }}개</td>
          </tr>
          <tr>
            <td>
                <img src="/images/grey/happy.jpg" class="selected-image">
            </td>
            <td class="emoji-details">행복 망고 {{ 0 }}개</td>
          </tr>
          <tr>
            <td>
                <img src="/images/grey/sad.jpg" class="selected-image">
            </td>
            <td class="emoji-details">슬픔 망고 {{ 0 }}개</td>
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
@font-face {
  font-family: 'HCRDotum';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/HCRDotum.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'BMJUA';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
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
.select-month {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
}
.last-month {
  margin-top: 22px;
  cursor: pointer;
  color: rgb(145, 145, 145);
}
.next-month {
  margin-right: 110px;
  margin-bottom: 13px;
  cursor: pointer;
  color: rgb(145, 145, 145);
}
.month-block {
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-left: 18px;
}
.left-select-month {
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  justify-content: end;
}
.year {
  font-family: 'HCRDotum';
  font-size: 15px;
}
.month {
  font-family: 'HCRDotum';
  font-size: 15px;
}
.month-name {
  font-family: 'BMJUA';
  font-size: 55px;
  margin-bottom: -10px;
  margin-left: 15px;
  margin-right: 15px;
  color: rgb(255, 115, 0);
}
.year-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.most-selected-emoji{
  margin-top: 20px;
  width:140px;
  height: 110px;
  margin-left: -15px;
}
.most-selected-container{
  margin-top: 35px;
  display: flex;
  justify-content: space-evenly;
  margin-left: 17px;
  margin-bottom: 25px;
  border: 2px solid rgb(255, 200, 0);
  border-radius: 10px;
  width: 350px;
  height: 150px;
}
.left-align-content{
  text-align: left;
}
.emoji-details{
  text-align: left;
  padding-left: 15px;
  font-size: 15px;
  font-family: 'HCRDotum';
}
.selected-image{
  width: 70px;
  height: auto;
}
.selected-month {
  font-size: 20px;
  margin-bottom: 15px;
  margin-top: 25px;
  color: rgb(90, 55, 22);
  font-family: 'HCRDotum';
}
.detail {
  font-size: 13px;
  margin-top: -5px;
  font-family: 'HCRDotum';
}
.statistic-table {
  margin-left: 20px;
  margin-top: 20px;
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