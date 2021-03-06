(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SwiperPluginKeyboardControl = factory());
}(this, (function () { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function attachListener(el, evtName, handler, opts) {
    el.addEventListener(evtName, handler, opts);
  }
  function detachListener(el, evtName, handler) {
    el.removeEventListener(evtName, handler);
  }

  var DIRECTION = {
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft'
  };

  function isVisible(el) {
    if (!el) return false;
    var style = getComputedStyle(el);
    var visible = style.visibility !== 'hidden' && style.display !== 'none';
    if (!visible) return false;
    return el.parentElement && el.parentElement.nodeType === 1 ? isVisible(el.parentElement) : true;
  }

  function isElementInView(el) {
    var visibility = isVisible(el);
    var boundary = el.getBoundingClientRect();
    var isInView = boundary.top >= 0 && boundary.bottom <= window.innerHeight && boundary.left >= 0 && boundary.right <= window.innerWidth;
    return isInView && visibility;
  }
  /**
   * TinySwiper plugin for keyboard control.
   *
   * @param {SwiperInstance} instance
   * @param {Options}
   */


  function SwiperPluginKeyboardControl(instance, options) {
    if (!options.keyboard) return;
    var keyboardOptions = options.keyboard;
    var keyboard = {
      enable: function enable() {
        keyboardOptions.enabled = true;
      },
      disable: function disable() {
        keyboardOptions.enabled = false;
      },
      onKeyDown: function onKeyDown(e) {
        var key = e.key;
        if (keyboardOptions.onlyInViewport && !isElementInView(instance.env.element.$el) || !keyboardOptions.enabled) return;

        if (options.isHorizontal) {
          if (key === DIRECTION.left) {
            instance.slideTo(instance.state.index - 1);
          } else if (key === DIRECTION.right) {
            instance.slideTo(instance.state.index + 1);
          }
        } else {
          if (key === DIRECTION.down) {
            instance.slideTo(instance.state.index - 1);
          } else if (key === DIRECTION.up) {
            instance.slideTo(instance.state.index + 1);
          }
        }
      }
    };
    instance.on('before-init', function () {
      options.keyboard = _extends({
        enabled: true,
        onlyInViewport: true
      }, options.keyboard);
      instance.keyboard = keyboard;
      attachListener(window, 'keydown', keyboard.onKeyDown);
    });
    instance.on('after-destroy', function () {
      if (!keyboard) return;
      detachListener(window, 'keydown', keyboard.onKeyDown);
      delete instance.keyboard;
    });
  }

  return SwiperPluginKeyboardControl;

})));
//# sourceMappingURL=keyboardControl.js.map
