<template>
  <div class="container">
    <aside class="aside-container">
      <SideBar></SideBar>
    </aside>
    <main class="main-container">
      <div class="card-container">
        <div v-for="(book, index) in filteredBooks" :key="index" class="book-card" @click="NameTo(book)" @mouseout="showHoverFalse(index)" @mouseover="showHoverTrue(index)">
          <img :src="require('@/assets/BooksImg/' + book.books.Image)" class="book-image"/>
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
    </main>
  </div>
</template>

<script>
import Data from '@/JsonData/BooksData.json';
import SideBar from "@/components/Home/Sidebar.vue";

export default {
  name: "NaturalScience",
  components: {SideBar},
  data() {
    return {
      Books: Data,
      category: '自然科学', // 筛选的类别
      showHover: []
    };
  },
  computed: {
    filteredBooks() {
      // 根据分类筛选图书
      return this.Books.filter(book => book.books.classify === this.category);
    }
  },
  created() {
    this.showHover = new Array(this.Books.length).fill(false);
  },
  methods: {
    NameTo(book) {
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
/* 主容器 */
.container {
  height: 100%;
  display: flex;
}

/* 侧栏容器 */
.aside-container {
  width: 200px;
  padding: 20px;
  overflow-y: auto; /* 添加垂直滚动条 */
}

/* 主内容容器 */
.main-container {
  padding: 20px;
  flex: 1; /* 占据剩余空间 */
  overflow-y: auto; /* 添加垂直滚动条 */
}

/* 卡片容器 */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 卡片之间的间距 */
}

/* 图书卡片 */
.book-card {
  width: 230px; /* 调整宽度 */
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  position: relative; /* 添加相对定位，以便绝对定位的弹窗可以相对于此定位 */
}

.book-card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

/* 图书图片 */
.book-image {
  width: 100%; /* 图片宽度100% */
  height: 300px; /* 调整高度 */
  max-width: 100%; /* 最大宽度以适应容器 */
  border-radius: 5px;
}

/* 图书名称 */
.book-name {
  margin-top: 10px;
  font-size: 14px; /* 调整字体大小 */
  font-weight: bold;
  text-align: center;
  color: #333;
}

.hover-container {
  position: relative;
}

.hover-window {
  position: absolute;
  bottom: 100%; /* 将弹窗相对于书籍图片顶部显示 */
  left: 0;
  z-index: 999;
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 5px;
  font-size: 12px;
  visibility: hidden; /* 初始状态隐藏 */
  opacity: 0; /* 初始状态透明 */
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 添加过渡效果 */
}

.show-hover {
  visibility: visible; /* 显示时可见 */
  opacity: 1; /* 显示时完全不透明 */
}

/* 响应式调整 */
@media (max-width: 768px) {
  .aside-container {
    width: 100%; /* 小屏幕上全宽 */
  }
}
</style>
