import { defineStore } from 'pinia';
import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useProfilesStore = defineStore({
    id: 'profiles',
    state: () => ({
        demo_profiles: [],
        custom_profile: JSON.parse(localStorage.getItem('custom_profile')),
    }),
    getters: {
        all_profiles: (state) => {
            let custom = state.custom_profile
            if (!custom)
                custom = {
                    name: 'Custom Profile',
                    id: '',
                    to: '/profile/quiz',
                }
            return [custom, ...state.demo_profiles]
        }
    },
    actions: {
        async getAll() {
            try {
                const response = await axios.get(baseUrl + '/demoprofiles');
                this.demo_profiles = response.data.map(
                    p => ({ ...p, to: `/info/${p.name}` })
                )
                return true;
            } catch (error) {
                this.demo_profiles = { error };
                return false;
            }


        },
    }
})