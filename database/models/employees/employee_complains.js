const { Model, Sequelize, sequelize } = require("../../mysql");
const complains = require("../systems/complains");
const employees = require("../system_properties/employees");
class employee_complains extends Model { };
employee_complains = sequelize.define('employee_complains', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});
employees.belongsToMany(complains, { through: employee_complains });
complains.belongsToMany(employees, { through: employee_complains });
employee_complains.belongsTo(complains);
employee_complains.belongsTo(employees);


module.exports = employee_complains;