import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import ProveedoresType from "../types/proveedores.type";
import { ProductosModel } from "./productos.model";
import { ComprasModel } from "./compra.model";

export class ProveedoresModel extends Model<ProveedoresType> {}

ProveedoresModel.init(
  {
    idProveedor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },
    empresa: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    
  },
  {
    sequelize,
    timestamps: false,//Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "proveedores",
  }
);

ProveedoresModel.hasMany(ProductosModel,{
  foreignKey:"idProveedor",
  sourceKey:"idProveedor"
});

ProveedoresModel.hasMany(ComprasModel,{
  foreignKey:"idProveedor",
  sourceKey:"idProveedor"
});