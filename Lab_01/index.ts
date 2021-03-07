class StatsApp {
    inputCounter: HTMLInputElement;
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
           input.addEventListener('blur', () => this.computeData());
           this.inputs.push(input);
           this.inputData.appendChild(input);
        }
    }

    getInputs(){        
        this.inputCounter = document.querySelector('#counter');
        this.inputCounter.addEventListener('blur', () => this.setInputs());

        this.inputData = document.querySelector('.input-data');

        this.sumInput = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    }

    computeData() {
        let data = new Array<number>();
        let sum = 0;

        this.inputs.forEach(i => {
            if(+i.value === NaN || +i.value === 0) return;
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