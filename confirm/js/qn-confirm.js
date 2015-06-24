/**
 * Created by panfei on 2015/1/26.
 */
(function(qn,$){

    "use strict";

    if(!$) {
        throw new ReferenceError("$ is undefined,please include jquery.js first");
    }

    var defaults = {
        TIP : "提示",
        OK : "确定",
        CANCEL : "取消"
    };

    qn.confirm = function(message,options,judge) {
        if (qn.utils.isNull(message) || qn.utils.isUndefined(message)) {
            message = "";
        } else {
            message = message.toString();
        }
        var size = options && options.size || "";
        var title = options && options.title || defaults.TIP;
        var showTitle = options && options.showTitle;
        var btnColor = options && options.btnColor || "";
        getConfirmModal().setContent(message).setSize(size).setTitle(title).setShowTitle(showTitle).setBtnColor(btnColor).setCallback(judge).popUp();
       // $("#ok, #cancel").unbind("click");

    };

    var confirmModalTemplate = (function() {
        var html = "";
        html += "<div id='qn-confirm-modal' class='modal fade'>";
        html += "   <div id='qn-confirm-modal-dialog' class='modal-dialog'>";
        html += "       <div class='modal-content'>";
        html += "           <div id='qn-confirm-modal-header' class='modal-header'>";
        html += "               <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
        html +="                <h4 class='modal-title' id='qn-confirm-modal-title'>" + defaults.TIP + "</h4>";
        html += "           </div>";
        html += "           <div class='modal-body'>";
        html += "               <span id='qn-confirm-modal-body'></span>";
        html += "           </div>";
        html += "           <div class='modal-footer'>";
        html += "               <button id='ok' class='btn btn-success btn-sm' data-dismiss='modal'>" + defaults.OK + "</button>";
        html += "               <button id='cancel'class='btn btn-default btn-sm' data-dismiss='modal'>" + defaults.CANCEL + "</button>";
        html += "           </div>";
        html += "       </div>";
        html += "   </div>";
        html += "</div>";

        return html;
    })();

    var confirmModal = {
        setContent : function(message) {
            $("#qn-confirm-modal-body").text(message);
            return this;
        },

        setSize : function(size) {
            if (!size) {
                $("#qn-confirm-modal-dialog").removeClass().addClass("modal-dialog");
            } else {
                if (size !== "sm" && size !== "lg") {
                    throw new TypeError("size must be 'sm' or 'lg' or empty");
                }else {
                    $("#qn-confirm-modal-dialog").removeClass().addClass("modal-dialog").addClass("modal-" + size);
                }
            }
            return this;
        },

        setTitle : function(title) {
            if (title != defaults.TIP) {
                $("#qn-confirm-modal-title").text(title);
            }
            return this;
        },

        setShowTitle : function(showTitle) {
            $("#qn-confirm-modal-header")[showTitle ? 'show' : 'hide']();
            return this;
        },

        setCallback : function(callback) {
            this.callback = callback;
            return this;
        },

        setBtnColor : function(btnColor) {
            if (btnColor) {
                if ((btnColor !== "danger") && (btnColor !== "warning") && (btnColor !== "info") && (btnColor !== "default") && (btnColor !== "success")) {
                    throw new TypeError("btnColor must be 'danger' or 'warning' or 'info' or 'default' or 'success' or empty");
                }else {
                    $("#ok").removeClass().addClass("btn").addClass("btn-sm").addClass("btn-" + btnColor);
                }
            }
            return this;
        },

        popUp : function() {
//            $("#qn-confirm-modal").modal({backdrop:'static'});
            $("#qn-confirm-modal").modal({});
        }
    };
    var getConfirmModal = function() {
        if (!$("#qn-confirm-modal").get(0)) {
            $(document.body).append(confirmModalTemplate);

            $("#ok").click( function() {
                confirmModal.callback(true);
            })
            $("#cancel").click( function() {
                confirmModal.callback(false);
            })
        }
        return confirmModal;
    };
    if (!window.qn) {
        window.qn = qn;
    }
})(window.qn || {}, window.$);