var Vuex = require('vuex')

expect.extend({
  toBeActionCalledWith(received, expected) {
    let pass = true
    let message = ''
    try {
      expect(received).toHaveBeenCalledWith(expect.anything(), expected, undefined)
    } catch (e) {
      pass = e.matcherResult.pass
      message = e.matcherResult.message
    }

    return {actual: received, message, pass}
  }
})

module.exports = class MockStoreBuilder{
  constructor (realStore) {
    this.state = realStore.state
    this.getters = realStore._wrappedGetters
    this.actions = realStore._actions

    for(const actionName in this.actions) {
      this.actions[actionName] = jest.fn()
    }

    this.inject = new Vuex.Store({
      state: this.state,
      getters: this.getters,
      actions: this.actions
    })
  }
}
