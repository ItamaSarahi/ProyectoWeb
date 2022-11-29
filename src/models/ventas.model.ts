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
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE')
    },
    fecha_Vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        //defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue:"NO PAGADO"
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
  sourceKey:"idVenta",
  onDelete:'cascade',hooks:true,
  });