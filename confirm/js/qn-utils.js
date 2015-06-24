/**
 * Created by panfei on 2015/1/26.
 */
(function(qn) {
    var _toString =Object.prototype.toString;

    qn.utils = {
        isString : function(obj) {
            return _toString.apply(obj) === "[object String]";
        },

        isNumber : function(obj) {
            return _toString.apply(obj) === "[object Number]";
        },

        isDate : function(obj) {
            return _toString.apply(obj) === "[object Date]";
        },

        isBoolean : function(obj) {
            return _toString.apply(obj) === "[object Boolean]";
        },

        isArray : function(obj) {
            return _toString.apply(obj) === "[object Array]";
        },

        isSimpleObject : function(obj) {
            return _toString.apply(obj) === "[object Object]";
        },

        isNull : function(obj) {
            return _toString.apply(obj) === "[object Null]";
        },

        isUndefined : function(obj) {
            return _toString.apply(obj) === "[object Undefined]";
        }
    }

    if (!window.qn) {
        window.qn = qn;
    }

})(window.qn || {});
