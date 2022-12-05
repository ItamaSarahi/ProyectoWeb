import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import UsuariosType from "../types/usuarios.type";
import { ClienteModel } from "./clientes.model";
import { EmpleadosModel } from "./empleados.model";

export class UsuariosModel extends Model<UsuariosType> {
  email: any;
  ClienteModel: any;
  idEmpleado: any;
  nombre_E: any;
  apellidoPE: any;
  apellidoME: any;
  nivelEstudio: any;
  EmpleadosModel: any;
}

UsuariosModel.init(
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,

    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { name: "uCorreoUsuario", msg: "Correo Anteriormente Registrado" },
      validate: {
        isEmail: {
          msg: "no es un correo",
        },
      }

    },


    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    rol: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }


  },
  {
    sequelize,
    timestamps: false,//Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "usuarios",
  }


);

UsuariosModel.hasOne(ClienteModel, {
  foreignKey: "idUsuario",
  sourceKey: "idUsuario"
});

UsuariosModel.hasOne(EmpleadosModel, {
  foreignKey: "idUsuario",
  sourceKey: "idUsuario"
});
