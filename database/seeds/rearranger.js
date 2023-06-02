const models = require("../models/module_exporter");

const MAIN = [];
var main = {
    indexes: [],
    lists: []
};
// roles
main.indexes.push([`role`]);
main.lists.push([['superadmin'], ['admin'], ['employer'], ['employee'], ['generic']]);
MAIN.push([models.roles, main]);
main = {
    indexes: [],
    lists: []
};
main.indexes.push([`display_name`, `route_name`, `parent`, `icon`, 'superadmin', 'admin', 'employer', 'employee', 'is_addon', 'sort_order', 'unique_identifier']);
main.lists.push([
    ['Super-admin', '#', 0, 'mdi mdi-account-cog', null, 0, null],
    ['Dashboard', '#', 0, 'mdi mdi-store', null, 0, null],
    ['Management', '#', 0, 'mdi mdi-bookmark-box-multiple-outline', null, 0, null],
    ['Employers', '#', 0, 'mdi mdi-account-cog', null, 0, null],
    ['Employees', '#', 0, 'mdi mdi-account-cog', null, 0, null],
    ['Accounts', '#', 0, 'mdi mdi-bank', null, 0, null],
    ['Charges', '#', 0, 'mdi mdi-cash', null, 0, null],
    ['Settings', '#', 0, 'mdi mdi-cog', null, 0, null],
    ['Users', '/users', 1, 'mdi mdi-account-heart', null, 0, null],
    ['Subscribers', '/subscribers', 3, 'mdi mdi-sale', null, 0, null],
    ['Payments', '/packages', 3, 'mdi mdi-wallet', null, 0, null],
    ['Manage', '/employers', 4, 'mdi mdi-account-sync', null, 0, null],
    ['Manage', '/employees', 5, 'mdi mdi-account-sync', null, 0, null],
    ['Manage', '/charges', 7, 'mdi mdi-cash-sync', null, 0, null],
    ['Menus', '/menus', 8, 'mdi mdi-order-bool-descending-variant', null, 0, null],
    ['Language', '/packages', 8, 'mdi mdi-yen', null, 0, null],
]);
MAIN.push([models.menus, main]);
main = {
    indexes: [],
    lists: []
};

// languages
main.indexes.push([`name`, 'abbreviation']);
main.lists.push([['English', 'en'], ['Swahili', 'sw']]);
MAIN.push([models.languages, main]);
main = {
    indexes: [],
    lists: []
};
// sessions
main.indexes.push([`name`, 'status']);
main.lists.push([[new Date().getFullYear(), 1]]);
MAIN.push([models.sessions, main]);
main = {
    indexes: [],
    lists: []
};
// countries
main.indexes.push([`name`, 'initial', 'zip']);
main.lists.push([['United Republic of Tanzania', 'TZ', '+255']]);
MAIN.push([models.countries, main]);
main = {
    indexes: [],
    lists: []
};
// regions
main.indexes.push([`name`, 'code']);
main.lists.push([['Arusha', '30'], ['Kilimanjaro', '22'], ['Dar es salaam', '22'], ['Mwanza', '22'], ['Morogoro', '22'], ['Tanga', '22'], ['Mbeya', '22'], ['Iringa', '22'], ['Dodoma', '22'], ['Tabora', '22'], ['Mtwara', '22'], ['Manyara', '22']]);
MAIN.push([models.regions, main]);
main = {
    indexes: [],
    lists: []
};
// currencies
main.indexes.push([`name`, 'code', 'symbol']);
main.lists.push([['Tanzanian Shillings', 'TZS', '/=']]);
MAIN.push([models.currencies, main]);
main = {
    indexes: [],
    lists: []
};
// user
main.indexes.push([`name`, 'email', 'password', 'gender', 'birthdate', 'phone', 'address']);
main.lists.push([
    ['Gideon Sainyeye', 'gsainyeye@gmail.com', '@73N@', 'MALE', '1991-07-07', '658598333', 'P.O.Box 123'],
    ['Johnson Mollel', 'johnsonmollel@outlook.com', '@73N@', 'MALE', '1998-05-17', '755220249', 'P.O.Box 123'],
]);
MAIN.push([models.users, main]);

module.exports = MAIN;