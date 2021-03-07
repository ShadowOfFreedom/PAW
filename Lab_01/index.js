var StatsApp = /** @class */ (function () {
    function StatsApp() {
        this.inputs = new Array();
        this.startApp();
    }
    StatsApp.prototype.startApp = function () {
        this.getInputs();
        this.setInputs();
    };
    StatsApp.prototype.setInputs = function () {
        var _this = this;
        for (var i = 0; i < +this.inputCounter.value; i++) {
            var input = document.createElement('input');
            input.type = 'number';
            input.id = "input" + i;
            input.addEventListener('input', function () { return _this.computeData(); });
            this.inputs.push(input);
            this.inputData.appendChild(input);
        }
    };
    StatsApp.prototype.getInputs = function () {
        var _this = this;
        this.inputCounter = document.querySelector('#counter');
        this.counterSubmit = document.querySelector('#counter-submit');
        this.counterSubmit.addEventListener('click', function () { return _this.setInputs(); });
        this.inputData = document.querySelector('.input-data');
        this.sumInput = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    };
    StatsApp.prototype.computeData = function () {
        var data = new Array();
        var sum;
        this.inputs.forEach(function (i) {
            data.push(+i.value);
            sum += +i.value;
        });
        var avg = sum / data.length;
        var min = Math.min.apply(Math, data);
        var max = Math.max.apply(Math, data);
        this.showStats(sum, avg, min, max);
    };
    StatsApp.prototype.showStats = function (sum, avg, min, max) {
        this.sumInput.value = sum.toString();
        this.avgInput.value = avg.toString();
        this.minInput.value = min.toString();
        this.maxInput.value = max.toString();
    };
    return StatsApp;
}());
var statsApp = new StatsApp();
