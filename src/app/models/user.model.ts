export class User {
    _id: string;
    firtsname : string;
    lastname : string;
    second_lastname; 
    email : string;
    _role : string;
    avatar : string;
    gender : string;
    birthdate: string ;
    phone: string ;


    constructor(model : any = null ){   
        if(model.id)
        this ._id = model._id;
        this.firtsname = model.firstname;
        this.lastname = model.lastname;
        this.second_lastname = model.second_lasname;
        this.email = model.email;
        this._role= model._role;
        this.avatar = model.avatar;
        this.gender = model.gender;
        this.birthdate = model.birthdate;
        this.phone = model.phone;
    }

}