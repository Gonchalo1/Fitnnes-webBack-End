import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/db'; // Asegúrate de que esta ruta es correcta y que 'sequelize' está exportado como propiedad del objeto

// Define la interfaz para los atributos del modelo Pagos
interface PagosAttributes {
  id?: number;
  pedido_id: number;
  monto: number;
  metodo_pago: string;
  estado: string;
  fecha_transaccion: Date;
  detalles_transaccion: any; // Puedes reemplazar `any` con un tipo más específico si conoces la estructura de JSONB
  createdAt?: Date;
  updatedAt?: Date;
}

// Define la interfaz para los atributos opcionales del modelo Pagos
interface PagosCreationAttributes extends Optional<PagosAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define el modelo Pagos
class Pagos extends Model<PagosAttributes, PagosCreationAttributes> 
  implements PagosAttributes {
  public id!: number;
  public pedido_id!: number;
  public monto!: number;
  public metodo_pago!: string;
  public estado!: string;
  public fecha_transaccion!: Date;
  public detalles_transaccion!: any; // Puedes reemplazar `any` con un tipo más específico si conoces la estructura de JSONB
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializa el modelo
Pagos.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  pedido_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_transaccion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  detalles_transaccion: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    field: 'createdAt' // Define el nombre de la columna en la base de datos
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    field: 'updatedAt' // Define el nombre de la columna en la base de datos
  }
}, {
  sequelize, // Instancia de Sequelize
  tableName: 'pagos', // Nombre de la tabla en la base de datos
  timestamps: true // Asegúrate de que esta opción esté habilitada para gestionar createdAt y updatedAt automáticamente
});

export default Pagos;
