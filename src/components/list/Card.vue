<template>
  <a
    class="paymentCard"
    :href="url"
  >
    <el-row
      class="paymentCard__header"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <p class="paymentCard__date">報價單日期：{{ payment.quotationDate }}</p>
      <p
        class="paymentCard__status"
        :class="{ 'paymentCard__status--paid': payment.isPaid }"
      >
        {{ payment.isPaid ? '已付款' : '待付款' }}
      </p>
    </el-row>
    <div class="paymentCard__content">
      <div
        v-if="payment.isMonthly"
        class="paymentCard__monthTag"
      >月付型</div>
      <el-row
        class="paymentCard__title"
        type="flex"
        align="middle"
      >
        <div class="paymentCard__name">{{ payment.itemName }}</div>
        <i class="paymentCard__icon fr-angle-right" />
      </el-row>
    </div>
  </a>
</template>

<script>
export default {
  name: 'Card',
  props: {
    payment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    url() {
      // 報價單明細頁
      if (this.payment.isPaid) {
        return `/quotation/detail?qid=${this.payment.quotationId}`;
      }

      // 付款成功頁 (ATM 繳款單)
      if (!this.payment.isPaid && this.payment.payType === 'atm') {
        return `/quotation/pay-success?orderNo=${this.payment.orderNo}`;
      }

      // 付款流程頁
      if (!this.payment.isPaid && !this.payment.payType) {
        return `/quotation/pay?qid=${this.payment.quotationId}`;
      }

      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.paymentCard {
  display: block;
  border: 1px solid #d8d8d8;
  border-radius: 3px;
  max-width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
  cursor: pointer;
  text-decoration: none;

  .paymentCard__header {
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;

    .paymentCard__date {
      font-size: 13px;
      line-height: 18px;
      color: #666;
    }

    .paymentCard__status {
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      color: #eb5757;
      &.paymentCard__status--paid {
        color: #333;
      }
    }
  }

  .paymentCard__content {
    margin-top: 10px;

    .paymentCard__monthTag {
      font-weight: 600;
      font-size: 13px;
      line-height: 22px;
      letter-spacing: 0.4px;
      color: #f29700;
      margin-bottom: 3px;
    }

    .paymentCard__title {
      flex-wrap: nowrap;

      .paymentCard__name {
        font-weight: 500;
        font-size: 15px;
        line-height: 21px;
        letter-spacing: 0.882353px;
        color: #333;
        /* Ellipsis */
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .paymentCard__icon {
        font-size: 20px;
        line-height: 20px;
        color: #999;
      }
    }
  }
}
</style>
