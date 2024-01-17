<template>
  <div class="calendar-page">
    <header>
      <div>
        <img src="/images/logo.png" class="logo">
      </div>
      <div>
          <select v-model="$store.state.selectedYear" @change="updateCalendar()">
            <option v-for="year in yearRange" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div>
          <select v-model="$store.state.selectedMonth" @change="updateCalendar()">
            <option v-for="month in 12" :key="month" :value="month">{{ $store.state.monthNames[month-1] }}</option>
          </select>
        </div>
    </header>

    <div class="week">
      <div class="day-header" v-for="dayName in $store.state.dayNames" :key="dayName">{{ dayName }}</div>
    </div>
  <div class="calendar">
      <div class="week" v-for="week in calendar" :key="week">
          <div class="day" v-for="day in week" :key="day">
              {{ day == null ? "-" : day }}
              <div class="day-container" :class="{ today: isToday(day) }" @click="writeDiary()"></div>
          </div>
      </div>
  </div>

    <footer class="menu-bar">
      <router-link :to="this.$store.state.statistics">통계</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    yearRange() {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, index) => currentYear - index);
    },
    calendar() {
      return this.generateCalendar();
    },
  },
  methods: {
    generateCalendar() {
      const firstDay = new Date(this.$store.state.selectedYear, this.$store.state.selectedMonth - 1, 1).getDay();
      const daysInMonth = new Date(this.$store.state.selectedYear, this.$store.state.selectedMonth, 0).getDate();
      const row = 7;
      const col = 6;
      let calendar = [];
      let dayCount = 1;

      for (let i = 0; i < col; i++) {
        let week = [];
        for (let j = 0; j < row; j++) {
          if ((i == 0 && j < firstDay) || (dayCount > daysInMonth)) {
            week.push(null);
          } else {
            week.push(dayCount++);
          }
        }
        calendar.push(week);
      }
      return calendar;
    },
    updateCalendar() {
      this.calendar = this.generateCalendar();
    },
    isToday(day) {
      return day == this.$store.state.today;
    },
    writeDiary() {
      this.$router.push(this.$store.state.write);
    },
  mounted() {
    this.$store.commit('getToday');
  },
};
</script>

<style scoped>
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
.week {
  margin-top: 30px;
  display: flex;
  column-gap: 18px;
  justify-content: center;
  font-size: 10px;
}
.day-header {
  width: 36px;
  height: 14px;
  border: 1px solid #ccc;
  font-size: 10px;
  margin-bottom: -20px;
}
.calendar {
  display: grid;
  row-gap: 40px;
}
.day {
  width: 36px;
  height: 14px;
  border: 1px solid #ccc;
}
.day-container {
  margin-top: 8px;
  width: 36px;
  height: 36px;
  border: 1px solid #ccc;
}
.today {
  background-color: #3498db;
  color: #fff;
}
.menu-bar {
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: rgb(255, 255, 140);
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>