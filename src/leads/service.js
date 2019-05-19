import Vue from 'vue';

const LeadsService = {
  getLeads: query => Vue.http.post(`${Vue.config.apiServer}/api/2.0/dojoleads`, { query }),
  getLeadById: id => Vue.http.get(`${Vue.config.apiServer}/api/2.0/dojos/lead/${id}`),
  getLeadScore: id => Vue.http.get(`${Vue.config.apiServer}/api/3.0/leads_score/${id}`),
};

export default LeadsService;
