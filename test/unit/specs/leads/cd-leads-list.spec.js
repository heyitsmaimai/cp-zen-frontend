import vueUnitHelper from 'vue-unit-helper';
import LeadsListComponent from '!!vue-loader?inject!@/leads/cd-leads-list';

describe.only('Leads List', () => {
  let sandbox;
  let MockLeadsService;
  let LeadsListComponentWithMocks;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    MockLeadsService = {
      getLeads: sandbox.stub(),
      getLeadScore: sandbox.stub(),
    };
    LeadsListComponentWithMocks = LeadsListComponent({
      './service': MockLeadsService,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('computed', () => {
    describe('leads', () => {
      it('should map allLeads to a new array of objects', () => {
        // ARRANGE
        const vm = vueUnitHelper(LeadsListComponentWithMocks);
        vm.allLeads = [{
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
          score: 10,
          priority: 'Small',
        }];

        // ASSERT
        expect(vm.leads).to.deep.equal([{ id: 'b850b40e-1e10-4e3a-8a46-d076c94946c6', name: 'Test', country: 'IE', user: 'test@test.com', dojoEmail: null, created: '2019-05-18', updated: '2019-05-18', completed: false, dojoId: '2aba94e0-21d0-4db8-977b-6be3df30520a ', score: 10, priority: 'Small' }]);
      });
    });
  });

  describe('methods', () => {
    describe('methods.getAllLeads', () => {
      it('should load all the non-deleted leads', async () => {
        // ARRANGE
        const mockLeads = [{
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
          score: 10,
          priority: 'Small',
        }];

        MockLeadsService.getLeads.resolves({ body: mockLeads });

        const vm = vueUnitHelper(LeadsListComponentWithMocks);

        vm.allLeads = [];

        // ACT
        await vm.getAllLeads();

        // ASSERT
        expect(vm.allLeads).to.deep.equal(mockLeads);
      });
    });

    describe('methods.mapScores', () => {
      it('should get the score and priority of a lead and map it into the lead', async () => {
        // ARRANGE
        const mockScore = { score: 10 };

        MockLeadsService.getLeadScore.resolves({ body: mockScore });

        const vm = vueUnitHelper(LeadsListComponentWithMocks);

        vm.allLeads = [{
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

        vm.getPriority = sandbox.stub().returns('Small');

        // ACT
        await vm.mapScores();

        // ASSERT
        expect(vm.allLeads).to.deep.equal([{
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
          score: 10,
          priority: 'Small',
        }]);
        expect(vm.getPriority).to.have.been.calledOnce;
      });
    });

    describe('methods.getPriority', () => {
      it('should get the priority of a lead based on the score', async () => {
        // ARRANGE
        const score = 10;
        const expectedPriority = 'Small';

        const vm = vueUnitHelper(LeadsListComponentWithMocks);

        // ACT
        const priority = await vm.getPriority(score);

        // ASSERT
        expect(priority).to.deep.equal(expectedPriority);
      });
    });
  });

  describe('created', () => {
    it('should call each method to load the leads', async () => {
      const vm = vueUnitHelper(LeadsListComponentWithMocks);
      vm.getAllLeads = sinon.stub().resolves();
      vm.mapScores = sinon.stub().resolves();
      vm.allLeads = [];

      await vm.$lifecycleMethods.created();
      expect(vm.getAllLeads).to.have.been.calledOnce;
      expect(vm.mapScores).to.have.been.calledOnce;
    });
  });
});

