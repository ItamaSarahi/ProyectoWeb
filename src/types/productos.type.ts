export default interface ProductosType {
    idProducto?: number;
    idProveedor?: number;
    nombre?: string;
    categoria?: string;
    descripcion?: string;
    existencia?: number;
    precio_Compra?: number;
    precio_Venta?:number;
    url_imagen?:string;
}