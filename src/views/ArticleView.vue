<template>
    <div class="article">
      <router-link to="/" class="back-button">← Back</router-link>
      <div class="article-content">
        <img :src="article.imageURL" alt="Article Image" class="article-image">
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="article-description">{{ article.description }}</p>
        <div class="article-details">
          <p class="article-author">Article written by: {{ article.author }}</p>
          <p class="article-publish-date">Published on: {{ formatDate(article.publishDateTime) }}</p>
          <a :href="article.articleURL" target="_blank" class="read-more-button">Read More</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      article() {
        return this.$store.state.articles.find(
          (article) => article.slug === this.$route.params.slug
        );
      },
    },

    methods: {
        formatDate(datetime) {
           const date = new Date(datetime);
           return date.toLocaleString(); // Adjust the format as per your preference
        },
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
  