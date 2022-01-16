
const express = require("express");
const sequelize = require("./database"); //am mutat sync ul pe server, nu stiu ce sens mai are asta
const bodyParser = require("body-parser");
const Sequelize = require("sequelize"); //mandatory sequelize desi nu pricep importurile astea

//#region CORS
//////////////////////////////////////////////////////////////////////////////////////

//deci chestia asta e special pusa aici ca sa mearga sa fac post-ul din client.js
//TODO: dotenv
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
////////////////////////////////////////////////////////////////////////////////////

//require('dotenv').config() //hiding things for later, to test out

//#endregion

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }))
const port = 7000;

//#region DATABASE
const Bug = require("./tables/bug")(sequelize, Sequelize);
const Application = require("./tables/application")(sequelize, Sequelize);
const User = require("./tables/user")(sequelize, Sequelize);
const Team = require("./tables/team")(sequelize, Sequelize);
const Account = require("./tables/account")(sequelize, Sequelize);

//const { noExtendRight } = require("sequelize/dist/lib/operators"); 
//const { response } = require("express"); 

//relatii tabele | am fortat denumirile pentru fk
User.hasMany(Bug, { foreignKey: "id_user" });
Application.hasMany(Bug, { foreignKey: "id_app" });

User.belongsToMany(Application, { through: Team, foreignKey: "id_user", allowNull: false }) //TODO: Iulia
Application.belongsToMany(User, { through: Team, foreignKey: "id_app", allowNull: false })

User.hasOne(Account, { foreignKey: "id_user" }); //stocare password

//#endregion


//ROUTES 
const router = express.Router();
app.use("/app", router);


//sync database
app.put("/", async (req, res, next) => {
    try {
        await sequelize.sync({ alter: true }); //don't change to force
        res.send("Database sync");
    } catch (err) {
        next(err)
    }
})


//#region BUGS

router.route('/bugs')
    //get all bugs in the app
    .get(async (req, res, next) => {
        try {
            const bug = await Bug.findAll()
            res.status(200).json(bug);
        } catch (err) {
            next(err)
        }
    })
    //post new bug
    .post(async (req, res, next) => {
        try {
            if (req.body.id_app) {
                const apps = Application.findByPk(req.body.id_app);
                if (apps) {
                    const sentBug = req.body;
                    const createdBug = await Bug.create(sentBug)
                    res.status(200).json({ message: `Bug reported.` });
                } else {
                    res.status(404).json({ message: "Application doesn't exist." })
                }
            } else {
                res.status(400).json({ message: "Missing mandatory field application identifier." })
            }
        } catch (err) {
            next(err);
        }
    })


router.route('/bugs/:id')
    //get one bug by id.
    .get(async (req, res, next) => {
        try {
            const bug = await Bug.findByPk(req.params.id);
            if (bug) {
                return res.status(200).json(bug);
            } else {
                return res.status(404).json({ message: "Not found." });
            }
        } catch (err) {
            next(err);
        }
    })

    .get(async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                const apps = await Bug.findAll({
                    where: {
                        id_app: req.params.id_app
                    }
                })
            }
        }
        catch(err) {
                    next(err);
                }
    })
           
    //update given bug (status or id_user)
    .put(async (req, res, next) => {
        try {
            const bug = await Bug.findByPk(req.params.id);
            if (bug) {
                if (Object.keys(req.body).length != 0) { //am ceva in body
                    if (req.body.id_user) // poate arunca exceptie de sql foreign key (se ocupa next)
                        bug.id_user = req.body.id_user;
                    if (req.body.status)
                        bug.status = req.body.status;

                    await bug.save();
                    res.status(200).json({ message: "Updated!" });
                } else {
                    res.status(400).json({ message: "No data sent. Update wasn't performed." });
                }
            } else {
                res.status(404).json({ message: "Bug doesn't exist." });
            }
        } catch (err) {
            console.log(err)
            next(err);
        }
    })
    //delete one bug
    .delete(async (req, res, next) => {
        try {
            const toDelete = await Bug.destroy({
                force: true, returning: true,
                where: {
                    id_bug: req.params.id,
                }
            })
            if (toDelete) {
                return res.status(200).json({ message: "Bug deleted from database." });
            }
            else
                res.status(404).json({ message: "Bug doesn't exist in the database." });
        } catch (err) {
            next(err);
        }
    })

//#endregion

