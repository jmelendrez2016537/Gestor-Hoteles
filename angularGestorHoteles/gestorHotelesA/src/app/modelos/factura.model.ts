export class Factura{
  constructor(
    public _id: String,
    public fechaEmision: Date,
    public extras: String,
    public diasHospedados: String,
    public idReservacion: String
  ){}
}
