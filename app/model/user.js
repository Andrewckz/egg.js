module.exports = app => {
    const { STRING } = app.Sequelize;
    const User = app.model.define('user', {
        username:STRING,
        password:STRING,
        token: STRING
    });
    return User;
};