//#region PROJECTS
router.route("/projects")
    //get all projects in the database
    .get(async (req, res, next) => {
        try {
            const proj = await Application.findAll();
            if (proj) {
                res.status(200).json(proj);
            } else {
                res.status(404).json({ message: "No projects added in the application." })
            }
        } catch (err) {
            next(err);
        }
    })

    //post new project
    .post(async (req, res, next) => {
        try {
            if (req.body.name && req.body.id_admin && req.body.repo) {
                const sentApp = req.body;
                const application = await Application.create(sentApp);
                const teamMemember = await Team.create({ id_user: application.id_admin, id_app: application.id, role: "Admin" })
                if (req.body.team) {
                    //TODO: test the array of team and insert them as users
                    for (let i = 0; i < req.body.team.length; i++) {
                        const team = await Team.create({ id_user: req.body.team[i], id_app: application.id })
                    }

                }
                if (teamMemember) {
                    console.log("Added entry in the Teams.");
                }
                res.status(200).json({ message: `New application added: ${application.name}` });
            } else {
                res.status(400).json({ message: "Malformed data." });
            }
        }
        catch (err) {
            next(err);
        }
    })

//this thingy deletes also eveything associated from teams, win-win :)
//TODO: check for Bugs table, ar trebui sa stearga si de acolo (if not: onDelete: cascade)
router.route("/projects/:id_app")
    .delete(async (req, res, next) => {
        try {
            const app = await Application.destroy({
                where: {
                    id: req.params.id_app,
                }
            })
            if (app)
                res.status(200).send("Application deleted from database.");
            else
                res.status(404).send("Application doesn't exist in the database.");
        } catch (err) {
            next(err);
        }
    })

router.route("/projects/:id_app/team")
    .get(async (req, res, next) => {
        try {
            //select team practic for one application, logica e ca daca exista aplicatia pot sa caut 
            const application = await Application.findByPk(req.params.id_app);
            if (application) { //exista aplicatia in baza de date
                const team = await Team.findAll({
                    where: {
                        id_app: req.params.id_app
                    }
                });
                if (team) {
                    //succes // asta e un arrray 
                    res.status(200).json(team);
                }
                else {
                    res.status(404).json("Team not defined.");
                }
            }
            else {
                res.status(404).json("Application doesn't exist.");
            }
        } catch (err) {
            next(err);
        }
    })

router.route("/projects/:id_app/bugs")
    .get(async (req, res, next) => {
        try {
            const app = await Application.findByPk(req.params.id_app);
            if (app) {
                const bugs = await Bug.findAll({
                    where: {
                        id_app: req.params.id_app
                    }
                })
                if (bugs.length > 0) {
                    res.status(200).json(bugs);
                } else {
                    res.status(404).json({ message: `No bugs reported for application ${app.name}` })
                }
            } else {
                res.status(404).json({ message: "Application doesn't exist." })
            }
        } catch (err) {
            next(err);
        }
    })


//#endregion

//#region USERS

router.route("/users")
    //get all users
    .get(async (req, res, next) => {
        try {
            const user = await User.findAll();
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    })
    //post new user, inregistrarea in aplicatie
    .post(async (req, res, next) => {
        try {
            if (req.body.username && req.body.email && req.body.password) {
                if (req.body.password.length >= 8) {
                    //creez user-ul inainte pentru id
                    const newUser = await User.create({ username: req.body.username, email: req.body.email });
                    //daca a fost creat
                    if (newUser) {
                        //creez contul
                        const newAccount = await Account.create({ password: req.body.password })
                        newAccount.id_user = newUser.id;
                        await newAccount.save();
                        res.status(200).json({ message: `Succes. New user registered.`, id: newUser.id });
                    }
                } else {
                    res.status(500).json({ error: `Password should be at least 8 characters long.` });
                }

            } else {
                res.status(500).json({ error: "Please complete all fields." });
                throw new Error("All field should be completed.")
            }
        } catch (err) {
            next(err);
        }
    })

//get all projects for a user
router.route("/users/:id_user/projects")
    .get(async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id_user);
            if (user) { //exista user-ul
                const projects = await Team.findAll({
                    attributes: ["id_app", "role"], where: {
                        id_user: req.params.id_user
                    }
                });
                for (let i = 0; i < projects.length; i++) {
                    const app = await Application.findByPk(projects[i].id_app);
                    projects[i].dataValues.name = app.name;
                }
                if (projects.length > 0) {
                    res.status(200).json(projects);
                } else {
                    res.status(404).json({ message: "User has no projects." });
                }
            }
            else {
                res.status(404).json({ message: "User doesn't exist." });
            }
        } catch (err) {
            next(err);
        }
    })

