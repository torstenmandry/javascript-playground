$(document).ready(function(window) {
    var typewriterController = new app.TypewriterController();

    jQuery(document).keydown(function (event) {
        typewriterController.processKey(String.fromCharCode(event.which));
        typewriterController.displayNextCharacter();
    });
});
