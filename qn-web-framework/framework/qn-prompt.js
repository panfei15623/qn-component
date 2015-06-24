/**
 * Created by mengchen on 2015/1/17.
 */

(function(qn, $) {

    if (!$) {
        throw new ReferenceError("$ is undefined, please include jquery.js first");
    }

    var defaults = {
        TIP : "提示",
        OK : "确定",
        CANCEL : "取消"
    };

    qn.prompt = function(title, validation, callback) {
        title = title || defaults.TIP;
        getPromptModal().setTitle(title).setValidation(validation).setCallback(callback).popUp();
    };

    var promptModalTemplate = (function() {
        var html = "";
        html += "<div id='qn-prompt-modal' class='modal fade'>";
        html += "   <div id='qn-prompt-modal-dialog' class='modal-dialog'>";
        html += "       <div class='modal-content'>";
        html += "           <div id='qn-prompt-modal-header' class='modal-header'>";
        html += "               <h4 class='modal-title' id='qn-prompt-modal-title'>" + defaults.TIP + "</h4>";
        html += "           </div>";
        html += "           <div class='modal-body'>";
        html += "               <form id='qn-prompt-modal-form'>";
        html += "                   <input class='form-control' id='qn-prompt-modal-input'>";
        html += "               </form>";
        html += "           </div>";
        html += "           <div class='modal-footer'>";
        html += "               <button class='btn btn-info btn-sm' id='qn-prompt-modal-ok'>" + defaults.OK + "</button>";
        html += "               <button class='btn btn-default btn-sm' data-dismiss='modal'>" + defaults.CANCEL + "</button>";
        html += "           </div>";
        html += "       </div>";
        html += "   </div>";
        html += "</div>";

        return html;
    })();

    var promptModal = {

        $modal : null,
        $title : null,
        $form : null,
        $input : null,
        $ok : null,

        validationFunc : null,
        callbackFunc : null,

        setTitle : function(title) {
            if (title != defaults.TIP) {
                this.$title.text(title);
            }
            return this;
        },

        setValidation : function(validation) {
            if (typeof validation === "function") {
                this.validationFunc = validation;
            } else {
                this.validationFunc = null;
            }

            return this;
        },

        setCallback : function(callback) {
            if (typeof callback === "function") {
                this.callbackFunc = callback;
            } else {
                this.callbackFunc = null;
            }

            return this;
        },

        getValue : function() {
            return this.$input.val();
        },

        popUp : function() {
            // clear input before shown
            this.$input.val("");

            // clear errors
            this.$form.removeClass("has-error");

            this.$modal.modal({backdrop:'static'});
        },

        hide : function() {
            this.$modal.modal("hide");
        }
    };

    var getPromptModal = function() {

        if (!$("#qn-prompt-modal").get(0)) {
            $(document.body).append(promptModalTemplate);

            promptModal.$modal = $("#qn-prompt-modal");
            promptModal.$title = $("#qn-prompt-modal-title");
            promptModal.$form = $("#qn-prompt-modal-form");
            promptModal.$input = $("#qn-prompt-modal-input");
            promptModal.$ok = $("#qn-prompt-modal-ok");

            // form submit
            promptModal.$form.bind("submit", function() {
                promptModal.$ok.trigger("click");       // just trigger ok click
                return false;
            });

            // focus input on modal shown
            promptModal.$modal.bind("shown.bs.modal", function() {
                promptModal.$input.focus();
            });

            // ok click
            promptModal.$ok.bind("click", function () {

                var value = promptModal.getValue();

                if (promptModal.validationFunc && !promptModal.validationFunc(value)) {
                    // validation failed
                    promptModal.$form.addClass("has-error");
                    return;
                }

                promptModal.$form.removeClass("has-error");
                promptModal.hide();

                // execute callback
                promptModal.callbackFunc && promptModal.callbackFunc(value);
            });
        }
        return promptModal;
    };

    if (!window.qn) {
        window.qn = qn;
    }

})(window.qn || {}, window.$);