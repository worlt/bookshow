<template>
  <div class="book-details">
    <header class="header">
      <button class="return-button" @click="esc">返回</button>
    </header>
    <main>
      <h1 class="title">{{ Book.books.name }}</h1>
      <div class="book-info">
        <div class="book-image-container">
          <img :src="require('@/assets/BooksImg/' + Book.books.Image)" alt="Book" class="book-image">
        </div>
        <div class="book-details-container">
          <div class="book-details-item">
            <span class="label">作者：</span>
            <a class="link-author" @click="getAuthor">{{ Book.books.author }}</a>
          </div>
          <div class="book-details-item">
            <span class="label">分类：</span>
            <span>{{ Book.books.classify }}</span>
          </div>
          <div class="book-details-item">
            <span class="label">发行年份：</span>
            <span>{{ Book.books.born }}</span>
          </div>
          <div class="book-details-item">
            <span class="label">出版社：</span>
            <span>{{ Book.books.publisher }}</span>
          </div>
          <div class="book-details-item">
            <span class="label">字数：</span>
            <span>{{ Book.books.words }}</span>
          </div>
          <div class="book-details-item">
            <span class="label">简介：</span>
            <span>{{ Book.books.info }}</span>
          </div>
          <div class="icon-container-horizontal">
            <div class="icon-large" @click="toggleLike">
              <span>{{ isLiked ? '取消点赞' : '点赞' }}</span>
            </div>
            <div class="icon-large" @click="toggleFavorite">
              <span>{{ isFavorited ? '取消收藏' : '收藏' }}</span>
            </div>
            <div class="icon-large" @click="showCommentDialog">
              <span>评论</span>
            </div>
          </div>
        </div>
      </div>
      <div class="comments-container">
        <div class="comment-card" v-for="(comment, index) in comments" :key="index">
          <div class="comment-header">评论 {{ index + 1 }}</div>
          <div class="comment-content" v-html="comment"></div>
        </div>
      </div>
      <div class="dialog-overlay" v-if="centerDialogVisible">
        <div class="dialog">
          <textarea class="comment-input" v-model="newComment" maxlength="50" placeholder="请输入评论内容"></textarea>
          <div class="dialog-buttons">
            <button class="dialog-button cancel" @click="hideCommentDialog">取消</button>
            <button class="dialog-button confirm" @click="addComment">确定</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "BookDetails",
  data() {
    return {
      Book: {
        books: {
          name: "",
          author: "",
          born: "",
          classify: "",
          words: "",
          Image: "",
          publisher: "",
          info: ""
        },
        authors: {
          name: "",
          year: "",
          from: "",
          origin: "",
          work: "",
          Image: "",
          info: ""
        },
        great: {
          like: 0,
          star: 0,
          favor: 0,
          remark: ""
        }
      },
      centerDialogVisible: false,
      newComment: "",
      comments: [],
      isLiked: false,
      isFavorited: false
    };
  },
  mounted() {
    var encodedString = this.$route.query.All;
    var decodedString = decodeURIComponent(encodedString);
    var jsonObject = JSON.parse(decodedString);
    this.Book = jsonObject;
  },
  methods: {
    esc() {
      this.$router.go(-1);
    },
    getAuthor() {
      const query = { All: JSON.stringify(this.Book) };
      this.$router.push({ path: `/Author/`, query });
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
    },
    toggleFavorite() {
      this.isFavorited = !this.isFavorited;
    },
    showCommentDialog() {
      this.centerDialogVisible = true;
    },
    hideCommentDialog() {
      this.centerDialogVisible = false;
    },
    addComment() {
      if (this.newComment.trim() !== "") {
        this.comments.push(this.newComment);
        this.newComment = "";
      }
      this.centerDialogVisible = false;
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.return-button {
  background-color: #409EFF;
  border: none;
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}

.return-button:hover {
  background-color: #66b1ff;
}

.title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin: 20px 0;
}

.book-info {
  display: flex;
  justify-content: space-between;
}

.book-image-container {
  width: 250px;
  margin-right: 20px;
}

.book-image {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.book-details-container {
  flex: 1;
}

.book-details-item {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
}

.link-author {
  font-weight: bold;
  color: #409EFF;
  cursor: pointer;
}

.icon-container-horizontal {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.icon-large {
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
  position: relative;
}

.comments-container {
  margin-top: 20px;
}

.comment-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.comment-header {
  font-weight: bold;
  margin-bottom: 5px;
}

.comment-content {
  white-space: pre-wrap;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 70%;
  max-width: 400px;
}

.comment-input {
  width: 95%;
  min-height: 100px;
  max-height: 200px;
  resize: vertical;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
}

.dialog-buttons {
  margin-top: 10px;
  text-align: right;
}

.dialog-button {
  padding: 8px 16px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.dialog-button.cancel {
  background-color: #cccccc;
  color: black;
}

.dialog-button.confirm {
  background-color: #409EFF;
  color: white;
}
</style>
