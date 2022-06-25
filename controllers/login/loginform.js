exports.getloginpage = (req, res, next) => {
    const errors = req.flash().error || [];
    res.render('login/login', { loginMessage: false, errors })
}
exports.postloginpage = async(req, res, next) => {
    const userType = await req.body.usertype
    if (userType === "admin") {
        console.log(req.user)
        res.redirect('admin/')
        return
    }
    if (userType === "client") {
        const clientdetails = await req.user
        console.log(req.user)
        res.redirect('client/');
        return
    } else {
        const userdetails = await req.user
        console.log(userdetails)
        res.redirect('team/')
        return
    }
}