<template>
<div class="header">
		<div class="header-button is-left">
		  <h3 style="letter-spacing: 1px;">武汉市城市管理委员会综合考评系统</h3>
		</div>
		<h1 class="header-title"></h1>
		<div class="header-button is-right">
        <span>欢迎使用 ,&nbsp;</span>
        <small>{{username}}</small>
        <span style="padding:0 5px 0 8px;">
            <i class="myicon icon-logout" style="  font-size: 25px;" @click="logout"></i>
        </span>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import 'assets/myicon/iconfont.css'; // iconfont 具体图标见
export default {
  name: "Top",
  data() {
    return {
      username: this.$store.state.user.username
    };
  },
  filters: {},
  created() {
  },
  computed: mapState({
    userInfo: state => state.user.userInfo
  }),
  methods: {
    logout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.reload();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #324057;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 18px;
  height: 60px;
  line-height: 1;
  padding: 0 10px;
  text-align: center;
  white-space: nowrap;
  border-bottom: 1px solid #1f2d3d;
}

.header-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: inherit;
  font-weight: 400;
  flex: 1;
}

.header-button.is-left {
  text-align: left;
}

.header-button.is-right {
  text-align: right;
}

.header-button {
  flex: 0.5;
}
</style>

