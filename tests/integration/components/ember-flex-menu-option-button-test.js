import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { initialize as initializeHook } from 'ember-hook';
import { hook } from 'ember-hook';

const {
  set,
  setProperties
} = Ember;

moduleForComponent('ember-flex-menu-option-button', 'Integration | Component | ember flex menu option button', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it renders the button attributes correctly', function(assert) {
  assert.expect(2);

  set(this, 'choice', {
    class: 'foo'
  });

  this.render(hbs`{{ember-flex-menu-option-button choice=choice}}`);

  const $button = this.$(hook('ember_flex_menu_option_button'));

  assert.ok($button.is('button'), 'it is a button');
  assert.ok($button.hasClass('foo'), 'has the correct class');
});

test('it renders the button text correctly', function(assert) {
  assert.expect(1);

  const text = 'foo';

  set(this, 'choice', {
    text
  });

  this.render(hbs`{{ember-flex-menu-option-button choice=choice}}`);

  assert.equal(this.$(hook('ember_flex_menu_option_button_text')).text().trim(), text, 'text rendered correctly');
});

test('it renders an icon if one is provided', function(assert) {
  assert.expect(1);

  set(this, 'choice', {
    icon: 'foo',
    iconFamily: 'icon-component'
  });

  this.render(hbs`{{ember-flex-menu-option-button choice=choice}}`);

  assert.equal(this.$(hook('ember_flex_menu_option_button_icon')).text().trim(), 'foo', 'icon rendered correctly');
});

test('when clicked, it triggers `choose` by default', function(assert) {
  assert.expect(1);

  setProperties(this, {
    toggleInput() {
      assert.ok(false, 'toggleInput was called');
    },
    choose() {
      assert.ok(true, 'choose was called');
    }
  });

  this.render(hbs`{{ember-flex-menu-option-button choice=choice toggleInput=(action toggleInput) choose=(action choose)}}`);

  this.$(hook('ember_flex_menu_option_button')).click();
});

test('when clicked, it triggers `toggleInput` if the choice is `inputable`', function(assert) {
  assert.expect(1);

  setProperties(this, {
    choice: {
      inputable: true
    },
    toggleInput() {
      assert.ok(true, 'toggleInput was called');
    },
    choose() {
      assert.ok(false, 'choose was called');
    }
  });

  this.render(hbs`{{ember-flex-menu-option-button choice=choice toggleInput=(action toggleInput) choose=(action choose)}}`);

  this.$(hook('ember_flex_menu_option_button')).click();
});
