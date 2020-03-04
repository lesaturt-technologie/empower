import { Upload } from './upload';

export class Actualite {
    descriptions: [];
    introduction: string;
    categorie;
    photo: string;
    id: number;
    public status: string;
    position: string;
    
    constructor(public title: string, public author: string, public createAt : string){
        
    }
}