// Dish Interface
interface Steps {
    number: number,
    title: string,
    description: string
}

interface Ingredients {
    name: string,
    quantity: string
}

export interface IDish {
    id: number;
    image: string;
    video: string;
    name: string;
    discription: string;
    ingredients: Array<Ingredients>;
    optional_ingredients: Array<Ingredients>;
    apparatus: Array<string>;
    tags: Array<string>;
    time: string;
    steps: Array<Steps>;
}
