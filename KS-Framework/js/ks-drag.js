/**
 * Created by mengchen on 2015/3/14.
 */

(function(KS, $) {

    if (!$) {
        throw new Error("Please import jQuery first.");
    }

    KS.dragElement = function(draggableElement, movableElement) {

        var startMove = false;
        var pos = {
            x : 0,
            y : 0
        };

        $(draggableElement).bind("mousedown", function(event) {
            pos.x = event.clientX;
            pos.y = event.clientY;
            startMove = true;
        });

        $(document).bind("mousemove", function(event) {
            if (!startMove) {
                return;
            }

            var clientX = event.clientX;
            var clientY = event.clientY;

            var diffX = clientX - pos.x;
            var diffY = clientY - pos.y;

            movableElement.style.left = movableElement.offsetLeft + diffX + "px";
            movableElement.style.top = movableElement.offsetTop + diffY + "px";

            pos.x = clientX;
            pos.y = clientY;
        }).bind("mouseup", function() {
            startMove = false;
        });

    };

    if (!window.KS) {
        window.KS = KS;
    }

})(window.KS || {}, window.jQuery);