import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import ComprasType from "../types/compra.type";
import { Sequelize } from "sequelize";
import { Detalle_CompraModel } from "./detalle_compra.model";

export class ComprasModel extends Model<ComprasType> {}

ComprasModel.init(
  {
    idCompra:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },

    fechaCompra: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_DATE')
        
    },

    empleado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue:"Administrador"
    },
  },
  {
    sequelize,
    timestamps: false, //Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "compras",
  }
);
ComprasModel.hasMany(Detalle_CompraModel,{
  foreignKey:"idCompra",
  sourceKey:"idCompra"
});
