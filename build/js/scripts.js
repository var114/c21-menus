(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var UI;

UI = require('./MultiStructuralDocumentDatabaseAuthoringUI');

module.exports = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount: function() {
    return this.bindAsObject(this.props.firebaseRef, "products");
  },
  destroy: function(id) {
    console.log(id);
    return this.props.firebaseRef.child(id).remove();
  },
  getInitialState: function() {
    return {
      products: []
    };
  },
  render: function() {
    return R.div({
      className: "products"
    }, UI.Form({
      listProps: this.props.listProps,
      firebaseRef: this.props.firebaseRef
    }), UI.Menu({
      products: this.state.products,
      listProps: this.props.listProps,
      onDestroy: this.destroy
    }));
  }
});


},{"./MultiStructuralDocumentDatabaseAuthoringUI":5}],2:[function(require,module,exports){
var EditorUI;

module.exports = EditorUI = React.createClass({
  handleSubmit: function(e) {
    var key, makeId, props, uniqueId, userInput, values, _ref;
    e.preventDefault();
    values = {};
    uniqueId = "";
    makeId = function(text) {
      return text.toLowerCase();
    };
    _ref = this.props.listProps;
    for (key in _ref) {
      props = _ref[key];
      values[key] = userInput = this.refs[key].getDOMNode().value.trim();
      console.log(props.number);
      if (props.idMaker) {
        uniqueId = makeId(userInput);
      }
    }
    return this.props.firebaseRef.child(uniqueId).setWithPriority(values, -Date.now(), (function(_this) {
      return function(error) {
        return _this.clearForm();
      };
    })(this));
  },
  clearForm: function() {
    var key, props, _ref, _results;
    _ref = this.props.listProps;
    _results = [];
    for (key in _ref) {
      props = _ref[key];
      _results.push(this.refs[key].getDOMNode().value = '');
    }
    return _results;
  },
  render: function() {
    var $1, $2, $3, key, props;
    return R.form({
      onSubmit: this.handleSubmit
    }, (function() {
      var _ref, _results;
      _ref = this.props.listProps;
      _results = [];
      for (key in _ref) {
        props = _ref[key];
        $1 = R.label({
          "for": key
        }, "" + key + " ");
        $2 = R.input(_.extend({
          ref: key,
          id: key,
          className: props.className
        }, props.attr));
        $3 = R.button(_.extend({
          ref: key,
          id: key,
          className: props.className
        }));
        if (props.form) {
          _results.push([$1, $2]);
        } else {
          _results.push([$3]);
        }
      }
      return _results;
    }).call(this), R.hr(null), R.button({
      className: "btn btn-lg btn-block btn-primary",
      type: "submit"
    }, "Create"));
  }
});


},{}],3:[function(require,module,exports){
var MenuUI;

module.exports = MenuUI = React.createClass({
  render: function() {
    var id, key, product, props;
    return R.div({
      className: "c21-food-container"
    }, R.div({
      className: "c21-food-menu"
    }, (function() {
      var _ref, _results;
      _ref = this.props.products;
      _results = [];
      for (id in _ref) {
        product = _ref[id];
        _results.push(R.div({
          className: "c21-food-item",
          key: id
        }, (function() {
          var _ref1, _results1;
          _ref1 = this.props.listProps;
          _results1 = [];
          for (key in _ref1) {
            props = _ref1[key];
            if (props.number) {
              _results1.push(R.span(null, product[key] || ' '));
            } else {
              _results1.push(R.div(null, product[key] || ' '));
            }
          }
          return _results1;
        }).call(this), R.div(null, R.button({
          onClick: this.props.onDestroy.bind(this, id),
          className: "btn btn-warning"
        }, R.div({
          className: "fui-cross"
        })))));
      }
      return _results;
    }).call(this)));
  }
});


},{}],4:[function(require,module,exports){
var ReactSwitch, TableUI;

ReactSwitch = React.createClass({
  componentDidMount: function() {
    return $(this.getDOMNode()).wrap('<div class="switch" />').parent().bootstrapSwitch();
  },
  render: function() {
    return R.input({
      type: "checkbox",
      checked: true,
      "data-toggle": "switch"
    });
  }
});

module.exports = TableUI = React.createClass({
  render: function() {
    var id, key, product, props;
    return R.table({
      className: "tablesaw tablesaw-stack",
      "data-mode": "stack"
    }, R.thead(null, R.tr(null, (function() {
      var _ref, _results;
      _ref = this.props.listProps;
      _results = [];
      for (key in _ref) {
        props = _ref[key];
        _results.push(R.th(null, key));
      }
      return _results;
    }).call(this), R.th(null, "on sale"), R.th(null, "delete"), R.th(null, "menu"))), R.tbody(null, (function() {
      var _ref, _results;
      _ref = this.props.products;
      _results = [];
      for (id in _ref) {
        product = _ref[id];
        _results.push(R.tr({
          key: id
        }, (function() {
          var _ref1, _results1;
          _ref1 = this.props.listProps;
          _results1 = [];
          for (key in _ref1) {
            props = _ref1[key];
            _results1.push(R.td(null, product[key] || ' '));
          }
          return _results1;
        }).call(this), R.td(null, ReactSwitch()), R.td(null, R.button({
          onClick: this.props.onDestroy.bind(this, id),
          className: "btn btn-warning"
        }, R.span({
          className: "fui-cross"
        }))), R.td(null, R.button({
          className: "btn btn-warning"
        }, "menu"))));
      }
      return _results;
    }).call(this)));
  }
});


},{}],5:[function(require,module,exports){
exports.Form = require('./Form');

exports.Table = require('./Table');

exports.Menu = require('./Menu');


},{"./Form":2,"./Menu":3,"./Table":4}],6:[function(require,module,exports){
var ProductsApp, ProductsRef, ProductsURL, component, foodListProps, mountNode;

window.R = React.DOM;

foodListProps = {
  title: {
    className: "form-control",
    idMaker: true,
    form: true,
    attr: {
      placeholder: "Unique name"
    }
  },
  price: {
    className: "form-control",
    form: true,
    number: true,
    attr: {
      placeholder: "Name yo' price"
    }
  },
  ingredients: {
    className: "tagsinput",
    form: true
  },
  category: {
    className: "btn btn-primary"
  }
};

ProductsURL = "https://glowing-fire-9751.firebaseio.com/products";

ProductsRef = new Firebase(ProductsURL);

ProductsApp = require('./FireList');

mountNode = document.getElementById('product-list');

component = ProductsApp({
  listProps: foodListProps,
  firebaseRef: ProductsRef
});

React.renderComponent(component, mountNode);


},{"./FireList":1}]},{},[6])