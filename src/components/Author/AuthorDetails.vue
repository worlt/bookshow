<template>
  <div class="container">
    <header class="header">
      <button class="return-button" @click="goBack">返回</button>
    </header>
    <main>
      <div class="author-info-container">
        <div class="author-image-container">
          <img :src="require(`@/assets/AuthorsImg/${Book.authors.Image}`)" class="author-image">
        </div>
        <div class="author-details-container">
          <h1 class="author-name">{{ Book.authors.name }}</h1>
          <div class="author-descriptions">
            <div class="description">
              <span class="label">生平：</span>{{ Book.authors.born }} {{ Book.authors.from }} {{ Book.authors.origin }}
            </div>
            <div class="description">
              <span class="label">代表作品：</span>
              <a class="book-link" @click="viewBook">{{ Book.authors.work }}</a>
            </div>
            <div class="description">
              <span class="label">简介：</span>{{ Book.authors.info }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AuthorDetails",
  data() {
    return {
      Book: {
        authors: {
          name: "",
          born: "",
          from: "",
          origin: "",
          work: "",
          Image: "",
          info: "",
          works: []
        }
      }
    };
  },
  mounted() {
    this.fetchAuthorData();
  },
  methods: {
    fetchAuthorData() {
      const encodedString = this.$route.query.All;
      const decodedString = decodeURIComponent(encodedString);
      this.Book = JSON.parse(decodedString);
    },
    goBack() {
      this.$router.go(-1);
    },
    viewBook() {
      const query = { All: JSON.stringify(this.Book) };
      this.$router.push({ path: `/Book/`, query });
    }
  }
};
</script>

<style scoped>
/* 容器样式 */
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 页头样式 */
.header {
  background-color: #f5f5f5;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 返回按钮样式 */
.return-button {
  background-color: #409EFF;
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.return-button:hover {
  background-color: #66b1ff;
}

/* 主体内容样式 */
main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* 作者信息容器样式 */
.author-info-container {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 作者图片容器样式 */
.author-image-container {
  width: 100%;
  max-width: 300px;
  margin-right: 20px; /* 默认在电脑上保持右侧间距 */
  margin-bottom: 20px;
}

.author-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 作者详细信息容器样式 */
.author-details-container {
  flex: 1;
}

.author-name {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.author-descriptions {
  font-size: 16px;
  color: #666;
}

.description {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  color: #333;
}

.book-link {
  color: #1890ff;
  cursor: pointer;
}

.book-link:hover {
  color: #66b1ff;
}

@media (max-width: 768px) {
  .author-info-container {
    flex-direction: column; /* 在小屏幕上竖直排列 */
    padding: 10px;
  }

  .author-image-container {
    margin-right: 0; /* 在小屏幕上取消右侧间距 */
    margin-bottom: 10px;
    max-width: 100%; /* 适应小屏幕宽度 */
  }

  .author-details-container {
    margin-left: 0; /* 在小屏幕上取消左侧间距 */
  }

  .author-info-container .author-details-container {
    margin-top: 20px; /* 在小屏幕上调整详情部分与图片的间距 */
  }

  .author-name {
    font-size: 20px; /* 调整作者名字体大小 */
  }

  .description {
    font-size: 14px; /* 调整描述文本字体大小 */
  }
}
</style>
