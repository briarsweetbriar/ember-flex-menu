import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  choices: [
    'Collard Greens',
    'Mustard Greens',
    'Kale',
    'Garlic',
    'Onions',
    'Butternut Squash', {
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
});
