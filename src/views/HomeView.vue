<template>
  <div class="article-list">
    <h1 class="page-title">Presenting you all the latest news</h1>
    <div class="cards-container">
      <div class="card" v-for="article in articles" :key="article.Id">
        <img :src="article.Image" alt="Article Image" class="card-image">
        <div class="card-content">
          <h2 class="card-title">{{ article.Title }}</h2>
          <router-link :to="`/article/${article.Id}`" class="view-article-btn">Read More</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const articles = computed(() => store.state.articles);

    onMounted(() => {
      store.dispatch('fetchArticles');
    });

    return { articles };
  },
});
</script>

<style>
.article-list {
  text-align: center; /* Center the content in the container */
}

.page-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the cards horizontally */
}

.card {
  width: 300px;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-summary {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.view-article-btn {
  display: block;
  text-align: center;
  background-color: #007BFF;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
}

.view-article-btn:hover {
  background-color: #0056b3;
}
</style>