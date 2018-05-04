import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/authredirect',
  component: _import('login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: _import('error/404'),
  hidden: true
},
{
  path: '/401',
  component: _import('error/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: '首页',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: _import('dashboard/index')
  }]
},
{
  path: '/introduction',
  component: Layout,
  redirect: '/introduction/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: 'index',
    component: _import('introduction/index'),
    name: '简述'
  }]
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
  path: '/baseManager',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'baseManager',
  children: [{
    path: 'userManager',
    icon: 'fa-user',
    component: _import('admin/user/index'),
    name: '用户管理',
    authority: 'userManager'
  }, {
    path: 'menuManager',
    icon: 'category',
    component: _import('admin/menu/index'),
    name: '菜单管理',
    authority: 'menuManager'
  }, {
    path: 'groupManager',
    icon: 'group_fill',
    component: _import('admin/group/index'),
    name: '角色权限管理',
    authority: 'groupManager'
  }, {
    path: 'groupTypeManager',
    icon: 'fa-users',
    component: _import('admin/groupType/index'),
    name: '角色类型管理',
    authority: 'groupTypeManager'
  }, {
    path: 'gateLogManager',
    icon: 'viewlist',
    component: _import('admin/gateLog/index'),
    name: '操作日志管理',
    authority: 'gateLogManager'
  }, {
    path: 'issueManager',
    icon: 'viewlist',
    component: _import('admin/issue/index'),
    name: '问题管理',
    authority: 'issueManager'
  }]
},
  {
    path: '/taskManager',
    component: Layout,
    name: '任务管理',
    icon: 'setting',
    authority: 'taskManager',
    children: [{
      path: 'taskUndo',
      icon: 'category',
      component: _import('admin/user/index'),
      name: '待办任务',
      authority: 'taskUndo'
    }, {
      path: 'taskDone',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '已办任务',
      authority: 'taskDone'
    }
    ]
  },
  {
    path: '/wtManager',
    component: Layout,
    name: '问题管理',
    icon: 'setting',
    authority: 'wtManager',
    children: [{
      path: 'wtAdd',
      icon: 'category',
      component: _import('admin/user/index'),
      name: '问题采集',
      authority: 'wtAdd'
    }, {
      path: 'wtQuery',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '问题查询',
      authority: 'wtQuery'
    }
    ]
  },
  {
    path: '/pfManager',
    component: Layout,
    name: '评分管理',
    icon: 'setting',
    authority: 'pfManager',
    children: [{
      path: 'pflrManager',
      icon: 'category',
      component: _import('admin/user/index'),
      name: '问题采集',
      authority: 'pflrManager'
    }
    ]
  },
  {
    path: '/statisManager',
    component: Layout,
    name: '统计分析',
    icon: 'setting',
    authority: 'statisManager',
    children: [{
      path: 'gztjManager',
      icon: 'category',
      component: _import('admin/user/index'),
      name: '工作统计',
      authority: 'gztjManager'
    }, {
      path: 'zztb',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '工作情况通报',
      authority: 'zztb'
    }, {
      path: 'pfhz',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '评分汇总',
      authority: 'pfhz'
    }
    ]
  },

  {
    path: '/dictManager',
    component: Layout,
    name: '字典管理',
    icon: 'setting',
    authority: 'dictManager',
    children: [{
      path: 'tlManager',
      icon: 'category',
      component: _import('admin/user/index'),
      name: '铁路点位',
      authority: 'tlManager'
    }, {
      path: 'czcManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '城中村',
      authority: 'czcManager'
    }, {
      path: 'tlManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '铁路',
      authority: 'tlManager'
    }, {
      path: 'glManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '公路',
      authority: 'glManager'
    }, {
      path: 'jddlManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '街道道路',
      authority: 'jddlManager'
    }, {
      path: 'hbmqManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '湖泊明渠',
      authority: 'hbmqManager'
    }, {
      path: 'xzqhManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '行政区划',
      authority: 'xzqhManager'
    }, {
      path: 'zcgdManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '主次干道',
      authority: 'zcgdManager'
    }, {
      path: 'sysParaManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '系统参数',
      authority: 'sysParaManager'
    }, {
      path: 'deptManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '部门管理',
      authority: 'deptManager'
    }

    ]
  },















  /* ,
  {
    path: '/authManager',
    component: Layout,
    name: '基础配置管理',
    icon: 'setting',
    authority: 'authManager',
    children: [{
      path: 'serviceManager',
      component: _import('auth/service/index'),
      name: '用户管理',
      authority: 'serviceManager'
    }]
  },
  {
    path: '/monitorManager',
    component: Layout,
    name: '监控模块管理',
    icon: 'setting',
    authority: 'monitorManager',
    children: [{
      path: 'serviceEurekaManager',
      component: _import('monitor/eureka/index'),
      name: 'Eureka注册中心',
      authority: 'serviceEurekaManager'
    }, {
      path: 'serviceMonitorManager',
      component: _import('monitor/service/index'),
      name: '服务状态监控',
      authority: 'serviceMonitorManager'
    }, {
      path: 'serviceZipkinManager',
      component: _import('monitor/zipkin/index'),
      name: '服务状态监控',
      authority: 'serviceZipkinManager'
    }]
  }*/];
