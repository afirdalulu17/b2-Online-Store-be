const db = require("../../libs/database");
const z = require("zod");

//  Get all data
exports.findUser = async (req, res) => {
    const query = `SELECT * FROM public."Users";`;

    const data = await db.query(query);

    res.send(data.rows);
};

// Get single data by id
exports.getUserById = async (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM public."Users" WHERE id = '${id}';`;

    const data = await db.query(query);

    if(data.rows.length === 0) {
        return res.status(404).send({ message: "not found" });
    }

    res.send(data.rows[0]);
};

exports.createUserValidation = (data) => {
    const createUserSchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        role: z.enum(["seller", "buyer"]),
    });

    try {
        createUserSchema.parse(data);

        return {success: true};
    }   catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.errors.map((err) => ({
                field: err.path[0],
                message: err.message
            }));
            return { success: false, error: formattedErrors };
        }
        return "Unknow error";
    }
};

// Post data = create
exports.createUser = async (req, res) => {
    try {
        
    
    const body = req.body;

    const validate = createUserValidation(body);

    if (validate.success === false) {
        return res.status(404).send(validate);
    }

    const query = `INSERT INTO public."Users"(
                    name, email, password, role)
                    VALUES ('${body.name}', '${body.email}', '${body.password}', '${body.role}') RETURNING *;`;
    
    const data = (await db.query(query)).rows[0];

    res.send(data);
} catch (error) {
       console.log(error) 
       res.status(500).send({message: "server error"})
}
};

// Update data
exports.updateUser = async (req, res) => {
    const id = req.params.id
    const body = req.body;

    const queryCheckUserById = `SELECT * FROM public. "Users" WHERE id = ${id}`;
    const users = await db.query(queryCheckUserById);

    if (users.rows.length === 0) {
        return res.status(404).send[{ message: "not found" }];
    }

    const queryUpdate = `UPDATE public."Usesrs"
                            SET name='${body.name}', email='${body.email}', password='${body.password}', role='${body.role}'
                            WHERE id=${id} RETURNING *;`;

    const data = await db.query(queryUpdate);

    res.send(data.rows[0]);
};

// Delete data
exports.deleteUser = async (req, res) => {
    const id = req.params.id

    constqueryCheckUserById = `SELECT * FROM public. "Users" WHERE id = ${id}`;
    const users = await db.query(queryCheckUserById);

    if (users.rows.length === 0) {
        return res.status(404).send[{ message: "not found" }];
    }

    const query = `DELETE * FROM public. "Users" WHERE id = ${id}`;

    await db.query(query.rows[0]);

    res.send({ message: "delete succes" });
};