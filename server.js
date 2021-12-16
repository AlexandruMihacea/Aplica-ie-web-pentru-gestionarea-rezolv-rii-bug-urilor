const express = require("express");
const sequelize = require("./database"); //am mutat sync ul pe server, nu stiu ce sens mai are asta
const bodyParser=  require("body-parser");
const Sequelize = require("sequelize"); //mandatory sequelize desi nu pricep importurile astea



//////////////////////////////////////////////////////////////////////////////////////

//i am stupid BUT I AM TRYING AT LEAST MAKES NO SENSE 
//deci chestia asta e special pusa aici ca sa mearga sa fac post-ul din client.js
//TODO: dotenv
const cors=  require("cors");
const corsOptions = {
    origin: '*',
    credentials:true,
    optionSuccessStatus:200,
}
////////////////////////////////////////////////////////////////////////////////////

//require('dotenv').config() //hiding things for later, to test out


//logica de ORM 
const Bug = require("./tables/bug")(sequelize, Sequelize);
const Application = require("./tables/application")(sequelize, Sequelize);
const User = require("./tables/user")(sequelize, Sequelize);
const Team = require("./tables/team")(sequelize, Sequelize);

const { noExtendRight } = require("sequelize/dist/lib/operators"); //tf?
const { response } = require("express"); //tf 2.0

//relatii tabele ? doamne ajuta, am fortat eu denumirire, ca ma disperau alea scoase automat de seq
User.hasMany(Bug, {foreignKey: "id_user"}); 
Application.hasMany(Bug, {foreignKey: "id_app"});

User.hasOne(Application, {foreignKey: "id_admin"});
Application.belongsTo(User, {foreignKey: "id_admin"}); //i dont know it I need this or not.

User.belongsToMany(Application, {through: Team, foreignKey:"id_user", allowNull: false}) //allowNull doesn't work.
Application.belongsToMany(User, {through: Team, foreignKey:"id_app", allowNull: false})
//onDelete: "cascade", hooks:true

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true})) //cors fail
const port=7000;


//MP, Admin
//Admin -> team mangement, delelete proj, ... 
//MP -> editeaza bug uri

//ROUTES 
const router = express.Router();
app.use("/app", router);

//i never was so mad before, 3 hours wasted of my life.
app.put("/", async (req,res,next) => {
    try {
        await sequelize.sync({alter:true}); //don't you dare make it force, imi stergi tot ce am in tabele.
        res.send("Database sync");
    } catch(err) {
        next(err)
    }
})



// Bugs

router.route('/bugs')
    //get all bugs in the app
    .get(async (req, res, next) => {
            try {
                const bug = await Bug.findAll()
                res.status(200).json(bug);
            } catch(err){
                next(err)
            }
    })
    //post new bug
    .post(async (req,res,next) => {
            try {
                const sentBug = req.body;
                const createdBug = await Bug.create(sentBug)
                res.status(200).json({message: `Created new bug: ${createdBug}`});
            } catch(err){
                next(err);
            }
    })


//Get bug by id and update user and status
router.route("/bugs/:id")
    .get(async(req,res,next) =>{
        try{
            const bug = await Bug.findByPk(req.params.id);
            if(bug){
                return res.status(200).json(bug);
            }else{
                return res.status(404).send("Nu a putut fii gasit");
            }
        }catch(err){
            next(err);
        }
    })
    .put(async(req,res,next) => {
        try{
            const bug = await Bug.findByPk(req.params.id);
            if(bug){
                bug.id_user = req.body.id_user;
                bug.status = req.body.status;
                await bug.save();
                res.status(200).send("S-a efectuat Updatul");
            }else{
                res.status(404).send("Nu s-a putut face updatule!");
            }
        }catch(err){
            next(err);
        }
    })

//Delete bug
router.route("/bugs/:id_bugs")
    .delete(async(req,res,next) =>{
        try{
            const appDel = await Bug.destroy({
                where:{
                    id_bug: req.params.id_bugs, 
                }
            })
            if(appDel){
                return res.status(200).send("Bug deleted from database.");
            }
            else
                res.status(404).send("Bug doesn't exist in the database.");
            }catch(err){
                next(err);
            }
    })


//Returneaza toate bug.urile dintr-o aplicatie
router.route("/project/:id_app")
    .get(async(req,res,next) =>{
        try{
            const bug = await Bug.findAll({where : {
                id_app: req.params.id_app,
            }});
            if(bug){
                return res.status(200).json(bug);
            }else{
                return res.status(404).send("Nu a putut fii gasit");
            }
        }catch(err){
            next(err);
        }
    })
  



