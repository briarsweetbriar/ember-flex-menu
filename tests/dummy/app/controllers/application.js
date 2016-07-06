import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  choices: [
    'Collard Greens',
    'Mustard Greens',
    'Onions', {
      text: 'Japanese Yams',
      value: 'yams'
    }, {
      text: 'Other',
      inputable: true
    }
  ],

  actions: {
    logChoice(choice) {
      console.log(choice);
    }
  }
})
