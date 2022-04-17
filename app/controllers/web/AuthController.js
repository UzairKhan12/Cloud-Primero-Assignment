const moduleName = 'auth';

exports.register = async (req, res) => {

    res.render(moduleName+'/register');
}

exports.login = async (req, res) => {

    res.render(moduleName+'/login');
}
