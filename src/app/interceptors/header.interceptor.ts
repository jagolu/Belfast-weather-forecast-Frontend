import { IdentityService } from './../services/identity.service';
import { Injectable } from '@angular/core';
import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    
    constructor(private _identityS:IdentityService) { }

    /**
     * Add the auth token to every outcoming http request which need it
     *
     * @param {HttpRequest<any>} req The outcoming request
     * @param {HttpHandler} next The http handler
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        let url = req.url.toString();
        let updateReq = req.clone();

        if(!this.requiredUrlEncoded(url)){ //If the request need json as content-type we add it
            updateReq = req.clone({
                headers: req.headers.set("Content-Type", "application/json")
            });
        }
        else { //If the request need urlencoded as content-type we add it
            updateReq = req.clone({
                headers: req.headers.set("Content-Type", "application/x-www-form-urlencoded")
            });
        }

        if(!this.notRequireToken(url)){ //If the request need the authorization header we add it
            updateReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer "+this._identityS.getToken())
            });
        }

        return next.handle(updateReq);
    }
   
    /**
     * To know if the request needs the authorization token
     * @param {string} url The url of the request
     */
    private notRequireToken(url:string):Boolean{
        let notNeededAuthUrl = [
            "login", 
        ];
        
        return notNeededAuthUrl.some(subPath=>
            url.includes(subPath)
        );
    }

    /**
     * To know if the request needs urlencoded as content-type
     * @param {string} url The url of the request
     */
    private requiredUrlEncoded(url:string):Boolean{
        let neededUrlEncoded = [
            "login"
        ];

        return neededUrlEncoded.some(subPath=>
            url.includes(subPath)
        );
    }
}
