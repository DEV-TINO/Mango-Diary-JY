<template>
  <div class="write-page">
    <header class="button-container">
      <ul class="header-button-left">
        <li @click="goToCalendar">prev</li>
      </ul>
      <img src="/images/logo.png" class="logo">
      <ul class="header-button-right">
        <li @click="submit">submit</li>
      </ul>
    </header>

    <div>
      <div>
        <h3 class="title">오늘의 기분</h3>
        <div>
          <img v-for="(emoji, index) in $store.state.moodEmojis" :key="index" :src="`/images/${emoji}.jpg`" @click="selectEmoji(index, emoji)" class="mood-list">
        </div>
      </div>

      <h3 class="title">오늘의 일기</h3>
      <h4 class="date">{{ $store.state.selectedYear }}년 {{ $store.state.selectedMonth }}월 {{ $store.state.today }}일</h4>
      <textarea class="diary-box" v-model="diaryContent" placeholder="오늘 하루는 무엇을 했나요?" maxlength="200"></textarea>

      <label for="imageInput" class="input-container">
        <div class="input-block" v-if="!selectedImage">
          <label for="imageInput">+</label>
          <label>Upload Image</label>
        </div>
        <img class="selected-image" v-else :src="selectedImage">
      </label>
      <input
        id="imageInput"
        type="file"
        style="display: none"
        @change="handleImageUpload"
      >
    </div>
    <footer class="menu-bar">
      <div @click="goToStatistics">통계</div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      diaryContent: '',
      selectedImage: null,
    };
  },
  methods: {
    goToCalendar() {
      this.$router.push(this.$store.state.calendar);
    },
    submit() {
    },
    selectEmoji(i, emoji) {
      this.$store.state.moodEmojis = [...this.$store.state.originalEmojis];
      this.$store.state.moodEmojis[i] = `colored/${emoji.split('/')[1]}`;
    },
    handleImageUpload(event) {
      const file = event.target.files;
      this.selectedImage = URL.createObjectURL(file[0]);
    },
    goToStatistics() {
      this.$router.push(this.$store.state.statistics);
    },
  },
  mounted() {
    this.$store.commit('getToday');
  },
};
</script>

<style scoped>
.write-page {
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
.header-button-left {
  float: left;
  width: 50px;
  margin-top: 40px;
  margin-left: -45px;
  margin-right: 45px;
  font-size: 20px;
  list-style-type: none;
}
.header-button-right {
  float: right;
  width: 50px;
  margin-top: 40px;
  margin-left: -10px;
  margin-right: 10px;
  font-size: 20px;
  list-style-type: none;
}
.mood-list{
  width: 58px;
  height: auto;
  margin-inline: 7px;
}
.selected-image{
  width: 354px;
  height: 140px;
}
.diary-box {
  margin-top: -10px;
  width: 350px;
  height: 250px;
  resize: none;
}
.button-container {
  display: flex;
  justify-content: space-evenly;
}
.title {
  text-align: left;
  margin-top: 30px;
  margin-left: 13px;
  margin-bottom: 10px;
}
.date {
  margin-top: auto;
  margin-left: 17px;
  text-align: left;
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
}
.input-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.input-block {
  width: 350px;
  height: 140px;
  border-style: dotted;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>