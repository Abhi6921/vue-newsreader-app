import { createStore } from 'vuex'

export default createStore({
  state: {
    articles: [
      {
         slug: "news-1",
         title: "Van der Breggen en Blaak kondigen afscheid aan als wielrenster",
         description: "Anna van der Breggen en Chantal Blaak hebben zondag hun afscheid aangekondigd als wielrenster. De wereldtoppers stoppen over respectievelijk anderhalf en twee jaar en gaan daarna verder als ploegleidster.",
         author: "NU.nl",
         publishDateTime: "2020-05-10T15:14:07",
         articleURL: "https://www.nu.nl/wielrennen/6050336/van-der-breggen-en-blaak-kondigen-afscheid-aan-als-wielrenster.html",
         imageURL: "https://media.nu.nl/m/k3zx972ap9ap_sqr256.jpg/van-der-breggen-en-blaak-kondigen-afscheid-aan-als-wielrenster.jpg"
      },
      {
        slug: "news-2",
        title: "Brighton predikt voorzichtigheid: 'Met valse start maken we levens kapot'",
        description: "Brighton & Hove Albion-voorzitter Paul Barber predikt voorzichtigheid bij een eventuele hervatting van de Premier League. De competitieorganisator willen over een maand het seizoen afmaken ondanks de coronacrisis.",
        author: "NU.nl",
        publishDateTime: "2020-05-10T14:16:32",
        imageURL: "https://media.nu.nl/m/bd6xpyzaw32r_sqr256.jpg/brighton-predikt-voorzichtigheid-met-valse-start-maken-we-levens-kapot.jpg",
        articleURL: "https://www.nu.nl/voetbal/6050332/brighton-predikt-voorzichtigheid-met-valse-start-maken-we-levens-kapot.html"
     }
    ]
  },
  getters: {
  },
  mutations: {
    ADD_ARTICLE (state, article) {
      state.articles.push(article)
    }
  },
  actions: {
  },
  modules: {
  }
})
