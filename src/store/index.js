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
      isLoading: false,
      LikedArticles: []
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
    },

    SET_LIKED_ARTICLES(state, likedarticles) {
      state.LikedArticles = likedarticles
    },
    SET_AUTH_STATUS(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {

    checkAuth({ commit }) {
      const authToken = localStorage.getItem('TOKEN_KEY');

        // Set the authentication status based on the presence of the token
      if (authToken) {
        commit('SET_AUTH', authToken);
        commit('SET_AUTH_STATUS', true); // Set isAuthenticated to true
      } else {
        commit('CLEAR_AUTH'); // Clear the authToken and set isAuthenticated to false
        commit('SET_AUTH_STATUS', false);
      }
    },
    async login({ commit }, { UserName, Password }) {
      try {
         const response = await axios.post('http://localhost:8080/api/Users/login', { UserName, Password });
         const authToken = response.data.AuthToken;
         localStorage.setItem("TOKEN_KEY", response.data.AuthToken);
         console.log("token from api: " + response.data.AuthToken);
      
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
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.clear();

    },

    async registerUser({ commit }, { UserName, Password }) {
        try {
          const response = await axios.post('http://localhost:8080/api/Users/register', { UserName, Password });

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
        //const AuthToken = localStorage.getItem("TOKEN_KEY")
        const response = await axios.get("http://localhost:8080/api/Articles", {
          headers: {
            "x-authtoken": localStorage.getItem("TOKEN_KEY") 
          }
        })
        commit('SET_ARTICLES', response.data.Results)
      } catch(error) {
        console.error('Error fetching articles: ', error)
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchArticleById({ commit }, Id) {
      axios.get(`http://localhost:8080/api/Articles/${Id}`)
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
    },

    async getAllLikedArticles({commit, state }) {
       if(!state.isAuthenticated || !state.authToken) {
          console.error('User not authenticated, or authToken is null.');
          return;
       }
       
      try {
        commit('SET_LOADING', true);
        
        const response = await axios.get("http://localhost:8080/api/Articles/liked", {
          headers: {
            "x-authtoken": localStorage.getItem("TOKEN_KEY") 
          }
        })
        commit('SET_LIKED_ARTICLES', response.data.Results)
      } catch(error) {
        console.error('Error in fetching the liked articles:', error)
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getArticles: (state) => state.articles,
    getArticleById: (state) => (Id) => {
      return state.articles.find(article => article.Id === Id)
    },
    isLoading: (state) => state.isLoading,

    getLikedArticles: (state) => state.likedArticles || [],
    authToken: (state) => state.authToken
  }
})
