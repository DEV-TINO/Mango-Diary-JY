<template>
  <div class="write-page">
    <header class="button-container">
      <div class="header-button-left" @click="handleClickMoveCalendar()">PREV</div>
      <img src="/images/logo.png" class="logo">
      <div class="header-button-right" @click="submit()">NEXT</div>
    </header>
    <div>
      <div>
        <h3 class="emotion">Emotion</h3>
        <div class="emoji-box">
          <div v-for="(emoji, index) in this.$store.state.statisticsData" :key="index">
            <img :src="getEmojiImagePath(emoji.emoji_id)" @click="selectEmoji(emoji.emoji_id)" class="mood-list">
            <div class="emoji-name">{{ emoji.name }}</div>
          </div>
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
        <div class="image-block" v-else>
          <img class="selected-image" :src="selectedImage">
        </div>
      </label>
      <input
        id="imageInput"
        type="file"
        style="display: none"
        @change="handleImageUpload($event)"
      >
    </div>
    <footer class="menu-bar">
      <div class="icon" @click="handleClickMoveStatistics()">
        <font-awesome-icon icon="chart-pie" />
      </div>
      <div class="banner">MANGO</div>
      <div class="save-button" @click="submit()">SAVE</div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      diaryContent: '',
      selectedImage: null,
      selectedFile: null,
      selectedDay: null,
      diaryId: 0,
      selectedEmoji: null,
      selectedEmojiId: '',
      data: [],
    };
  },
  methods: {
    async createPost() {
      const formData = {
        post_type: 'JY',
        post_year: String(this.$store.state.selectedYear),
        post_month: String(this.$store.state.selectedMonth),
        post_date: String(this.selectedDay),
        post_emoji_id: this.selectedEmojiId,
        post_content: this.diaryContent,
        post_upload_image: this.selectedFile
      }
      const newForm = new FormData()
      for (const key in formData){
        newForm.append(key, formData[key])
      }
      const response = await axios.post(`${this.$store.state.port}/post/create`, newForm)
      this.diaryId = response.data.post_id
    },
    async getPost(id) {
      const response = await axios.get(`${this.$store.state.port}/post/search/${id}`)
      this.data = response.data
      this.diaryContent = this.data.post_content
      this.selectedImage = `${this.$store.state.port}${this.data.post_upload_image}`
      this.selectedEmojiId = this.data.post_emoji_id
      for (let i = 0; i < this.$store.state.emojis.length; i++) {
        if (this.$store.state.emojis[i].emoji_id == this.selectedEmojiId) this.selectedEmoji = this.$store.state.emojis[i].emoji_name
      }
    },
    handleClickMoveCalendar() {
      this.$router.push(this.$store.state.calendar)
    },
    submit() {
      if(this.selectedEmoji == null) {
        alert("반드시 감정을 선택해야 합니다")
        return
      }
      this.createPost()
      this.$router.push(this.$store.state.calendar)
    },
    getEmojiName(emojiId) {
      let emojiName = ''
      this.$store.state.emojis.forEach(emoji => {
        if(emoji.emoji_id == emojiId) {
          emojiName = emoji.emoji_name
        }
      })
      return emojiName
    },
    getEmojiImagePath(emojiId) {
      const emojiName = this.getEmojiName(emojiId)
      return `${this.$store.state.port}/static/images/JY/${this.$store.state.prefix[this.selectedEmoji == emojiName ? 0 : 1]}/${emojiName}.jpg`
    },
    selectEmoji(emojiId) {
      const emojiName = this.getEmojiName(emojiId)
      this.selectedEmoji = emojiName
      for (let i = 0; i < this.$store.state.emojis.length; i++) {
        if (this.$store.state.emojis[i].emoji_color_type == 'color' && this.$store.state.emojis[i].emoji_name == emojiName) this.selectedEmojiId = this.$store.state.emojis[i].emoji_id
      }
    },
    handleImageUpload(event) {
      const file = event.target.files
      this.selectedFile = file[0]
      this.selectedImage = URL.createObjectURL(file[0])
    },
    handleClickMoveStatistics() {
      this.$router.push(this.$store.state.statistics)
    },
    getDiaryId() {
      const { diaryId } = history.state
      this.diaryId = diaryId
      // https://velog.io/@yiwonjin/vue-router3-state객체로-페이지-사이-데이터-전달
    },
    checkDate() {
      if (this.$store.state.selectedYear == 0 || this.$store.state.selectedMonth == 0) {
        alert("날짜 오류로 인해 캘린더 페이지로 이동합니다")
        this.$router.push(this.$store.state.calendar)
      }
    }
  },
  mounted() {
    this.checkDate()
    this.getDiaryId()
    this.selectedDay = this.$route.params.selectedDay
    if (this.diaryId != -1) this.getPost(this.diaryId)
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
  margin: -8px;
  position: relative;
}
.logo {
  margin-top: 16px;
  width: 100px;
  height: auto;
}
.header-button-left {
  font-family: 'HCRDotum';
  margin-top: 45px;
  margin-left: -10px;
  margin-right: 10px;
  font-size: 18px;
  color: rgb(90, 55, 22);
}
.header-button-right {
  font-family: 'HCRDotum';
  margin-top: 45px;
  margin-left: 10px;
  margin-right: -10px;
  font-size: 18px;
  color: rgb(90, 55, 22);
}
.emoji-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.mood-list {
  width: 58px;
  height: auto;
  margin-inline: 7px;
  cursor: pointer;
}
.emoji-name {
  font-size: 15px;
  font-family: 'HCRDotum';
  color: rgb(90, 55, 22);
}
.image-block {
  width: 354px;
  height: 140px;
  border-radius: 5px;
  border: 2px solid rgb(90, 55, 22);
}
.selected-image {
  width: auto;
  height: 140px;
  cursor: pointer;
}
.diary-box {
  margin-top: -10px;
  width: 350px;
  height: 250px;
  resize: none;
  font-size: 20px;
  font-family: 'HCRDotum';
  border: 2px solid rgb(90, 55, 22);
  border-radius: 5px;
  outline-color: rgb(255, 200, 0);
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
  cursor: pointer;
}
.add-image {
  font-size: 15px;
  margin-bottom: 20px;
  color: rgb(90, 55, 22);
}
.icon {
  font-size: 26px;
  color: white;
  margin-bottom: 2px;
  margin-right: 60px;
  cursor: pointer;
}
.banner {
  font-family: 'HCRDotum';
  font-size: 28px;
  margin-top: -3px;
  cursor: default;
}
.save-button {
  font-family: 'HCRDotum';
  cursor: default;
  color: white;
  margin-right: -8px;
  margin-left: 58px;
}
</style>