const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');
const { findByIdAndUpdate } = require('../models/Note');

// Get ALL the Notes using : GET "/api/notes/fetchallnotes" . LOGIN REQUIRED

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // get all notes
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        // Catch Error of try 
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// Create a new note using : POST "/api/notes/addnote" . LOGIN REQUIRED

router.post('/addnote', fetchuser, [
    // validation check for a new note
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid Description').isLength({ min: 6 })

], async (req, res) => {
    try {

        const { title, description, tag } = req.body

        // if there are error . RETURN bad request and error corrosponds to same
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // creating new note
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        // save note
        const saveNote = await note.save()


        res.json(saveNote)
    } catch (error) {

        // Catch Error of try 
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// Update a note using : PUT "/api/notes/updatenotes" . LOGIN REQUIRED

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {

        // create a newNote object
        const newNote = {}

        // update details if update exists
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Note Found") }


        // checking is user is belonging to the notes
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not allowed")
        }

        // updating notes
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        // Catch Error of try 
        console.error(error.message);
        res.status(500).send("Internal Server Error")

    }

})

// Delete a note using : DELETE "/api/notes/deletenotes" . LOGIN REQUIRED

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Note Found") }

        // checking is user is belonging to the notes
        if (note.user.toString() !== req.user.id) { return res.status(404).send("Not allowed") }

        // deleting note
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Deleted SuccessFully" })
    } catch (error) {
        // Catch Error of try 
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router