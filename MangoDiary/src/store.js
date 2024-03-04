import { createStore } from 'vuex';
import data from './data/data.js'
import statisticsData from './data/statistic.js'
import axios from 'axios'

const ROUTES = {
    statistics: '/statistics',
    calendar: '/calendar',
    write: '/write',
}
const WEEK_NAMES = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const PREFIX = ['colored', 'grey']

const store = createStore({
    state() {
        return {
            diary : data,
            statisticsData : statisticsData,
            statistics : ROUTES.statistics,
            calendar : ROUTES.calendar,
            write : ROUTES.write,
            selectedYear: 0,
            selectedMonth: 0,
            currentYear: 0,
            currentMonth: 0,
            today: 0,
            date: 0,
            dayNames: WEEK_NAMES,
            monthNames: MONTH_NAMES,
            prefix: PREFIX,
            diaryId: 0,
            posts: [],
        }
    },
    mutations: {
        getToday(state) {
            state.date = new Date();
            state.selectedYear = state.date.getFullYear();
            state.selectedMonth = state.date.getMonth() + 1;
            state.currentYear = state.date.getFullYear();
            state.currentMonth = state.date.getMonth() + 1;
            state.today = state.date.getDate();
        },
        setSelectedYear(state, year) {
            state.selectedYear = year;
        },
        setSelectedMonth(state, month) {
            state.selectedMonth = month;
        },
        setId(state) {
            state.diaryId++
        },
        increaseSelectedYear(state) {
            state.selectedYear++
            state.selectedMonth = 1
        },
        decreaseSelectedYear(state) {
            state.selectedYear--
            state.selectedMonth = 12
        },
        setDiaryEntry(state, { id, content, image, emoji }) {
            state.diary[id].post_content = content
            state.diary[id].post_upload_image = image
            state.diary[id].post_emoji = emoji
        },
        setDiary(state, { id, day }) {
            state.diary[id] = {
                post_id: id,
                post_year: `${state.selectedYear}`,
                post_month: `${state.selectedMonth}`,
                post_date: `${day}`,
                post_emoji: "",
                post_content: "",
                post_upload_image: null
              }
        },
        setAllPost(state, posts) { 
          state.posts = posts
        },
        updateStatistic(state) {
            state.statisticsData.forEach((item) => {
                item.count = 0
            })
            state.diary.forEach(post => {
                if (post.post_month == state.selectedMonth && post.post_year == state.selectedYear) {
                    state.statisticsData.forEach(statistic => {
                        if (post.post_emoji == statistic.emoji) {
                            statistic.count++;
                        }
                    })
                }
            })
            state.statisticsData.sort((a, b) => b.count - a.count)
        }
    },
    actions: {
        async getAllPosts(context){
            try {
                const allPostUrl = `${context.state.port}/post/all`
                const requestData = {
                    post_month: String(context.state.selectedMonth),
                    post_year: String(context.state.selectedYear),
                    post_type: 'JY',
                }
                const response = await axios.post(allPostUrl, requestData)
                const beforePosts = response.data

                const getEmojiUrls = beforePosts.map((post) => {
                    const currentEmoji = post.post_emoji_id
                    let emojiUrl = ''
                    context.state.emojis.forEach((emoji) => {
                        if (emoji.emoji_id == currentEmoji) {
                        emojiUrl = `${context.state.port}${emoji.emoji_image}`
                        }
                    })
                    return {...post, 'post_emoji_url': emojiUrl}
                })
                context.commit('setAllPost', getEmojiUrls)
            } catch (error) {
                console.log('[Error] getAllPosts Failed,', error)
            }
        }
    }
})

export default store