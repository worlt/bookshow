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
  components: {SideBar},

  data() {
    return {
      books: Data,
      showHover: [],
    };
  },

  created() {
    this.showHover = new Array(this.books.length).fill(false); // 根据书籍数量初始化 showHover 数组
  },

  methods: {
    nameTo(book) {
      const query = {All: JSON.stringify(book)};
      this.$router.push({path: `/Book/`, query});
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
  width: 200px;
  padding: 20px;
  overflow-y: auto;
}

.classify-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.classify-item {
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}

.main-container {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.book-card {
  width: 230px;
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
    width: 100%;
  }
}
</style>