router.route("/projects")
    //get all projects in the database
    //TODO: filtering for client.
    .get(async (req,res,next) => {
        try {
            const proj = await Application.findAll();
            if(proj){
                res.status(200).json(proj);
            } else {
                res.status(404).send("Project doensn't exist in the database.")
            }
        } catch(err) {
            next(err);
        }
    })
 
    //post new project
    .post(async (req,res,next) => {
        try {
            const sentApp = req.body;
            const application = await Application.create(sentApp);
            //TODO: add a new entry in the team table (the post from the client should madatory send id_admin)
            //pare ca merge, wth
            //TODO: validation for id_admin -> error
            const teamMemember  = await Team.create({id_user:application.id_admin , id_app: application.id, role: "Admin"})
            if(teamMemember){
                console.log("Added first entry in the Teams.");
            }
            res.status(200).json({message: `New application added: ${application.name}`});
        } catch(err) {
            next(err);
        }
    })



    

//TODO: tabela separata parola + id .  

//this thingy deletes also eveything associated from teams, win-win :)
//TODO: check for Bugs table, ar trebui sa stearga si de acolo (if not: onDelete: cascade)
//nu merge onDelete, pun pariu ca aia e pe mysql =))))
router.route("/projects/:id_app")
    .delete(async (req,res,next) => {
        try {
            const app= await Application.destroy({
                where:{
                    id: req.params.id_app,
                }
            })
            if(app)
                res.status(200).send("Application deleted from database.");
            else
                res.status(404).send("Application doesn't exist in the database.");
        } catch(err){
            next(err);
        }
    })


router.route("/users")
    //get all users
    .get(async (req,res,next) => {
        try {
            const user = await User.findAll();
            res.status(200).json(user);
        } catch(err) {
            next(err);
        }
    })
    //post new user, most likely autentifcarea
    .post(async (req,res,next) => {
        try {
            if(req.body.username&&req.body.password&&req.body.email){
                const sentUser = req.body;
                const newUser = await User.create(sentUser);
                res.status(200).json(`New user registered: ${newUser}`);
            } else {
                res.send("Username, email and password required.")
            }
        } catch(err) {
            next(err);
        }
    })




router.route("/team")
    //just view pentru noi
    .get(async (req,res,next) => {
        try{
            const team= await Team.findAll();
            res.status(200).json(team);
        } catch(err){
            next(err)
        }
    })

    //TODO: iti baga null-uri pe fk, investigheaza relatiile ca ceva nu e bine.
    //TODO: avoid adding duplicates. un user poate sa fie adaugat de mai multe ori si nu e ok.
    .post(async (req,res,next) => {
        try {
            const member = req.body; //practic in body ar trebui sa am doar id-ul unui membru + id app
            if(member.id_user&& member.id_app){
                const newMember = await Team.create(member);
                //newMember.role="MP"; //nu-l punne in database, si doar il trimite pe response //TODO
                if(newMember) {
                    await newMember.update({role: "MP"});
                    await newMember.save();
                    res.status(200).json(newMember);
                }
            } else {
                res.send("Project and user credentials are mandatory.")
            }
        } catch(err) {
            next(err);
        }
    })

   
router.route("/team/:id_user/:id_app")
    .delete(async (req,res,next)=> {
            try {
                //meh, nu e ce vreau, trebuie cautat efectiv in baza de date sa vada ca exista totusi ceva
                //desi sansa de mismatch e minima daca facem interfata destept.
                const deleted= await Team.destroy({ force: true,
                    where:{
                        id_app: req.params.id_app,
                        id_user: req.params.id_user
                    }
                })
                if(deleted)
                    res.status(200).send("Memember deleted from team.");
                else
                    res.status(400).send("Wth happened.")
            } catch(err) {
                res.status(500).json("Couldn't find any match.");
                next(err);
            }
        })

router.route("/projects/:id_app/team")
    .get(async (req,res,next)=> {
        try{
            //select team practic for one application, logica e ca daca exista aplicatia pot sa caut 
            const application = await Application.findByPk(req.params.id_app);
            if(application){ //exista aplicatia in baza de date
                //const team = await application.getUsers({id_app: req.params.id_application}); //genereaza mai multe chestii
                const team = await Team.findAll( {where : {
                    id_app: req.params.id_app}});
                if(team){
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
        } catch(err){
            next(err);
        }
    })


router.route("/users/:id_user/projects")
    .get(async (req,res,next)=> {
        try{
            const user= await User.findByPk(req.params.id_user);
            if(user){ //exista user-ul
                const projects = await Team.findAll( {where : {
                    id_user: req.params.id_user
                }});
                if(projects){
                    res.status(200).json(projects);
                    // projects.forEach(element => {
                    //     console.log(element.id_app);
                    // }); I was playing , scoteam doar id-urile din result, poate pentru un select ? 
                }
            }
            else {
                res.status(404).json("User doesn't exist doesn't exist.");
            }
        } catch(err){
            next(err);
        }
    })

///////////////////////////////////////////////////////////////// shit for app 

app.use((err,req,res,next)=> {
    console.warn(err);
    res.status(500).json(`Error: ${err}`);
})

app.listen(port, async()=> {
    console.log(`server started on http://localhost:${port}`)
    try {
        await sequelize.authenticate();
        console.log("Connected to bd successfully.")
    } catch(err) {
        console.log(err);
    }
})





