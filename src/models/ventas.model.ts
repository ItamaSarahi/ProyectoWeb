import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/database.config";
import VentasType from "../types/ventas.type";
import { Detalle_VentaModel } from "./detalle_venta.model";

export class VentasModel extends Model<VentasType> {}

VentasModel.init(
  {
    idVenta:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },
   fecha_Inicial: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE')
    },
    fecha_Vencimiento: {
        type: DataTypes.DATE,
        allowNull: true,
        //defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false, //Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "ventas",
  }

  
);


VentasModel.hasMany(Detalle_VentaModel,{
    foreignKey:"idVenta",
    sourceKey:"idVenta"
  });