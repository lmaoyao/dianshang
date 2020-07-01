let routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    path:"/login",
    component:()=>import('@/components/Login')
  },
  {
    path:"/home",
    component:()=>import('@/components/home/Home'),
    children:[
      {
        path:"/list",
        component:()=>import('@/components/user/list')
      },
      {
        path:"/index",
        component:()=>import('@/components/order/index')
      },
      {
        path:"/query",
        component:()=>import('@/components/order/query')
      },
      {
        path:"/statistics",
        component:()=>import('@/components/statistics/index')

      },
      {
        path:"/commodity",
        component:()=>import('@/components/commodity/index')
      },
      {
        path:"/querylist",
        component:()=>import('@/components/commodity/list')
      }
    ]
  }
]

export default routes;