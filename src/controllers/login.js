import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const {email, password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    }

    else{
        let newUser = {
            email: email,
            password: hashedPassword
        }
        users.push(newUser)

        res.status(201).send({
            user :newUser,
            message: "utilisateur créé avec succès"
        })
    }
}

export const loginUser = async function (req, res) {
    const { email, password } = req.body;
    const hashedPassword = createHash("sha256").update(password).digest("hex");
    let user = users.find((u) => u.email === email && u.password === hashedPassword);

    if (!user) {
        return res.status(401).send({
            message: "Utilisateur non-identifié"
        });
    }

    const token = await res.jwtSign({ email }, {expiresIn : "1h"});
    return res.send({
        message: "Connexion réussie",
        token
    });
}