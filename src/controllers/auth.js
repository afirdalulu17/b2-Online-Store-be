// Register
const db = require("../../libs/database");
const { createUserValidation } = require("./user");

exports.register = async (req, res) => {
    const body = req.body;

    const validate = createUserValidation(body);

    if (validate.success === false) {
        return res.status(404).send(validate.error);
    }

    const query = `INSERT INTO public."Users"(
                    name, email, password, role)
                    VALUES ('${body.name}', '${body.email}', '${body.password}', '${body.role}') RETURNING*;`;
    
    const data = (await db.query(query)).rows[0];

    res.send(data);
};
