const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { primarydata, eventdata, orgdata } = require("../models/models");

//GET all entries
router.get("/", (req, res, next) => { 
    // Find all client documents in the current organization instance
    primarydata.find( {"organization_id": process.env.ORG},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    primarydata.find( 
        // Find a single client document in the current organization instance using client ID
        { "organization_id": process.env.ORG, _id: req.params.id },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        // Find all client documents in the current organization with either the corresponding search of the client's first name and/or last name
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" }, "organization_id": process.env.ORG }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            // Find all client documents in the current organization with the corresponding search of the client phone number
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }, "organization_id": process.env.ORG
        }
    };
    primarydata.find( 
        dbQuery,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for a single client
router.get("/events/:id", (req, res, next) => { 
    primarydata.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            return res.json(data);
        }
    });
});

//GET number of clients per Event


//POST
router.post("/", (req, res, next) => { 
    // Setting the organization ID of the added client to be the organization of the current organziation instance
    req.body.organization_id = process.env.ORG
    primarydata.create(req.body, (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
        { _id: req.params.id, }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//DELETE (deletes a client by ID)
router.delete("/:id", (req, res) => {
    primarydata.findOneAndDelete({_id: req.params.id},(err,result)=>{
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});


module.exports = router;
