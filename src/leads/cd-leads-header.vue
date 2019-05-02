<template>
  <div class="row">
    <div class="cd-leads-header">
      <h1 class="cd-leads-header__header">Leads Dashboard</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cd-leads-header',
  };
</script>

<style scoped lang="less">
  @import "~@coderdojo/cd-common/common/_colors";
  @import "../common/styles/cd-primary-button.less";
  @import "../common/variables";
  .cd-leads-header {
    background-color: @cd-purple;
    padding: 0 32px;
    min-height: 32px;
    display: flex;
    justify-content: center;
    &__header {
      color: #fff;
      padding: 16px;
    }
  }
</style>
