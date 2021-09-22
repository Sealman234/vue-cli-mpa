<template>
  <div class="productDetails">
    <el-collapse
      v-model="activeNames"
      node-key="id"
      @change="handleChange"
    >
      <el-collapse-item name="1">
        <!-- 總金額 -->
        <template slot="title">
          <el-row
            class="productDetails__title"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <p class="productDetails__totalPrice">
              {{ payment.payType === 'atm' ? '購買商品' : '總金額' }}
            </p>
            <el-row
              type="flex"
              justify="center"
              align="middle"
            >
              <span
                v-if="payment.payType !== 'atm'"
                class="productDetails__totalPrice"
              >NT {{ payment.price.total }}</span>
              <i
                :class="[
                  'fr-angle-down productDetails__icon',
                  { 'is-active': isActive },
                ]"
              />
            </el-row>
          </el-row>
        </template>
        <div class="productDetails__table">
          <table>
            <tr class="productDetails__spacer--border" />
            <tr class="productDetails__spacer--md" />
            <!-- 年約商品 -->
            <template v-if="payment.list.amount">
              <tr>
                <td
                  colspan="3"
                  class="productDetails__colspanTitle"
                >
                  年約商品<span v-if="payment.isMonthly">月付型</span>
                </td>
              </tr>
              <tr class="productDetails__spacer--sm" />
              <tr>
                <td class="productDetails__name">
                  {{ payment.list.amount[0].name }}
                </td>
                <td class="productDetails__time">
                  走期{{ payment.list.amount[0].duration }}
                </td>
                <td class="productDetails__price">
                  NT {{ payment.list.amount[0].price }}
                </td>
              </tr>
              <tr
                v-if="payment.isMonthly"
                class="productDetails__monthInfo"
              >
                <td class="productDetails__name">
                  月付型12期
                </td>
                <td
                  colspan="2"
                  class="productDetails__price"
                  style="text-align: right"
                >
                  <p>
                    每期金額 NT {{ payment.list.amount[0].installment.other }}
                  </p>
                  <p class="productDetails__time">
                    *除不盡餘數於第一期收取
                  </p>
                </td>
              </tr>
              <tr class="productDetails__spacer--md" />
            </template>
            <!-- 開店廣告 -->
            <template v-if="payment.list.shopAd">
              <tr>
                <td
                  colspan="3"
                  class="productDetails__colspanTitle"
                >
                  開店廣告
                </td>
              </tr>
              <tr class="productDetails__spacer--sm" />
              <tr
                v-for="(item, index) in payment.list.shopAd"
                :key="`item ${index}`"
              >
                <td class="productDetails__name">
                  {{ item.name }}
                </td>
                <td class="productDetails__time">
                  走期{{ item.duration }}
                </td>
                <td class="productDetails__price">
                  NT {{ item.price }}
                </td>
              </tr>
              <tr class="productDetails__spacer--md" />
            </template>
            <!-- 贈品 -->
            <template v-if="payment.list.gift">
              <tr>
                <td
                  colspan="3"
                  class="
                      productDetails__colspanTitle
                      productDetails__colspanTitle--grey
                    "
                >
                  贈品
                </td>
              </tr>
              <tr class="productDetails__spacer--sm" />
              <tr
                v-for="(item, index) in payment.list.gift"
                :key="index"
              >
                <td class="productDetails__name">
                  {{ item.name }}
                </td>
                <td class="productDetails__time">
                  走期{{ item.duration }}
                </td>
                <td class="productDetails__price">
                  NT {{ item.price }}
                </td>
              </tr>
              <tr class="productDetails__spacer--md" />
            </template>

            <!-- 月付才有的表格內容 -->
            <template v-if="payment.isMonthly">
              <tr class="productDetails__spacer--border" />
              <tr class="productDetails__spacer--md" />
              <tr v-if="payment.list.amount">
                <td
                  colspan="2"
                  class="productDetails__name productDetails__name--month"
                >
                  年約商品：月付型12期(第一期)
                </td>
                <td
                  class="productDetails__price"
                  style="color: #666"
                >
                  NT {{ payment.price.paying.firstInstallment }}
                </td>
              </tr>
              <tr v-if="payment.list.shopAd">
                <td
                  colspan="2"
                  class="productDetails__name productDetails__name--month"
                >
                  開店/廣告商品
                </td>
                <td
                  class="productDetails__price"
                  style="color: #666"
                >
                  NT {{ payment.price.paying.payoff }}
                </td>
              </tr>
              <tr class="productDetails__spacer--md" />
            </template>
          </table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 月付多一行不收闔的內容 -->
    <el-row
      v-if="payment.isMonthly"
      class="productDetails__payoff"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <p class="productDetails__payoff--name">
        本期應付金額
      </p>
      <p class="productDetails__payoff--price">
        NT {{ payment.price.paying.total }}
      </p>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    // 商品明細
    payment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // 商品明細
      activeNames: ['1'],
      isActive: true, // 控制選單箭頭方向
    };
  },
  methods: {
    // 商品明細
    handleChange(val) {
      if (val.length) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
