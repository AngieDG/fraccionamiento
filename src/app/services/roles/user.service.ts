import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginService } from 'app/services/auth/login.service';
import { User } from 'app/models/user.model';
import { environment } from 'environments/environment';

@Injectable()
export class UsersService {

    requestOptions: RequestOptions;

    constructor(private http: Http, loginService: LoginService){
        let headers = new Headers({'Authorization': loginService.getToken()});
        this.requestOptions = new RequestOptions({headers : headers});
    }

    getAll(): Observable<User[]> {
        return this.http.get(`${environment.apiUrl}user`, this.requestOptions)
            .map( mapUsers );
    }

    getUserById(id: string): Observable<any>{
        return this.http.get(`${environment.apiUrl}user/${id}`, this.requestOptions)
        .map( extractData );
    }
    
    saveOrUpdate(user: User): Observable<any> {
        if (user._id){
            return this.http.patch(`${environment.apiUrl}user/${user._id}`, user, this.requestOptions).map( extractData );
        }else{
            return this.http.post(`${environment.apiUrl}user`, user, this.requestOptions).map( extractData );
        }
    }

    delete(user: User): Observable<any> {
        if (user._id){
            return this.http.delete(`${environment.apiUrl}users/${user._id}`, this.requestOptions).map( extractData );
        }
    }

    searchUser(email: String): Observable<User[]> {
        return this.http.get(`${environment.apiUrl}users/search/${email}`, this.requestOptions)
            .map( mapUsers );
    }

    
}


function extractData(res: Response): Object {
    let body = res.json();
    try {
        body = body.map(toUser);
    } catch (error) {}
    return body || { };
}


function mapUsers(response: Response): User[]{
    // The response of the API has a results
    // property with the actual results
    return response.json().data.map(toUser);
}



function toUser(r: any): User{

    let user = <User> 
    ({/*
        _id: r._id,
        firstname: r.firstname,
        lastname: r.lastname,
        email: r.email,
        extradata: r.extradata,
        _role: r._role,
        avatar: r.avatar,
        second_lastname: r.second_lastname,
        birthdate: r.birthdate,
        gender: r.gender,
        mobile: r.mobile,
        office_phone: r.office_phone*/
    });
    return user;
}



