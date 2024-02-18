import { createStore } from 'vuex';
import data from './data/data.js'
import statisticsData from './data/statistic.js'

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
        updateStatistic(state) {
            for (let i = 0; i < state.statisticsData.length; i++) {
                state.statisticsData[i].count = 0;
            }
            for (let i = 0; i < state.diary.length; i++) {
                if (state.diary[i] && state.diary[i].post_month == state.selectedMonth && state.diary[i].post_year == state.selectedYear) {
                    for (let j = 0; j < state.statisticsData.length; j++) {
                        if (state.diary[i].post_emoji == state.statisticsData[j].emoji) {
                            state.statisticsData[j].count++
                        }
                    }
                }
            }
            state.statisticsData.sort((a, b) => b.count - a.count)
        }
    },
    actions: {
    }
})

export default store