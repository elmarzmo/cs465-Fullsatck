const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// Get: /trips - lists all the trips 
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client 


const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q)
        {
            return res
                .status(400)
                .json(err);

        }else{
            return res
                .status(201)
                .json(q);
        }
};
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records 
        .exec();


        // 
        // console.log(q);



        if(!q)
        {
            // Database  returned no data 
            return res
                    .status(404)
                    .json(err);

        }else{
            // Return resulting trip list
            return res
                    .status(200)
                    .json(q);
        }
};


const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // Return single record
        .exec();


        // 
        // console.log(q);



        if(!q)
        {
            // Database  returned no data 
            return res
                    .status(404)
                    .json(err);

        }else{
            // Return resulting trip list
            return res
                    .status(200)
                    .json(q);
        }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML statuscode
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
// Uncomment for debugging
console.log(req.params);
console.log(req.body);
const q = await Model
.findOneAndUpdate(
{ 'code' : req.params.tripCode },
{
code: req.body.code,
name: req.body.name,
length: req.body.length,
start: req.body.start,
resort: req.body.resort,
perPerson: req.body.perPerson,
image: req.body.image,
description: req.body.description
}
)
.exec();
if(!q)
{ // Database returned no data
return res
.status(400)
.json(err);
} else { // Return resulting updated trip
return res
.status(201)
.json(q);
}
// Uncomment the following line to show results ofoperation
// on the console
// console.log(q);
};


// New features for CS-499


// Add a trip to favorites
const tripsAddFavorite = async (req, res) => {
    try {
        const trip = await Model.findOne({ code: req.params.tripCode });
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        if (!trip.favorites.includes(req.auth._id)) {
            trip.favorites.push(req.auth._id);
            await trip.save();
        }

        res.status(200).json({ message: "Trip added to favorites", trip });
    } catch (err) {
        res.status(500).json(err);
    }
};
// Remove a trip from favorites
const tripsRemoveFavorite = async (req, res) => {
    try {
        const trip = await Model.findOne({ code: req.params.tripCode });
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        trip.favorites = trip.favorites.filter(
            id => id.toString() !== req.auth._id.toString()
        );
        await trip.save();

        res.status(200).json({ message: "Trip removed from favorites", trip });
    } catch (err) {
        res.status(500).json(err);
    }
};


// Filter and sort trips
const tripsFilter = async (req, res) => {
    try {
        let query = {};
        let sort = {};

        // Example: /trips/filter?destination=Hawaii&sort=perPerson&order=asc
        if (req.query.destination) {
            query.resort = { $regex: req.query.destination, $options: "i" };
        }

        if (req.query.sort) {
            const order = req.query.order === "desc" ? -1 : 1;
            sort[req.query.sort] = order;
        }

        const trips = await Model.find(query).sort(sort).exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: "No trips found" });
        }

        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsAddFavorite,
    tripsRemoveFavorite,
    tripsFilter //  export new function
};
