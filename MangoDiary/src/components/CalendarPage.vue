<template>
  <div class="calendar-page">
    <header>
      <div>
        <img src="/images/logo2.png" class="logo">
      </div>
      <div>
          <select v-model="selectedYear" @change="updateCalendar">

            <option v-for="year in yearRange" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div>
          <select v-model="selectedMonth" @change="updateCalendar">

            <option v-for="(month, index) in 12" :key="index + 1" :value="index + 1">{{ monthNames[index] }}</option>
          </select>
        </div>
    </header>


    <div class="week">
      <div class="day-header" v-for="dayName in dayNames" :key="dayName">{{ dayName }}</div>
    </div>


  <div class="calendar">
      <div class="week" v-for="week in calendar" :key="week">
          <div class="day" v-for="day in week" :key="day">
              {{ day == null ? "-" : day }}
              <div class="day-container" :class="{ today: isToday(day) }" @click="writeDiary()"></div>
          </div>
      </div>
  </div>

    <footer>
      <router-link to="/statistics">통계</router-link>
    </footer>
  </div>

</template>

<script>
export default {
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      today: new Date().getDate(),
      dayNames: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
    };
  },
  computed: {
    yearRange() {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, index) => currentYear - index);
    },
    monthNames() {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    },
    calendar() {
      return this.generateCalendar();
    },
  },
  methods: {
    generateCalendar() {
      const firstDay = new Date(this.selectedYear, this.selectedMonth - 1, 1).getDay();
      const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();

      let calendar = [];
      let dayCount = 1;

      for (let i = 0; i < 6; i++) {
        let week = [];
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < firstDay) || (i === 5 && dayCount > daysInMonth) || (i < 5 && dayCount > daysInMonth)) {
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
      return day == this.today;
    },
    writeDiary() {
      this.$router.push('/writing');
    },
  },
};
</script>

<style scoped>
.calendar-page {
  text-align: center;
  height: 844px;
  width: 390px;
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
  font-size: 12px;
}

.day-header {
  width: 36px;
  height: 12px;
  border: 1px solid #ccc;
  font-size: 12px;
  margin-bottom: -20px;
}

.calendar {
  display: grid;
  row-gap: 40px;
}

.day {
  width: 36px;
  height: 12px;
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

.hasDiary {
  border: 1px solid #ff9f9f;
}

footer{
  margin-top: 120px;
}
</style>