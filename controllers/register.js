const handleRegister = (db, bcrypt) =>(req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json("Incorrect user information");
    }

    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email         
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
    }).catch(err => res.status(400).json("Unable to join"));
}

module.exports = {
    handleRegister : handleRegister
}