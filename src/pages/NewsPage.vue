<template>
  <q-page>
    <div class="container">
      <div class="row">
        <div class="col">
          <q-input
            class="float-right q-mb-md"
            outlined
            dense
            v-model="keyword"
            bg-color="white"
            placeholder="Cari judul berita..."
            style="width: 300px"
            @keydown.enter="searchNews"
          >
            <template v-slot:append>
              <q-icon name="search" color="grey" @click="searchNews()" />
            </template>
          </q-input>
        </div>
      </div>

      <div v-if="isLoading">
        <skeleton-news-component />
      </div>
      <div v-if="!isLoading">
        <div class="row">
          <div class="col-md-9">
            <div class="text-subtitle1 q-mb-sm q-ml-sm text-bold">
              Berita Utama
            </div>
            <div v-for="(news, index) in newsItems" :key="index">
              <div
                :class="index >= 1 ? 'row' : 'row'"
                v-if="(index + 1) % 2 !== 0"
              >
                <div class="col">
                  <q-card
                    class="my-card big-card"
                    @click="toDetail(news.big_thumbnail)"
                  >
                    <q-img
                      class="img-big-thumbnail"
                      :src="
                        news.big_thumbnail.urlToImage
                          ? news.big_thumbnail.urlToImage
                          : imageNotFound
                      "
                    >
                      <div class="absolute-bottom">
                        <div class="news-title text-subtitle2 text-bold">
                          {{ news.big_thumbnail.title }}
                        </div>
                        <div class="text-caption">
                          {{ news.big_thumbnail.source.name }} |
                          {{
                            moment(news.big_thumbnail.publishedAt).format(
                              "ddd, DD MMMM HH.mm"
                            )
                          }}
                        </div>
                        <div class="q-mt-md text-description">
                          {{ news.big_thumbnail.description }}
                        </div>
                        <div class="text-caption q-mt-md">
                          Author: {{ news.big_thumbnail.author }}
                        </div>
                      </div>
                    </q-img>
                  </q-card>
                </div>
                <div class="col">
                  <div class="row">
                    <div
                      class="col-6"
                      v-for="(
                        smallNews, smallNewsIndex
                      ) in news.small_thumbnails"
                      :key="smallNewsIndex"
                    >
                      <q-card
                        @click="toDetail(smallNews)"
                        class="my-card small-card"
                      >
                        <q-img
                          class="img-small-thumbnail"
                          :src="
                            smallNews.urlToImage
                              ? smallNews.urlToImage
                              : imageNotFound
                          "
                        >
                          <div class="absolute-bottom">
                            <div class="news-title text-subtitle2">
                              <div v-if="smallNews.title.length > 20">
                                {{ smallNews.title.substring(0, 20) }}...
                                <q-tooltip>
                                  {{ smallNews.title }}
                                </q-tooltip>
                              </div>
                              <div v-if="smallNews.title.length <= 20">
                                {{ smallNews.title.substring(0, 20) }}
                              </div>
                            </div>
                            <div class="text-caption">
                              {{ smallNews.source.name }} |
                              {{
                                moment(smallNews.publishedAt).format(
                                  "ddd, DD MMMM HH.mm"
                                )
                              }}
                            </div>
                          </div>
                        </q-img>
                      </q-card>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" v-if="(index + 1) % 2 === 0">
                <div class="col">
                  <div class="row">
                    <div
                      class="col-6"
                      v-for="(
                        smallNews, smallNewsIndex
                      ) in news.small_thumbnails"
                      :key="smallNewsIndex"
                    >
                      <q-card
                        @click="toDetail(smallNews)"
                        class="my-card small-card"
                      >
                        <q-img
                          class="img-small-thumbnail"
                          :src="
                            smallNews.urlToImage
                              ? smallNews.urlToImage
                              : imageNotFound
                          "
                        >
                          <div class="absolute-bottom">
                            <div class="news-title text-subtitle2">
                              <div v-if="smallNews.title.length > 20">
                                {{ smallNews.title.substring(0, 20) }}...
                                <q-tooltip>
                                  {{ smallNews.title }}
                                </q-tooltip>
                              </div>
                              <div v-if="smallNews.title.length <= 20">
                                {{ smallNews.title.substring(0, 20) }}
                              </div>
                            </div>
                            <div class="text-caption">
                              {{ smallNews.source.name }} |
                              {{
                                moment(smallNews.publishedAt).format(
                                  "ddd, DD MMMM HH.mm"
                                )
                              }}
                            </div>
                          </div>
                        </q-img>
                      </q-card>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <q-card class="my-card big-card">
                    <q-img
                      @click="toDetail(news.big_thumbnail)"
                      class="img-big-thumbnail"
                      :src="
                        news.big_thumbnail.urlToImage
                          ? news.big_thumbnail.urlToImage
                          : imageNotFound
                      "
                    >
                      <div class="absolute-bottom">
                        <div class="news-title text-subtitle2 text-bold">
                          {{ news.big_thumbnail.title }}
                        </div>
                        <div class="text-caption">
                          {{ news.big_thumbnail.source.name }} |
                          {{
                            moment(news.big_thumbnail.publishedAt).format(
                              "ddd, DD MMMM HH.mm"
                            )
                          }}
                        </div>
                        <div class="q-mt-md text-description">
                          {{ news.big_thumbnail.description }}
                        </div>
                        <div class="text-caption q-mt-md">
                          Author: {{ news.big_thumbnail.author }}
                        </div>
                      </div>
                    </q-img>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 q-pl-sm">
            <div class="text-subtitle1 q-mb-sm text-bold">
              Berita Terpopuler
            </div>
            <side-news-component
              :news="topNews"
              :imageNotFound="imageNotFound"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getTopHeadlines, getEverythingNews } from "../libraries/api.js";
