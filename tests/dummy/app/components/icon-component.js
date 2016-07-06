import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

const IconComponent = Component.extend({
  icon: computed('params.[]', {
    get() {
      return get(this, 'params')[0];
    }
  })
});

IconComponent.reopenClass({
  positionalParams: 'params'
});

export default IconComponent;
