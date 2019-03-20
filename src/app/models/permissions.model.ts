export class Permission {
    _id: string;
    name: string;
    slug: string;
    active : Boolean;
  
    constructor(model: any = null) {
     
      this._id = model._id;
      this.name = model.name;
      this.slug = model.slug;
      this.active = model.active;
    }
  }