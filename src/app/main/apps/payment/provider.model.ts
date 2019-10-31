export class Provider {
    id: number;
    name: string;

    constructor(provider)
    {
        {
            this.id = provider.id;
            this.name = provider.name;
        }
    }
}
