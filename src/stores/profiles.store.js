import { defineStore } from 'pinia';
import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useProfilesStore = defineStore({
    id: 'profiles',
    state: () => ({
        demo_profiles: [],
        custom_profile: JSON.parse(localStorage.getItem('custom_profile')) ||
            {
                name: "Custom Profile",
                id: "",
                to: "/profile/quiz"
            },
    }),
    getters: {
        all_profiles: (state) => {
            let custom = state.custom_profile
            return [custom, ...state.demo_profiles]
        }
    },
    actions: {
        async getAll() {
            try {
                const params = {
                    type: "demographic"
                }
                const url = baseUrl + '/profiles'

                const response = await axios.get(url, { params: params });
                const res = response.data
                this.demo_profiles = res.data.map(
                    p => ({ ...p, to: `/info/${p.name}` })
                )
                return true;
            } catch (error) {
                this.demo_profiles = { error };
                return false;
            }
        },
        setCustomProfile(profile) {
            this.custom_profile = profile
            // extra stuff to save
            this.custom_profile["to"] = "/profile/quiz"
            localStorage.setItem('custom_profile', JSON.stringify(this.custom_profile))
            return this.custom_profile
        }
    }
})