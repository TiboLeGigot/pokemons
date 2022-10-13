module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Pokemon',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utilisez uniquement des nombres entiers comme valeur de PV" },
                    notNull: { msg: "Les PVs sont une propriété requise" }
                }
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('types').split(',')
                },
                set(types) {
                    this.setDataValue('types', types.join())
                }
            }
        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        })
}