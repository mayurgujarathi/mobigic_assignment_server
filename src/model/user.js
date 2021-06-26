module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id'
        },
        email: {
          type: DataTypes.STRING(10),
          allowNull: true,
          field: 'email'
        },
        username: {
          type: DataTypes.STRING(20),
          allowNull: true,
          field: 'username'
        },
        password: {
          type: DataTypes.STRING(20),
          allowNull: true,
          field: 'password'
        },
        
        createdBy: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'created_by'
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'created_at'
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'updated_at'
        },
        updated_by: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'updated_by'
        }
      },
      {
        tableName: 'user'
      }
    );
    User.associate = models => {
  
    };
     return User;
  };
  