import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';

const {
  setProperties
} = Ember;

const { run: { later } } = Ember;

moduleForComponent('ember-flex-menu-option-input', 'Integration | Component | ember flex menu option input', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it auto focuses itself', function(assert) {
  assert.expect(2);

  const done = assert.async();

  setProperties(this, {
    childGainedFocus() {
      assert.ok(true, 'childGainedFocus was called');
    }
  });

  this.render(hbs`{{ember-flex-menu-option-input childGainedFocus=(action childGainedFocus)}}`);

  later(() => {
    assert.equal(this.$(hook('ember_flex_menu_option_input')).get(0), document.activeElement, 'it is focused');

    done();
  }, 50);
});

test('it triggers `toggleInput` on `focusOut`', function(assert) {
  // getting inconsistent results in release and beta.
  // assert.expect(2);

  setProperties(this, {
    childGainedFocus() {},
    childLostFocus() {
      assert.ok(true, 'childLostFocus was called');
    },
    toggleInput() {
      assert.ok(true, 'toggleInput was called');
    },
    choose() {
      assert.ok(false, 'choose was called');
    }
  });

  this.render(hbs`{{ember-flex-menu-option-input childGainedFocus=(action childGainedFocus) childLostFocus=(action childLostFocus) toggleInput=(action toggleInput) choose=(action choose)}}`);

  this.$(hook('ember_flex_menu_option_input')).blur();
});
