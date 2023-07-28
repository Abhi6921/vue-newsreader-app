import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state() {
    return {
      articles: [],
      selectedArticle: null
    }
  },
  mutations: {
    ADD_ARTICLE (state, article) {
      state.articles.push(article)
    },

    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },

    SET_SELECTED_ARTICLE (state, article) {
       state.selectedArticle = article;
    }
  },
  actions: {
    async fetchArticles({ commit }) {
      try {
        const response = await axios.get("https://inhollandbackend.azurewebsites.net/api/Articles")
        commit('SET_ARTICLES', response.data.Results)
      } catch(error) {
        console.error('Error fetching articles: ', error)
      }
    },

    async fetchArticleById({ commit }, Id) {
      axios.get(`https://inhollandbackend.azurewebsites.net/api/Articles/${Id}`)
        .then(response => {
            const newsItem = response.data.Results.find(item => item.Id === Id);
            if (newsItem) {
              commit('SET_ARTICLES', [newsItem]);
            } else {
              console.error('News item not found.');
            }
        })
        .catch(error => {
           console.error('Error fetching news by ID: ', error);
        });
    }
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticleById: (state) => (Id) => {
      return state.articles.find(article => article.Id === Id)
    }
  }
})
