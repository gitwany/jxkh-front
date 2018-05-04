<template>
  <div style="height:100%;overflow:hidden;min-height: 100%;">
  <top></top>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="left">
      <sidebar class="sidebar-container"></sidebar>
    </div>
    <div class="right" >
      <navbar></navbar>
      <app-main class="main-container"></app-main>
    </div>
	</div>
  </div>

</template>

<script>
  import { Top, Navbar, Sidebar, AppMain } from 'views/layout';

  export default {
    name: 'layout',
    components: {
      Top,
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: calc(100% - 60px);
    width: 100%;
  //  min-height: auto;
    background: #fff;
    display: flex;
    &.hideSidebar {
      .sidebar-container{
        width:36px;
        overflow: inherit;
      }
      .main-container {
      }
    }
    .left {
      position: relative;
      height:100%;
    }
    .right {
      position: relative;
      flex: 1;
      overflow:hidden;
      height:100%;
    }

    .sidebar-container {
      transition: width 0.28s ease-out;
      width: 190px;
      height: 100%;
      z-index: 1001;
      overflow-y: auto;
      &::-webkit-scrollbar {display:none}
    }
    .main-container {
      height: calc(100% - 60px) ;
      overflow:auto;
      transition: margin-left 0.28s ease-out;
      overflow-y: scroll;
    }

  }



</style>
