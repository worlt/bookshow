<template>
  <div class="container">
    <aside class="aside-container">
      <SideBar></SideBar>
    </aside>
    <div class="main-container">
      <div class="card-container">
        <div v-for="(book, index) in books" :key="index" class="book-card" @click="nameTo(book)" @mouseout="showHoverFalse(index)" @mouseover="showHoverTrue(index)">
          <img :src="require('@/assets/BooksImg/' + book.books.Image)" class="book-image">
          <div class="book-name">{{ book.books.name }}</div>
          <div class="hover-container">
            <div :class="{ 'show-hover': showHover[index] }" class="hover-window">
              <div>年份：{{ book.books.born }}</div>
              <div>分类：{{ book.books.classify }}</div>
              <div>字数：{{ book.books.words }}</div>
              <div>出版社：{{ book.books.publisher }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Data from '@/JsonData/BooksData.json';
import SideBar from "@/components/Home/Sidebar.vue";

export default {
  name: 'IndeX',
  components: { SideBar },

  data() {
    return {
      books: Data,
      showHover: [],
    };
  },

  created() {
    this.showHover = new Array(this.books.length).fill(false); // Initialize showHover array based on the number of books
  },

  methods: {
    nameTo(book) {
      const query = { All: JSON.stringify(book) };
      this.$router.push({ path: `/Book/`, query });
    },

    showHoverTrue(index) {
      this.$set(this.showHover, index, true);
    },

    showHoverFalse(index) {
      this.$set(this.showHover, index, false);
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
}

.aside-container {
  width: 200px; /* 默认侧边栏宽度 */
  padding: 20px;
  overflow-y: auto;
}

.main-container {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 卡片之间的间距 */
}

.book-card {
  width: 230px; /* 卡片宽度 */
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  position: relative;
}

.book-card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.book-image {
  width: 100%;
  height: 300px;
  max-width: 100%;
  border-radius: 5px;
}

.book-name {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.hover-container {
  position: relative;
}

.hover-window {
  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 999;
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 5px;
  font-size: 12px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.show-hover {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 768px) {
  .aside-container {
    width: 45px; /* 在小屏幕上占据整个宽度 */
    padding: 10px; /* 减少内边距 */
  }

  .card-container {
    gap: 10px; /* 调整卡片之间的间距 */
  }

  .book-card {
    width: 100%; /* 卡片宽度铺满容器 */
    max-width: calc(40% - 10px);
  }

  .book-image {
    height: 200px; /* 缩小图片高度 */
  }

  .book-name {
    font-size: 12px; /* 调整书名字体大小 */
  }
}
</style>
