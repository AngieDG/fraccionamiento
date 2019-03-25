export class Role {
  _id: string;
  name: string;
  slug: string;
  _permissions: any;

  constructor(model: any = null) {
    if(model._id)
    this._id = model._id;
    this.name = model.name;
    this.slug = model.slug;
    this._permissions = model._permissions;
  }
}