/*global history */
'use strict';

define(function (require) {
  var dom = {},
      slice = Array.prototype.slice;

  var actions = {

    back: function(evt) {
      history.back();
    },

    forward: function(evt) {
      history.forward();
    },

    addHistory: function(evt) {
      // Do not want the form going anywhere
      evt.preventDefault();

      var text = dom.inputText.value.trim();
      dom.inputText.value = '';
      if (!text) {
        return;
      }

      var state = {
        message: text
      };

      history.pushState(state,
                        'TITLE: ' + text,
                        '#' + encodeURIComponent(text));

      // pushState does not trigger popState or hashChange,
      // so do a manual update now.
      actions.displayState();
    },

    displayState: function() {
      var state = history.state,
          length = history.length,
          url = location.href;

      dom.state.textContent = JSON.stringify(state);
      dom.length.textContent = length;
      dom.location.textContent = url;

      // Set button state.
      if (length === 1) {
        dom.back.disabled = true;
      } else {
        dom.back.disabled = false;
      }
    }
  };

  function init() {
    // Wire up dom
    slice.call(document.querySelectorAll('[data-bind]')).forEach(
      function(node) {
        // Bind nodes to local dom object
        dom[node.dataset.bind] = node;

        // Bind events to actions
        var action = node.dataset.action;
        if (action) {
          var parts = action.split(':'),
              eventName = parts[0].trim(),
              actionName = parts[1].trim();

          node.addEventListener(eventName, actions[actionName]);
        }
      }
    );

    actions.displayState();
  }

  if (document.readyState === 'interactive' ||
      document.readyState === 'complete') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  window.addEventListener('popstate', actions.displayState, false);

  // Return an exports, just useful for debugging in console.
  return {
    dom: dom,
    actions: actions
  };
});
