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
  assert.equal(this.$(hook('ember_columnar_menu_column')).length, 2, 'the correct number of columns was rendered');
  assert.equal(this.$(hook('ember_columnar_menu_column')).first().find(hook('ember_columnar_menu_option')).length, 2, 'the correct number of choices were rendered per column');
});
