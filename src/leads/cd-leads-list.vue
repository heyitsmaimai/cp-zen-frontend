<template>
  <div class="row">
    <div class="cd-leads-list">
      <div class="ui container">
         <leads-table class= "cd-leads-list__table" :data="leads" :columns="columns"></leads-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import LeadsService from './service';
  import LeadsTable from './cd-leads-table';

  export default {
    name: 'cd-leads-list',
    data() {
      return {
        allLeads: [],
        columns: [{ name: 'name', title: 'Name' }, { name: 'country', title: 'Country' }, { name: 'email', title: 'Email' }, { name: 'dojoEmail', title: 'Dojo Email' }, { name: 'created', title: 'Created' }, { name: 'updated', title: 'Updated' }, { name: 'completed', title: 'Completed' }, { name: 'score', title: 'Score' }],
      };
    },
    components: {
      LeadsTable,
    },
    computed: {
      ...mapGetters(['loggedInUser']),
      leads() {
        return this.allLeads.map(lead => (Object.assign({
          id: lead.id,
          name: lead.dojoName,
          country: lead.alpha2,
          email: lead.email,
          dojoEmail: lead.dojoEmail,
          created: lead.createdAt.slice(0, 10),
          updated: lead.updatedAt.slice(0, 10),
          completed: lead.completed,
        })));
      },
    },
    methods: {
      getAllLeads() {
        const query = {
          deleted: 0,
        };
        LeadsService.getLeads(query).then((response) => {
          this.allLeads = response.body;
        });
      },
    },
    created() {
      this.getAllLeads();
    },
  };
</script>

<style scoped lang="less">
  @import "~@coderdojo/cd-common/common/_colors";
  @import "../common/styles/cd-primary-button.less";
  @import "../common/variables";
  .cd-leads-list {
    background-color: #fff;
    padding: 0 32px;
    min-height: 432px;
    /*width: 940px;*/
    display: flex;
    &__header {
      padding: 16px;
    }
    &__table {
    }
  }
</style>
