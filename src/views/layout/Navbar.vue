<template>

<el-menu class="navbar" mode="horizontal">

  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
  <levelbar></levelbar>
  <tabs-view></tabs-view>

</el-menu>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import Levelbar from './Levelbar';
import TabsView from './TabsView';
import Hamburger from 'components/Hamburger';
export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger
  },
  data() {
    return {
    }
  },
  computed: { ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut')
        .then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 5px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
