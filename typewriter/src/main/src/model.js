(function(app) {
    "use strict";



    function Statistic() {
        this.correct = 0;
        this.wrong = 0;
        this.overall = 0;
        this.minimumTime = undefined;
        this.maximumTime = undefined;
        this.overallTime = 0;
    }

    Statistic.prototype.correctKeystroke = function(millis) {
        this.correct++;
        this.keystroke(millis);
    };

    Statistic.prototype.wrongKeystroke = function(millis) {
        this.wrong++;
        this.keystroke(millis);
    };

    Statistic.prototype.keystroke = function(millis) {
        this.overall++;
        this.overallTime += millis;
        if ( this.minimumTime == null || millis < this.minimumTime ) {
            this.minimumTime = millis;
        }
        if ( this.maximumTime == null || millis > this.maximumTime ) {
            this.maximumTime = millis;
        }
    };

    Statistic.prototype.hitRate = function() {
        if (this.overall == 0)
            return 0;
        return Math.round(this.correct / this.overall * 100);
    };

    Statistic.prototype.averageTime = function() {
        if (this.overall == 0)
            return 0;
        return this.overallTime / this.overall;
    };



    function Typewriter() {
        this._characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this._currentChar = null;
        this._statistics = {};
        this._startTime = null;
        this._stopTime = null;

        function _initStatistics() {
            for( var i=0; i<this._characters.length; i++ ) {
                this._statistics[this._characters.charAt(i)] = new Statistic();
            }
        }

        function _randomCharacter() {
            return this._characters.charAt(Math.floor(Math.random() * this._characters.length));
        }

        function _trackCorrect() {
            this._statistics[this._currentChar].correctKeystroke(_millis.call(this));
        }

        function _trackWrong() {
            this._statistics[this._currentChar].wrongKeystroke(_millis.call(this));
        }

        function _startTimer() {
            this._startTime = new Date().getTime();
            this._stopTime = null;
        }

        function _stopTimer() {
            this._stopTime = new Date().getTime();
        }

        function _millis() {
            return this._stopTime - this._startTime;
        }

        this.currentChar = function() {
            return this._currentChar;
        };

        this.nextCharacter = function() {
            this._currentChar = _randomCharacter.call(this);
            _startTimer.call(this);
            return this._currentChar;
        }

        this.verifyInput = function(inputKey) {
            _stopTimer.call(this);
            if ( inputKey == this._currentChar ) {
                _trackCorrect.call(this);
                return true;
            } else {
                _trackWrong.call(this);
                return false;
            }
        }

        this.getStatistic = function(char) {
            return this._statistics[char];
        }

        this.getCharacters = function() {
            return this._characters;
        }

        _initStatistics.call(this);
    }



    app.Typewriter = Typewriter;



})(window.app);