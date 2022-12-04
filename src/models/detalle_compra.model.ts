import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import Detalle_CompraType from "../types/detalle_compra.type";
import { Sequelize } from "sequelize";

export class Detalle_CompraModel extends Model<Detalle_CompraType> {}

Detalle_CompraModel.init(
  {
    id_DC:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    
      fechaCompra: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE')
  
      },

      
  },
  {
    sequelize,
    timestamps: false, //Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "detalle_compra",
  }

  
);