//get all bugs for an user
router.route("/users/:id_user/bugs")
    .get(async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id_user);
            if (user) {
                const bugs = await Bug.findAll({
                    where: {
                        id_user: req.params.id_user
                    }
                })
                if (bugs.length > 0) {
                    res.status(200).json(bugs);
                } else {
                    res.status(404).json({ message: `${user.username} has no bugs associated.` });
                }
            } else {
                res.status(404).json({ message: "User doesn't exist." });
            }
        } catch (err) {
            next(err);
        }
    })

//(important : pe body trimiti in input = email sau username :) )    
//login user
router.route("/login")
    .post(async (req, res, next) => {
        try {
            //req.body trebuie sa contina password + email sau username(data)
            if (req.body.password && req.body.input) {
                //find the user using the data field.
                let users = await User.findAll({ where: { username: req.body.input } }); //incerc cu username
                let user = users.shift();
                if (!user) {
                    users = await User.findAll({ where: { email: req.body.input } }) //incerc cu email
                    user = users.shift();
                }
                if (user) {
                    //check password is username and email was found 
                    const keys = await Account.findAll({ where: { id_user: user.id } })
                    const key = keys.shift();
                    console.log(key.toJSON())
                    if (key.password === req.body.password) {
                        //succes -> redirect spre ceva cred? am dat un mesaj
                        res.status(200).json({ message: "Login succes.", id: user.id })
                    } else {
                        res.status(400).json({ message: "Wrong password." })
                    }
                } else {
                    res.status(400).json({ message: "Wrong username/email." })
                }
            }
        } catch (err) {
            next(err);
        }
    })


//#endregion

//#region TEAM
router.route("/team")
    //just view pentru noi
    .get(async (req, res, next) => {
        try {
            const team = await Team.findAll();
            res.status(200).json(team);
        } catch (err) {
            next(err)
        }
    })

    //TODO: iti baga null-uri pe fk la delete, investigheaza relatiile ca ceva nu e bine.
    //TODO: avoid adding duplicates. un user poate sa fie adaugat de mai multe ori si nu e ok.
    .post(async (req, res, next) => {
        try {
            const member = req.body; //practic in body ar trebui sa am doar id-ul unui membru + id app
            if (member.id_user && member.id_app) {
                const newMember = await Team.create(member);
                if (newMember) {
                    res.status(200).json(newMember);
                }
            } else {
                res.send("Project and user credentials are mandatory.")
            }
        } catch (err) {
            next(err);
        }
    })


router.route("/team/:id_user/:id_app")
    .delete(async (req, res, next) => {
        try {
            const deleted = await Team.destroy({
                force: true, returning: true,
                where: {
                    id_app: req.params.id_app,
                    id_user: req.params.id_user
                }
            })
            if (deleted) {
                res.status(200).send("Memember deleted from team.");
            } else {
                const apps = await Application.findAll({ attributes: ["name"], where: { id: req.params.id_app } });
                const app = apps.shift();
                res.status(400).send(`Member isn't part of the project ${app.name}.`)
            }
        } catch (err) {
            res.status(500).json("Couldn't find any match.");
            next(err);
        }
    })

//#endregion



//#region SERVER 

app.use((err, req, res, next) => {
    console.warn(err);
    //sequelize errors 
    if (err instanceof Sequelize.ValidationError) {
        if (err.errors[0].validatorKey === 'not_unique') {
            res.status(500).json({ error: `Error: ${err.fields}  ${err.errors[0].value} is already used.` });
        } else {
            res.status(500).json({ error: `Error: ${err.errors[0].message}` });
        }
    }
    if (err instanceof Sequelize.ForeignKeyConstraintError) {
        res.status(400).json({ error: "The targeted resource doesn't exist." })
    }
    //server errors
    else {
        res.status(500).json({ error: `Server error: ${err}` });
    }
})

app.listen(port, async () => {
    console.log(`server started on http://localhost:${port}`)
    try {
        await sequelize.authenticate();
        console.log("Connected to bd successfully.")
    } catch (err) {
        console.log(err);
    }
})

//#endregion
