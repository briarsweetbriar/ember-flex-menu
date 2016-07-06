import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  choices: [
    'Collard Greens',
    'Mustard Greens',
    'Japanese Yams',
    'Apricots', {
      text: 'Other',
      inputable: true
    }
  ]
})
