export interface MoviesModel {
    id?: number;
    movieName: string;
    imageUrl: string;
    description: string;
    releaseDate: string;
    rate: number;
    categoryId: number;
    ImageFile?:File;
    actors?: { id:number, imageUrl:string, name: string}[]; // Oyuncu listesi (isteğe bağlı)
}