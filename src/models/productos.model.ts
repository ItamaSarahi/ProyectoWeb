import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import ProductosType from "../types/productos.type";
import { Detalle_VentaModel } from "./detalle_venta.model";
import { Detalle_CompraModel } from "./detalle_compra.model";

export class ProductosModel extends Model<ProductosType> {
  precio_Venta: any;
  Detalle_CompraModels: any;
  url_imagen(url_imagen: any, arg1: number, arg2: number, arg3: { width: number; heigth: number; }) {
    throw new Error("Method not implemented.");
  }
  idProducto: any;
  nombre: any;
  categoria: any;
  descripcion: any;
  existencia: any;
  precio_Compra: any;
  idProveedor: any;
}

ProductosModel.init(
  {
    idProducto:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },

    categoria: {
      type: DataTypes.STRING(40),
      allowNull: true
    },

    descripcion: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    existencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    precio_Compra: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    precio_Venta: {
        type: DataTypes.DOUBLE,
        allowNull: false,

      },
      url_imagen:{
        type: DataTypes.STRING(45),
        allowNull: true,
      }
  },
  {
    sequelize,
    timestamps: false, //Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "productos",
  }

  
);

ProductosModel.hasMany(Detalle_VentaModel,{
  foreignKey:"idProducto",
  sourceKey:"idProducto"
});

ProductosModel.hasMany(Detalle_CompraModel,{
  
   foreignKey:"idProducto",
   sourceKey:"idProducto"
}); 