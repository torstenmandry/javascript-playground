/**
 * Typewriter - Practice your keyboard skills.
 *
 * @author Torsten Mandry
 */

$(document).ready(function(window) {
    window.typewriter = new Typewriter();

    jQuery(document).keydown(function (event) {
        window.typewriter.verifyInput(event.which);
        window.typewriter.nextCharacter();
    });
});

function Typewriter() {
    this.characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.results = {};
    this.startTime = null;
    this.stopTime = null;

    this.init = function() {
        this.initResults();
        this.initStatusbar();
        this.nextCharacter();
    }

    this.initResults = function() {
        for( var i=0; i<this.characters.length; i++ ) {
            this.results[this.characters.charAt(i)] = {
                correct: 0,
                wrong: 0,
                overall: 0,
                minimumTime: undefined,
                maximumTime: undefined,
                overallTime: 0,

                getMillis: Typewriter.getMillis,

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

    this.initStatusbar = function() {
        for( var i=0; i<this.characters.length; i++ ) {
            var char = this.characters.charAt(i);
            var entry = '';
            entry += '<tr id="status_' + char + '">';
            entry += '</tr>';
            $("#statusbar_table").append(entry);
            this.updateStatus(char);
        }
    }

    this.updateStatus = function(char) {
        $("#status_" + char).empty()
        var status = '';
        status += '<th class="char">' + char + '</th>';
        status += '<td class="rate">' + this.results[char].hitRate() + '%</td>';
        status += '<td class="count">' + this.results[char].overall + ' Tries</td>';
        status += '<td class="time">' + this.results[char].averageTime() + ' ms</td>';
        $("#status_" + char).append(status);
    }

    this.nextCharacter = function() {
        this.display(this.randomCharacter());
        this.startTimer();
    }

    this.randomCharacter = function() {
        return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }

    this.verifyInput = function(inputKey) {
        this.stopTimer();

        var inputChar = String.fromCharCode(inputKey);
        var currentChar = this.currentCharacter();

        if ( inputChar == currentChar ) {
            this.trackCorrect(currentChar);
        } else {
            this.trackWrong(currentChar);
        }
    }

    this.trackCorrect = function(char) {
        var millis = this.stopTime - this.startTime;
        this.changeCssClass("correct");
        this.results[char].correctKeystroke(millis);
        this.updateStatus(char);
    }

    this.trackWrong = function(char) {
        var millis = this.stopTime - this.startTime;
        this.changeCssClass("wrong");
        this.results[char].wrongKeystroke(millis);
        this.updateStatus(char);
    }

    this.changeCssClass = function(cssClass) {
        $("#currentChar").removeClass();
        $("#currentChar").addClass(cssClass);
    }

    this.startTimer = function() {
        this.startTime = new Date().getTime();
        this.stopTime = null;
    }

    this.stopTimer = function() {
        this.stopTime = new Date().getTime();
    }

    this.display = function(char) {
        $("#currentChar").text(char);
    }

    this.currentCharacter = function() {
        return $("#currentChar").text();
    }

    this.isInitialized = function() {
        return this.results.size == this.characters.length();
    }

    this.init();
}
