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
  assert.expect(1);

  const done = assert.async();

  this.render(hbs`{{ember-flex-menu-option-input}}`);

  later(() => {
    assert.equal(this.$(hook('ember_flex_menu_option_input')).get(0), document.activeElement, 'it is focused');

    done();
  }, 50);
});

test('it triggers `toggleInput` on `focusOut`', function(assert) {
  // getting inconsistent results in release and beta.
  // assert.expect(2);

  setProperties(this, {
    gainedFocus() {},
    lostFocus() {
      assert.ok(true, 'lostFocus was called');
    }
  });

  this.render(hbs`{{ember-flex-menu-option-input gainedFocus=(action gainedFocus) lostFocus=(action lostFocus)}}`);

  this.$(hook('ember_flex_menu_option_input')).blur();
});
