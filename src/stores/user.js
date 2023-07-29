import { defineStore } from 'pinia';
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
      profile: JSON.parse(localStorage.getItem('profile')),
      userId: localStorage.getItem('userId'), // for persist data. set to null if DNE
      userName: localStorage.getItem('userName'),
    }),
    getters: {
      current_profile(state) {
        return state.profile || {
          "name": "Blank",
          "id": ''
        }
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
        this.profile = profile
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
  