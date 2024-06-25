<template>
  <aside class="fixed">
    <div class="user-info">
      <img src="../../assets/man.png" class="avatar">
      <span class="username">{{ username }}</span>
    </div>
    <nav class="menu">
      <ul>
        <li><router-link :to="{ name: 'Home' }"><b>首页</b></router-link></li>
        <li>
          <a href="#" @click.prevent="toggleSubmenu()"><b>分类</b></a>
          <ul v-if="isSubmenuOpen">
            <li><router-link :to="{ name: 'ComputerScience' }">计算机科学</router-link></li>
            <li><router-link :to="{ name: 'ChemistrY' }">化学</router-link></li>
            <li><router-link :to="{ name: 'LiteraTure' }">文学</router-link></li>
            <li><router-link :to="{ name: 'NaturalScience' }">自然科学</router-link></li>
          </ul>
        </li>
        <li><router-link :to="{ name: 'AllAuthor' }"><b>作者</b></router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "SideBar",
  data() {
    return {
      isSubmenuOpen: true ,
    };
  },
  computed: {
    ...mapState(
      {
        username: (state) => state.username,}
    )
  },
  methods: {
    toggleSubmenu() {
      this.isSubmenuOpen = !this.isSubmenuOpen;
    },
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 200px;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
}

.menu {
  padding: 0;
  margin: 0;
}

.menu ul {
  list-style-type: none;
  padding: 0;
}

.menu li {
  padding: 10px 20px;
}

.menu li a {
  text-decoration: none;
  color: #333;
  display: block;
}

.menu li a:hover {
  background-color: #ddd;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-size: 16px;
  font-weight: bold;
}
</style>
