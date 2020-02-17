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
        private __router:Router, 
        private __identityS:IdentityService,
    ) { }


    //
    // ──────────────────────────────────────────────────────────────────────────────────
    //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //

    /**
     * Intercept every incoming http responses 
     * 
     * @access public
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


    //
    // ────────────────────────────────────────────────────────────────────────────────────
    //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────
    //

    //
    // ─── AUTHENTICATION ─────────────────────────────────────────────────────────────
    //

    /**
     * Manage a http response for authenticate
     * 
     * @access private
     * @param {any} request The response response
     */
    private handleAuthentication(request:any){
        if((request.url.includes("/login"))){
            this.__identityS.setSession(request.body.access_token);
        }
    }
}