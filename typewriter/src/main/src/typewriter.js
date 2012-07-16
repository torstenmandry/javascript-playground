/**
 * Typewriter - Practice your keyboard skills.
 *
 * @author Torsten Mandry
 */

$(document).ready(function(window) {
    window.typewriterController = new TypewriterController();

    jQuery(document).keydown(function (event) {
        window.typewriterController.processKey(String.fromCharCode(event.which));
        window.typewriterController.displayNextCharacter();
    });
});

function TypewriterController() {
    var typewriter = new Typewriter();

    this._init = function() {
        this._initStatusbar();
        this.displayNextCharacter();
    }

    this._initStatusbar = function() {
        for( var i=0; i<typewriter.getCharacters().length; i++ ) {
            var char = typewriter.getCharacters().charAt(i);
            var entry = '';
            entry += '<tr id="status_' + char + '">';
            entry += '</tr>';
            $("#statusbar_table").append(entry);
            this._updateStatus(char);
        }
    }

    this._updateStatus = function(char) {
        var charStatus = typewriter.getStatus([char]);
        $("#status_" + char).empty()
        var status = '';
        status += '<th class="char">' + char + '</th>';
        status += '<td class="rate">' + charStatus.hitRate().toFixed(2) + '%</td>';
        status += '<td class="count">' + charStatus.overall + ' Tries</td>';
        status += '<td class="time">' + charStatus.averageTime().toFixed(0) + ' ms</td>';
        $("#status_" + char).append(status);
    }

    this.processKey = function (key) {
        var correctInput = typewriter.verifyInput(key);
        this._setCssClass(correctInput);
        this._updateStatus(typewriter.currentChar());
    };

    this._setCssClass = function(correctInput) {
        $("#currentChar").removeClass();
        if (correctInput) {
            $("#currentChar").addClass("correct");
        } else {
            $("#currentChar").addClass("wrong");
        }
    }

    this.displayNextCharacter = function() {
        $("#currentChar").text(typewriter.nextCharacter());
    }

    this._init();
}

function Typewriter() {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var currentChar = null;
    var results = {};
    var startTime = null;
    var stopTime = null;

    function _init() {
        for( var i=0; i<characters.length; i++ ) {
            results[characters.charAt(i)] = {
                correct: 0,
                wrong: 0,
                overall: 0,
                minimumTime: undefined,
                maximumTime: undefined,
                overallTime: 0,

                correctKeystroke: function(millis) {
                    this.correct++;
                    this.keystroke(millis);
                },

                wrongKeystroke: function(millis) {
                    this.wrong++;
                    this.keystroke(millis);
                },

                keystroke: function(millis) {
                    this.overall++;
                    this.overallTime += millis;

                    if ( this.minimumTime == null || millis < this.minimumTime ) {
                        this.minimumTime = millis;
                    }

                    if ( this.maximumTime == null || millis > this.maximumTime ) {
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

    this.currentChar = function() {
        return currentChar;
    };

    this.nextCharacter = function() {
        currentChar = _randomCharacter.call(this);
        this._startTimer();
        return currentChar;
    }

    function _randomCharacter() {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    this.verifyInput = function(inputKey) {
        this._stopTimer();
        if ( inputKey == currentChar ) {
            this._trackCorrect(currentChar);
            return true;
        } else {
            this._trackWrong(currentChar);
            return false;
        }
    }

    this._trackCorrect = function(char) {
        results[char].correctKeystroke(_millis.call(this));
    }

    this._trackWrong = function(char) {
        results[char].wrongKeystroke(_millis.call(this));
    }

    this.getStatus = function(char) {
        return results[char];
    }

    this._startTimer = function() {
        startTime = new Date().getTime();
        stopTime = null;
    }

    this._stopTimer = function() {
        stopTime = new Date().getTime();
    }

    function _millis() {
        return stopTime - startTime;
    }

    this.getCharacters = function() {
        return characters;
    }

    _init.call(this);
}
