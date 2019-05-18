<template>
  <div class="row">
    <div class="cd-leads-list">
      <leads-table class= "cd-leads-list__table" :data="leads" :columns="columns"></leads-table>
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
        columns: [{ name: 'name', title: 'Name' }, { name: 'country', title: 'Country' }, { name: 'user', title: 'User' }, { name: 'dojoEmail', title: 'Dojo Email' }, { name: 'updated', title: 'Last Updated' }, { name: 'score', title: 'Score' }],
      };
    },
    components: {
      LeadsTable,
    },
    computed: {
      ...mapGetters(['loggedInUser']),
      leads() {
        return this.allLeads.map(lead => ({
          id: lead.id,
          name: lead.dojoName,
          country: lead.alpha2,
          user: lead.email,
          dojoEmail: lead.dojoEmail,
          created: lead.createdAt.slice(0, 10),
          updated: lead.updatedAt.slice(0, 10),
          completed: lead.completed,
          dojoId: lead.dojoId,
          score: lead.score,
        }));
      },
    },
    methods: {
      async getAllLeads() {
        const query = {
          deleted: 0,
        };
        this.allLeads = (await LeadsService.getLeads(query)).body;
      },
      async mapScores() {
        this.allLeads = await Promise.all(this.allLeads.map(async (lead) => {
          const score = (await LeadsService.getLeadScore(lead.id)).body.score;
          // eslint-disable-next-line no-param-reassign
          lead.score = score;
          return lead;
        }));
      },
    },
    async created() {
      await this.getAllLeads();
      await this.mapScores();
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
    align-items: center;
    justify-content: center;
    &__table {}
  }
</style>
