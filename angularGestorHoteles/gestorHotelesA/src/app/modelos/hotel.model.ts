export class Hotel{
  constructor(
    public _id: String,
    public nombre: String,
    public descripcion: String,
    public telefono: String,
    public direccion: String,
    public eventos: [{
      idEvento: String
    }],
    public usuarios: [{
      idUsuario: String
    }],
    public idAdminHotel: String
  ){}
}
