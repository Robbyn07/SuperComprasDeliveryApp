import { PedidoDetalle } from './pedidoDetalle';
export class Pedido{
    id: string;
    precioTotal:number;
    fecha:Date;
    idNegocio:string;
    nombreNegocio:string;
    estado:string;
    idCliente:string;
    nombreCliente:string;
    lonEmp:number;
    latEmp:number;
    lonDes:number;
    latDes:number;
    metodoPago:string;
    idEmpleado:string;
    nombreEmpleado:string;
}