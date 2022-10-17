const validTypes = ['Plante', 'Poison', 'Feu', 'Acier', 'Dragon', 'Electrik', 'Insecte', 'Plante', 'Psy', 'Sol', 'Ténèbres', 'Combat', 'Eau', 'Fée', 'Glace', 'Normal', 'Roche', 'Spectre', 'Vol']

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
                allowNull: false,
                unique: {
                    msg: "Le nom du pokémon est déjà pris."
                },
                validate: {
                    notNull: { msg: "Le nom du pokémon est une propriété requise." },
                    notEmpty: { msg: "Le nom du pokémon ne peut être vide." }
                }
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utilisez uniquement des nombres entiers comme valeur de PV" },
                    notNull: { msg: "Les PV's sont une propriété requise" },
                    min: {
                        args: [1],
                        msg: "PV minimum = 1"
                    },
                    max: {
                        args: [999],
                        msg: "PV max = 999"
                    }
                }
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utilisez uniquement des nombres entiers comme valeur de CP" },
                    notNull: { msg: "Les CP's sont une propriété requise" }
                },
                min: {
                    args: [1],
                    msg: "CP minimum = 1"
                },
                max: {
                    args: [99],
                    msg: "CP max = 99"
                }
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: { msg: "Rentrez un URL valide" },
                    notNull: { msg: "L'image du pokémon est une propriété requise" }
                }
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('types').split(',')
                },
                set(types) {
                    this.setDataValue('types', types.join())
                },
                validate: {
                    isTypesValid(value) {
                        if (!value) {
                            throw new Error('Un pokémon doit avoir au moins 1 type')
                        }

                        if (value.split(',').length > 3) {
                            throw new Error('Un pokémon ne peut pas avoir plus de 3 types')
                        }

                        value.split(',').forEach(type => {
                            if (!validTypes.includes(type)) {
                                throw new Error(`Le type de pokémon doit appartenir à la liste suivante : ${validTypes}`)
                            }
                        });
                    }
                }
            }
        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        })
}