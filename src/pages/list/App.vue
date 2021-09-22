<template>
  <div id="app">
    <el-container>
      <el-header
        class="el-header--web"
        height="50px"
      >
        <div class="el-header__logo">
          <h1>樂屋網</h1>
        </div>
      </el-header>
      <div style="height: 10px; background-color: #ff8a00" />
      <el-header
        class="el-header--app"
        height="56px"
      >
        <a
          href="#"
          style="display: flex; justify-content: center; align-items: center"
        ><i
          class="fr fr-angle-left el-header__back"
          style="cursor: pointer"
        /></a>
        <h1 class="el-header__title">
          報價單
        </h1>
        <i class="fr fr-angle-left el-header__back--hidden" />
      </el-header>
      <el-main
        v-loading.body="loading"
        :class="{ 'el-main--empty': !hasPayment }"
        element-loading-background="rgba(255, 255, 255)"
      >
        <template v-if="!loading">
          <h2
            v-if="hasPayment"
            class="el-main__title"
          >
            報價單清單
          </h2>
          <Card
            v-for="item in paymentList"
            :key="item.quotationId"
            :payment="item"
          />
          <div
            v-if="!hasPayment"
            class="emptyList"
          >
            <i class="fr fr-note emptyList__icon" />
            <p class="emptyList__title">
              目前沒有待付款報價單
            </p>
            <p class="emptyList__tel">
              如需要請來電洽詢 02-55526565
            </p>
          </div>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Card from '@/components/list/Card.vue';

export default {
  name: 'App',
  components: {
    Card,
  },
  data() {
    return {
      paymentList: [],
      loading: true,
    };
  },
  computed: {
    hasPayment() {
      if (this.paymentList.length) return true;
      return false;
    },
  },
  mounted() {
    console.log(this.axios);
    // 取得報價單列表
    this.axios
      .get('http://localhost:9527/list')
      .then((res) => {
        this.loading = false;

        if (!res.data.success) {
          this.$notify.error({
            title: '錯誤',
            message: '系統異常，請稍後再試',
          });
          return;
        }

        this.paymentList = res.data.quotationList;
      })
      .catch(() => {
        this.loading = false;
        this.$notify.error({
          title: '錯誤',
          message: '系統異常，請稍後再試',
        });
      });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
