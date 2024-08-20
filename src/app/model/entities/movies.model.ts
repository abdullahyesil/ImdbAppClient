export interface MoviesModel {
    id?: number;
    movieName: string;
    imageUrl: string;
    description: string;
    releaseDate: string;
    rate: number;
    categoryId: number;
    actors?: { id:number, name: string}[]; // Oyuncu listesi (isteğe bağlı)
}