import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

import Summary from '../views/Summary.vue'
import Analyze from '../views/Analyze.vue'
import Ballot from '../views/Ballot/Ballot.vue'
import Politician from '../views/Politician.vue'
import Compare from '../views/Compare.vue'
import Quiz from '../views/Profile/Quiz.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/Profile/Profile.vue'
import ProfilePage from '../views/Profile/ProfilePage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home',
      children: [
        {
          path: '/ballot',
          name: 'Ballot',
          component: Ballot
        },
        {
          path: '/compare',
          name: 'Compare',
          component: Compare
        },
        {
          path: '/info/:name',
          component: Politician
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: '/profile/:id',
          component: ProfilePage
        },
        {
          path: '/profile/quiz',
          component: Quiz
        },
        // 404 Not Found route
        {
          path: '/:catchAll(.*)',
          component: NotFound,
        },
      ]
    },
    {
      path: '/analyze',
      name: "Analyze",
      component: Analyze
    },
    {
      path: '/summary',
      name: 'Summary',
      component: Summary
    },
  ]
})

export default router
