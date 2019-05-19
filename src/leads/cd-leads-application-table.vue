<template>
  <div class="cd-leads-application-table__template">
    <h2 class="cd-leads-application-table__header">{{ title }}</h2>
    <table class="cd-leads-application-table__table">
      <tbody class="cd-leads-application-table__body">
        <tr class="cd-leads-application-table__tr" v-for="(value, col) in data">
          <th class="cd-leads-application-table__th">{{ columns[col] }}</th>
          <td class="cd-leads-application-table__td">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'cd-leads-application-table',
    props: ['title', 'data', 'columns'],
  };
</script>

<style scoped lang="less">
@import "~@coderdojo/cd-common/common/_colors";
@import "../common/styles/cd-primary-button.less";
@import "../common/variables";
.cd-leads-application-table {
  &__template {
    display: flex;
    flex-direction: column;
    max-width: 270px;
  }

  &__header {
    margin: 45px 0 @margin 0;
  }

  &__table {
    padding: 0px 5px 16px;
    margin: 0px 0px 24px;
    max-width: 100%;
}

  &__th {
    background-color: #f4f5f6;
    padding: 10px 20px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
    max-width: 25%;
  }

  &__td {
    border-bottom: 1px #f4f5f6 solid;
    padding: 10px 20px;
    max-width: 75%;
  }
}
</style>
