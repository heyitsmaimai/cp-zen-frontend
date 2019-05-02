<template>
  <div class="cd-leads">
    <leads-header/>
    <leads-list/>
  </div>
</template>

<script>
  import LeadsHeader from '@/leads/cd-leads-header';
  import LeadsList from '@/leads/cd-leads-list';

  export default {
    name: 'Leads',
    data() {
      return {
      };
    },
    components: {
      LeadsHeader,
      LeadsList,
    },
  };
</script>

<style scoped lang="less">
  @import "~@coderdojo/cd-common/common/_colors";
  @import "../common/styles/cd-primary-button.less";
  .cd-leads {
    display: flex;
    flex-direction: column;
    &__container {
      display:flex;
      margin: 0 -16px;
    }
  }
</style>
