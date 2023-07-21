import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Summary from '../views/Summary.vue'
import Analyze from '../views/Analyze.vue'
import Ballot from '../views/Ballot.vue'
import Person from '../views/Person.vue'
import Compare from '../views/Compare.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home',
      children: [
        {
          path: '/contenders',
          name: 'Ballot',
          component: Ballot
        },
      ]
    },
    {
      path: '/contenders/:name',
      name: 'Contender',
      component: Person
    },
    {
      path: '/compare',
      name: 'Compare',
      component: Compare
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
    {
      path: '/*',
      redirect: '/'
    }
  ]
})

export default router
