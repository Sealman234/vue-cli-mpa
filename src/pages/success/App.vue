<template>
  <el-container>
    <el-header
      class="el-header--web"
      height="50px"
    >
      <div class="el-header__logo">
        <h1>樂屋網</h1>
      </div>
    </el-header>
    <div style="height: 10px; background-color: #ff8a00;" />
    <el-header
      class="el-header--app"
      height="56px"
    >
      <a
        href="#"
        style="display: flex; justify-content: center; align-items: center;"
      ><i
        class="fr fr-angle-left el-header__back"
        style="cursor: pointer;"
      /></a>
      <h1 class="el-header__title">
        報價單
      </h1>
      <i class="fr fr-angle-left el-header__back--hidden" />
    </el-header>
    <el-main>
      <h2 class="el-main__title">
        {{
          paymentData.payType === 'creditCard'
            ? '恭喜你 訂購成功！'
            : '訂購成功 請儘速繳費'
        }}
      </h2>
      <p
        v-if="paymentData.payType === 'creditCard'"
        class="el-main__orderNumber"
      >
        訂單編號：<span>{{ orderNo }}</span>
      </p>
      <Detail
        v-if="paymentData.price"
        :payment="paymentData"
      />
      <template v-if="paymentData.payType === 'atm'">
        <h2 class="atm-info-title">
          ATM 繳費資訊
        </h2>
        <div class="flexTable">
          <el-row
            class="flexTable__row"
            type="flex"
            align="middle"
          >
            <div class="flexTable__name flexTable__name--atm">
              繳費期限
            </div>
            <div class="flexTable__content text-danger">
              {{ paymentData.atm.dueDate }}
            </div>
          </el-row>
          <el-row
            class="flexTable__row"
            type="flex"
            align="middle"
          >
            <div class="flexTable__name flexTable__name--atm">
              轉帳銀行代號
            </div>
            <div class="flexTable__content">
              812 台新銀行
            </div>
          </el-row>
          <el-row
            class="flexTable__row flexTable__row--account"
            type="flex"
            align="middle"
          >
            <div class="flexTable__name flexTable__name--atm">
              轉帳帳號
            </div>
            <el-row
              type="flex"
              align="middle"
            >
              <el-row
                type="flex"
                style="flex-direction: column;"
              >
                <div
                  ref="account"
                  class="account-text"
                >
                  {{ paymentData.atm.account }}
                </div>
                <div class="account-remind">
                  此帳號限本次使用
                </div>
              </el-row>
              <div
                class="account-copy"
                @click.stop.prevent="copyAccount"
              >
                <i class="fr fr-clone" /><span>複製</span>
              </div>
            </el-row>
          </el-row>
          <el-row
            class="flexTable__row"
            type="flex"
            align="middle"
          >
            <div class="flexTable__name flexTable__name--atm">
              應繳金額
            </div>
            <div class="flexTable__content text-danger text-price">
              NT{{ paymentData.atm.amount }}
            </div>
          </el-row>
          <el-row
            class="flexTable__row"
            type="flex"
            align="middle"
          >
            <div class="flexTable__name flexTable__name--atm">
              銀行戶名
            </div>
            <div class="flexTable__content">
              樂屋國際資訊股份有限公司
            </div>
          </el-row>
          <el-row
            class="flexTable__row no-border-bottom"
            type="flex"
            align="middle"
          >
            <div class="flexTable__name flexTable__name--atm">
              分行別
            </div>
            <div class="flexTable__content">
              0687建北分行
            </div>
          </el-row>
        </div>
        <h2 class="atm-info-title">
          發票資訊
        </h2>
        <div class="flexTable">
          <el-row
            :class="[
              'flexTable__row',
              { 'no-border-bottom': !paymentData.invoice.taxId },
            ]"
            type="flex"
            align="middle"
          >
            <div class="flexTable__name flexTable__name--inv">
              發票格式
            </div>
            <div class="flexTable__content">
              {{ invoiceType }}
            </div>
          </el-row>
          <el-row
            v-if="paymentData.invoice.taxId"
            class="flexTable__row no-border-bottom"
            type="flex"
            align="middle"
          >
            <div class="flexTable__name flexTable__name--inv">
              統一編號
            </div>
            <div class="flexTable__content">
              {{ paymentData.invoice.taxId }}
            </div>
          </el-row>
        </div>
      </template>
      <div class="service-reminder">
        <h2>服務提醒</h2>
        <ul>
          <li>如欲更改發票載具，請於廣告訂單進行修改。</li>
          <li v-if="paymentData.payType === 'creditCard'">
            合約將於信用卡完成刷卡後約30分鐘內開通。
          </li>
          <li v-if="paymentData.payType === 'atm'">
            若金額超過2萬，可使用ATM的「繳費」選項。
          </li>
          <template
            v-if="paymentData.isMonthly &amp;&amp; paymentData.payType === 'creditCard'"
          >
            <li>僅限額度方案可月付，其餘商品需一次付清。</li>
            <li>刷卡購買日期為每個月的信用卡自動扣款日。</li>
            <li>購買日期若為29~31日，將提前於28日扣款。</li>
          </template>
        </ul>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Detail from '@/components/success/Detail.vue';

export default {
  name: 'Success',
  components: {
    Detail,
  },
  data() {
    return {
      orderNo: '',
      paymentData: {},
    };
  },

  computed: {
    invoiceType() {
      if (this.paymentData.invoice.invType === '0') return '捐贈發票';
      if (this.paymentData.invoice.invType === '1') return '個人用戶';
      if (this.paymentData.invoice.invType === '2') return '公司戶';
      return '';
    },
  },
  mounted() {
    // 取得網址參數 orderNo
    const url = new URL(window.location.href);
    const params = url.searchParams;
    if (params.has('orderNo')) {
      this.orderNo = params.get('orderNo');
    }

    // API 取得付款成功資訊
    this.axios
      .get('https://sealman234.github.io/ajax/data/success.json')
      .then((res) => {
        if (!res.data.success) {
          window.location.replace('/quotation/list');
          return;
        }
        this.paymentData = res.data;
      })
      .catch(() => {
        window.location.replace('/quotation/list');
      });
  },
  methods: {
    // 複製指定元素的文字
    copyAccount() {
      // 建立 Range 物件
      const range = document.createRange();
      // 將指定元素內容加到 Range 中
      const texts = this.$refs.account;
      range.selectNode(texts);
      // 取得 Selection 物件
      const selection = window.getSelection();
      // 先清空當前選取範圍
      selection.removeAllRanges();
      // 加入 Range
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
      this.$message({
        message: 'ATM 轉帳帳號已複製！',
        type: 'success',
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
