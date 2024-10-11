export interface ImmoProperty {
    _id: string;
    id: string|undefined;
    title: string;
    price: number;
    tag: object;
    imagePath: string;
    description: string;
}

export interface ImmoId{
    id: string|undefined
}