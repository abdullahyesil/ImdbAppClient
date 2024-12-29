export class UserModel{

    constructor(
        public id:string, 
        public message:string,
        private token:string,
        private tokenExpirationDate: Date){}

    }