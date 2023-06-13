import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
import ViewLogin from '../views/ViewLogin.vue'
import ViewRecords from '../views/ViewRecords.vue'
import ViewNewOperation from '../views/ViewNewOperation.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: ViewLogin
  },
  {
    path: '/',
    name: 'records',
    component: ViewRecords
  },
  {
    path: '/new-operation',
    name: 'new-operation',
    component: ViewNewOperation
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, _) => {
  const storeAuth = useStoreAuth()
  if (!storeAuth.user.username && to.name !== 'login')
    return { name: 'login' }

  if (storeAuth.user.username && to.name === 'login')
    return { name: 'records' }
})

export default router