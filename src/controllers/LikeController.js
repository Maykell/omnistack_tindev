const Dev = require("../models/Dev");

module.exports = {
    async store(req, res) {
        const { from, to } = req.body;

        const loggedDev = await Dev.findById(from);
        const likeToDev = await Dev.findById(to);

        // Caso usuário que estiver recebendo like não existir
        if (!likeToDev) {
            return res.status(400).json({ error: "Dev not exists!" });
        }

        // Verifica se o usuario logado está na lista de likes do alvo.
        if (likeToDev.likes.includes(from)) {
            console.log("DEU MATCH!!");
        }

        loggedDev.likes.push(likeToDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};
