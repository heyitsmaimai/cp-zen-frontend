import vueUnitHelper from 'vue-unit-helper';
import LeadsApplicationComponent from '!!vue-loader?inject!@/leads/cd-leads-application';

describe.only('Leads Application', () => {
  let sandbox;
  let MockLeadsService;
  let LeadsApplicationComponentWithMocks;


  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    MockLeadsService = {
      getLeadById: sandbox.stub(),
      getLeadScore: sandbox.stub(),
    };
    LeadsApplicationComponentWithMocks = LeadsApplicationComponent({
      './service': MockLeadsService,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('computed', () => {
    describe('championCols', () => {
      it('should return champion columns', () => {
        // ARRANGE
        const expected = { name: 'Name', email: 'Email', parentName: 'Parent Name', parentEmail: 'Parent Email', phone: 'Phone #', reference: 'Reference' };

        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);

        // ASSERT
        expect(vm.championCols).to.deep.equal(expected);
      });
    });

    describe('dojoCols', () => {
      it('should return dojos columns', () => {
        // ARRANGE
        const expected = { name: 'Name', email: 'Email' };

        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);

        // ASSERT
        expect(vm.dojoCols).to.deep.equal(expected);
      });
    });

    describe('venueCols', () => {
      it('should return venue columns', () => {
        // ARRANGE
        const expected = { location: 'Location', city: 'City', country: 'Country', type: 'Type', private: 'Private' };

        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);

        // ASSERT
        expect(vm.venueCols).to.deep.equal(expected);
      });
    });

    describe('teamCols', () => {
      it('should return team columns', () => {
        // ARRANGE
        const expected = { team: 'Have a team?' };

        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);

        // ASSERT
        expect(vm.teamCols).to.deep.equal(expected);
      });
    });

    describe('appInfoCols', () => {
      it('should return application info columns', () => {
        // ARRANGE
        const expected = { created: 'Created', updated: 'Last Updated', submitted: 'Submitted', submittedAt: 'Submitted At', charter: 'Charter Signed' };

        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);

        // ASSERT
        expect(vm.appInfoCols).to.deep.equal(expected);
      });
    });

    describe('predictionCols', () => {
      it('should return prediction columns', () => {
        // ARRANGE
        const expected = { score: 'Score', priority: 'Priority' };

        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);

        // ASSERT
        expect(vm.predictionCols).to.deep.equal(expected);
      });
    });

    describe('priority', () => {
      it('should return the priority from a score', () => {
        // ARRANGE
        const expected = 'Med';

        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);
        vm.score = 50;

        // ASSERT
        expect(vm.priority).to.deep.equal(expected);
      });
    });
  });

  describe('methods', () => {
    describe('methods.getApplication', () => {
      it('should get the lead application', async () => {
        // ARRANGE
        const mockLead = {
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
        };
        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);

        vm.leadApplication = [];

        MockLeadsService.getLeadById.resolves({ body: mockLead });

        // ACT
        await vm.getApplication();

        // ASSERT
        expect(vm.leadApplication).to.deep.equal(mockLead);
      });
    });

    describe('methods.getScore', () => {
      it('should get the score of the lead', async () => {
        // ARRANGE
        const mockScore = { score: 10 };

        MockLeadsService.getLeadScore.resolves({ body: mockScore });

        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);

        vm.score = null;
        vm.leadId = 'b850b40e-1e10-4e3a-8a46-d076c94946c6';

        // ACT
        await vm.getScore();

        expect(vm.score).to.equal(mockScore.score);
      });
    });

    describe('methods.setSubs', () => {
      it('should set all subcategories of the application', () => {
        // ARRANGE
        const expectChamp = { name: '1 1', email: '1', parentName: 'N/A', parentEmail: 'N/A', phone: '1', reference: '1' };
        const expectDojo = { name: '1', email: '1' };
        const expectVenue = { location: '1', city: '1', country: '1', type: '1', private: 'No' };
        const expectTeam = { team: 'Yes' };
        const expectAppInfo = { created: '2019-05-18 19:30', updated: '2019-05-18 19:30', submitted: 'No', submittedAt: '', charter: 'No' };
        const expectPrediction = { score: 10, priority: 'Small' };


        const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);
        vm.score = 10;
        vm.priority = 'Small';
        vm.leadApplication = {
          id: 'b850b40e-1e10-4e3a-8a46-d076c94946c6',
          email: 'test@test.com',
          userId: '8bfdcd43-a9be-497c-8edb-7914f89d6952',
          application: {
            champion: { firstName: '1', lastName: '1', email: '1', phone: '1', reference: '1' },
            dojo: { name: '1', email: '1' },
            venue: { address1: '1', place: { nameWithHierarchy: '1' }, country: { countryName: '1' }, type: '1', private: false },
            team: { src: { staff: true } },
            charter: { isValid: false },
          },
          createdAt: '2019-05-18T19:30:05.617Z',
          updatedAt: '2019-05-18T19:30:05.617Z',
          completed: false,
        };
        vm.champion = {};
        vm.dojo = {};
        vm.venue = {};
        vm.team = {};
        vm.appInfo = {};

        vm.setSubs();

        expect(vm.champion).to.deep.equal(expectChamp);
        expect(vm.dojo).to.deep.equal(expectDojo);
        expect(vm.venue).to.deep.equal(expectVenue);
        expect(vm.team).to.deep.equal(expectTeam);
        expect(vm.appInfo).to.deep.equal(expectAppInfo);
        expect(vm.prediction).to.deep.equal(expectPrediction);
      });
    });
  });

  describe('created', () => {
    it('should call each method to load ', async () => {
      const vm = vueUnitHelper(LeadsApplicationComponentWithMocks);
      vm.getApplication = sinon.stub().resolves();
      vm.getScore = sinon.stub().resolves();
      vm.setSubs = sinon.stub().resolves();

      await vm.$lifecycleMethods.created();

      expect(vm.getApplication).to.have.been.calledOnce;
      expect(vm.getScore).to.have.been.calledOnce;
      expect(vm.setSubs).to.have.been.calledOnce;
    });
  });
});

