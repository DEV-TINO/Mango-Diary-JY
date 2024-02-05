import { createStore } from 'vuex';

const STATISTICS_ROUTE = '/statistics'
const CALENDAR_ROUTE = '/calendar'
const WRITE_ROUTE = '/write'
const WEEK_NAMES = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const EMOJIS = ['angry','depressed','pleased','happy','sad']
const PREFIX = ['colored', 'grey']

const store = createStore({
    state() {
        return {
            statistics : STATISTICS_ROUTE,
            calendar : CALENDAR_ROUTE,
            write : WRITE_ROUTE,
            selectedYear: 0,
            selectedMonth: 0,
            currentYear: 0,
            currentMonth: 0,
            today: 0,
            date: 0,
            dayNames: WEEK_NAMES,
            monthNames: MONTH_NAMES,
            moodEmojis: EMOJIS,
            prefix: PREFIX,
            diaryId: 3,
            statisticsData: [
                {
                    month: '화나는 달',
                    name: '화남',
                    emoji: 'angry',
                    count: 18,
                    comment: "어려움과 화남을 뒤로하고, 새로운 달을 긍정적으로 맞이해봐요"
                },
                {
                    month: '우울한 달',
                    name: '우울',
                    emoji: 'depressed',
                    count: 12,
                    comment: "어려움과 우울함을 뒤로하고, 새로운 달을 긍정적으로 맞이해봐요"
                },
                {
                    month: '기쁜 달',
                    name: '기쁨',
                    emoji: 'pleased',
                    count: 0,
                    comment: "좋았던 이번 달처럼, 새로운 달을 긍정적으로 맞이해봐요"
                },
                {
                    month: '행복한 달',
                    name: '행복',
                    emoji: 'happy',
                    count: 0,
                    comment: "행복했던 이번 달처럼, 새로운 달을 긍정적으로 맞이해봐요"
                },
                {
                    month: '슬픈 달',
                    name: '슬픔',
                    emoji: 'sad',
                    count: 0,
                    comment: "어려움과 슬픔을 뒤로하고, 새로운 달을 긍정적으로 맞이해봐요"
                },
            ]
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
        },
        decreaseSelectedYear(state) {
            state.selectedYear--
        },
    },
    actions: {
    }
})

export default store