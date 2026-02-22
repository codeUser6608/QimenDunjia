import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '奇门遁甲',
      keepAlive: true
    }
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () => import('@/views/Knowledge.vue'),
    meta: {
      title: '知识学习'
    }
  },
  {
    path: '/knowledge/:category/:id',
    name: 'KnowledgeDetail',
    component: () => import('@/views/KnowledgeDetail.vue'),
    meta: {
      title: '知识详情'
    }
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('@/views/Chart.vue'),
    meta: {
      title: '排盘推演'
    }
  },
  {
    path: '/chart/:type',
    name: 'ChartType',
    component: () => import('@/views/ChartType.vue'),
    meta: {
      title: '排盘'
    }
  },
  {
    path: '/chart/space',
    name: 'SpaceChart',
    component: () => import('@/views/SpaceChart.vue'),
    meta: {
      title: '空间排盘'
    }
  },
  {
    path: '/chart/manual',
    name: 'ManualChart',
    component: () => import('@/views/ManualChart.vue'),
    meta: {
      title: '手动排盘'
    }
  },
  {
    path: '/prediction',
    name: 'Prediction',
    component: () => import('@/views/Prediction.vue'),
    meta: {
      title: '事件推演'
    }
  },
  {
    path: '/prediction/:type',
    name: 'PredictionType',
    component: () => import('@/views/PredictionType.vue'),
    meta: {
      title: '推演'
    }
  },
  {
    path: '/daily',
    name: 'Daily',
    component: () => import('@/views/Daily.vue'),
    meta: {
      title: '每日运势'
    }
  },
  {
    path: '/challenge',
    name: 'Challenge',
    component: () => import('@/views/Challenge.vue'),
    meta: {
      title: '挑战模式'
    }
  },
  {
    path: '/challenge/:id',
    name: 'ChallengeDetail',
    component: () => import('@/views/ChallengeDetail.vue'),
    meta: {
      title: '挑战详情'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 奇门遁甲`
  }
  
  next()
})

// 路由后置钩卫
router.afterEach(() => {
  // 滚动到页面顶部
  window.scrollTo(0, 0)
})

export default router
