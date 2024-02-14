<template>
  <q-page>
    <div class="row">
      <div class="col-9">
        <!-- row 1 -->
        <div class="text-subtitle1 q-mb-sm q-ml-sm text-bold">Berita Utama</div>
        <div class="row">
          <div class="col">
            <q-card class="big-card">
              <q-item>
                <q-item-section>
                  <q-skeleton height="320px" square />
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col">
            <div class="row">
              <div class="col">
                <q-card class="small-card">
                  <q-item>
                    <q-item-section>
                      <q-skeleton height="140px" square />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
              <div class="col">
                <q-card class="small-card">
                  <q-item>
                    <q-item-section>
                      <q-skeleton height="140px" square />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-card class="small-card">
                  <q-item>
                    <q-item-section>
                      <q-skeleton height="140px" square />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
              <div class="col">
                <q-card class="small-card">
                  <q-item>
                    <q-item-section>
                      <q-skeleton height="140px" square />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>
        </div>

        <!-- row 2 -->
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col">
                <q-card class="small-card">
                  <q-item>
                    <q-item-section>
                      <q-skeleton height="140px" square />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
              <div class="col">
                <q-card class="small-card">
                  <q-item>
                    <q-item-section>
                      <q-skeleton height="140px" square />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-card class="small-card">
                  <q-item>
                    <q-item-section>
                      <q-skeleton height="140px" square />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
              <div class="col">
                <q-card class="small-card">
                  <q-item>
                    <q-item-section>
                      <q-skeleton height="140px" square />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>
          <div class="col">
            <q-card class="big-card">
              <q-item>
                <q-item-section>
                  <q-skeleton height="320px" square />
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="text-subtitle1 q-mb-md text-bold">Berita Terpopuler</div>
        <div class="row" v-for="i in 7" :key="i">
          <div class="col">
            <q-card class="my-card no-shadow q-mb-md" style="width: 100%">
              <q-card-section horizontal>
                <q-item>
                  <q-item-section>
                    <q-skeleton width="80px" height="80px" square />
                  </q-item-section>
                </q-item>

                <q-card-section>
                  <q-item-section>
                    <q-item-label>
                      <q-skeleton type="text" width="150px" height="60px" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="150px" height="20px" />
                    </q-item-label>
                  </q-item-section>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
.big-card {
  max-width: 500px;
  margin: 10px;
}

.small-card {
  max-width: 250px;
  margin: 10px;
}
</style>
