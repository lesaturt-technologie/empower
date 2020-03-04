export class Upload {
    $key: string;
    file: File;
    name: string;
    progress: number;
    url: string;
    createAt: Date = new Date();

    constructor(file:File){
        this.file = file;
    }
}
