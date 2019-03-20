import { Injectable } from '@angular/core';
import { Permission } from 'app/models/permissions.model';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginService } from 'app/services/auth/login.service';
import { environment } from 'environments/environment';

@Injectable()
export class PermissionsService {

    requestOptions: RequestOptions;

    constructor(private http: Http, loginService: LoginService){
        let headers = new Headers({'Authorization': loginService.getToken()});
        this.requestOptions = new RequestOptions({headers : headers});
    }

    getAll(): Observable<Permission[]> {
        return this.http.get(`${environment.apiUrl}user-permission`, this.requestOptions)
            .map( mapPermissions );
    }
    
}


function mapPermissions(response: Response): Permission[]{
    // The response of the API has a results
    // property with the actual results
    return response.json().data.map(toPermission);
}


function toPermission(r: any): Permission{
    let permission = <Permission>({
        _id: r._id,
        name: r.name,
        slug: r.slug
    });
    return permission;
}
