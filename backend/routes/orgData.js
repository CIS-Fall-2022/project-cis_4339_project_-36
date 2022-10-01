const express = require("express");
const router = express.Router();

//importing data model schemas
let { orgdata } = require("../models/models");
let { primarydata } = require("../models/models");
let { eventdata } = require("../models/models");

//GET all entries
router.get("/", (req, res, next) => { 
    orgdata.find( 
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
    orgdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET all clients of an organization (prob need edit)
router.get("/all_clients/:id", (req, res, next) => {
    primarydata.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            return res.json(data);
        }
    });
});

//GET all events of an organization (prob need edit)
router.get("/all_events/:id", (req, res, next) => {
    eventdata.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
});


//POST
router.post("/", (req, res, next) => { 
    orgdata.create( 
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

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    orgdata.findOneAndUpdate( 
        { _id: req.params.id }, 
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

//DELETE (deletes an organization by ID)
router.delete("/:id", (req, res) => {
    orgdata.findOneAndDelete({_id: req.params.id},(err,result)=>{
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});

module.exports = router;