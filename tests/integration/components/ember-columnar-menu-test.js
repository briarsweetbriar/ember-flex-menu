import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';

const {
  set
} = Ember;

moduleForComponent('ember-columnar-menu', 'Integration | Component | ember columnar menu', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it renders a header if provided', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ember-columnar-menu header="foo"}}`);

  assert.equal(this.$(hook('ember_columnar_menu_header')).text().trim(), 'foo', 'header was rendered');
});

test('it renders the list of choices', function(assert) {
  assert.expect(1);

  const choices = [{}, {}, {}];

  set(this, 'choices', choices);

  this.render(hbs`{{ember-columnar-menu
    choices=choices
  }}`);

  assert.equal(this.$(hook('ember_columnar_menu_option')).length, 3, 'the correct number of choices was rendered');
});

test('it renders the list of choices in columns', function(assert) {
  assert.expect(3);

  const choices = [{}, {}, {}];

  set(this, 'choices', choices);

  this.render(hbs`{{ember-columnar-menu
    choices=choices
    columns=2
  }}`);

  assert.equal(this.$(hook('ember_columnar_menu_option')).length, 3, 'the correct number of choices was rendered');
  assert.equal(this.$(hook('ember_columnar_menu_row')).length, 2, 'the correct number of columns was rendered');
  assert.equal(this.$(hook('ember_columnar_menu_row')).first().find(hook('ember_columnar_menu_option')).length, 2, 'the correct number of choices were rendered per column');
});

test('an item can grow to take up more than one cell', function(assert) {
  assert.expect(7);

  const choices = [{}, {}, {}, { grow: 2, text: 'grown' }, {}];

  set(this, 'choices', choices);

  this.render(hbs`{{ember-columnar-menu
    choices=choices
    columns=2
  }}`);

  assert.equal(this.$(hook('ember_columnar_menu_option')).length, 5, 'the correct number of choices was rendered');
  assert.equal(this.$(hook('ember_columnar_menu_row')).length, 4, 'the correct number of columns was rendered');
  assert.equal(this.$(hook('ember_columnar_menu_row')).first().find(hook('ember_columnar_menu_option')).length, 2, 'the correct number of choices were rendered in the first column');
  assert.equal(this.$(hook('ember_columnar_menu_row')).eq(1).find(hook('ember_columnar_menu_option')).length, 1, 'the correct number of choices were rendered in the second column');
  assert.equal(this.$(hook('ember_columnar_menu_row')).eq(2).find(hook('ember_columnar_menu_option')).length, 1, 'the correct number of choices were rendered in the third column');
  assert.equal(this.$(hook('ember_columnar_menu_row')).eq(3).find(hook('ember_columnar_menu_option')).length, 1, 'the correct number of choices were rendered in the fourth column');
  assert.equal(this.$(hook('ember_columnar_menu_row')).eq(2).find(hook('ember_columnar_menu_option')).text().trim(), 'grown', 'the grown cell is in the correct row');
});
