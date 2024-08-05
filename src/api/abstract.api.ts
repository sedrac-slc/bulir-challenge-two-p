import { LocalStorage } from "../util/LocalStorage";

export default class AbstractApi{
    
  protected BASE_URL: string = "http://localhost:4000/api/v1";

   public baseUrl(): string{
        return this.BASE_URL;
   }

   protected getHeaders(){
     return {
         headers: {
             'Content-Type': 'application/json',
             'authorization': LocalStorage.getItemToken()
         }
     }
 }

}