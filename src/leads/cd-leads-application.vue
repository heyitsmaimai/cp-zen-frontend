<template>
	<div class="cd-leads-application">
		<leads-header :title="header"/>
		<application-table :title="'Champion'" :data="champion" :columns="championColumns"/>
	</div>
</template>

<script>
  import LeadsHeader from '@/leads/cd-leads-header';
  import ApplicationTable from '@/leads/cd-leads-application-table';
  import LeadsService from './service';

  export default {
    name: 'LeadsApplication',
    props: ['leadId'],
    data() {
      return {
        header: 'Review Application',
        leadApplication: [],
      };
    },
    components: {
      LeadsHeader,
      ApplicationTable,
    },
    computed: {
      champion() {
        return this.leadApplication.application.champion;
      },
      championColumns() {
        return [{ name: 'name', title: 'Name' }, { name: 'email', title: 'Email' }, { name: 'parentName', title: 'Parent Name' }, { name: 'parentEmail', title: 'Parent Email' }, { name: 'phone', title: 'Last Phone #' }];
      },
    },
    methods: {
      getApplication() {
        LeadsService.getLeadById(this.leadId).then((response) => {
          this.leadApplication = response.body;
        });
      },
    },
    created() {
      this.getApplication();
    },
  };
</script>

<style scoped lang="less">
  @import "~@coderdojo/cd-common/common/_colors";
  @import "../common/styles/cd-primary-button.less";
  .cd-leads-application {
    display: flex;
    flex-direction: column;
  }
</style>
