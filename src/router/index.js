import { createRouter, createWebHistory } from 'vue-router'
import Summary from '../views/Summary.vue'
import Analyze from '../views/Analyze.vue'
import Contenders from '../views/Contenders.vue'
import Person from '../views/Person.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/contenders',
      name: 'Contenders',
      component: Contenders
    },
    {
      path: '/contenders/:name',
      name: 'Contender',
      component: Person
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
    }
  ]
})

export default router
