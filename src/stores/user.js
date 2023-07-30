import { defineStore } from 'pinia';
import axios from 'axios'

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		current_profile: JSON.parse(localStorage.getItem('profile')),
		userId: localStorage.getItem('userId'), // for persist data. set to null if DNE
		userName: localStorage.getItem('userName'),
	}),
	getters: {
		profile(state) {
			return state.current_profile || {
				"name": "Blank",
				"id": ''
			}
		},
		profileId() {
			return this.profile.id
		},
		profileName() {
			return this.profile.name
		},
		
		getUserId() {
			return this.userId;
		},
		getUserName() {
			return this.userName;
		}
	},
	actions: {
		setProfile(profile) {
			this.current_profile = profile
			localStorage.setItem('profile', JSON.stringify(profile))
		},
		setUserId(id) {
			this.userId = id;
			localStorage.setItem('userId', id)
		},
		setUserName(name) {
			this.userName = name;
			localStorage.setItem('userName', name)
		},
	},
});
