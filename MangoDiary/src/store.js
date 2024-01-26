import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            write : '/write',
            statistics : '/statistics',
            calendar : '/calendar',
            selectedYear: 0,
            selectedMonth: 0,
            today: 0,
            dayNames: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            moodEmojis: ['grey/angry','grey/depressed','grey/pleased','grey/happy','grey/sad'],
            originalEmojis: ['grey/angry','grey/depressed','grey/pleased','grey/happy','grey/sad'],
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