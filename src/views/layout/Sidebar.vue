<template>
    <el-menu mode="vertical"
             background-color="#324057"
             text-color="#fff"
             active-text-color="#ffd04b"
             :unique-opened="false" :default-active="$route.path" :collapse="isCollapse"  :default-openeds="openeds">
      <sidebar-item :routes='permissionMenus'></sidebar-item>
    </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    data () {
      return {
        openeds: ['taskManager','wtManager','pfManager','baseManager']
      }
    }
  }
</script>
