export interface Comments{
    id: number,
    movieId: number,
    userId: number,
    userName?:string,
    content: string,
    commentedOn: Date,
    isApproved: boolean,
}