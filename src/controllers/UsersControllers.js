const { hash, compare} = require("bcrypt")
const AppError = require("../utils/AppError")
const knex = require("../database/knex")
class UsersController {
    async create(request, response) {
        const { name, email, password} = request.body;
        const checkIfUserExists = await knex("users").where({email}).first()
        const checkIfIsFirstUser = await knex("users").where({id:1}).first()
        let isAdmin = 0
        if (!checkIfIsFirstUser) {
            isAdmin = 1
        }
        if (checkIfUserExists) {
            throw new AppError("Este email já está em uso!")
        }
        const hashedPassword = await hash(password, 8)
         await knex("users").insert({
            name,
            email,
            password: hashedPassword,
            isAdmin
        });
       
        response.status(201).json({name,email,password,isAdmin})
    }

    async update(request, response) {
        const {name, email, password, old_password} = request.body;
        const id = request.user.id
        const user = await knex("users").where({id}).first();

        if(!user) {
            throw new AppError("Usuário não encontrado")
        } 
        if (email) {
            const userWithUpdatedEmail = await knex("users").where({email}).first()

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
            throw new AppError("Este email já está em uso!")
        }
    }
        user.name = name ?? user.name;
        user.email =  email ?? user.email;

        if ( password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga!")
        }

        if ( password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError("Senha antiga não confere!")
            }
            user.password = await hash(password, 8)
        }

        await knex("users").where({id}).update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now()
    })
       
       return response.status(201).json()

    }
}

module.exports = UsersController