import vueUnitHelper from 'vue-unit-helper';
import SpecialReqComponent from '@/common/cd-special-req-component';

describe('Special Requirement Component', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('methods', () => {
    describe('methods.onBlur()', () => {
      it('should emit a blur event after 50ms and assign the timeout to blurTimeout', () => {
        // ARRANGE
        const vm = vueUnitHelper(SpecialReqComponent);
        sandbox.stub(window, 'setTimeout').callsFake((cb) => {
          cb();
          return 'foo';
        });
        const emitStub = sandbox.stub();
        vm.$emit = emitStub;

        // ACT
        vm.onBlur();

        // ASSERT
        expect(window.setTimeout).to.have.been.calledOnce;
        expect(window.setTimeout).to.have.been.calledWith(sinon.match.func, 50);
        expect(vm.$emit).to.have.been.calledOnce;
        expect(vm.$emit).to.have.been.calledWith('blur');
        expect(vm.blurTimeout).to.equal('foo');
      });
    });

    describe('methods.onFocus()', () => {
      it('should clear any existing blur timeout', () => {
        // ARRANGE
        const vm = vueUnitHelper(SpecialReqComponent);
        sandbox.stub(window, 'clearTimeout');
        vm.blurTimeout = 'foo';

        // ACT
        vm.onFocus();

        // ASSERT
        expect(window.clearTimeout).to.have.been.calledOnce;
        expect(window.clearTimeout).to.have.been.calledWith('foo');
      });
    });
  });

  describe('computed', () => {
    describe('computed.hasSpecialReq', () => {
      it('should return true if yes is selected', async () => {
        // ARRANGE
        const vm = vueUnitHelper(SpecialReqComponent);
        vm.specialReqSelect = 'yes';

        // ACT

        // ASSERT
        expect(vm.hasSpecialReq).to.equal(true);
      });

      it('should return false if no is selected', async () => {
        // ARRANGE
        const vm = vueUnitHelper(SpecialReqComponent);
        vm.specialReqSelect = '';

        // ACT

        // ASSERT
        expect(vm.hasSpecialReq).to.equal(false);
      });
    });

    describe('computed.specialRequirement', () => {
      it('should return the input requirement value if the if yes was selected', async () => {
        // ARRANGE
        const vm = vueUnitHelper(SpecialReqComponent);
        vm.specialReqSelect = 'yes';
        vm.specialReqInput = 'Need wheelchair access';

        // ACT

        // ASSERT
        expect(vm.specialRequirement).to.equal('Need wheelchair access');
      });

      it('should return the undefined value if no is the selected option', async () => {
        // ARRANGE
        const vm = vueUnitHelper(SpecialReqComponent);
        vm.specialReqSelect = '';

        // ACT

        // ASSERT
        expect(vm.specialRequirement).to.equal('');
      });
    });
  });

  describe('watch', () => {
    describe('specialRequirement()', () => {
      it('should emit an "input" event with any updated specialRequirement', () => {
        // ARRANGE
        const vm = vueUnitHelper(SpecialReqComponent);
        const mockSpecialReq = 'Need lots of desk space';
        const emitStub = sandbox.stub();
        vm.$emit = emitStub;
        vm.specialRequirement = mockSpecialReq;

        // ACT
        vm.$watchers.specialRequirement();

        // ASSERT
        expect(emitStub).to.have.been.calledWith('input', mockSpecialReq);
      });
    });
  });
});