How to use

npm install --save vuex-test-util

--------------------------------------------------------

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

  it('should dispatch action setNameTo when setNameTo method is called', () => {
    subjectWrapper.find('input').element.value = "New Name"
    subjectWrapper.update()

    expect(store.actions.setNameTo).not.toBeCalled()

    //setNameTo Vue Component Method is invoked
    subjectInstance.setNameTo()

    // check if action named setNameTo in vuex store is invoked
    expect(store.actions.setNameTo).toBeActionCalledWith("New Name")
  })
})
