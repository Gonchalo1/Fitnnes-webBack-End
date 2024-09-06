import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/db'; // Importa la instancia de Sequelize

// Define la interfaz para los atributos del modelo Reembolsos
interface ReembolsosAttributes {
  id?: number;
  pago_id: number;
  monto: number;
  razon: string;
  estado: string;
  fecha_procesado: Date;
}

// Define la interfaz para los atributos opcionales del modelo Reembolsos
interface ReembolsosCreationAttributes extends Optional<ReembolsosAttributes, 'id'> {}

// Define el modelo Reembolsos
class Reembolsos extends Model<ReembolsosAttributes, ReembolsosCreationAttributes> 
  implements ReembolsosAttributes {
  public id!: number;
  public pago_id!: number;
  public monto!: number;
  public razon!: string;
  public estado!: string;
  public fecha_procesado!: Date;

  // Marca los atributos como opcionales para la creación
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializa el modelo
Reembolsos.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pago_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pagos', // Nombre de la tabla a la que se refiere
      key: 'id', // Clave primaria de la tabla de referencia
    },
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  razon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_procesado: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize, // Instancia de Sequelize
  tableName: 'reembolsos',
  timestamps: false, // Desactiva timestamps si no los necesitas
});

export default Reembolsos;
