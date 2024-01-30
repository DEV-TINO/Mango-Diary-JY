<template>
  <div class="calendar-page">
    <header>
      <div>
        <img src="/images/logo.png" class="logo">
      </div>
      <div class="select-month">
        <div class="left-select-month">
          <font-awesome-icon icon="chevron-left" class="last-month" @click="changeMonth(-1)"/>
          <div class="month-block">
            <div class="month-name"><b>{{ this.$store.state.selectedMonth }}</b></div>
            <div class="year-block">
              <div class="year">{{ this.$store.state.selectedYear }}</div>
              <div class="month">{{ this.$store.state.monthNames[this.$store.state.selectedMonth - 1] }}</div>
            </div>
          </div>
      </div>
        <font-awesome-icon icon="chevron-right" class="next-month" @click="changeMonth(1)"/>
      </div>
    </header>
    <div class="week">
      <div class="day-header" v-for="dayName in $store.state.dayNames" :key="dayName"><b>{{ dayName }}</b></div>
    </div>
    <div class="calendar">
      <div class="week" v-for="week in calendar" :key="week">
        <div class="day" v-for="day in week" :key="day">
          {{ showDay(day) }}
          <div class="day-container" @click="day != null && writeDiary(day)">
            <img class="emoji" :src="getSelectedEmojiPath()">
          </div>
        </div>
      </div>
    </div>
    <footer class="menu-bar">
        <div @click="writeDiary(this.$store.state.today)" class="write-button">
          <font-awesome-icon icon="plus" />
        </div>
        <div class="banner">MANGO</div>
        <div class="icon" @click="goToStatistics()">
          <font-awesome-icon icon="chart-pie" />
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    yearRange() {
        return Array.from({ length: 10 }, (_, index) => this.$store.state.currentYear - index)
    },
    calendar() {
      return this.generateCalendar()
    },
  },
  methods: {
    generateCalendar() {
      const firstDay = new Date(this.$store.state.selectedYear, this.$store.state.selectedMonth - 1, 1).getDay();
      const daysInMonth = new Date(this.$store.state.selectedYear, this.$store.state.selectedMonth, 0).getDate();
      const row = 7;
      const col = 6;
      const calendar = [];
      let dayCount = 1;
      for (let i = 0; i < col; i++) {
        const week = []
        for (let j = 0; j < row; j++) {
          if ((i == 0 && j < firstDay) || (dayCount > daysInMonth)) {
            week.push(null)
          } else {
            week.push(dayCount++)
          }
        }
        calendar.push(week)
      }
      return calendar
    },
    updateCalendar() {
      this.calendar = this.generateCalendar()
    },
    writeDiary(day) {
      const selectedDate = new Date(this.$store.state.selectedYear, this.$store.state.selectedMonth - 1, day);
      if(selectedDate > this.$store.state.date) {
        alert("미래의 기분은 알 수 없습니다")
        return
      }
      this.$router.push({
        path: `${this.$store.state.write}/${day}`,
        params: { selectedDay: day }
      });
    },
    goToStatistics() {
      this.$router.push(this.$store.state.statistics)
    },
    showDay(day) {
      return day == null ? "ㅤ" : day
    },
    getSelectedEmojiPath() {
      const selectedEmoji = this.$store.state.selectedEmoji;
      return selectedEmoji
    },
    changeMonth(monthSet) {
      this.$store.commit('setSelectedMonth', this.$store.state.selectedMonth + monthSet);
      if ((this.$store.state.selectedMonth + monthSet) < 0) {
        this.$store.state.selectedYear--;
        this.$store.state.selectedMonth = 12;
      } else if ((this.$store.state.selectedMonth + monthSet) > 13) {
        this.$store.state.selectedYear++;
        this.$store.state.selectedMonth = 1;
      }
      this.updateCalendar();
    },
  },
  mounted() {
    this.$store.commit('getToday')
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'BMJUA';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'HCRDotum';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/HCRDotum.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.calendar-page {
  text-align: center;
  height: 844px;
  width: 390px;
  position: relative;
}
.logo {
  margin-top: 16px;
  width: 100px;
  height: auto;
}
.left-select-month {
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
.week {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  column-gap: 8px;
  font-size: 10px;
}
.day-container {
  width: 45px;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px 0px;
  border-bottom: 1px solid #b6b6b6;
  border-right: 1px solid #b6b6b6;
}
.month-name {
  font-family: 'BMJUA';
  font-size: 55px;
  margin-bottom: -10px;
  margin-left: 15px;
  margin-right: 15px;
  color: rgb(255, 115, 0);
}
.day-header {
  font-family: 'HCRDotum';
  width: 44px;
  height: 19px;
  margin-right: 4px;
  margin-left: -2px;
  background-color: rgb(255, 200, 0);
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: -10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color : white;
  border-radius: 30px;
}
.day-header:nth-child(1) {
  background-color: rgb(250, 166, 0);
}
.calendar {
  display: grid;
  row-gap: 24px;
  margin-top: -10px;
  width: 390px;
}
.day {
  width: 45px;
  height: 14px;
  border-right: 1px solid #b6b6b6;
  text-align: justify;
  font-family: 'HCRDotum';
}
.day:nth-child(1) {
  color: rgb(255, 115, 0);
}
.emoji {
  width:35px;
  height:auto;
}
.year-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
.select-month {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
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
  flex-direction: row;
  align-items: end;
}
.icon {
  font-size: 26px;
  color: white;
  margin-left: 58px;
  margin-bottom: 2px;
}
.write-button {
  font-size: 26px;
  color: white;
  margin-right: 65px;
  margin-bottom: 4px;
}
.banner {
  font-family: 'HCRDotum';
  font-size: 28px;
  margin-top: -3px;
}
</style>