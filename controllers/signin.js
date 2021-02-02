const handleSignin = (db, bcrypt) => (req, res) => {// bcrypt.compare("chicken", '$2a$10$xUZBAuNwWP412kw.jreFb.ZnO8KrWtlCJ0Hudn9uY4tzASjJzGVlq', function (err, res) {
    //     console.log("first guess", res);
    // });
    // bcrypt.compare("veggies", '$2a$10$xUZBAuNwWP412kw.jreFb.ZnO8KrWtlCJ0Hudn9uY4tzASjJzGVlq', function (err, res) {
    //     console.log("second guess", res);
    // });

    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json("Incorrect user information");
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);

            if (isValid) {
                db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    }).catch(err => res.status(400).json("Unable to user"));
            } else {
                res.status(400).json("Wrong Credentials");
            }

        }).catch(err => res.status(400).json("Unable to get credentials"));

}

module.exports = {
    handleSignin: handleSignin
}