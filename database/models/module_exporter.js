
const categories = require("./system_properties/categories");
const deeds = require("./system_properties/deeds");
const depreciations = require("./system_properties/depreciations");
const employees = require("./system_properties/employees");
const employers = require("./system_properties/employers");
const licenses = require("./system_properties/licenses");
const maintenances = require("./system_properties/maintenances");
const payments = require("./system_properties/payments");
const registrations = require("./system_properties/registration");
const regulators = require("./system_properties/regulators");
const salaries = require("./system_properties/salaries");
const subscriptions = require("./system_properties/subscriptions");
const titles = require("./system_properties/titles");
const valuations = require("./system_properties/valuations");
const accounts = require("./systems/accounts");
const addresses = require("./systems/addresses");
const assets = require("./systems/assets");
const authentications = require("./systems/authentications");
const certificates = require("./systems/certificates");
const complains = require("./systems/complains");
const contacts = require("./systems/contacts");
const contracts = require("./systems/contracts");
const countries = require("./systems/countries");
const currencies = require("./systems/currencies");
const identities = require("./systems/identities");
const jobs = require("./systems/jobs");
const languages = require("./systems/languages");
const menus = require("./systems/menus");
const merits = require("./systems/merits");
const methods = require("./systems/methods");
const reactions = require("./systems/reactions");
const recoveries = require("./systems/recoveries");
const regions = require("./systems/regions");
const requests = require("./systems/requests");
const roles = require("./systems/roles");
const sessions = require("./systems/sessions");
const tasks = require("./systems/tasks");
const transactions = require("./systems/transactions");
const users = require("./systems/users");
const vaccancies = require("./systems/vaccancies");
const { user_languages } = require("./users/user_language");
const { user_signups } = require("./users/user_signups");
const { user_roles } = require("./users/user_roles");
const { role_menus } = require("./roles/role_menus");
const { role_permissions } = require("./roles/role_permissions");
const country_regions = require("./countries/country_regions");
const signups = require("./system_properties/signups");
const { user_contacts } = require("./users/user_contacts");
const { user_addresses } = require("./users/user_addresses");
const identity_uploads = require("./system_properties/identity_uploads");
const collections = require("./systems/collections");
const collection_schedules = require("./collections/collection_schedules");
const collection_tasks = require("./collections/collection_tasks");
const schedules = require("./system_properties/schedules");
const employee_collections = require("./employees/employee_collections");
const facilities = require("./system_properties/facilities");
const employee_merits = require("./employees/employee_merits");
const employee_complains = require("./employees/employee_complains");
const employee_qualifications = require("./employees/employee_qualifications");
const employee_requests = require("./employees/employee_requests");
const employee_roles = require("./employees/employee_role");
const employee_titles = require("./employees/employee_titles");
const employee_contacts = require("./employees/employee_contacts");
const businesses = require("./systems/businesses");
const business_addresses = require("./businesses/business_addresses");
const business_categories = require("./businesses/business_categories");
const business_collections = require("./businesses/business_collections");
const employee_accounts = require("./employees/employee_accounts");
const employee_verifications = require("./employees/employee_verifications");
const business_contacts = require("./businesses/business_contacts");
const business_facilities = require("./businesses/business_facilities");
const business_licenses = require("./businesses/business_licenses");
const { contact_authentications } = require("./users/contact_authentications");
const uploads = require("./system_properties/uploads");
const employee_employers = require("./employees/employee_employers");
const employer_contacts = require("./employers/employer_contacts");
const employer_addresses = require("./employers/employer_addresses");
const charges = require("./system_properties/charges");
const charge_categories = require("./charges/charge_categories");
const employer_charges = require("./employers/employer_charges");
module.exports = {
    employer_charges,
    charges,
    charge_categories,
    employer_addresses,
    employer_contacts,
    employee_employers,
    uploads,
    contact_authentications,
    business_contacts,
    business_facilities,
    business_licenses,
    employee_accounts,
    employee_verifications,
    businesses,
    business_addresses,
    business_categories,
    business_collections,
    employee_collections,
    facilities,
    employee_merits,
    employee_complains,
    employee_qualifications,
    employee_requests,
    employee_roles,
    employee_titles,
    employee_contacts,
    collections,
    collection_schedules,
    collection_tasks,
    schedules,
    roles,
    users,
    user_addresses,
    user_contacts,
    signups,
    country_regions,
    user_languages,
    user_signups,
    user_roles,
    identity_uploads,
    role_menus,
    role_permissions,
    identities,
    deeds,
    maintenances,
    payments,
    registrations,
    regulators,
    salaries,
    subscriptions,
    titles,
    valuations,
    depreciations,
    categories,
    employees,
    employers,
    licenses,
    jobs,
    merits,
    methods,
    reactions,
    regions,
    recoveries,
    requests,
    sessions,
    tasks,
    transactions,
    vaccancies,
    contacts,
    contracts,
    currencies,
    languages,
    menus,
    countries,
    accounts,
    addresses,
    assets,
    authentications,
    certificates,
    complains,
}
