export class UserModel{

    constructor(
        public id:string, 
        public message:string,
        private token:string,
        private tokenExpirationDate: Date){}

        get token2(){

            // if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
            //     {
            //         return null;
            //     }
                
            return this.token
                
        }
    }