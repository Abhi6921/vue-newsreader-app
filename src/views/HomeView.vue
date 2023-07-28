<template>
  <div class="article-list">
    
    <div class="title-bar">
      <h1 class="page-title">Presenting you all the latest news</h1>
      <button v-if="isAuthenticated" class="logout-button" @click="logout">Logout</button>
    </div>
    <div v-if="isLoading" class="content-container">
      <!-- Show CircularProgressView while fetching articles -->
      <CircularProgressView />
    </div>
    <div v-else class="cards-container">
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
import router from '../router';
import CircularProgressView from '../components/CircularProgressView.vue'; 

export default defineComponent({
  components: {
    CircularProgressView
  },
  setup() {
    const store = useStore();
    const articles = computed(() => store.state.articles);
    const isAuthenticated = computed(() => store.state.isAuthenticated);
    const isLoading = computed(() => store.getters.isLoading);

    onMounted(() => {
      store.dispatch('fetchArticles');
    });

    const logout = () => {
      store.dispatch('logout');
      // Redirect the user to the login page after logout
      router.push('/login');
    };

    return { articles, isAuthenticated, isLoading, logout };
  },
});
</script>

<style>

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 2rem;
  margin: 0 auto; /* Center the title horizontally */
}

.logout-button {
  background-color: #dc3545;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  position: relative; /* Add position relative for the top/right positioning */
  top: 5px; /* Adjust the distance from the top (you can change the value as needed) */
  right: 50px; /* Adjust the distance from the right (you can change the value as needed) */
}

.logout-button:hover {
  background-color: #c82333;
}

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