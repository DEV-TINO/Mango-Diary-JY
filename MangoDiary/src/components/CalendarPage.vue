<template>
  <div class="calendar-page">
    <header>
      <div>
        <img src="/images/logo.png" class="logo">
      </div>
      <div class="select-month">
        <div class="left-select-month">
          <div class="last-month" @click="changeMonth(-1)">{{ "<" }}</div>
          <div class="month-block">
            <div class="month-name"><b>{{ this.$store.state.selectedMonth }}</b></div>
            <div class="year-block">
              <div class="year">{{ this.$store.state.selectedYear }}</div>
              <div class="month">{{ this.$store.state.monthNames[this.$store.state.selectedMonth - 1] }}</div>
            </div>
          </div>
      </div>
        <div class="next-month" @click="changeMonth(1)">{{ ">" }}</div>
      </div>
    </header>
    <div class="week">
      <div class="day-header" v-for="dayName in $store.state.dayNames" :key="dayName">{{ dayName }}</div>
    </div>
    <div class="calendar">
      <div class="week" v-for="week in calendar" :key="week">
          <div class="day" v-for="day in week" :key="day">
              {{ showDay(day) }}
              <div class="day-container" :class="isToday(day)" @click="day != null && writeDiary(day)">
                <img class="emoji" :src="getSelectedEmojiPath()">
              </div>
          </div>
      </div>
    </div>
    <footer class="menu-bar">
        <div @click="writeDiary(this.$store.state.today)" class="write-button">+</div>
        <div class="banner">MANGO</div>
        <img class="icon" @click="goToStatistics()" src="/images/statistics.png">
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
    isToday(day) {
      if (day == this.$store.state.today && 
        this.$store.state.currentYear == this.$store.state.selectedYear &&
        this.$store.state.currentMonth == this.$store.state.selectedMonth)
        return "today"
    },
    writeDiary(day) {
      this.$router.push({
        path: `/write/${day}`,
        params: { selectedDay: day }
      });
    },
    goToStatistics() {
      this.$router.push(this.$store.state.statistics)
    },
    showDay(day) {
      return day == null ? "-" : day
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
  column-gap: 18px;
  justify-content: center;
  font-size: 10px;
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
  width: 37px;
  height: 14px;
  background-color: rgb(255, 247, 204);
  font-size: 10px;
  margin-bottom: -20px;
}
.calendar {
  display: grid;
  row-gap: 40px;
  margin-top: -10px;
  width: 390px;
}
.day {
  width: 37px;
  height: 14px;
  background-color: rgb(255, 247, 204);
}
.day-container {
  margin-top: 8px;
  width: 37px;
  height: 37px;
  background-color: rgb(255, 247, 204);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.today {
  background-color: rgb(255, 234, 128);
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
  background-color: rgb(255, 234, 128);
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
.select-month {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
}
.last-month {
  font-family: 'BMJUA';
  margin-left: 5px;
  margin-top: 34px;
  cursor: pointer;
  color: rgb(145, 145, 145);
}
.next-month {
  font-family: 'BMJUA';
  margin-right: 5px;
  cursor: pointer;
  color: rgb(145, 145, 145);
}
.month-block {
  display: flex;
  flex-direction: row;
  align-items: end;
}
.icon {
  height: 40px;
  width: 40px;
  margin-left: 55px;
  margin-top: 2px;
}
.write-button {
  font-family: 'BMJUA';
  font-size: 38px;
  color: white;
  margin-right: 65px;
  margin-top: 6px;
}
.banner {
  font-family: 'HCRDotum';
  font-size: 28px;
  margin-top: -3px;
}
</style>