import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state() {
    return {
      articles: [],
      selectedArticle: null,
      isAuthenticated: false,
      authToken: null,
      registerationStatus: null,
      registerationMessage: null,
      isLoading: false
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
    },

    SET_AUTH(state, authToken) {
      state.isAuthenticated = true;
      state.authToken = authToken;
    },

    CLEAR_AUTH(state) {
      state.isAuthenticated = false;
      state.authToken = null;
    },

    SET_REGISTRATION_STATUS(state, { status, message }) {
      state.registerationStatus = status
      state.registerationMessage = message
    },

    SET_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    }
  },
  actions: {
    async login({ commit }, { UserName, Password }) {
      try {
         const response = await axios.post('https://cors.iamnd.eu.org/?url=https://inhollandbackend.azurewebsites.net/api/Users/login', { UserName, Password });
         const authToken = response.data.AuthToken;
         
         // set token in store
         commit('SET_AUTH', authToken);
         return true;
      } catch(error) {
        console.error('An error occured during login:', error);
        return false;
      }
    },

    async logout({ commit }) {
        commit('CLEAR_AUTH');

    },

    async registerUser({ commit }, { UserName, Password }) {
        try {
          const response = await axios.post('https://cors.iamnd.eu.org/?url=https://inhollandbackend.azurewebsites.net/api/Users/register', { UserName, Password });

          commit('SET_REGISTRATION_STATUS', { status: response.data.Success, message: response.data.Message });
          return response.data;
        } catch(error) {
            console.error('An error occured during user registeration: ', error);
            throw error;
        }
    },

    async fetchArticles({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await axios.get("https://inhollandbackend.azurewebsites.net/api/Articles")
        commit('SET_ARTICLES', response.data.Results)
      } catch(error) {
        console.error('Error fetching articles: ', error)
      } finally {
        commit('SET_LOADING', false);
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
    isAuthenticated: (state) => state.isAuthenticated,
    getArticles: (state) => state.articles,
    getArticleById: (state) => (Id) => {
      return state.articles.find(article => article.Id === Id)
    },
    isLoading: (state) => state.isLoading
  }
})
