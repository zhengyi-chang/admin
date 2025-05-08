export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: 'workplace',
      },
      {
        name: 'default',
        icon: 'desktop',
        path: '/dashboard/default',
        component: './Dashboard/Default',
      },
      {
        path: '/dashboard/workplace',
        component: './Dashboard/Workplace',
      },
      {
        path: '/dashboard/analysis',
        component: './Dashboard/Analysis',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    routes: [
      {
        path: '/admin',
        redirect: 'menu-manage',
      },
      {
        path: '/admin/user-manage',
        component: './Admin/SysUser',
      },
      {
        path: '/admin/post-manage',
        component: './Admin/SysPost',
      },
      {
        path: '/admin/dept-manage',
        component: './Admin/SysDept',
      },
      {
        path: '/admin/role-manage',
        component: './Admin/SysRole',
      },
      {
        path: '/admin/menu-manage',
        component: './Admin/SysMenu',
      },
      {
        path: '/admin/api-manage',
        component: './Admin/SysApi',
      },
      {
        path: '/admin/config-settings',
        component: './Admin/SysConfig/Settings',
      },
      {
        path: '/admin/dict-manage',
        component: './Admin/SysDictType',
      },
      {
        path: '/admin/log-manage',
        routes: [
          {
            path: '/admin/log-manage',
            redirect: 'requestlog',
          },
          {
            path: '/admin/log-manage/requestlog',
            component: './Admin/Log/SysRequestLog',
          },
          {
            path: '/admin/log-manage/operatelog',
            component: './Admin/Log/SysOperateLog',
          },
          {
            path: '/admin/log-manage/abnormallog',
            component: './Admin/Log/SysAbnormalLog',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/demo',
    routes: [
      {
        path: '/demo',
        redirect: 'upload',
      },
      {
        path: '/demo/upload',
        component: './Oxs/home',
      },
    ],
  },
  {
    path: '/jobs',
    routes: [
      {
        path: '/jobs',
        redirect: 'jobs-manage',
      },
      {
        path: '/jobs/jobs-manage',
        component: './Jobs/SysJobs/list',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/todo/mylist',
    component: './Todo/SysTodo/MyList',
  },
  {
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: 'center',
      },
      {
        path: '/account/center',
        component: './Account/Center',
      },
      {
        path: '/account/settings',
        component: './Account/Settings',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/404',
    hideInMenu: true,
    component: './404',
  },
  {
    component: './404',
  },
];
