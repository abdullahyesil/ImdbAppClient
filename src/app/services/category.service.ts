import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryModel } from "../model/category.model";

@Injectable(
    {providedIn: 'root'}
)
export class CategoryService{

constructor(
    private http:HttpClient
){}

url = "http://localhost:5048/api/Category";


getCategories():Observable<CategoryModel[]>{

return this.http.get<CategoryModel[]>(this.url);
}

addCategory(category: CategoryModel):Observable<any>{

    var newUrl:string = this.url + "/addCategory/"

    return this.http.post<CategoryModel>(newUrl, category);
}

deleteCategory(categoryId:number):Observable<any>{
var newUrl2:string = this.url + "/deleteCategory/" + categoryId;

return this.http.delete(newUrl2);
}

getCategoriesById(categoryId:number):Observable<CategoryModel>{

    let GetByCategoryUrl= this.url +"/GetById/"+ categoryId
return this.http.get<CategoryModel>(GetByCategoryUrl);
}

updateCategory(category: CategoryModel)
{

    let updateCategoryUrl = this.url + "/update/" + category.id;
    return this.http.put<CategoryModel>(updateCategoryUrl, category);
}



}