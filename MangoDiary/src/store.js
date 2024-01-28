import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            statistics : '/statistics',
            calendar : '/calendar',
            selectedYear: 0,
            selectedMonth: 0,
            currentYear: 0,
            currentMonth: 0,
            today: 0,
            dayNames: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            moodEmojis: ['angry','depressed','pleased','happy','sad'],
            prefix: ['colored', 'grey'],
            selectedEmoji: '',
            selectedEmojiIndex: '',
        }
    },
    mutations: {
        getToday(state) {
            state.selectedYear = new Date().getFullYear();
            state.selectedMonth = new Date().getMonth() + 1;
            state.currentYear = new Date().getFullYear();
            state.currentMonth = new Date().getMonth() + 1;
            state.today = new Date().getDate();
        },
    },
    actions: {
    }
})

export default store