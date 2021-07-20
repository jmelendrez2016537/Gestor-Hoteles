export class Reservacion{
  constructor(
    public _id: String,
    public fechaReservada: Date,
    public fechaFinal: Date,
    public numPersonas: String,
    public idHotel: String,
    public idHabitacion: String,
    public idServicio: String,
    public idUsuario: String
  ) {}
}
