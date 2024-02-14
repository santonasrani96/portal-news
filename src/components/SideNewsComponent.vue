<template>
  <div>
    <div class="row" v-for="(item, index) in props.news" :key="index">
      <div class="col">
        <q-card
          @click="toDetail(item)"
          :class="
            index > 0
              ? 'side-card no-shadow q-mb-md'
              : 'side-card no-shadow q-mb-md q-mt-sm'
          "
        >
          <q-card-section horizontal>
            <q-img
              class="col-5"
              :src="item.urlToImage ? item.urlToImage : imageNotFound"
            />

            <q-card-section>
              <div class="news-title text-bold" v-if="item.title.length > 50">
                {{ item.title.substring(0, 50) }}...
                <q-tooltip>
                  {{ item.title }}
                </q-tooltip>
              </div>
              <div v-if="item.title.length <= 50">
                {{ item.title.substring(0, 50) }}
              </div>
              <div class="q-mt-sm text-caption">
                {{ item.source.name }}
              </div>
              <div class="text-caption">
                {{ convertDate(item.publishedAt) }}
              </div>
              <div class="text-caption">Author: {{ item.author }}</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

const convertDate = (date) => {
  return moment(date).format("ddd, DD MMMM HH.mm");
};

const props = defineProps({
  news: Array,
  imageNotFound: String,
});

const toDetail = (item) => {
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
};
</script>

<style scoped>
.side-card {
  transition: 0.6s;
}
.side-card:hover {
  cursor: pointer;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.8);
}

.news-title {
  transition: 0.6s;
}

.news-title:hover {
  color: red;
}
</style>
