<template>
    <div class="article">
      <router-link to="/home" class="back-button">← Back</router-link>
      <div class="article-content">
         <img :src="newsItem.Image" alt="Article Image" class="article-image">
         <h1 class="article-title">{{ newsItem.Title }}</h1>
         <p class="article-description">{{ newsItem.Summary }}</p>
         <div class="article-details">
          <p class="article-publish-date">Published on: {{ formatDate(newsItem.PublishDate) }}</p>
          <a :href="newsItem.Url" target="_blank" class="read-more-button">Read More</a>
          <i 
            :class="isLiked ? 'fas fa-heart' : 'far fa-heart'"
            @click="toggleHeart">
          </i>
        </div>
      </div>
    </div>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
  export default {
    computed: {
      newsItem() {
        const id = parseInt(this.$route.params.Id);
        return this.$store.getters.getArticleById(id);
      }
    },
    created() {
      // Fetch the specific news item data on component creation
      const id = parseInt(this.$route.params.Id);
      this.$store.dispatch('fetchNewsById', id);
    },
    methods: {
      formatDate(dateString) {
        const dateTime = new Date(dateString);
        return dateTime.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false 
        });
      },
      toggleHeart() {
        this.isLiked = !this.isLiked;
      }
    }
  };
</script>
  
<style>
.article {
  padding: 1rem;
  max-width: 768px;
  margin: 0 auto;
}
.back-button {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: bold;
}
.article-content {
  margin-bottom: 2rem;
}

.article-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.article-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.article-description {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-author,
.article-publish-date {
  font-size: 1rem;
  font-weight: bold;
  color: #777;
}

.read-more-button {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.read-more-button:hover {
  background-color: #0056b3;
}

.read-more-button:focus {
  outline: none;
}

.read-more-button:active {
  background-color: #004280;
}

hr {
  margin-bottom: 1rem;
}
</style>
  