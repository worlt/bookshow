<template>
  <div class="container">
    <aside class="aside-container">
      <ClassIfy></ClassIfy>
    </aside>
    <main class="main-container">
      <div class="card-container">
        <div v-for="(author, index) in Authors" :key="index" class="author-card" @click="AuthorTo(author)">
          <img :src="require('@/assets/AuthorsImg/' + author.authors.Image)" class="author-image">
          <div class="author-name">{{ author.authors.name }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Data from "@/JsonData/BooksData.json";
import ClassIfy from "@/components/BookClassify/BookClassify.vue";

export default {
  name: "AllAuthor",
  components: { ClassIfy },
  data() {
    return {
      Authors: Data
    };
  },
  methods: {
    AuthorTo(author) {
      const query = { All: JSON.stringify(author) };
      this.$router.push({ path: `/Author/`, query });
    }
  }
};
</script>

<style scoped>
/* 主容器 */
.container {
  display: flex;
  height: 100%;
}

.aside-container {
  width: 200px;
  padding: 20px;
}

.main-container {
  padding: 20px;
  flex: 1; /* 占据剩余空间 */
}

/* 卡片容器 */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 卡片间距 */
}

/* 作者卡片 */
.author-card {
  width: 310px; /* 每行显示四张卡片 */
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.author-card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.author-image {
  width: 100%; /* 图片宽度100% */
  height: 450px; /* 固定高度 */
  max-width: 100%; /* 最大宽度适应容器 */
  border-radius: 5px;
}

.author-name {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .aside-container {
    width: 100%; /* 小屏幕下全宽度 */
  }
}
</style>
