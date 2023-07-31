import { defineStore } from 'pinia';

import { useProfilesStore } from './profiles.store'

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		current_profile: JSON.parse(localStorage.getItem('profile')),
	}),
	getters: {
		profile(state) {
			const profiles = useProfilesStore()
			return state.current_profile || profiles.custom_profile
		},
		profileId() {
			return this.profile.id
		},
		profileName() {
			return this.profile.name
		},
	},
	actions: {
		setProfile(profile) {
			this.current_profile = profile
			localStorage.setItem('profile', JSON.stringify(profile))
		},
	},
});
