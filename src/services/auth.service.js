const Auth = require("../models/auth.model");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcrypt");
const auth = require("../auth");

async function login({ email, password }) {
    const data = await Auth.findOne({ where: { email } });
    const user = await User.findOne({
        where: { email },
        include: {
            model: Role, as: "Role",
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes: { exclude: ['role_id', 'createdAt', 'updatedAt'] }
    });
    const isValid = await validatePassword(password, data.password,);
    if (isValid) {
        return getToken(data, user);
    } else {
        throw new Error("invalid information");
    }
}

const checkStatus = async (data, token) => {
    const { email } = data.dataValues;
    if (!data) {
        throw new Error("Invalid token payload");
    }
    const user = await User.findOne({
        where: { email }, include: {
            model: Role, as: "Role",
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes: { exclude: ['role_id', 'createdAt', 'updatedAt'] }
    });
    var resp = {
        token: token,
        user: user,
    };
    return resp;
};

const created = async (data) => {
    await Auth.sync();
    password = await bcrypt.hash(data.password.toString(), 10);
    return createAuth = await Auth.create({
        id: data.id,
        email: data.email,
        password: password,
    });
};

const changePassword = async (id, data) => {
    const { oldPassword, newPassword } = data;
    const user = await Auth.findByPk(id);
    const isValid = await validatePassword(oldPassword, user.password);
    if (!isValid) {
        throw error('Incorrect current password', 401);
    }
    const hashedNewPassword = await bcrypt.hash(newPassword.toString(), 10);
    user.password = hashedNewPassword;
    await user.save();
    return user;
};

const validatePassword = (pass1, pass2) => {
    return bcrypt.compare(pass1, pass2).then((res) => {
        if (res === true) {
            return true;
        } else {
            return false;
        }
    });
};

const getToken = (data, user) => {
    data.role = user.Role.name;
    var resp = {
        token: auth.assignToken({ ...data }),
        user: user,
    };
    return resp;
}

module.exports = {
    created,
    login,
    changePassword,
    checkStatus
};