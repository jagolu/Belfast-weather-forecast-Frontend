import { IdentityService } from './../services/identity.service';
import { Injectable } from '@angular/core';
import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    
    constructor(private __identityS:IdentityService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        let url = req.url.toString();
        let updateReq = req.clone();

        if(!this.requiredUrlEncoded(url)){
            updateReq = req.clone({
                headers: req.headers.set("Content-Type", "application/json")
            });
        }
        else {
            updateReq = req.clone({
                headers: req.headers.set("Content-Type", "application/x-www-form-urlencoded")
            });
        }

        if(!this.notRequireToken(url)){
            updateReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer "+this.__identityS.getToken())
            });
        }

        return next.handle(updateReq);
    }
   
    private notRequireToken(url:string):Boolean{
        let notNeededAuthUrl = [
            "login", 
        ];
        
        return notNeededAuthUrl.some(subPath=>
            url.includes(subPath)
        );
    }

    private requiredUrlEncoded(url:string):Boolean{
        let neededUrlEncoded = [
            "login"
        ];

        return neededUrlEncoded.some(subPath=>
            url.includes(subPath)
        );
    }
}
