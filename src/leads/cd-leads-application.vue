<template>
	<div class="cd-leads-application">
		<leads-header :title="header"/>
    <div class="cd-leads-application__content">
      <div class="cd-leads-application__tables">
        <application-table :title="'Champion'" :data="champion" :columns="championCols"/>
        <application-table :title="'Venue'" :data="venue" :columns="venueCols"/>
        <application-table :title="'Dojo'" :data="dojo" :columns="dojoCols"/>
        <application-table :title="'Team'" :data="team" :columns="teamCols"/>
        <application-table :title="'Application Info'" :data="appInfo" :columns="appInfoCols"/>
        <application-table :title="'Prediction'" :data="prediction" :columns="predictionCols"/>
      </div>
    </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
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
        champion: {},
        dojo: {},
        venue: {},
        team: {},
        appInfo: {},
        prediction: {},
        score: null,
      };
    },
    components: {
      LeadsHeader,
      ApplicationTable,
    },
    computed: {
      ...mapGetters(['loggedInUser']),
      championCols() {
        return { name: 'Name', email: 'Email', parentName: 'Parent Name', parentEmail: 'Parent Email', phone: 'Phone #', reference: 'Reference' };
      },
      dojoCols() {
        return { name: 'Name', email: 'Email' };
      },
      venueCols() {
        return { location: 'Location', city: 'City', country: 'Country', type: 'Type', private: 'Private' };
      },
      teamCols() {
        return { team: 'Have a team?' };
      },
      appInfoCols() {
        return { created: 'Created', updated: 'Last Updated', submitted: 'Submitted', submittedAt: 'Submitted At', charter: 'Charter Signed' };
      },
      predictionCols() {
        return { score: 'Score', priority: 'Priority' };
      },
      priority() {
        if (this.score < 20) {
          return 'Small';
        } else if (this.score >= 20 && this.score < 70) {
          return 'Med';
        } return 'High';
      },
    },
    methods: {
      async getApplication() {
        const response = await LeadsService.getLeadById(this.leadId);
        this.leadApplication = response.body;
      },
      async getScore() {
        const score = (await LeadsService.getLeadScore(this.leadId)).body.score;
        this.score = score;
      },
      setSubs() {
        const application = this.leadApplication.application;
        this.champion = {
          name: `${application.champion.firstName} ${application.champion.lastName}`,
          email: application.champion.email,
          parentName: application.champion.parentName ? application.champion.parentName : 'N/A',
          parentEmail: application.champion.parentEmail ? application.champion.parentEmail : 'N/A',
          phone: application.champion.phone,
          reference: application.champion.reference,
        };
        this.dojo = {
          name: application.dojo.name,
          email: application.dojo.requestEmail ? 'Requested' : application.dojo.email,
        };
        this.venue = {
          location: application.venue.address1,
          city: application.venue.place.nameWithHierarchy,
          country: application.venue.country.countryName,
          type: application.venue.type,
          private: application.venue.private ? 'Yes' : 'No',
        };
        this.team = { team: application.team.src.staff ? 'Yes' : 'No' };
        this.appInfo = {
          created: `${this.leadApplication.createdAt.slice(0, 10)} ${this.leadApplication.createdAt.slice(11, 16)}`,
          updated: `${this.leadApplication.updatedAt.slice(0, 10)} ${this.leadApplication.updatedAt.slice(11, 16)}`,
          submitted: this.leadApplication.completed ? 'Yes' : 'No',
          submittedAt: this.leadApplication.completedAt ? `${this.leadApplication.completedAt.slice(0, 10)} ${this.leadApplication.completedAt.slice(11, 16)}` : '',
          charter: application.charter.isValid ? 'Yes' : 'No',
        };
        this.prediction = {
          score: this.score,
          priority: this.priority,
        };
      },
    },
    async created() {
      await this.getApplication();
      await this.getScore();
      this.setSubs();
    },
  };
</script>

<style scoped lang="less">
  @import "~@coderdojo/cd-common/common/_colors";
  @import "../common/styles/cd-primary-button.less";
  .cd-leads-application {
    display: flex;
    flex-direction: column;
/*    align-items: center;
    justify-content: center;*/

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__tables {
      display: flex;
      flex-wrap: wrap;
      width: 50%;
      justify-content: space-between;
    }
  }
</style>
