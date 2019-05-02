<template>
  <div class="row">
    <div class="cd-leads-list">
      <!-- <h3 class="cd-leads-list__header">List of Leads</h3> -->
      <grid :data="leads" :columns="gridColumns"></grid>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import LeadsService from './service';
  import Grid from './grid';
  import Tble from './tble';

  export default {
    name: 'cd-leads-list',
    data() {
      return {
        allLeads: [],
        gridColumns: ['Name', 'Country', 'Email', 'Created', 'Updated', 'Completed', 'Priority'],
      };
    },
    components: {
      Grid,
      Tble,
    },
    computed: {
      ...mapGetters(['loggedInUser']),
      leads() {
        return this.allLeads.map(lead => (Object.assign({
          Name: lead.dojoName,
          Country: lead.alpha2,
          Email: lead.email,
          DojoEmail: lead.dojoEmail,
          Created: lead.createdAt.slice(0, 10),
          Updated: lead.updatedAt.slice(0, 10),
          Completed: lead.completed,
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
  }
</style>
