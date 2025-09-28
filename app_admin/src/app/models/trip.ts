export interface Trip{
    _id: string,
    code: string,
    name: string,
    lenght: string,
    start: Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string,
    [key: string]: any; //  allow dynamic access

}