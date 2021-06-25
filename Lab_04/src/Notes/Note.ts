export class Note {
    title : string;
    text : string;
    isStared : boolean;
    creatDate : string;
    color : string;

    constructor(title?: string, text?: string, isStared?: boolean, color?: string, createDate?: Date){
        this.title = title || '';
        this.text = text || '';
        this.isStared = isStared || false;
        this.creatDate = createDate && createDate.toLocaleString() || new Date().toLocaleString();
        this.color = color || '#000000';
    }

    createHTMLNoteDiv() : string {
        return `
        <div class="note" style="background-color : ${this.color};">
            <span class="title">${this.title}</span>
            <span class="star" ${this.isStared ? '' : 'hidden'}>
                <i class="fas fa-star-of-life"></i>
            </span>
            <div class="text">
                ${this.text}
            </div>
            <div class="date">
                ${this.creatDate.toLocaleString()}
            </div>
        </div>
        `;
    }
}