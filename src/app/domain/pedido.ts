import { PedidoDetalle } from './pedidoDetalle';
export class Pedido{
    id: string;
    precioTotal:number;
    fecha:Date;
    negocio:string;
    estado:string;
    idCliente:string;
}