import logger from "../utils/Logger.js";
import Chicken from "../models/DbChicken.js";

export async function getAllChickens(req, res) {
    logger.info('Received getAllChickens request');
    await Chicken.find(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ error }).send(console.log(error)));
}

export async function getOneChicken(req, res) {
    const id = req.params.chickenId;
    logger.info('Received getOneChicken request');

    await Chicken.findOne({ _id: id })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found Chicken with id " + id });
            } else { 
                res.send(data);
            }
        })
        .catch((error) => res.status(400).json({ error }).send(console.log(error)));
}

export async function createChicken(req, res) {
    const { name, weight, steps, isRunning } = req.body;

    const chicken = new Chicken({
        name,
        weight,
        steps,
        isRunning
    });

    logger.info('Chicken is save to database');
    await chicken.save()
        .then(() => res.status(201).json({ message: 'User created !' })) 
        .catch((error) => res.status(400).json({ error }).send(console.log(error)));
}

export async function updateChicken(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Chicken cannot be empty!"
        });
    }

    const id = req.params.chickenId;

    await Chicken.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find Chicken`
                });
            } else res.send({ message: "Updated successfully!" });
        })
        .catch((error) => res.status(500).json({ error }).send(console.log(error)));
}

export async function deleteChicken(req, res) {
    const id = req.params.chickenId;

    await Chicken.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find Chicken`
                });
            } else {
                res.send({
                    message: "Chicken was deleted successfully!"
                });
            }
        })
        .catch((error) => res.status(500).json({ error }).send(console.log(error)));
}

export async function incrementChickenSteps(req, res) {
    const id = req.params.chickenId;

    try {
        const chicken = await Chicken.findByIdAndUpdate(id, { $inc: { 'steps': 1 }});
        if (!chicken) {
            res.status(404).send({ message: "Cannot find chicken" });
        } else {
            res.send({ message: "Chicken steps was successfully incremented by 1!" });
        }
    } catch (error) {
        res.status(500).json({ error }).send(console.log(error));
    }
}
