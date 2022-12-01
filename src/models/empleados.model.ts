import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import EmpleadosType from "../types/empleados.type";
import { VentasModel } from "./ventas.model";

export class EmpleadosModel extends Model<EmpleadosType> {
  idEmpleado: any;
  nombre_E: any;
  apellidoME: any;
  nivelEstudio: any;
  email: any;
  apellidoPE: any;
}

EmpleadosModel.init(
  {
    idEmpleado:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false,
    },
    nombre_E: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidoPE: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    apellidoME: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    
      email:{
        type: DataTypes.STRING(30),
        allowNull:false,
      },

      nivelEstudio:{
        type:DataTypes.STRING(30),
        allowNull:false
      }
      
  },
  
  {
    sequelize,
    timestamps: false,//Para que no se agreguen los campos CreateAt ni UpdateAt
    tableName: "empleados",
  }

  
);

EmpleadosModel.hasMany(VentasModel,{
  foreignKey:"idEmpleado",
  sourceKey:"idEmpleado"
});
