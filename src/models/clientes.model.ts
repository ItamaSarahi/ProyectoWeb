import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import ClientesType from "../types/clientes.type";
import { VentasModel } from "./ventas.model";
export class ClienteModel extends Model<ClientesType> { }


ClienteModel.init(
  {
    idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_C: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    apellidoPC: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    apellidoMC: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    email : {
      type: DataTypes.STRING(30),
      allowNull:false,
    },
    
    num_telefono: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },

  },
  {
    sequelize,
    timestamps: false, //Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "cliente"
  },
);

ClienteModel.hasMany(VentasModel,{
  foreignKey:"idCliente",
  sourceKey:"idCliente"
});


