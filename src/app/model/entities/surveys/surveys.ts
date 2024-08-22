import { Option } from "./option";

export interface SurveysModel{
    id: number;
    title: string;
    createdDate: Date;
    options: Option[];
}