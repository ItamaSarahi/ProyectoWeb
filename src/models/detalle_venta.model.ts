import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import Detalle_VentaType from "../types/detalle_venta.type";

export class Detalle_VentaModel extends Model<Detalle_VentaType> {}

Detalle_VentaModel.init(
  {
    id_DV:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    precio_Total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false, //Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "detalle_venta",
  }

  
);