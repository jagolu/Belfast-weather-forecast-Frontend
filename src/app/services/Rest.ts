import { BackendURL } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export class Rest {

  private readonly __baseURL : string = BackendURL;
  constructor(private __http:HttpClient) { }

  public postRequest(body:any, path:string, urlEncoded:boolean = false){
    let bodyvar = urlEncoded ? body.toString() : body;

    return this.__http.post(this.__baseURL+path, bodyvar,{});
  }
  
  public getRequest(path:string ,params?:paramValue[]){
    let options = params ? 
      {
        params: this.params(params)
      } : 
      {
      };
      
    return this.__http.get(this.__baseURL+path,options);
  }
  
  private params(params:paramValue[]):HttpParams{
    let urlParams : HttpParams = new HttpParams();
    params.forEach(param => {
      urlParams = urlParams.append(param.param, param.value);
    });
    return urlParams;
  }
}


//
// ──────────────────────────────────────────────────────────────────────
//   :::::: I N T E R F A C E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
//

/**
 * The URL params
 * 
 * @interface
 */
interface paramValue{
  /**
   * The name of the param
   * 
   * @var {string} param 
   */
  param:string;

  /**
   * The value of the param
   * 
   * @var {string} value
   */
  value:string;
}
