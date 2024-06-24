<template>
  <div class="form-container">
    <div class="login-form">
      <h1>书籍展评线上平台</h1>
      <form ref="ruleForm" class="demo-ruleForm" @submit.prevent="submitForm">
        <div class="form-item">
          <label for="name">姓名：</label>
          <input id="name" v-model="name" autocomplete="off" type="text">
        </div>
        <div class="form-item">
          <label for="pass">密码：</label>
          <input id="pass" v-model="pwd" autocomplete="off" type="password">
        </div>
        <div class="form-item">
          <button type="submit">登录</button>
          <button type="button" @click="resetForm">重置</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 导入 axios

export default {
  data() {
    return {
      name: '',
      pwd: ''
    };
  },
  methods: {
    submitForm() {
      if (this.name.trim() === '' || this.pwd.trim() === '') {
        alert("请填写完整您的信息");
      } else {
        axios.get('/user.json')
          .then(res => {
            const users = res.data['users'];
            const user = users.find(user => user.name === this.name && user.pwd === this.pwd);
            if (user) {
              this.$store.commit('setUsername', this.name);
              this.$router.push('/Home');
            } else {
              alert("用户名或密码错误");
            }
          })
          .catch(error => {
            console.log(error)
            alert('登录失败');
          });
      }
    },
    resetForm() {
      this.name = '';
      this.pwd = '';
    }
  }
};
</script>

<style scoped>
.form-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-image: url('../../assets/background.png');
  background-size: cover;
  background-position: center;
  /* filter: blur(5px); */ /* 添加背景虚化效果 */
}

.login-form {
  position: relative;
  z-index: 1; /* 保证表单在虚化背景之上 */
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 360px; /* 缩小表单宽度 */
  max-width: 100%; /* 确保在小屏幕上自适应 */
}

.form-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center; /* 居中按钮 */
}

label {
  width: 60px; /* 缩小label宽度 */
  text-align: right;
  margin-right: 10px;
  font-size: 14px; /* 减小字体大小 */
}

input[type="text"],
input[type="password"] {
  flex: 1;
  padding: 10px;
  font-size: 14px; /* 减小字体大小 */
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  margin: 0 5px; /* 调整按钮之间的间距 */
  cursor: pointer;
  border: none;
  background-color: #409EFF;
  color: #fff;
  border-radius: 4px;
  /* transition: background-color 0.3s ease; */
}

button:hover {
  background-color: #66b1ff;
  /* padding-right: 10px; */
}
</style>
