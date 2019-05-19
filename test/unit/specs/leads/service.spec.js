import LeadsService from 'inject-loader!@/leads/service';
import Vue from 'vue';

describe.only('Leads Service', () => {
  let sandbox;
  let LeadsServiceWithMocks;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    LeadsServiceWithMocks = LeadsService().default;
  });

  afterEach(() => {
    sandbox.restore();
  });

  const expectedScore = { score: 17 };

  const expectedLeads = [{
    id: 'b850b40e-1e10-4e3a-8a46-d076c94946c6',
    email: 'test@test.com',
    completed: false,
    deleted: 0,
    verified: 0,
    alpha2: 'IE',
    dojoId: '2aba94e0-21d0-4db8-977b-6be3df30520a ',
    stage: 0,
    dojoName: 'Test',
    dojoEmail: null,
    updatedAt: '2019-05-18T19:30:05.617Z',
    createdAt: '2019-05-18T12:29:10.239Z',
    verifiedAt: null,
    completedAt: null,
  }];

  const expectedLead = [{
    id: 'b850b40e-1e10-4e3a-8a46-d076c94946c6',
    email: 'test@test.com',
    userId: '8bfdcd43-a9be-497c-8edb-7914f89d6952',
    application: {
      champion: { isValid: true, visited: true },
      dojo: { isValid: true, visited: true },
      venue: { isValid: true, visited: true },
      team: { isValid: false, visited: false },
      charter: { isValid: false, visited: false },
    },
  }];

  describe('getLeads()', () => {
    it('should get all leads that are not deleted', async () => {
      // ARRANGE
      const query = { deleted: 0 };

      sandbox.stub(Vue.http, 'post').withArgs(`${Vue.config.apiServer}/api/2.0/dojoleads`, { query }).returns(Promise.resolve({ body: expectedLeads }));

      // ACT
      LeadsServiceWithMocks.getLeads(query).then((resp) => {
        // ASSERT
        expect(resp.body).to.deep.equal(expectedLeads);
      });
    });
  });

  describe('getLeadById()', () => {
    it('should get a lead by it\'s id', async () => {
      // ARRANGE
      const id = 'b850b40e-1e10-4e3a-8a46-d076c94946c6';

      sandbox.stub(Vue.http, 'get').withArgs(`${Vue.config.apiServer}/api/2.0/dojos/lead/${id}`).returns(Promise.resolve({ body: expectedLead }));

      // ACT
      LeadsServiceWithMocks.getLeadById(id).then((resp) => {
        // ASSERT
        expect(resp.body).to.deep.equal(expectedLead);
      });
    });
  });

  describe('getLeadScore()', () => {
    it('should the score of a lead', async () => {
      // ARRANGE
      const id = 'ae1935f4-579f-44e9-bbe7-463157a75efd';

      sandbox.stub(Vue.http, 'get').withArgs(`${Vue.config.apiServer}/api/3.0/leads_score/${id}`).returns(Promise.resolve({ body: expectedLead }));

      // ACT
      LeadsServiceWithMocks.getLeadScore(id).then((resp) => {
      // ASSERT
        expect(resp.body).to.deep.equal(expectedScore);
      });
    });
  });
});
