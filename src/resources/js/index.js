"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Demo =
/*#__PURE__*/
function () {
  function Demo() {
    _classCallCheck(this, Demo);

    this.a = 123;
  }

  _createClass(Demo, [{
    key: "sayA",
    value: function sayA() {
      console.log(this.a);
    }
  }]);

  return Demo;
}();

var d = new Demo();
console.log(d.sayA());
//# sourceMappingURL=index.js.map
