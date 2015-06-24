/**
 * Created by mengchen on 2015/1/17.
 */

(function(qn, $) {

    if (!$) {
        throw new ReferenceError("$ is undefined, please include jquery.js first");
    }

    var defaults = {
        TIP : "提示",
        OK : "确定"
    };

    qn.alert = function(message, options) {
        if (qn.utils.isNull(message) || qn.utils.isUndefined(message)) {
            message = "";
        } else {
            message = message.toString();
        }
        var size = options && options.size || "";
        var showTitle = options && options.showTitle;
        var title = options && options.title || defaults.TIP;
        getAlertModal().setContent(message).setSize(size).setTitle(title).setShowTitle(showTitle).popUp();
    };

    var alertModalTemplate = (function() {
        var html = "";
        html += "<div id='qn-alert-modal' class='modal fade'>";
        html += "   <div id='qn-alert-modal-dialog' class='modal-dialog'>";
        html += "       <div class='modal-content'>";
        html += "           <div id='qn-alert-modal-header' class='modal-header'>";
        html += "               <h4 class='modal-title' id='qn-alert-modal-title'>" + defaults.TIP + "</h4>";
        html += "           </div>";
        html += "           <div class='modal-body'>";
        html += "               <span id='qn-alert-modal-body'></span>";
        html += "           </div>";
        html += "           <div class='modal-footer'>";
        html += "               <button class='btn btn-info btn-sm' data-dismiss='modal'>" + defaults.OK + "</button>";
        html += "           </div>";
        html += "       </div>";
        html += "   </div>";
        html += "</div>";

        return html;
    })();

    var alertModal = {
        setContent : function(message) {
            $("#qn-alert-modal-body").text(message);
            return this;
        },

        setSize : function(size) {
            if (!size) {
                $("#qn-alert-modal-dialog").removeClass().addClass("modal-dialog");
            } else {
                if (size !== "sm" && size !== "lg") {
                    throw new TypeError("size must be 'sm' or 'lg' or empty");
                }
                $("#qn-alert-modal-dialog").removeClass().addClass("modal-dialog").addClass("modal-" + size);
            }
            return this;
        },

        setTitle : function(title) {
            if (title != defaults.TIP) {
                $("#qn-alert-modal-title").text(title);
            }
            return this;
        },

        setShowTitle : function(showTitle) {
            $("#qn-alert-modal-header")[showTitle ? 'show' : 'hide']();
            return this;
        },

        popUp : function() {
            $("#qn-alert-modal").modal({backdrop:'static'});
        }
    };

    var getAlertModal = function() {
        if (!$("#qn-alert-modal").get(0)) {
            $(document.body).append(alertModalTemplate);
        }
        return alertModal;
    };

    if (!window.qn) {
        window.qn = qn;
    }

})(window.qn || {}, window.$);