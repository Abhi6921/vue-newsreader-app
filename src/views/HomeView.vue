<template>
  <div class="home">
    <h1>News Articles</h1>
    <button @click="togglePopup">Add new Article</button>

    <div class="articles">
      <div class="card" v-for="article in $store.state.articles" :key="article.slug">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>

        <router-link :to="`/article/${article.slug}`">
          <button>View Article</button>
        </router-link>
      </div>
    </div>

    <div class="add-article-popup" v-if="popupOpen">
      <div class="popup-content">
          <h2>Add New Article</h2>

          <form @submit.prevent="addNewArticle">
            <div class="group">
              <label for="">Title</label>
              <input type="text" v-model="newArticle.title"/>
            </div>

            <div class="group">
              <label for="">Description</label>
              <textarea v-model="newArticle.description"></textarea>
            </div>

            <div class="group">
              <label for="">Author</label>
              <input type="text" v-model="newArticle.author">
            </div>

            <div class="group">
              <label for="">Publish Date and Time</label>
              <input type="datetime-local" v-model="newArticle.publishDateTime">
            </div>

            <div class="group">
              <label for="">Article URL</label>
              <input type="text" v-model="newArticle.articleURL">
            </div>

            <div class="group">
              <label for="">Image URL</label>
              <input type="text" v-model="newArticle.imageURL">
            </div>
            
            <button type="submit">Add Article</button>
            <button type="button"  @click="togglePopup">Close</button>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'HomeView',
  setup() {
    const newArticle = ref({
      title: '',
      description: '',
      author: '',
      publishDateTime: '',
      articleURL: '',
      imageURL: ''

    });

    //popup func
    const popupOpen = ref(false);
    const store = useStore();

    const togglePopup = () => {
      popupOpen.value = !popupOpen.value;
    }
    
    const addNewArticle = () => {
      newArticle.value.slug = newArticle.value.title.toLowerCase().replace(/\s/g, '-');
      
      if (newArticle.value.slug == '') {
        alert("Please enter a title")
        return
      }
      
      store.commit('ADD_ARTICLE', { ...newArticle.value });

      newArticle.value = {
        title: '',
        description: '',
        author: '',
        publishDateTime: '',
        articleURL: '',
        imageURL: ''
      }
      togglePopup();
    }
    // new related articles
    return {
      newArticle,
      addNewArticle,
      togglePopup,
      popupOpen
    }
  }
}
</script>
<style scoped>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 32px;
}

.articles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.articles .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #081c33;
}

.articles .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.articles .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.add-article-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-article-popup .popup-content {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
}

.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.popup-content .group {
  margin-bottom: 1rem;
}

.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}

.popup-content .group input, .popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.popup-content .group textarea {
  height: 100px;
  resize: none;
}

.popup-content button[type="submit"] {
  margin-right: 1rem;

}
</style>