import SideNewsComponent from "../components/SideNewsComponent.vue";
import SkeletonNewsComponent from "../components/SkeletonNewsComponent.vue";
import { ref } from "vue";
import { Notify } from "quasar";
import moment from "moment";
export default {
  name: "NewsPage",
  components: {
    SideNewsComponent,
    SkeletonNewsComponent,
  },
  setup() {
    return {
      keyword: ref(null),
      defaultKeyword: ref("bitcoin"),
      topNews: [],
      newsItems: [],
      isLoading: ref(false),
      imageNotFound:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.salonlfc.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fimage-not-found-scaled-1150x647.png&f=1&nofb=1&ipt=28fe05b479769474e910b9d0cb1c2b071f63b368813916e178f41c42d8cada09&ipo=images",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    moment,
    searchNews() {
      this.defaultKeyword = this.keyword;
      this.init();
    },
    toDetail(item) {
      let news_viewed = localStorage.getItem("news_viewed") || [];
      if (
        localStorage.getItem("news_viewed") &&
        JSON.parse(localStorage.getItem("news_viewed")).length > 0
      ) {
        news_viewed = JSON.parse(localStorage.getItem("news_viewed"));
        news_viewed.push({
          urlToImage: item.urlToImage,
          title: item.title,
          url: item.url,
        });

        localStorage.setItem("news_viewed", JSON.stringify(news_viewed));
      } else {
        news_viewed.push({
          urlToImage: item.urlToImage,
          title: item.title,
          url: item.url,
        });
        localStorage.setItem("news_viewed", JSON.stringify(news_viewed));
      }

      window.open(item.url, "_blank").focus();
    },
    setupData(articles) {
      let big_thumbnail_left = 11;
      let big_thumbnail_right = 10;

      // set big/small thumbnail
      articles.forEach((article, index) => {
        const iteration = index + 1;
        if (index === 0) {
          article.is_big_thumbnail = true;
        }

        if (
          iteration !== 1 &&
          iteration !== big_thumbnail_left &&
          iteration !== big_thumbnail_right
        ) {
          article.is_small_thumbnail = true;
        }

        if (iteration % 10 === 0) {
          article.is_big_thumbnail = true;
          big_thumbnail_right = big_thumbnail_right + 10;
        }

        if (iteration % 11 === 0) {
          article.is_big_thumbnail = true;
          big_thumbnail_left = big_thumbnail_left + 10;
        }
      });

      // split into 5 items
      let item_in_row = 5;
      let small_thumbnails = [];
      let big_thumbnail = null;
      articles.forEach((article, index) => {
        const iteration = index + 1;

        if (iteration <= item_in_row) {
          if (article.is_big_thumbnail) {
            big_thumbnail = article;
          }

          if (article.is_small_thumbnail) {
            small_thumbnails.push(article);
          }
        }

        if (iteration === item_in_row) {
          this.newsItems.push({
            big_thumbnail,
            small_thumbnails,
          });
          item_in_row = item_in_row + 5;
          small_thumbnails = [];
          big_thumbnail = null;
        }
      });
    },
    async init() {
      this.isLoading = true;
      this.newsItems = [];
      this.topNews = [];
      const everythingParams = {
        q: this.defaultKeyword,
        pageSize: 20,
      };

      getEverythingNews(everythingParams)
        .then((response) => {
          if (response && response.articles.length > 0) {
            this.setupData(response.articles);
          }
        })
        .then(() => {
          const params = {
            country: "id",
          };
          return getTopHeadlines(params)
            .then((response) => {
              if (response && response.articles.length > 0) {
                this.topNews = response.articles;
              }

              this.isLoading = false;
            })
            .catch((err) => {
              this.isLoading = false;
              console.log("Failed to call API getTopHeadlines", err);
              Notify.create({
                message: "Failed to get all news",
                timeout: 5000,
                type: "negative",
                color: "negative",
                icon: "warning",
              });
            });
        })
        .catch((err) => {
          this.isLoading = false;
          console.log("Failed to call API getEverythingNews ", err);
          Notify.create({
            message: "Failed to get top news",
            timeout: 5000,
            type: "negative",
            color: "negative",
            icon: "warning",
          });
        });
    },
  },
};
</script>

<style scoped>
.text-description {
  font-size: 0.9rem;
}

.big-card,
.small-card {
  transition: 0.6s;
}

.big-card:hover,
.small-card:hover {
  cursor: pointer;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.8);
}

.news-title {
  transition: 0.6s;
}

.news-title:hover {
  color: red;
}

.img-big-thumbnail {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

.big-card {
  max-width: 500px;
  height: 320px;
  margin: 10px;
}

.small-card {
  max-width: 250px;
  height: 150px;
  margin: 10px;
}

.img-small-thumbnail {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.news-container {
  max-width: 1000px;
}
</style>
