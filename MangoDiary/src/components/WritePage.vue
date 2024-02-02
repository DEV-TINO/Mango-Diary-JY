<template>
  <div class="write-page">
    <header class="button-container">
      <font-awesome-icon class="header-button-left" @click="goToCalendar" icon="chevron-left" />
      <img src="/images/logo.png" class="logo">
      <font-awesome-icon class="header-button-right" @click="submit" icon="check" />
    </header>
    <div>
      <div>
        <h3 class="emotion">Emotion</h3>
        <div>
          <img v-for="(emoji, index) in $store.state.moodEmojis" :key="index" :src="getEmojiImagePath(emoji)" @click="selectEmoji(emoji)" class="mood-list">
        </div>
      </div>
      <h3 class="note">Note</h3>
      <h4 class="date">{{ $store.state.selectedYear }} / {{ $store.state.selectedMonth }} / {{ selectedDay }}</h4>
      <textarea class="diary-box" v-model="diaryContent" placeholder="오늘 하루는 어땠나요?" maxlength="200"></textarea>
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
import data from '../data/data.js'
export default {
  data() {
    return {
      diaryContent: '',
      selectedImage: null,
      selectedDay: null,
      diary: data,
    };
  },
  methods: {
    goToCalendar() {
      this.$router.push(this.$store.state.calendar)
    },
    submit() {
      this.$router.push(this.$store.state.calendar)
    },
    getEmojiImagePath(emoji) {
      return `/images/${this.$store.state.prefix[this.$store.state.selectedEmoji == emoji ? 0 : 1]}/${emoji}.jpg`
    },
    selectEmoji(emoji) {
      this.$store.state.selectedEmojiPath = `/images/${this.$store.state.prefix[0]}/${emoji}.jpg`
      this.$store.state.selectedEmoji = emoji
    },
    handleImageUpload(event) {
      const file = event.target.files;
      this.selectedImage = URL.createObjectURL(file[0])
    },
    goToStatistics() {
      this.$router.push(this.$store.state.statistics)
    },
    getDiaryId() {
      const { diaryId } = history.state
      return diaryId == null ? -1 : diaryId
    }
  },
  mounted() {
    this.selectedDay = this.$route.params.selectedDay
    if ( this.getDiaryId() > -1 ) {
        this.diaryContent = this.diary[this.getDiaryId()].post_content
        this.selectedImage = this.diary[this.getDiaryId()].post_upload_image
        this.$store.state.selectedEmoji = this.diary[this.getDiaryId()].post_emoji
    }
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'HCRDotum';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/HCRDotum.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
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
  border-radius: 5px;
}
.diary-box {
  margin-top: -10px;
  width: 350px;
  height: 250px;
  resize: none;
  font-size: 20px;
  font-family: 'HCRDotum';
}
.button-container {
  display: flex;
  justify-content: space-evenly;
}
.emotion {
  height: 30px;
  width: 100px;
  margin-top: 30px;
  margin-left: 13px;
  margin-bottom: 15px;
  font-family: 'HCRDotum';
  background-color: rgb(250, 166, 0);
  border-radius: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.note {
  height: 30px;
  width: 65px;
  margin-top: 20px;
  margin-left: 13px;
  margin-bottom: 10px;
  font-family: 'HCRDotum';
  background-color: rgb(250, 166, 0);
  border-radius: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.date {
  margin-top: -3px;
  margin-left: 18px;
  margin-bottom: 20px;
  text-align: left;
  color: rgb(90, 55, 22);
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