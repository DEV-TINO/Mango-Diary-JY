import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            statistics : '/statistics',
            calendar : '/calendar',
            write : '/write',
            selectedYear: 0,
            selectedMonth: 0,
            currentYear: 0,
            currentMonth: 0,
            today: 0,
            date: 0,
            dayNames: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            moodEmojis: ['angry','depressed','pleased','happy','sad'],
            prefix: ['colored', 'grey'],
            selectedEmoji: '',
            selectedEmojiIndex: '',
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
    },
    actions: {
    }
})

export default store