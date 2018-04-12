How to use

npm install --save vuex-test-util

--------------------------------------------------------

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

  it('should dispatch action actionWithMultipleParameters when methodInvokingAction is called', () => {
    expect(store.actions.actionWithMultipleParameters).not.toBeCalled()

    subjectInstance.methodInvokingAction('parameter1', 'parameter2')

    expect(store.actions.actionWithMultipleParameters).toBeActionCalledWith({firstParam: 'parameter1', secondParam: 'parameter2'})
  })
})
```
