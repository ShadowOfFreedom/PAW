class StatsApp {
    inputCounter: HTMLInputElement;
    counterSubmit: HTMLInputElement;
    inputData: HTMLDivElement;

    inputs = new Array<HTMLInputElement>();

    sumInput: HTMLInputElement;
    avgInput: HTMLInputElement;
    minInput: HTMLInputElement;
    maxInput: HTMLInputElement;

    constructor() {
        this.startApp();
    }

    startApp(){
        this.getInputs();



        this.setInputs();
    }

    setInputs() {
        for(let i = 0; i < +this.inputCounter.value; i++){
           let input = document.createElement('input');
           input.type = 'number';
           input.id = `input${i}`;
           input.addEventListener('input', () => this.computeData());
           this.inputs.push(input);
           this.inputData.appendChild(input);
        }
    }

    getInputs(){        
        this.inputCounter = document.querySelector('#counter');
        this.counterSubmit = document.querySelector('#counter-submit');
        this.counterSubmit.addEventListener('click', () => this.setInputs());

        this.inputData = document.querySelector('.input-data');

        this.sumInput = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    }

    computeData() {
        let data = new Array<number>();
        let sum: number;

        this.inputs.forEach(i => {
            data.push(+i.value);
            sum += +i.value
        });

        const avg = sum / data.length;
        const min = Math.min.apply(Math, data);
        const max = Math.max.apply(Math, data);

        this.showStats(sum, avg, min, max);
    }

    showStats(sum: number, avg: number, min: number, max: number) {
        this.sumInput.value = sum.toString();
        this.avgInput.value = avg.toString();
        this.minInput.value = min.toString();
        this.maxInput.value = max.toString();
    }
}

const statsApp = new StatsApp();