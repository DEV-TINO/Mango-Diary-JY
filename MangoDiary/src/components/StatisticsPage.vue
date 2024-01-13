<template>
  <div class="statistics-page">
    <header>
      <img src="/images/logo2.png" class="logo">
      <div>
        <select id="yearSelect" v-model="selectedYear" @change="updateStatistics">
          <option v-for="year in yearRange" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div>
        <select id="monthSelect" v-model="selectedMonth" @change="updateStatistics">
          <option v-for="(month, index) in 12" :key="index + 1" :value="index + 1">{{ monthNames[index] }}</option>
        </select>
      </div>
    </header>

    <div>
      <div class="mostSelectedContainer">
        <img src="/images/mood1c.jpg" class="mostSelectedEmoji">
          <div class="leftAlignContent">
            <h4>화나는 달</h4>
            <p>화나는 날 : {{ 18 }}일</p>
            <p>화나는 일이 많았던 이번 한 달 어쩌구<br>다음 달은 좀 더 행복한 하루 저쩌구</p>
          </div>
      </div>
      <table>
          <tr>
            <th>순위</th>
            <th>이모지</th>
            <th></th>
          </tr>
          <tr>
            <td>2</td>
            <td>
                <img src="/images/mood2c.jpg" class="selectedImage">
            </td>
            <td class="emojiDetails">우울한 날 : {{ 12 }}일</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
                <img src="/images/mood3.jpg" class="selectedImage">
            </td>
            <td class="emojiDetails">기쁜 날 : {{ 0 }}일</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
                <img src="/images/mood4.jpg" class="selectedImage">
            </td>
            <td class="emojiDetails">행복한 날 : {{ 0 }}일</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
                <img src="/images/mood5.jpg" class="selectedImage">
            </td>
            <td class="emojiDetails">슬픈 날 : {{ 0 }}일</td>
          </tr>
      </table>
    </div>
    <footer>
      <router-link to="/calendar">캘린더</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
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
  },
  methods: {
    updateStatistics() {
    },
  },
}
</script>

<style scoped>
.statistics-page {
  text-align: center;
  height: 844px;
  width: 390px;
}
.logo {
  margin-top: 16px;
  margin-bottom: 25px;
  width: 100px;
  height: auto;
}
.mostSelectedEmoji{
  margin-top: 23px;
  width:140px;
  height: 110px;
}
.mostSelectedContainer{
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 25px;
}
.leftAlignContent{
  text-align: left;
}
.emojiDetails{
  text-align: left;
  padding-left: 15px;
  font-size: 15px;
}
.selectedImage{
  width: 70px;
  height: auto;
}
h4 {
  font-size: 20px;
  margin-bottom: 15px;
}
p {
  font-size: 13px;
  margin-top: -5px;
}
table{
  margin-left: 20px;
}
table th{
  padding: 15px;
}
table td{
  font-size: 18px;
}
table th{
  font-size: 20px;
}
footer {
  margin-top: 113px;
}
</style>