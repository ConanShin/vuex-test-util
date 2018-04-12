Vuex Store Mocking Library for Jest Test

How to Install
```
npm install --save vuex-test-util
```

--------------------------------------------------------

How to Use
```ruby
import { shallow } from 'vue-test-utils'
import MockStoreBuilder from 'vuex-test-util'
import realStore from '@/store'
import VuexTest from '@/components/VuexTest'
describe('VuexTest.vue', () => {
  let subjectWrapper, subjectInstance, store
  beforeEach(() => {
    store = new MockStoreBuilder(realStore)

    subjectWrapper = shallow(VuexTest, { store: store.inject })
    subjectInstance = subjectWrapper.vm
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should dispatch action actionWithoutParameter when methodInvokingAction is called without parameter', () => {
    expect(store.actions.actionWithoutParameter).not.toBeCalled()

    subjectInstance.methodInvokingActionNoParam()

    expect(store.actions.actionWithoutParameter).toBeCalled()
  })

  it('shoud disptch action actionWithParameter when methodInvokingAction is called with one parameter', () => {
    expect(store.actions.actionWithParameter).not.toBeCalled()

    subjectInstance.methodInvokingActionOneParam('single parameter')

    expect(store.actions.actionWithParameter).toBeActionCalledWith('single parameter')
  })

  it('should dispatch action actionWithMultipleParameters when methodInvokingAction is called with multiple parameters', () => {
    expect(store.actions.actionWithMultipleParameters).not.toBeCalled()

    subjectInstance.methodInvokingActionTwoParams('parameter1', 'parameter2')

    expect(store.actions.actionWithMultipleParameters).toBeActionCalledWith({firstParam: 'parameter1', secondParam: 'parameter2'})
  })
})
```
