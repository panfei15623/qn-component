/**
 * Created by mengchen on 2015/1/17.
 */

(function(ko) {

    if (!ko) {
        throw new ReferenceError("ko is undefined, please include knockout.js first");
    }

    ko.components.register("qn-button", {
        viewModel : function(params) {
            this.buttonCls = (function(params) {
                if (!params.cls) {
                    return "btn btn-default";
                } else {
                    var finalClass = "btn";
                    var classParts = params.cls.split(" ");
                    for (var i = 0, len = classParts.length; i < len; i++) {
                        finalClass += " btn-" + classParts[i];
                    }

                    return finalClass;
                }
            })(params);

            this.iconCls = (function(params) {
                if (!params.icon) {
                    return null;
                } else {
                    return "glyphicon glyphicon-" + params.icon;
                }
            })(params);

            this.title = params.title ? " " + params.title : "";
        },
        template : (function() {
            var html = "";
            html += "<button type='button' data-bind='css: buttonCls'><span data-bind='css: iconCls'></span>" +
            "<!-- ko text: title --><!-- /ko --></button>";
            return html;
        })()
    });
})(window.ko);
