<template>
  <div class="statistics-page">
    <header>
      <img src="/images/logo.png" class="logo">
      <div class="select-month">
        <div class="left-select-month">
          <font-awesome-icon icon="chevron-left" class="last-month" @click="handleClickChangeMonth(-1)"/>
          <div class="month-block">
            <div class="month-name"><b>{{ this.$store.state.selectedMonth }}</b></div>
            <div class="year-block">
              <div class="year">{{ this.$store.state.selectedYear }}</div>
              <div class="month">{{ this.$store.state.monthNames?.[this.$store.state.selectedMonth - 1] ?? "" }}</div>
            </div>
          </div>
        </div>
        <font-awesome-icon icon="chevron-right" class="next-month" @click="handleClickChangeMonth(1)"/>
      </div>
    </header>
    <div>
      <div class="most-selected-container" v-if="this.$store.state.statisticsData[0]?.count ?? 0 > 0">
        <img :src="getMostSelectedEmojiPath()" class="most-selected-emoji">
        <div class="left-align-content">
          <h4 class="selected-month">{{ this.$store.state.statisticsData[0]?.month ?? "" }}</h4>
          <p class="detail">{{ this.$store.state.statisticsData[0]?.name ?? "" }} 망고 {{ this.$store.state.statisticsData[0]?.count ?? 0 }}개</p>
          <p class="detail" style="white-space: pre-line;">{{ this.$store.state.statisticsData[0]?.comment ?? "" }}</p>
        </div>
      </div>
      <div v-else>
        <h4 class="message">선택된 감정이 없습니다</h4>
      </div>
      <table class="statistic-table">
        <tr v-if="this.$store.state.statisticsData[0]?.count == 0" v-for="statisticsData in this.$store.state.statisticsData">
          <td>
            <img :src="getEmojiPath(statisticsData)" class="selected-image">
          </td>
          <td class="emoji-details">{{ statisticsData?.name ?? "" }} 망고 {{ statisticsData?.count ?? 0 }}개</td>
        </tr>
        <tr v-else v-for="statisticsData in this.$store.state.statisticsData.slice(1)">
          <td>
            <img :src="getEmojiPath(statisticsData)" class="selected-image">
          </td>
          <td class="emoji-details">{{ statisticsData?.name ?? "" }} 망고 {{ statisticsData?.count ?? 0 }}개</td>
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
    goToCalendar() {
      this.$router.push(this.$store.state.calendar)
    },
    getEmojiPath(data) {
      if (data.count > 0) return `/images/colored/${data.emoji}.jpg`
      return `/images/grey/${data.emoji}.jpg`
    },
    getMostSelectedEmojiPath() {
      return `/images/colored/${this.$store.state.statisticsData[0].emoji}.jpg`
    },
    handleClickChangeMonth(monthSet) {
      const selectMonth = this.$store.state.selectedMonth + monthSet
      this.$store.commit('setSelectedMonth', selectMonth)
      if ((selectMonth) < 1) {
        this.$store.commit('decreaseSelectedYear')
      } else if ((selectMonth) > 12) {
        this.$store.commit('increaseSelectedYear')
      }
      await this.$store.dispatch('getAllPosts')
      this.$store.commit('updateStatistic')
    },
  },
  async mounted() {
    this.$store.commit('getToday')
    await this.$store.dispatch('getAllPosts')
    this.$store.commit('updateStatistic')
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
  margin: -8px;
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
  margin-right: 100px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.last-month {
  margin-left: 5px;
  margin-top: 32px;
  cursor: pointer;
  color: rgb(145, 145, 145);
}
.next-month {
  margin-right: 5px;
  margin-bottom: 2px;
  cursor: pointer;
  color: rgb(145, 145, 145);
}
.month-block {
  display: flex;
  align-items: end;
}
.left-select-month {
  margin-left: 100px;
  display: flex;
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
  margin-top: 7px;
}
.most-selected-emoji{
  margin-top: 20px;
  width: 140px;
  height: 110px;
  margin-right: 3px;
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
  margin-right: 5px;
  line-height: 1.5;
}
.message {
  margin-top: 50px;
  margin-left: 17px;
  margin-bottom: 40px;
  border-radius: 10px;
  border: 2px solid rgb(255, 200, 0);
  width: 350px;
  height: 60px;
  font-size: 20px;
  color: rgb(90, 55, 22);
  font-family: 'HCRDotum';
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  cursor: pointer;
}
.banner {
  font-family: 'HCRDotum';
  font-size: 28px;
  margin-top: -3px;
  cursor: default;
}
</style>