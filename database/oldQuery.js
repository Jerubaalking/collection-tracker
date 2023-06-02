const Table = require("./tables");

class Query {
    constructor(Model) {
        this.modelName = Model;
        this.syncForceTable().then().catch(err=>console.log(err));

    }
    async syncForceTable() {
        this._tables = [];
        try {
            this.modelName.forEach(async name => {
                let tables = await new Table(name);

                let table = await tables._sequelize.modelManager.getModel(name);
                console.log('table...', name);
                await table.sync({ force: true })
            });
        } catch (err) {
            console.log('...resync table had error...', err.message);
            this.syncForceTable();
        }
    }
    async syncTable() {
        // let table = new Table(this.Model);
        await this._table._sequelize.sync()

    }
}

let q = new Query(['Schools', 'Settings']);
// q.syncForceTable().then(async ans => {
//     console.log('ans::', ans);
// }).catch(err => console.log(err));