import vueUnitHelper from 'vue-unit-helper';
import LeadsListTableComponent from '!!vue-loader?inject!@/leads/cd-leads-list-table';

describe.only('Leads List Table', () => {
  let sandbox;
  let LeadsListTableComponentWithMocks;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    LeadsListTableComponentWithMocks = LeadsListTableComponent();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('computed', () => {
    describe('filteredData', () => {
      it('should filter all data', () => {
        // ARRANGE
        const expectedData = [{
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

        const vm = vueUnitHelper(LeadsListTableComponentWithMocks);
        vm.data = [{
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
        expect(vm.filteredData).to.deep.equal(expectedData);
      });
    });
  });

  describe('methods', () => {
    describe('methods.sortBy', () => {
      it('should sort by key', async () => {
        // ARRANGE

        const expectedSortOrders = { key1: -1, key2: 1 };
        const vm = vueUnitHelper(LeadsListTableComponentWithMocks);

        vm.sortKey = 'key1';
        vm.sortOrders = { key1: 1, key2: 1 };

        // ACT
        vm.sortBy('key1');

        // ASSERT
        expect(vm.sortOrders).to.deep.equal(expectedSortOrders);
      });
    });

    describe('methods.viewApplication', () => {
      it('should push the lead application page to the router', async () => {
        // ARRANGE
        const leadId = 'b850b40e-1e10-4e3a-8a46-d076c94946c6';

        const vm = vueUnitHelper(LeadsListTableComponentWithMocks);

        vm.$router = {
          push: sandbox.spy(),
        };

        vm.viewApplication(leadId);

        expect(vm.$router.push).to.be.calledWith({ name: 'LeadApplication', params: { leadId } });
      });
    });

    describe('methods.initializeSortOrders', () => {
      it('should initialize sortOrders', async () => {
        // ARRANGE
        const vm = vueUnitHelper(LeadsListTableComponentWithMocks);

        const result = vm.initializeSortOrders([]);

        expect(result).to.deep.equal({});
      });
    });
  });

  describe('created', () => {
    it('should call each variable to load ', async () => {
      const vm = vueUnitHelper(LeadsListTableComponentWithMocks);
      vm.searchQuery = sinon.stub().resolves();
      vm.sortKey = sinon.stub().resolves();
      vm.sortOrders = sinon.stub().resolves({});
      vm.columns = sinon.stub().resolves([]);
      vm.initializeSortOrders = sinon.stub().resolves();

      await vm.$lifecycleMethods.created();

      expect(vm.initializeSortOrders).to.have.been.calledOnce;
    });
  });
});

