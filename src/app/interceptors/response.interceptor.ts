import { IdentityService } from './../services/identity.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, 
        HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(
        private __identityS:IdentityService,
    ) { }

    /**
     * Intercept every incoming http responses 
     * 
     * @param {HttpRequest<any>} req The incoming request
     * @param {HttpHandler} next The http handler
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(
            (ok)=>{
                if(ok instanceof HttpResponse) {
                    this.handleAuthentication(ok);
                }
            }
        ));
    }

    /**
     * Manage a http response for authenticate
     * 
     * @param {any} request The response response
     */
    private handleAuthentication(request:any){
        if((request.url.includes("/login"))){
            //We save the auth token in the browser memory
            this.__identityS.setSession(request.body.access_token); 
        }
    }
}