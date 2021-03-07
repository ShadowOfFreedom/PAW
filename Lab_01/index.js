var StatsApp = /** @class */ (function () {
    function StatsApp() {
        this.inputs = new Array();
        this.innerCounter = 0;
        this.startApp();
    }
    StatsApp.prototype.startApp = function () {
        this.getInputs();
        this.setInputs();
    };
    StatsApp.prototype.setInputs = function () {
        var counter = this.innerCounter + +this.inputCounter.value;
        for (this.innerCounter; this.innerCounter < counter; this.innerCounter++) {
            this.creatIputDiv();
        }
    };
    StatsApp.prototype.creatIputDiv = function () {
        var div = document.createElement('div');
        div.id = "inputDiv" + this.innerCounter;
        div.appendChild(this.creatInput());
        div.appendChild(this.createRemoveButton(this.innerCounter));
        this.inputData.appendChild(div);
    };
    StatsApp.prototype.creatInput = function () {
        var _this = this;
        var input = document.createElement('input');
        input.id = "input" + this.innerCounter;
        input.type = 'number';
        input.addEventListener('blur', function () { return _this.computeData(); });
        this.inputs.push(input);
        return input;
    };
    StatsApp.prototype.createRemoveButton = function (id) {
        var _this = this;
        var button = document.createElement('button');
        button.onclick = function () { return _this.onRemoveButtonClick(id); };
        button.innerText = 'X';
        return button;
    };
    StatsApp.prototype.onRemoveButtonClick = function (id) {
        this.inputs.splice(this.inputs.indexOf(document.querySelector("#input" + id)), 1);
        document.querySelector("#inputDiv" + id).remove();
        this.computeData();
    };
    StatsApp.prototype.getInputs = function () {
        var _this = this;
        this.inputCounter = document.querySelector('#counter');
        this.inputCounter.addEventListener('blur', function () { return _this.setInputs(); });
        this.inputData = document.querySelector('.input-data');
        this.sumInput = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    };
    StatsApp.prototype.computeData = function () {
        var data = new Array();
        var sum = 0;
        this.inputs.forEach(function (i) {
            if (+i.value === NaN || +i.value === 0)
                return;
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
