import { Injectable } from '@angular/core';
import { Role } from 'app/models/roles.model';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import  {environment } from 'environments/environment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from 'app/services/auth/login.service';


@Injectable()
export class RoleService {

    requestOptions : RequestOptions;
   


    constructor(private http : Http, loginService : LoginService){
        let headers = new Headers({'Authorization':loginService.getToken()});
        this.requestOptions = new RequestOptions({headers : headers});
    } 

    getAll() : Observable<Role[]> {
        return this.http.get(`${environment.apiUrl}user-role`, this.requestOptions)
            .map(mapRoles);
    }
    getRoleById(id : String) : Observable<Role>{
    return this.http.get(`${environment.apiUrl}user-role/${id}`,this.requestOptions).pipe(
        map( mapRole));    
    }
    saveOrUpdate(role: Role) : Observable<any> {
        if(role._id)
            return this.http.patch(`${environment.apiUrl}user-role/${role._id}`, role, this.requestOptions).map( extractData );
        else
            return this.http.post(`${environment.apiUrl}user-role`, role, this.requestOptions).map( extractData );
    }
    delete(role: Role) : Observable<any> {
        if(role._id)
            return this.http.delete(`${environment.apiUrl}user-role/${role._id}`, this.requestOptions).map( extractData );
    }

}


    function mapRole(response :any): Role{
        return   new Role ( response.json().data );
       }

     function extractData(res: Response): Object {
     let body = res.json();
        try {
            body = body.map(toRole);
        } catch (error) {}
        return body || { };
    }



    
function mapRoles(response: any): Role[]{
    // The response of the API has a results
    // property with the actual results
    return response.json().data.map(toRole);
}   

function toRole(r:any): Role{
    let role = <Role>({
        _id: r._id,
        name: r.name,
        slug: r.slug,
        _permissions: r._permissions,
    });
    return role;
}
