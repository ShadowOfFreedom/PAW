class StatsApp {
    inputCounter: HTMLInputElement;
    inputData: HTMLDivElement;
    sumInput: HTMLInputElement;
    avgInput: HTMLInputElement;
    minInput: HTMLInputElement;
    maxInput: HTMLInputElement;    

    inputs = new Array<HTMLInputElement>();
    innerCounter = 0;

    constructor() {
        this.startApp();
    }

    startApp(){
        this.getInputs();
        this.setInputs();
    }

    setInputs() {
        let counter = this.innerCounter + +this.inputCounter.value;
        for(this.innerCounter; this.innerCounter < counter ; this.innerCounter++){
            this.creatIputDiv();
        }
    }

    creatIputDiv(){
        let div = document.createElement('div');
        div.id = `inputDiv${this.innerCounter}`;

        div.appendChild(this.creatInput());
        div.appendChild(this.createRemoveButton(this.innerCounter));

        this.inputData.appendChild(div);
    }

    creatInput(): HTMLInputElement{
        let input = document.createElement('input');
        input.id = `input${this.innerCounter}`;
        input.type = 'number';
        input.addEventListener('blur', () => this.computeData());
        this.inputs.push(input);

        return input;
    }

    createRemoveButton(id: number): HTMLButtonElement{
        let button = document.createElement('button');
        button.onclick = () => this.onRemoveButtonClick(id);
        button.innerText = 'X';

        return button;
    }

    onRemoveButtonClick(id: number){
        this.inputs.splice(this.inputs.indexOf(document.querySelector(`#input${id}`)), 1);
        document.querySelector(`#inputDiv${id}`).remove();
        this.computeData();
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