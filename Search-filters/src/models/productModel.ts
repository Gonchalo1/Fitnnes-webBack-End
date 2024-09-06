import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/db'; // Importamos la instancia de Sequelize desde db.ts

// Definir la interfaz para los atributos de Producto
interface ProductoAttributes {
  id: number;
  nombre: string;
  categoria?: string; // Opcional
  precio?: number;    // Opcional
  tela?: string;      // Opcional
  createdAt: Date;
  updatedAt: Date;
}

// Definir la interfaz para los atributos opcionales en la creación
interface ProductoCreationAttributes extends Optional<ProductoAttributes, 'id'> {}

// Extender la clase Model de Sequelize para usar los atributos definidos
class Producto extends Model<ProductoAttributes, ProductoCreationAttributes> implements ProductoAttributes {
  public id!: number;
  public nombre!: string;
  public categoria?: string;
  public precio?: number;
  public tela?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Definir el modelo con sus columnas y tipos
Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    tela: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'productos', // El nombre del modelo en la base de datos
    tableName: 'productos', // Nombre de la tabla explícitamente
    timestamps: true
  }
);

export default Producto;
