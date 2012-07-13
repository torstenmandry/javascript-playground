/**
 * Typewriter - Practice your keyboard skills.
 *
 * @author Torsten Mandry
 */

$(document).ready(function() {
    window.typewriter.init();
});

(function(window) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var results = {};

    function init() {
        initResults();
        initStatusbar();
        registerKeyboardListener();
        nextCharacter();
    }

    function initResults() {
        for( var i=0; i<characters.length; i++ ) {
            results[characters.charAt(i)] = {
                correct: 0,
                wrong: 0,
                overall: 0,
                minimumTime: undefined,
                maximumTime: undefined,
                overallTime: 0,

                correctKeystroke: function() {
                    this.correct++;
                    this.keystroke();
                },

                wrongKeystroke: function() {
                    this.wrong++;
                    this.keystroke();
                },

                keystroke: function() {
                    this.overall++;

                    var millis = stopTime - startTime;
                    this.overallTime += millis;

                    if ( this.minimumTime == undefined || millis < this.minimumTime ) {
                        this.minimumTime = millis;
                    }

                    if ( this.maximumTime == undefined || millis > this.maximumTime ) {
                        this.maximumTime = millis;
                    }
                },

                hitRate: function() {
                    if (this.overall == 0)
                        return 0;
                    return Math.round(this.correct / this.overall * 100);
                },

                averageTime: function() {
                    if (this.overall == 0)
                        return 0;
                    return this.overallTime / this.overall;
                }

            }
        }
    }

    function initStatusbar() {
        for( var i=0; i<characters.length; i++ ) {
            var char = characters.charAt(i);
            var charResults = results[char];
            var entry = '';
            entry += '<tr id="status_' + char + '">';
            entry += '</tr>';
            $("#statusbar_table").append(entry);
            updateStatus(char);
        }
    }

    function updateStatus(char) {
        $("#status_" + char).empty()
        var status = '';
        status += '<th class="char">' + char + '</th>';
        status += '<td class="rate">' + results[char].hitRate() + '%</td>';
        status += '<td class="count">' + results[char].overall + ' Tries</td>';
        status += '<td class="time">' + results[char].averageTime() + ' ms</td>';
        $("#status_" + char).append(status);
    }

    function registerKeyboardListener() {
        jQuery(document).keydown(function (event) {
            verifyInput(event.which);
            nextCharacter();
        });
    }

    function nextCharacter() {
        display(randomCharacter());
        startTimer();

    }

    function randomCharacter() {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    function verifyInput(inputKey) {
        stopTimer();

        var inputChar = String.fromCharCode(inputKey);
        var currentChar = currentCharacter();

        if ( inputChar == currentChar ) {
            trackCorrect(currentChar);
        } else {
            trackWrong(currentChar);
        }
    }

    function trackCorrect(char) {
        changeCssClass("correct");
        results[char].correctKeystroke();
        updateStatus(char);
    }

    function trackWrong(char) {
        changeCssClass("wrong");
        results[char].wrongKeystroke();
        updateStatus(char);
    }

    function changeCssClass(cssClass) {
        $("#currentChar").removeClass();
        $("#currentChar").addClass(cssClass);
    }

    function startTimer() {
        startTime = new Date().getTime();
        stopTime = null;
    }

    function stopTimer() {
        stopTime = new Date().getTime();
    }

    function display(char) {
        $("#currentChar").text(char);
    }

    function currentCharacter() {
        return $("#currentChar").text();
    }

    window.typewriter = {
        init: init
    };
})(window);

