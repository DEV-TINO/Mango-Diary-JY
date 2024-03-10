<template>
  <div class="calendar-page">
    <header>
      <div>
        <img src="/images/logo.png" class="logo">
      </div>
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
    <div class="week">
      <div class="day-header" v-for="dayName in $store.state.dayNames" :key="dayName"><b>{{ dayName }}</b></div>
    </div>
    <div class="calendar">
      <div class="week" v-for="week in calendar" :key="week">
        <div class="day" v-for="day in week" :key="day">
          {{ showDay(day) }}
          <div class="day-container" :class="changePointer(day)" @click="handleClickWriteDiary(day)">
            <img class="emoji" :src="getSelectedEmojiPath(day)">
          </div>
        </div>
      </div>
    </div>
    <footer class="menu-bar">
      <div class="icon" @click="goToStatistics()">
        <font-awesome-icon icon="chart-pie" />
      </div>
      <div class="banner">MANGO</div>
      <div @click="handleClickWriteTodayDiary()" class="write-button">
        <font-awesome-icon icon="plus" />
        <div class="bottom-write-button">today</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calendar: [],
    };
  },
  computed: {
    yearRange() {
        return Array.from({ length: 10 }, (_, index) => this.$store.state.currentYear - index)
    },
  },
  methods: {
    generateCalendar() {
      const firstDay = new Date(this.$store.state.selectedYear, this.$store.state.selectedMonth - 1, 1).getDay()
      const daysInMonth = new Date(this.$store.state.selectedYear, this.$store.state.selectedMonth, 0).getDate()
      const row = 7
      let col = 5
      const calendar = []
      let dayCount = 1
      if ((firstDay + daysInMonth) > 35) col = 6
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
    getDiaryId(day) {
      const matchingDiaryEntries = this.$store.state.posts.filter((entry) => parseInt(entry.post_date) == day)
      return matchingDiaryEntries.length > 0 ? matchingDiaryEntries[matchingDiaryEntries.length - 1]?.post_id : -1
    },
    getSelectedEmojiPath(day) {
      const result = this.$store.state.posts.filter((post) => parseInt(post.post_date) == day)
      return result.length > 0 ? result[result.length - 1]?.post_emoji_url : ""
    },
    updateCalendar() {
      this.calendar = this.generateCalendar()
    },
    isFutureDate(day) {
      const selectedDate = new Date(this.$store.state.selectedYear, this.$store.state.selectedMonth - 1, day)
      return selectedDate > this.$store.state.date
    },
    handleClickWriteDiary(day) {
      if (day == null) return
      if(this.isFutureDate(day)) {
        alert("미래의 기분은 알 수 없습니다")
        return
      }
      this.$router.push({
        path: `${this.$store.state.write}/${day}`,
        state: { diaryId: this.getDiaryId(day) }
      });
    },
    handleClickWriteTodayDiary() {
      this.$store.commit('getToday')
      this.$router.push({
        path: `${this.$store.state.write}/${this.$store.state.today}`,
        state: { diaryId: this.getDiaryId(this.$store.state.today) }
      });
    },
    goToStatistics() {
      this.$router.push(this.$store.state.statistics)
    },
    showDay(day) {
      return day ?? "ㅤ"
    },
    async handleClickChangeMonth(monthSet) {
      const selectMonth = this.$store.state.selectedMonth + monthSet
      this.$store.commit('setSelectedMonth', selectMonth)
      if ((selectMonth) < 1) {
        this.$store.commit('decreaseSelectedYear')
      } else if ((selectMonth) > 12) {
        this.$store.commit('increaseSelectedYear')
      }
      this.updateCalendar()
      await this.$store.dispatch('getAllPosts')
    },
    changePointer(day) {
      if(this.isFutureDate(day)) return
      return day == null ? "" : "pointer-cursor"
    }
  },
  async mounted() {
    this.$store.commit('getToday')
    await this.$store.dispatch('getAllEmojis')
    await this.$store.dispatch('getAllPosts')
    this.updateCalendar()
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
  margin: -8px;
}
.logo {
  margin-top: 16px;
  width: 100px;
  height: auto;
}
.left-select-month {
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
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 200, 0);
}
.select-month {
  margin-top: 15px;
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
.icon {
  font-size: 26px;
  color: white;
  margin-right: 60px;
  margin-left: -2px;
  margin-bottom: 2px;
  cursor: pointer;
}
.write-button {
  margin-top: -3px;
  margin-left: 58px;
  margin-right: -4px;
  font-size: 23px;
  color: white;
  cursor: pointer;
}
.bottom-write-button{
  margin-top: -5px;
  font-size: 13px;
}
.banner {
  font-family: 'HCRDotum';
  font-size: 28px;
  margin-top: -3px;
  cursor: default;
}
.pointer-cursor {
  cursor: pointer;
}
</style>