import Vue from 'vue';

const LeadsService = {
  getDojos: query => Vue.http.post(`${Vue.config.apiServer}/api/2.0/dojos`, { query }),
  getLeads: query => Vue.http.post(`${Vue.config.apiServer}/api/2.0/dojoleads`, { query }),
};

export default LeadsService;
