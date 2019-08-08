const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
    async index(req, res) {
        const { id } = req.params;

        const loggedDev = await Dev.findById(id);

        const devs = await Dev.find({
            $and: [
                // todas as condições devem ser verdadeiras
                { _id: { $ne: loggedDev._id } }, // encontra todos os devs que o _id não é igual ao do usuário logado. ne (not equal)
                { _id: { $nin: loggedDev.likes } }, // todos os devs que não estão na lista de likes. nin (not in)
                { _id: { $nin: loggedDev.dislikes } } // todos os devs que não estão na lista de dislikes. nin (not in)
            ]
        });

        return res.json(devs);
    },
    async store(req, res) {
        try {
            const { username } = req.body;

            const userExists = await Dev.findOne({ user: username });

            if (userExists) {
                return res.json(userExists);
            }

            const response = await axios.get(
                `https://api.github.com/users/${username}`
            );

            const { name, bio, avatar_url: avatar } = response.data;

            const newDev = await Dev.create({
                name,
                user: username,
                bio,
                avatar: avatar
            });

            return res.json(newDev);
        } catch (error) {
            return res.json({ erro: "erro fudeu" });
        }
    }
};
