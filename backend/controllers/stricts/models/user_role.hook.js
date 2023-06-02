exports.hooks = {
    afterCreate: (User, payload) => {
        AddUserRole(User, payload);
    }
}

function AddUserRole(User, payload) {
    let InsertArr = {
        userId: User.id,
        roleId: 1
    }
}