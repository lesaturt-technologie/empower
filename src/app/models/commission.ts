export class Commission {
    profile: string;
    modalites:[];
    objectifs:[];
    perspectives:[];
    outils:[];
    constructor(private titre: string, private introduction: string, private titreoutil: string, private resumeoutil: string, private titremodalite: string, private resumemodalite: string){}
}
