
const { generateTithe, generateRandom } = require('../backend/controllers/services/service');
const { sequelize, Sequelize, Op } = require('./mysql');
const datatable = require('sequelize-datatables');
// const QueryInterface = new sequelize.getQueryInterface();
// QueryInterface
class _DB {
  constructor(table, currentUser, limit = 10, params) {
    this.table = table;
    this.limit = limit;
    this.params = params;
    this.currentUser = currentUser;
    // this.selectedChurch = currentUser.selectedChurch;
    this.syncDatabase();
  }
  async getModel(option) {
    let { Churches, Users, Subscriptions, Countries, Subscribers, Methods, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (option) {
      case "Churches":
        return await Churches;
      case "Users":
        return await Users;
      case "Countries":
        return await Countries;
      case "Regions":
        return await Regions;
      case "Roles":
        return await Roles;
      case "Tithes":
        return await Tithes;
      case "Currencies":
        return await Currencies;
      case "Members":
        return await Members;
      case "Methods":
        return await Methods;
      case "Events":
        return await Events;
      case "Services":
        return await Services;
      case "Statistics":
        return await Services;
      case "Projects":
        return await Projects;
      case "Pledges":
        return await Pledges;
      case "Contributions":
        return await Contributions;
      case "Contributions":
        return await Contributions;
      case "Transactions" || "Incomes" || "Spendings":
        return await Transactions;
      case "Offering_Types":
        return await Offering_Types;
      case "Offerings":
        return await Offerings;
      case "Subscriptions":
        return await Subscriptions;
      case "Subscribers":
        return await Subscribers;
      default:
        break;
    }
  }
  async find() {
    let { Churches, Users, Subscriptions, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings, Methods } = await this._model();
    switch (this.table) {
      case "Churches":
        return await Churches.findAll();
      case "Users":
        return await Users.findAll();
      case "Countries":
        return await Countries.findAll({ order: [['createdAt', 'DESC']] });
      case "Regions":
        return await Regions.findAll();
      case "Roles":
        return Roles.findAll();
      case "Tithes":
        return Tithes.findAll();
      case "Currencies":
        return Currencies.findAll();
      case "Methods":
        if (this.currentUser.selectedChurch) {
          var churchId = this.currentUser.selectedChurch.id;
          var methods = JSON.parse(JSON.stringify(await Methods.findAll({ where: { id: churchId } })));
        } else {
          var methods = JSON.parse(JSON.stringify(await Methods.findAll()));
        }
        return await methods;
      case "Members":
        if (this.currentUser.selectedChurch) {
          var churchId = this.currentUser.selectedChurch.id;
          var members = JSON.parse(JSON.stringify(await Members.findAll({ where: { id: churchId } })));
        } else {
          var members = JSON.parse(JSON.stringify(await Members.findAll()));
        }
        return await members;
      case "Transanctions" || "Incomes" || "Spendings":
        return await Transactions.findAll();
      case "Subscriptions":
        return await Subscriptions.findAll();
      case "Statistics":
        return await Services.findAll();
      case "Services":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          var service = JSON.parse(JSON.stringify(await Services.findAll({ where: { id: churchId } })));
        } else {
          var service = JSON.parse(JSON.stringify(await Services.findAll()));
        }
        return await service;
      case "Projects":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          var projects = JSON.parse(JSON.stringify(await Projects.findAll({ where: { id: churchId } })));
        } else {
          var projects = JSON.parse(JSON.stringify(await Projects.findAll()));
        }
        return await projects;
      case "Subscribers":
        return await Subscribers.findAll();
      case "Events":
        return await Events.findAll();
      default:
        break;
    }
  }

  async idFind(id = new Number()) {
    await this.getModel();
    let { Churches, Users, Subscriptions, Subscribers, Methods, Countries, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":
        return await Churches.findOne({ where: { id: id } });
      case "Church":
        return await Churches.findOne({ where: { id: id } });
      case "Users":
        return await Users.findOne({ where: { id: id } });
      case "Countries":
        return await Countries.findOne({ where: { id: id } });
      case "Events":
        return await Events.findOne({ where: { id: id } });
      case "Roles":
        return await Roles.findOne({ where: { id: id } });
      case "Regions":
        return await Regions.findOne({ where: { id: id } });
      case "Tithes":
        return await Tithes.findOne({ where: { id: id } });
      case "Methods":
        return await Methods.findOne({ where: { id: id } });
      case "Currencies":
        return await Currencies.findOne({ where: { id: id } });
      case "Projects":
        return await Projects.findOne({ where: { id: id } });
      case "Transanctions" || "Incomes" || "Spendings":
        return await Transactions.findOne({ where: { id: id } });
      case "Subscriptions":
        return await Subscriptions.findOne({ where: { id: id } });
      case "Subscribers":
        return await Subscribers.findOne({ where: { id: id } });
      case "Statistics":
        return await Services.findOne({ where: { id: id } });
      case "Services":
        return await Services.findOne({ where: { id: id } });
      case "Members":
        return await Members.findOne({ where: { id: id } });
      default:
        break;
    }
  }

  async idFindYByDate(id = new Number(), start, end) {
    await this.getModel();
    let { Churches, Users, Subscriptions, Subscribers, Methods, Countries, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":
        return await Churches.findOne({ where: { id: id } });
      case "Church":
        return await Churches.findOne({ where: { id: id } });
      case "Users":
        return await Users.findOne({ where: { id: id } });
      case "Countries":
        return await Countries.findOne({ where: { id: id } });
      case "Events":
        return await Events.findOne({ where: { id: id } });
      case "Roles":
        return await Roles.findOne({ where: { id: id } });
      case "Regions":
        return await Regions.findOne({ where: { id: id } });
      case "Tithes":
        return await Tithes.findOne({ where: { id: id } });
      case "Methods":
        return await Methods.findOne({ where: { id: id } });
      case "Currencies":
        return await Currencies.findOne({ where: { id: id } });
      case "Projects":

        // var churchId = this.currentUser.selectedChurch.id;
        var projects = JSON.parse(JSON.stringify(await Projects.findAll({ where: { start_date: { [Op.between]: [new Date(start), new Date(`${end}T23:59:59.9999Z`)] } }, include: { all: true, nested: false } })));
        for (const project of projects) {
          project.supervisor = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: project.supervisorId } })));
          project.treasurer = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: project.treasurerId } })));
          project.total_pledges = 0;
          project.total_contributions = 0;
          for (const pledge of project.pledges) {
            project.total_pledges = + parseFloat(pledge.amount);
          }

          for (const contribution of project.contributions) {
            let dt = JSON.parse(JSON.stringify(await Transactions.findOne({ where: { id: contribution.transactionId } })));
            console.log('td::', dt);
            project.total_contributions = + parseFloat(dt.amount);
          }
          project.progress = Math.round(((project.total_contributions) / project.estimate) * 100);

        };
        return await projects;
      case "Transanctions" || "Incomes" || "Spendings":
        return await Transactions.findOne({ where: { id: id } });
      case "Subscriptions":
        return await Subscriptions.findOne({ where: { id: id } });
      case "Subscribers":
        return await Subscribers.findOne({ where: { id: id } });
      case "Statistics":
        return await Services.findOne({ where: { id: id } });
      case "Services":
        console.log('i was here too::', new Date(start), new Date(`${end}T23:59:59.000`));
        return await Services.findAll({ where: { date: { [Op.between]: [new Date(start), new Date(`${end}T23:59:59.9999Z`)] } } });
      case "Members":
        return await Members.findOne({ where: { id: id } });
      default:
        break;
    }
  }
  async emailFind(email = new String()) {
    let { Users, Members, Churches } = await this._model();
    return await Users.findOne({ where: { email: email }, include: { model: Members, model: Churches } });
  }
  async findWithRelatives(options = {} || null) {
    await this.getModel();
    let { Churches, Users, Subscriptions, SubcriptionsPrices, Methods, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":

        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          var church = JSON.parse(JSON.stringify(await Churches.findAll({ where: { id: churchId } })));
        } else {
          var church = JSON.parse(JSON.stringify(await Churches.findAll()));
        }

        for (const ch of church) {
          // console.log("ch is loaded here:::", ch);
          for (const key in ch.users) {
            if (ch.users[key].type == 'superadmin') {
              var subscribers = JSON.parse(JSON.stringify(await Subscribers.findOne({ where: { userId: ch.users[key].id } })));
              console.log('... ::', await subscribers, ch.users[key].id);
              ch['subscription_info'] = await subscribers;
            }
          }
        }

        return church;

      case "Church":
        console.log("current user:: ", this.currentUser);
        return await this.currentUser.churches[0];
      case "Users":
        return await Users.findAll({ include: { model: Members } });
      case "Services":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Services.findAll({ where: { churchId: churchId }, order: [['createdAt', 'ASC']], include: { all: true, nested: false } });
        } else {
          return await Services.findAll({ order: [['createdAt', 'ASC']], include: { all: true, nested: false } });
        }
      case "Statistics":
        return await Services.findAll({ order: [['createdAt', 'ASC']], include: { all: true, nested: false } });
      case "Countries":
        return await Countries.findAll({ order: [['createdAt', 'ASC']], include: [Currencies, Regions] });
      case "Roles":
        return await Roles.findAll();
      case "Regions":
        return await Regions.findAll({ include: { all: true, nested: false } });
      case "Tithes":

        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Tithes.findAll({ where: { churchId: churchId }, include: { model: Transactions, include: { model: Methods } } });
        } else {
          return await Tithes.findAll({ include: { model: Transactions, include: { model: Methods } } });
        }
      case "Methods":
        return await Methods.findAll({ include: { all: true, nested: false } });
      case "Currencies":
        return await Currencies.findAll({ include: { all: true, nested: false } });
      case "Members":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Members.findAll({ where: { churchId: churchId }, include: Users });
        } else {
          return await Members.findAll({ include: Users });
        }
      case "Incomes":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Transactions.findAll({ where: { churchId: churchId, account_type: 'debit' }, include: { model: Methods } });
        } else {
          return await Transactions.findAll({ where: { account_type: 'debit' }, include: { model: Methods } });
        }
      case "Spendings":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Transactions.findAll({ where: { churchId: churchId, account_type: 'credit' }, include: { model: Methods } });
        } else {
          return await Transactions.findAll({ where: { account_type: 'credit' }, include: { model: Methods } });
        }
      case "Events":
        var churchId = this.currentUser.selectedChurch.id;
        return await Events.findAll({ where: { churchId: churchId } });
      // case "Services":
      //   return await Service.findAll({ include: { all: true, nested: false } });
      case "Projects":
        var churchId = this.currentUser.selectedChurch.id;
        var projects = JSON.parse(JSON.stringify(await Projects.findAll({ where: { churchId: churchId }, include: { all: true, nested: false } })));
        for (const project of projects) {
          project.supervisor = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: project.supervisorId } })));
          project.treasurer = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: project.treasurerId } })));
          project.total_pledges = 0;
          project.total_contributions = 0;
          for (const pledge of project.pledges) {
            project.total_pledges = + parseFloat(pledge.amount);
          }

          for (const contribution of project.contributions) {
            let dt = JSON.parse(JSON.stringify(await Transactions.findOne({ where: { id: contribution.transactionId } })));
            console.log('td::', dt);
            project.total_contributions = + parseFloat(dt.amount);
          }
          project.progress = Math.round(((project.total_contributions) / project.estimate) * 100);

        };
        return await projects;
      case "Pledges":
        var churchId = this.currentUser.selectedChurch.id;
        let pledges = JSON.parse(JSON.stringify(await Pledges.findAll({ where: { churchId: churchId }, include: [{ model: Churches, nested: false }, { model: Members, nested: true }, { model: Projects }] })));
        for (const pledge of pledges) {
          pledge.member.user = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: pledge.member.userId } })));
        }
        // for (const pledge of pledges) {
        //   pledge.member = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.memberId }, include: { model: Users } })));
        //   pledge.treasurer = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.treasurerId }, include: { model: Users } })));
        // };
        var projects = JSON.parse(JSON.stringify(await Projects.findAll({ where: { churchId: churchId } })));

        console.log('Pledges:::', [await pledges, await projects]);
        return [await pledges, await projects];
      case "Contributions":
        var churchId = this.currentUser.selectedChurch.id;
        let contributions = JSON.parse(JSON.stringify(await Contributions.findAll({ include: [{ model: Transactions, nested: false }, { model: Members, nested: true }, { model: Projects, nested: true }] })));
        console.log('Contributions:::', contributions);
        for (const contribution of contributions) {
          contribution.member.user = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: contribution.member.userId } })));
          // contribution.pledge.project = JSON.parse(JSON.stringify(await Projects.findOne({ where: { id: contribution.project.projectId } })));
        }
        // for (const pledge of contributions) {
        //   pledge.member = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.memberId }, include: { model: Users } })));
        //   pledge.treasurer = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.treasurerId }, include: { model: Users } })));
        // };
        return await contributions;

      case "Transactions":
        return await Transactions.findAll({ include: { all: true, nested: false } });
      case "Subscriptions":
        return await Subscriptions.findAll({ include: { all: true, nested: false } });
      case "Subscribers":
        var subs = JSON.parse(JSON.stringify(await Subscribers.findAll({ include: { all: true, nested: false, } })));

        for (const ch of subs) {
          // console.log("ch is loaded here:::", ch);
          for (const key in ch.subscriptions) {
            // if (ch.subscriptions[key] == 'superadmin') {
            var subscribers = JSON.parse(JSON.stringify(await Subscriptions.findOne({ where: { id: ch.subscriptions[key].id }, include: { model: SubcriptionsPrices } })));
            console.log('... ::', await subscribers,);
            ch['subscription_prices'] = await subscribers.subscription_prices;
            // }
          }
        }

        return subs;
      default:
        break;
    }
  }
  async findWithRelativesDatatables(options = {} || null) {
    await this.getModel();
    let { Churches, Users, Subscriptions, SubcriptionsPrices, Methods, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":

        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          var church = JSON.parse(JSON.stringify(await Churches.findAll({ where: { id: churchId }, include: { all: true, nested: false } })));
        } else {
          var church = JSON.parse(JSON.stringify(await Churches.findAll({ include: { all: true, nested: false } })));
        }

        for (const ch of church) {
          // console.log("ch is loaded here:::", ch);
          for (const key in ch.users) {
            if (ch.users[key].type == 'superadmin') {
              var subscribers = JSON.parse(JSON.stringify(await Subscribers.findOne({ where: { userId: ch.users[key].id } })));
              console.log('... ::', await subscribers, ch.users[key].id);
              ch['subscription_info'] = await subscribers;
            }
          }
        }

        return church;

      case "Church":
        console.log("current user:: ", this.currentUser);
        return await this.currentUser.churches[0];
      case "Users":
        return await Users.findAll({ include: { model: Members } });
      case "Services":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          console.log('fd.....fd::', this.params)
          var serv = await datatable(Services, this.params, { where: { churchId: churchId }, order: [['createdAt', 'ASC']], include: { all: true, nested: false } });
          console.log('hhhhserver.....::', serv);
          return await serv;
        } else {
          await datatable(Services, this.params, { order: [['createdAt', 'ASC']], include: { all: true, nested: false } });
        }
      case "Statistics":
        return await Services.findAll({ order: [['createdAt', 'ASC']], include: { all: true, nested: false } });
      case "Countries":
        return await Countries.findAll({ order: [['createdAt', 'ASC']], include: [Currencies, Regions] });
      case "Roles":
        return await datatable(Roles, this.params, {});
      case "Regions":
        // requestBody.columns[1].data = 
        let regions = await datatable(Regions, requestBody, { include: { all: true, nested: false } });
        console.log(await regions);
        return await regions;
      // return await Regions.findAll({ include: { all: true, nested: false } });
      case "Tithes":

        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Tithes.findAll({ where: { churchId: churchId }, include: { model: Transactions, include: { model: Methods } } });
        } else {
          return await Tithes.findAll({ include: { model: Transactions, include: { model: Methods } } });
        }
      case "Methods":
        return await Methods.findAll({ include: { all: true, nested: false } });
      case "Currencies":
        return await Currencies.findAll({ include: { all: true, nested: false } });
      case "Members":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Members.findAll({ where: { churchId: churchId }, include: Users });
        } else {
          return await Members.findAll({ include: Users });
        }
      case "Incomes":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Transactions.findAll({ where: { churchId: churchId, account_type: 'debit' }, include: { model: Methods } });
        } else {
          return await Transactions.findAll({ where: { account_type: 'debit' }, include: { model: Methods } });
        }
      case "Spendings":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Transactions.findAll({ where: { churchId: churchId, account_type: 'credit' }, include: { model: Methods } });
        } else {
          return await Transactions.findAll({ where: { account_type: 'credit' }, include: { model: Methods } });
        }
      case "Events":
        var churchId = this.currentUser.selectedChurch.id;
        return await Events.findAll({ where: { churchId: churchId } });
      // case "Services":
      //   return await Service.findAll({ include: { all: true, nested: false } });
      case "Projects":
        var churchId = this.currentUser.selectedChurch.id;
        var projects = JSON.parse(JSON.stringify(await Projects.findAll({ where: { churchId: churchId }, include: { all: true, nested: false } })));
        for (const project of projects) {
          project.supervisor = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: project.supervisorId } })));
          project.treasurer = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: project.treasurerId } })));
          project.total_pledges = 0;
          project.total_contributions = 0;
          for (const pledge of project.pledges) {
            project.total_pledges = + parseFloat(pledge.amount);
          }

          for (const contribution of project.contributions) {
            let dt = JSON.parse(JSON.stringify(await Transactions.findOne({ where: { id: contribution.transactionId } })));
            console.log('td::', dt);
            project.total_contributions = + parseFloat(dt.amount);
          }
          project.progress = Math.round(((project.total_contributions) / project.estimate) * 100);

        };
        return await projects;
      case "Pledges":
        var churchId = this.currentUser.selectedChurch.id;
        let pledges = JSON.parse(JSON.stringify(await Pledges.findAll({ where: { churchId: churchId }, include: [{ model: Churches, nested: false }, { model: Members, nested: true }, { model: Projects }] })));
        for (const pledge of pledges) {
          pledge.member.user = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: pledge.member.userId } })));
        }
        var projects = JSON.parse(JSON.stringify(await Projects.findAll({ where: { churchId: churchId } })));
        // for (const pledge of pledges) {
        //   pledge.member = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.memberId }, include: { model: Users } })));
        //   pledge.treasurer = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.treasurerId }, include: { model: Users } })));
        // };
        console.log('Pledges:::', [await pledges, await projects]);
        return [await pledges, await projects];
      case "Contributions":
        var churchId = this.currentUser.selectedChurch.id;
        let contributions = JSON.parse(JSON.stringify(await Contributions.findAll({ include: [{ model: Transactions, nested: false }, { model: Members, nested: true }, { model: Projects, nested: true }] })));
        console.log('Contributions:::', contributions);
        for (const contribution of contributions) {
          contribution.member.user = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: contribution.member.userId } })));
          // contribution.pledge.project = JSON.parse(JSON.stringify(await Projects.findOne({ where: { id: contribution.project.projectId } })));
        }
        // for (const pledge of contributions) {
        //   pledge.member = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.memberId }, include: { model: Users } })));
        //   pledge.treasurer = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.treasurerId }, include: { model: Users } })));
        // };
        return await contributions;

      case "Transactions":
        return await Transactions.findAll({ include: { all: true, nested: false }, });
      case "Subscriptions":
        return await Subscriptions.findAll({ include: { all: true, nested: false, }, });
      case "Subscribers":
        var subs = JSON.parse(JSON.stringify(await Subscribers.findAll({ include: { all: true, nested: false, }, })));

        for (const ch of subs) {
          // console.log("ch is loaded here:::", ch);
          for (const key in ch.subscriptions) {
            // if (ch.subscriptions[key] == 'superadmin') {
            var subscribers = JSON.parse(JSON.stringify(await Subscriptions.findOne({ where: { id: ch.subscriptions[key].id }, include: { model: SubcriptionsPrices } })));
            console.log('... ::', await subscribers,);
            ch['subscription_prices'] = await subscribers.subscription_prices;
            // }
          }
        }

        return subs;
      default:
        break;
    }
  }

  async idFindWithRelative(id = new Number()) {
    await this.getModel();
    let { Churches, Users, Subscriptions, Methods, Subscribers, Countries, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":
        return await Churches.findOne({ where: { id: id }, include: { model: Regions } });
      case "Church":
        return await Churches.findOne({ where: { id: id }, include: { model: Regions } });
      case "Users":
        return await Users.findOne({ where: { id: id }, include: { model: Churches } });
      case "Countries":
        return await Countries.findOne({ where: { id: id }, include: [Regions, Currencies] });
      case "Regions":
        return await Regions.findOne({ where: { id: id }, include: { model: Countries, include: { model: Currencies } } });

      case "Pledges":
        let pledges = JSON.parse(JSON.stringify(await Pledges.findOne({ where: { id: id }, include: [{ model: Churches, nested: false }, { model: Members }, { model: Projects }] })));
        // for (const pledge of pledges) {
        console.log('server pledges::', id, pledges);
        pledges.member.user = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: pledges.member.userId } })));
        // }
        // for (const pledge of pledges) {
        //   pledge.member = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.memberId }, include: { model: Users } })));
        //   pledge.treasurer = JSON.parse(JSON.stringify(await Members.findOne({ where: { id: pledge.treasurerId }, include: { model: Users } })));
        // };

        return await pledges;
      case "Incomes":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Transactions.findOne({ where: { id: id, account_type: 'debit' }, include: { model: Methods } });
        } else {
          return await Transactions.findOne({ where: { id: id, account_type: 'debit' }, include: { model: Methods } });
        }
      case "Tithes":
        return await Tithes.findOne({ where: { id: id }, include: { all: true, nested: false } });

      case "Contributions":
        return await Contributions.findOne({ where: { id: id }, include: { all: true, nested: false } });
      // case "Tithes":
      //   return await Tithes.findOne({ where: { id: id }, include: { all: true, nested: true } });
      case "Currencies":
        return await Currencies.findOne({ where: { id: id }, include: { model: Countries, include: { model: Regions } } });
      case "Roles":
        return await Roles.findOne({ where: { id: id } });
      case "Methods":
        return await Methods.findOne({ where: { id: id }, include: { all: true, nested: false } });
      case "Members":
        return await Members.findOne({ where: { id: id }, include: { all: true, nested: false } });
      case "Subscriptions":
        console.log('....loading here:::');
        return await Subscriptions.findOne({ where: { id: id }, include: { all: true, nested: false } });
      case "Services":
        return await Services.findOne({ where: { id: id }, include: { all: true, nested: false } });
      case "Projects":
        let projects = JSON.parse(JSON.stringify(await Projects.findOne({ where: { id: id }, include: { all: true, nested: false } })));
        // for (const project of projects) {
        console.log('project....DB::', projects);
        if (projects) {
          projects.supervisor = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: projects.supervisorId } })));
          projects.treasurer = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: projects.treasurerId } })));
          projects.total_contributions = 0;
          projects.total_pledges = 0;
          for (const i in await projects.contributions) {
            let transaction = JSON.parse(JSON.stringify(await Transactions.findOne({ where: { id: projects.contributions[i].transactionId } })));
            projects.contributions[i]['transaction'] = await transaction;
            projects.total_contributions = +transaction.amount;
          }
          for (const pledge of await projects.pledges) {
            projects.total_pledges = + await pledge.amount;
          }
          projects.supervisor = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: projects.supervisorId } })));
          projects.treasurer = JSON.parse(JSON.stringify(await Users.findOne({ where: { id: projects.treasurerId } })));
          projects.progress = Math.round(((projects.total_contributions) / projects.estimate) * 100);
          console.log('Final project::', projects);
          return await projects;
        } else {
          return [];
        }
      case "Spendings":
        var churchId = this.currentUser.selectedChurch.id;
        if (this.currentUser.selectedChurch) {
          return await Transactions.findOne({ where: { id: id, account_type: 'credit' }, include: { model: Methods } });
        } else {
          return await Transactions.findOne({ where: { id: id, account_type: 'credit' }, include: { model: Methods } });
        }
      case "Statistics":
        return await Services.findOne({ where: { id: id }, include: { all: true, nested: false } });
      case "Subscribers":
        return await Subscribers.findOne({ where: { id: id }, include: { all: true, nested: false } });
      case "Transactions" || "Incomes" || "Spendings":
        return await Transactions.findOne({ where: { id: id }, include: { all: true, nested: false } });
      default:
        break;
    }
  }
  async relatives() {
    await this.getModel();
    let { Churches, Users, Subscriptions, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings, Methods } = await this._model();
    switch (this.table) {
      case "Churches":
        return ["Users", "Regions", "Countries"];
      case "Users":
        return ["Churches", "Currencies"];
      case "Countries":
        return ["Churches", "Regions", "Currencies"];
      case "Regions":
        return ["Countries"];
      case "Currencies":
        return ["Users"];
      case "Tithes":
        return ["Methods"];
      case "Roles":
        return [];
      case "Methods":
        return [];
      case "Members":
        return ["Users"];
      case "Transactions" || "Incomes" || "Spendings":
        return ["Methods"]
      case "Subscribers":
        return ["Subscriptions"]
      case "Subscriptions":
        return []
      case "Services":
        return ['Members']
      case "Projects":
        return ['Members'];
      case "Pledges":
        return ['Members', 'Projects'];
      case "Contributions":
        return ['Members', 'Projects'];
      default:
        break;
    }
  }

  async create(data) {
    await this.getModel();
    let { Churches, Users, Subscriptions, Subscribers, Methods, Countries, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Methods":
        try {
          let services = await Methods.build(data);
          return await services.save();
        } catch (err) {
          return err;
        };
      case "Churches" || "Church":
        try {
          let services = await Churches.build(data);
          return await services.save();
        } catch (err) {
          return err;
        };
      case "Users":
        try {
          let services = await Users.build(data);
          return await services.save();
        } catch (err) {
          return err;
        };
      case "Countries":
        try {
          let news = await Countries.build(data);
          return await news.save();
        } catch (err) {
          return err;
        }
      case "Subscriptions":
        try {
          let subscriptions = await Subscriptions.build(data);
          return await subscriptions.save();
        } catch (err) {
          return err;
        };

      case "Subscribers":
        try {
          let subscribers = await Subscribers.build(data);
          return await subscribers.save();
        } catch (err) {
          return err;
        };
      case "Tithes":
        try {

          var churchId = this.currentUser.selectedChurch.id;
          if (this.currentUser.selectedChurch) {
            data.ref_no = await generateRandom(12);
            data.reason = 'tithe payment'
            data.account_type = 'debit';
            let transactions = await Transactions.build(data);
            transactions.churchId = this.currentUser.selectedChurch.id;
            await transactions.save();
            let tithes = await Tithes.build(data);
            tithes.transactionId = transactions.id;
            tithes.churchId = transactions.churchId;
            tithes.transactionId = transactions.id;
            return await tithes.save();
          } else {// console.log("db data::::", data, await this.currentUser)
            /** same stuff */
            data.ref_no = await generateRandom(12);
            data.reason = 'tithe payment'
            data.account_type = 'debit';
            let transactions = await Transactions.build(data);
            transactions.churchId = this.currentUser.selectedChurch.id;
            await transactions.save();
            let tithes = await Tithes.build(data);
            tithes.transactionId = transactions.id;
            tithes.churchId = transactions.churchId;
            tithes.transactionId = transactions.id;
            return await tithes.save();
          }
        } catch (err) {
          return err;
        }

      case "Projects":
        try {
          var churchId = this.currentUser.selectedChurch.id;
          if (this.currentUser.selectedChurch) {
            // console.log("db data::::", data, await this.currentUser)
            var project = await Projects.build(data);
            project.churchId = churchId;
            // console.log('....:::...:::', statistics)
            await project.save();
          } else {// console.log("db data::::", data, await this.currentUser)
            var project = await Projects.build(data);
            project.churchId = churchId;
            // console.log('....:::...:::', statistics)
            await project.save();
          }
        } catch (err) {
          return err;
        }
      case "Regions":
        try {
          let portfolio = await Regions.build(data);
          return await portfolio.save();
        } catch (err) {
          return err;
        }
      case "Services":
        try {
          var churchId = this.currentUser.selectedChurch.id;
          if (this.currentUser.selectedChurch) {
            // console.log("db data::::", data, await this.currentUser)
            var services = await Services.build(data);
            services.churchId = churchId;
            // console.log('....:::...:::', statistics)
            await services.save();
          } else {// console.log("db data::::", data, await this.currentUser)
            var services = await Services.build(data);
            services.churchId = churchId;
            // console.log('....:::...:::', statistics)
            await services.save();
          }

          let thks = {
            date: data.date,
            amount: data.thanks,
            reason: "service thanks giving offering",
            ref_no: await generateRandom(12),
            receipt: await generateRandom(12),
            account_type: 'debit',
            methodId: 1,
            churchId: churchId
          }
          let offerings = {
            date: data.date,
            amount: data.offerings,
            reason: "service general offerings",
            ref_no: await generateRandom(12),
            receipt: await generateRandom(12),
            account_type: 'debit',
            methodId: 1,
            churchId: churchId
          }
          let firstfruits = {
            date: data.date,
            amount: data.firstfruits,
            reason: "service first fruits offerings",
            ref_no: await generateRandom(12),
            receipt: await generateRandom(12),
            account_type: 'debit',
            methodId: 1,
            churchId: churchId
          }
          let transactions = await Transactions.bulkCreate([thks, offerings, firstfruits]);
          await services.addTransactions(transactions);
          return await [service, transactions];
        } catch (err) {
          return err;
        }
      case "Currencies":
        try {
          let products = await Currencies.build(data);
          return await products.save();
        } catch (err) {
          return err;
        }
      case "Roles":
        try {
          let slides = await Roles.build(data);
          return await slides.save();
        } catch (err) {
          return err;
        }

      case "Members":
        try {
          // add them to user first
          let users = await Users.build(data);
          let userz = await users.save()
          let users1 = JSON.parse(JSON.stringify(await userz));
          let member = {};
          member.tithe_number = await generateRandom(7);
          member.userId = users1.id;
          var churchId = this.currentUser.selectedChurch.id;
          let members = await Members.build(member);
          members.churchId = churchId;
          await members.save();
          let churches = await Churches.findOne({ where: { id: data.churchId } });
          await churches.addUser(userz);
          return await members;
        } catch (err) {
          return err;
        }

      case "Pledges":
        try {
          // add them to user first

          if (this.currentUser.selectedChurch) {
            data.churchId = this.currentUser.selectedChurch.id;
            return await Pledges.create(data);
          } else {
            let err = new Error('Not allowed!');
            return err;
          }

        } catch (err) {
          return err;
        }
      case "Contributions":
        try {
          // add them to user first

          if (this.currentUser.selectedChurch) {
            data.churchId = this.currentUser.selectedChurch.id;
            let transaction = {
              date: data.date,
              amount: data.amount,
              reason: "contribution to projects",
              ref_no: await generateRandom(12),
              receipt: await generateRandom(12),
              account_type: 'debit',
              methodId: 1,
              churchId: data.churchId
            }
            var transac = await Transactions.build(transaction);
            await transac.save();
            var contribution = await Contributions.build(data);
            contribution.transactionId = transac.id;
            return await contribution.save();

          } else {
            let err = new Error('Not allowed!');
            return err;
          }

        } catch (err) {
          return err;
        }

      case "Transactions" || "Incomes" || "Spendings":
        try {
          let transactions = await Transactions.build(data);
          return await transactions.save();
        } catch (err) {
          return err;
        }

      default:
        break;
    }
  }
  async userAddChurch(user, data) {

    console.log("am here", data);
    try {
      console.log("am here", user);
      let { Churches, Users } = await this._model();

      // return church;
    } catch (err) {
      console.log("Error::", err);
    }
  }

  async subscriptionsPriceSetter(id) {
    try {
      let { SubcriptionsPrices } = await this._model();
      return await SubcriptionsPrices.findOne({ where: { subscriptionId: id } });
      // return church;
    } catch (err) {
      console.log("Error::", err);
    }
  }
  async update(id, data) {
    let { Churches, Users, Subscriptions, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":
        return await Churches.update(data, { where: { id: id } });
      case "Users":
        return await Users.update(data, { where: { id: id } });
      case "Countries":
        return await Countries.update(data, { where: { id: id } });
      case "Regions":
        return await Regions.update(data, { where: { id: id } });
      case "Currencies":
        return await Currencies.update(data, { where: { id: id } });
      case "Tithes":
        return await Tithes.update(data, { where: { id: id } });
      case "Members":
        return await Members.update(data, { where: { id: id } });
      case "Roles":
        return await Roles.update(data, { where: { id: id } });
      case "Transactions" || "Incomes" || "Spendings":
        return await Transactions.update(data, { where: { id: id } });

      case "Projects":
        try {
          // var churchId = this.currentUser.selectedChurch.id;
          // if (this.currentUser.selectedChurch) {
          console.log("db data::::", data)
          return await Projects.update(data, { where: { id: id } });
          // }
        } catch (err) {
          return err;
        }
      case "Services":
        try {
          // var churchId = this.currentUser.selectedChurch.id;
          // if (this.currentUser.selectedChurch) {
          // console.log("db data::::", data, await this.currentUser)
          // console.log('....:::...:::', data)
          var services = await Services.update(data, { where: { id: id } });
          // console.log('....:::...:::', statistics)
          // } else {// console.log("db data::::", data, await this.currentUser)
          //   var services = await Services.build(data);
          //   services.churchId = churchId;
          //   // console.log('....:::...:::', statistics)
          //   await services.save();
          // }
          return await services;
        } catch (err) {
          return err;
        }
      default:
        break;
    }
  }
  /** Delete Objects
   * @param id
   */
  async trash(id = new Number()) {
    await this.getModel();
    let { Churches, Users, Subscriptions, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":
        return await Churches.destroy({ where: { id: id } });
      case "Users":
        return await Users.destroy({ where: { id: id } });
      case "Countries":
        return await Countries.destroy({ where: { id: id } });
      case "Regions":
        return await Regions.destroy({ where: { id: id } });
      case "Regions":
        return await Regions.destroy({ where: { id: id } });
      case "Members":
        return await Members.destroy({ where: { id: id } });
      case "Roles":
        return await Roles.destroy({ where: { id: id } });
      case "Transactions" || "Incomes" || "Spendings":
        return await Transactions.destroy(data, { where: { id: id } });
      default:
        break;
    }
  }

  /** Restore Objects
   * @param id
   */
  async restore(id = new Number()) {
    await this.getModel();
    let { Churches, Users, Subscriptions, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":
        return await Churches.update({ deleteAt: null }, { where: { id: id } });
      case "Users":
        return await Users.update({ deleteAt: null }, { where: { id: id } });
      case "Regions":
        return await Regions.update({ deleteAt: null }, { where: { id: id } });
      case "Countries":
        return await Countries.update({ deleteAt: null }, { where: { id: id } });
      case "Regions":
        return await Regions.update({ deleteAt: null }, { where: { id: id } });
      case "Members":
        return await Members.update({ deleteAt: null }, { where: { id: id } });
      case "Events":
        return await Events.update({ deleteAt: null }, { where: { id: id } });
      case "Transactions" || "Incomes" || "Spendings":
        return await Transactions.update({ deleteAt: null }, { where: { id: id } });
      default:
        break;
    }
  }
  async delete(id = new Number()) {
    await this.getModel();
    let { Churches, Users, Subscriptions, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings } = await this._model();
    switch (this.table) {
      case "Churches":
        return await Churches.destroy({ where: { id: id } }, { paranoid: false });
      case "Users":
        return await Users.destroy({ where: { id: id } }, { paranoid: false });
      case "Regions":
        return await Regions.destroy({ where: { id: id } }, { paranoid: false });
      case "Countries":
        return await Countries.destroy({ where: { id: id } }, { paranoid: false });
      case "Regions":
        return await Regions.destroy({ where: { id: id } }, { paranoid: false });
      case "Tithes":
        return await Tithes.destroy({ where: { id: id } }, { paranoid: false });
      case "Members":
        return await Members.destroy({ where: { id: id } }, { paranoid: false });
      case "Roles":
        return await Roles.destroy({ where: { id: id } }, { paranoid: false });
      case "Transactions" || "Incomes" || "Spendings":
        return await Transactions.destroy({ where: { id: id } }, { paranoid: false });
      default:
        break;
    }
  }

  async _model() {
    const Currencies = sequelize.define('currencies', {
      currency: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      symbol_side: {
        type: Sequelize.ENUM("left", "right"),
        defaultValue: "right"
      },
    }, { paranoid: true });
    const Countries = sequelize.define('countries', {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      zip_code: {
        type: Sequelize.STRING,
      }
    }, { paranoid: true });
    const Regions = sequelize.define('regions', {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      post_code: {
        type: Sequelize.STRING,
      }
    }, { paranoid: true });
    const Churches = sequelize.define('churches', {
      name: {
        type: Sequelize.STRING,
      },
      denomination: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      registration: {
        type: Sequelize.STRING,
        unique: true
      },
      initial: {
        type: Sequelize.STRING
      }
    }, { paranoid: true });
    const Users = sequelize.define('users', {
      firstname: {
        type: Sequelize.STRING,
      },
      middlename: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
      },
      salt: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true
      },
      birthdate: {
        type: Sequelize.DATE
      },
      avatar: {
        type: Sequelize.STRING,
      },
      verified: {
        type: Sequelize.ENUM("true", "false"),
        defaultValue: "false"
      },
      type: {
        type: Sequelize.ENUM("user", "admin", "superadmin"),
        defaultValue: "user"
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female"),
        allowNull: false
      },
      marital: {
        type: Sequelize.ENUM("none", "single", "married", "divorced"),
        defaultValue: "none"
      },
      seniority: {
        type: Sequelize.ENUM("none", "infant", "toddle", "young", "senior", "grand"),
        defaultValue: "none"
      },
      chidlren: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      occupation: {
        type: Sequelize.STRING,
      },
      rebirth: {
        type: Sequelize.DATE
      }
    }, { paranoid: true });
    const Members = sequelize.define('members', {
      tithe_number: {
        type: Sequelize.STRING,
        unique: true
      },
      sys_m_type: {
        type: Sequelize.ENUM("user", "advance", "expert-user", "super-user", "author"),
        defaultValue: "user"
      },
      ch_m_type: {
        type: Sequelize.ENUM("visitor", "primary", "usher", "accountant", "pastor", "junior-pastor", "senior-pastor"),
        defaultValue: "visitor"
      }
    }, { paranoid: true });
    const Roles = sequelize.define('roles', {
      role: {
        type: Sequelize.STRING,
        unique: true
      }
    }, { paranoid: true });
    const Subscriptions = sequelize.define('subscriptions', {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      max_members: {
        type: Sequelize.ENUM('100', '300', '600', '1000', '3000', '6000', '10000', '30000', '60000', '100000'),
        defaultValue: '100'
      },
      max_projects: {
        type: Sequelize.ENUM('3', '7', '14', '28', '56', '112'),
        defaultValue: '3'
      },
      duration: {
        type: Sequelize.STRING,
      },
      duration_type: {
        type: Sequelize.ENUM('days', 'months'),
        defaultValue: 'days'
      }
    }, { paranoid: true });
    const Tithes = sequelize.define('tithes', {
      amount: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
    }, { paranoid: true });
    const SubcriptionsPrices = sequelize.define('subscription_prices', {
      amount: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('active', 'used', 'new'),
        defaultValue: 'new'
      }
    }, { paranoid: true });
    const Events = sequelize.define('events', {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: Sequelize.STRING
      },
    }, { paranoid: true });
    // const Services = sequelize.define('statistics', {
    //   men: {
    //     type: Sequelize.INTEGER,
    //   },
    //   women: {
    //     type: Sequelize.INTEGER,
    //   },
    //   children: {
    //     type: Sequelize.INTEGER
    //   },
    // }, { paranoid: true });
    const Projects = sequelize.define('projects', {
      name: {
        type: Sequelize.STRING,
      },
      info: {
        type: Sequelize.STRING,
      },
      estimate: {
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      supervisorId: {
        type: Sequelize.INTEGER
      },
      treasurerId: {
        type: Sequelize.INTEGER
      },
      approval: {
        type: Sequelize.ENUM("approved", "rejected", "proposed"),
        defaultValue: "proposed"
      }
    }, { paranoid: true });
    const Transactions = sequelize.define('transactions', {
      date: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      reason: {
        type: Sequelize.STRING
      },
      ref_no: {
        type: Sequelize.STRING
      },
      receipt: {
        type: Sequelize.STRING
      },
      account_type: {
        type: Sequelize.ENUM('debit', 'credit'),
        allowNull: false
      }
    }, { paranoid: true });
    const Methods = sequelize.define('methods', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount_limit: {
        type: Sequelize.INTEGER
      }
    }, { paranoid: true });
    const Pledges = sequelize.define('pledges', {
      date: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.INTEGER,
      }
    }, { paranoid: true });
    const Contributions = sequelize.define('contributions', {
      date: {
        type: Sequelize.DATE,
      }
    }, { paranoid: true });
    const Offering_Types = sequelize.define('offering_types', {
      name: {
        type: Sequelize.STRING,
      }
    }, { paranoid: true });
    const Offerings = sequelize.define('offerings', {
      amount: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE
      }
    }, { paranoid: true });
    const Services = sequelize.define('services', {
      day: {
        type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        defaultValue: 'Sunday'
      },
      type: {
        type: Sequelize.ENUM('Sermon', 'Wedding', 'Concert', 'Meeting', 'Gathering', 'Practice', 'Baptism', 'Seminar'),
        defaultValue: 'Sermon'
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: false
      },
      speaker: {
        type: Sequelize.STRING,
      },
      asherId: {
        type: Sequelize.INTEGER,
      },
      leaderId: {
        type: Sequelize.INTEGER,
      },
      men: {
        type: Sequelize.INTEGER
      },
      women: {
        type: Sequelize.INTEGER
      },
      children: {
        type: Sequelize.INTEGER
      },
      visitors: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      start: {
        type: Sequelize.TIME
      },
      end: {
        type: Sequelize.TIME
      }
    }, { paranoid: true });

    /** Relationship initialization */
    const ChurchUsers = sequelize.define('church_users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      }
    });
    const MemberRoles = sequelize.define('member_roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      }
    });

    const ChurchSubscriptions = sequelize.define('church_subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      }
    });
    const ServiceTransactions = sequelize.define('service_transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      }
    });

    const Subscribers = sequelize.define('subscribers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('active', 'unpaid', 'domant', 'suspended'),
        defaultValue: 'unpaid'
      },
      control_number: {
        type: Sequelize.STRING
      }
    });

    await Countries.belongsTo(Currencies);
    await Currencies.hasMany(Countries);


    await Regions.belongsTo(Countries);
    await Countries.hasMany(Regions);


    await Churches.belongsTo(Regions);
    await Regions.hasMany(Churches);


    await Churches.belongsToMany(Users, { through: 'church_users' });
    await Users.belongsToMany(Churches, { through: 'church_users' });

    await Projects.belongsTo(Churches);
    await Churches.hasMany(Projects);

    await Transactions.belongsTo(Methods);
    await Methods.hasMany(Transactions);

    await Contributions.belongsTo(Transactions);
    await Transactions.hasMany(Contributions);

    await Offerings.belongsTo(Transactions);
    await Transactions.hasMany(Offerings);

    await Members.belongsTo(Users);
    await Users.hasMany(Members);


    await Members.belongsTo(Churches);
    await Churches.hasMany(Members);

    await Members.belongsToMany(Roles, { through: 'member_roles' });
    await Roles.belongsToMany(Members, { through: 'member_roles' });

    await Services.belongsToMany(Transactions, { through: 'service_transactions' });
    await Transactions.belongsToMany(Services, { through: 'service_transactions' });

    await Tithes.belongsTo(Churches);
    await Churches.hasMany(Tithes);

    await Tithes.belongsTo(Members);
    await Members.hasMany(Tithes);

    await Tithes.belongsTo(Transactions);
    await Transactions.hasMany(Tithes);

    // await Services.belongsTo(Churches);
    // await Churches.hasMany(Statistics);

    await Transactions.belongsTo(Churches);
    await Churches.hasMany(Transactions);

    await Offerings.belongsTo(Offering_Types);
    await Offering_Types.hasMany(Offerings);

    await Offerings.belongsTo(Members);
    await Members.hasMany(Offerings);

    await Pledges.belongsTo(Members);
    await Members.hasMany(Pledges);

    await Contributions.belongsTo(Members);
    await Members.hasMany(Contributions);

    await Pledges.belongsTo(Projects);
    await Projects.hasMany(Pledges);

    await Contributions.belongsTo(Projects);
    await Projects.hasMany(Contributions);


    await Pledges.belongsTo(Churches);
    await Churches.hasMany(Pledges);

    await Methods.belongsTo(Currencies);
    await Currencies.hasMany(Methods);


    await Methods.belongsTo(Churches);
    await Churches.hasMany(Methods);

    await SubcriptionsPrices.belongsTo(Subscriptions);
    await Subscriptions.hasMany(SubcriptionsPrices);

    await Subscribers.belongsTo(Users);
    await Users.hasMany(Subscribers);

    await Services.belongsTo(Churches);
    await Churches.hasMany(Services);

    await Churches.belongsToMany(Subscriptions, { through: 'church_subscriptions' });
    await Subscriptions.belongsToMany(Churches, { through: 'church_subscriptions' });
    await Subscriptions.belongsToMany(Subscribers, { through: 'church_subscriptions' });
    await Subscribers.belongsToMany(Subscriptions, { through: 'church_subscriptions' });

    // await ChurchSubscriptions.belongsTo(Subscribers);
    // await Subscribers.hasMany(ChurchSubscriptions);

    await Members.sync({ forced: true });
    return { Churches, Users, Subscriptions, SubcriptionsPrices, Countries, Subscribers, Regions, Roles, Tithes, Currencies, Members, Events, Services, Projects, Pledges, Contributions, Transactions, Offering_Types, Offerings, Methods };
  }
  async syncDatabase() {
    try {
      try {
        return await sequelize.sync({ alter: true });
      } catch (err1) {
        try {
          return await this.forceSyncDatabase();
        } catch (err2) {
          return err2;
        }
      }
    } catch (err) {
      return err;
    }
  }
  async forceSyncDatabase() {
    try {
      return await sequelize.sync({ forced: true });
    } catch (err) {
      return err;
    }
  }
}

module.exports = { _DB };
