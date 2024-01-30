<template>
  <div class="write-page">
    <header class="button-container">
      <font-awesome-icon class="header-button-left" @click="goToCalendar" icon="chevron-left" />
      <img src="/images/logo.png" class="logo">
      <font-awesome-icon class="header-button-right" @click="submit" icon="check" />
    </header>

    <div>
      <div>
        <h3 class="title">오늘의 기분</h3>
        <div>
          <img v-for="(emoji, index) in $store.state.moodEmojis" :key="index" :src="getEmojiImagePath(emoji, index)" @click="selectEmoji(emoji, index)" class="mood-list">
        </div>
      </div>

      <h3 class="title">오늘의 일기</h3>
      <h4 class="date">{{ $store.state.selectedYear }}년 {{ $store.state.selectedMonth }}월 {{ selectedDay }}일</h4>
      <textarea class="diary-box" v-model="diaryContent" placeholder="오늘 하루는 무엇을 했나요?" maxlength="200"></textarea>

      <label for="imageInput" class="input-container">
        <div class="input-block" v-if="!selectedImage">
          <div>
            <font-awesome-icon icon="far fa-images" />
            <font-awesome-icon class="add-image" icon="plus" />
          </div>
        </div>
        <img class="selected-image" v-else :src="selectedImage">
      </label>
      <input
        id="imageInput"
        type="file"
        style="display: none"
        @change="handleImageUpload($event)"
      >
    </div>
    <footer class="menu-bar">
        <div class="banner">MANGO</div>
        <div class="icon" @click="goToStatistics()">
          <font-awesome-icon icon="chart-pie" />
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      diaryContent: '',
      selectedImage: null,
      selectedDay: null,
    };
  },
  methods: {
    goToCalendar() {
      this.$router.push(this.$store.state.calendar)
    },
    submit() {
      this.$router.push(this.$store.state.calendar)
    },
    getEmojiImagePath(emoji, index) {
      return `/images/${this.$store.state.prefix[this.$store.state.selectedEmojiIndex == index ? 0 : 1]}/${emoji}.jpg`
    },
    selectEmoji(emoji, index) {
      this.$store.state.selectedEmoji = `/images/${this.$store.state.prefix[0]}/${emoji}.jpg`;
      this.$store.state.selectedEmojiIndex = index;
    },
    handleImageUpload(event) {
      const file = event.target.files;
      this.selectedImage = URL.createObjectURL(file[0])
    },
    goToStatistics() {
      this.$router.push(this.$store.state.statistics)
    },
  },
  mounted() {
    this.selectedDay = this.$route.params.selectedDay;
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
  margin-top: 45px;
  margin-left: -10px;
  margin-right: 15px;
  font-size: 20px;
  color: rgb(90, 55, 22);
}
.header-button-right {
  margin-top: 45px;
  margin-left: 10px;
  margin-right: -10px;
  font-size: 20px;
  color: rgb(90, 55, 22);
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
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 200, 0);
}
.input-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.input-block {
  width: 354px;
  height: 140px;
  font-size: 30px;
  border: 2px;
  border-style: dotted;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  color: rgb(90, 55, 22);
}
.add-image {
  font-size: 15px;
  margin-bottom: 20px;
  color: rgb(90, 55, 22);
}
.icon {
  font-size: 26px;
  color: white;
  margin-left: 58px;
  margin-bottom: 2px;
  margin-right: -88px;
}
.banner {
  font-family: 'HCRDotum';
  font-size: 28px;
  margin-top: -3px;
}
</style>