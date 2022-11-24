export default interface VentasType {
    idVenta?: number;
    idCliente?: number;
    idEmpleado?: number;
    fecha_Inicial?:Date;
    fecha_Vencimiento?:Date;
    status?:string;
  }