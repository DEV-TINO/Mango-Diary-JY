<template>
  <div class="write-page">
    <header>
      <ul class="header-button-left">
        <li @click="goToCalendar">prev</li>
      </ul>
      <img src="/images/logo2.png" class="logo">
      <ul class="header-button-right">
        <li @click="submit">submit</li>
      </ul>
    </header>

    <div>
      <div>
        <h3>오늘의 기분</h3>
        <div>
          <img v-for="(emoji, index) in moodEmojis" :key="index" :src="emoji" @click="selectEmoji(index)" class="moodList">
        </div>
      </div>

      <h3>오늘의 일기</h3>
      <h4>{{ year }}년 {{ month }}월 {{ day }}일</h4>
      <textarea v-model="diaryContent" placeholder="오늘 하루는 무엇을 했나요?"></textarea>

      <label for="imageInput">
        <img class="selctedImage" v-if="!selectedImage" src="/images/photo.png">
        <img class="selctedImage" v-else :src="selectedImage">
      </label>
      <input
        id="imageInput"
        type="file"
        style="display: none"
        @change="handleImageUpload"
      >
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
      diaryContent: '',
      selectedImage: null,
      moodEmojis: [
        '/images/mood1.jpg',
        '/images/mood2.jpg',
        '/images/mood3.jpg',
        '/images/mood4.jpg',
        '/images/mood5.jpg'
      ],
      originalEmojis: [
        '/images/mood1.jpg',
        '/images/mood2.jpg',
        '/images/mood3.jpg',
        '/images/mood4.jpg',
        '/images/mood5.jpg'
      ],
    };
  },
  methods: {
    goToCalendar() {
      this.$router.push('/calendar');
    },
    submit() {
    },
    selectEmoji(i) {
      this.moodEmojis = [...this.originalEmojis];
      this.moodEmojis[i] = `/images/mood${i + 1}c.jpg`;
    },
    handleImageUpload(event) {
      const file = event.target.files;
      this.selectedImage = URL.createObjectURL(file[0])
    },
  },
};
</script>

<style scoped>
.write-page {
  text-align: center;
  height: 844px;
  width: 390px;
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
}
.header-button-right {
  float: right;
  width: 50px;
  margin-top: 40px;
  margin-left: -10px;
  margin-right: 10px;
  font-size: 20px;
}
.moodList{
  width: 58px;
  height: auto;
  margin-inline: 7px;
}
.selctedImage{
  width: 365px;
  height: 127px;
  margin-top: 10px;
}
ul {
  list-style-type: none;
}
textarea {
  margin-top: -10px;
  width: 350px;
  height: 250px;
}

header{
  display: flex;
  justify-content: space-evenly;
}

h3 {
  text-align: left;
  margin-top: 30px;
  margin-left: 13px;
  margin-bottom: 10px;
}

h4{
  margin-top: auto;
  margin-left: 17px;
  text-align: left;
}

footer {
  margin-top: 50px;
}
</style>