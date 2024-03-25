// signupLoginController.js

const Counter = require('../models/counter');
const Registration = require('../models/registration')
const Student = require('../models/student')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Change to your email service provider if necessary
    auth: {
      user: 'thiran.psg@gmail.com', // Your email address
      pass: 'vrfe pnxe sxee lsut', // Your email password or app-specific password
    },
});

// Function to check if the user is already registered for an event
exports.checkRegistration = async (req, res) => {
    const userEmail = req.session.Student.email; // Assuming the email is stored in the session
    const { event_name } = req.query;
    console.log(userEmail)
    console.log(event_name)

    // Validate request
    if (!userEmail || !event_name) {
        return res.status(400).json({ error: 'Invalid request. Please provide user email and event name.' });
    }

    try {
        const isRegistered = await Registration.findOne({ event_name: event_name, participants: userEmail });
        console.log(isRegistered)
        if (isRegistered) {
            res.status(200).json({ message: 'Participant already registered' });
        }
        else {
            res.status(200).json({ message: 'Participant not registered' });
        }

    } catch (error) {
        console.error('Error checking registration status:', error);
        res.status(500).json({ error: 'An error occurred while checking registration status.' });
    }
};

exports.checkRegister = async (req, res) => {
    const userEmail = req.session.Student.email; // Assuming the email is stored in the session
    const { event_name, email} = req.query
    

    // Validate request
    if (!userEmail || !event_name || !email) {
        return res.status(400).json({ error: 'Invalid request. Please provide user email and event name.' });
    }


    try {
        // Check if the email exists in the student collection
        const existingStudent = await Student.findOne({ email: email });
        const isRegistered = await Registration.findOne({ event_name: event_name, participants: email });

        // If the student exists, return exists: true
        if (!existingStudent) {
            res.status(200).json({ message: 'Participant not registered'  });
        }
        else if (isRegistered) {
            res.status(200).json({ message: 'Participant registered' });
        }
        else {
            res.status(200).json({ });
        }

    } catch (error) {
        console.error('Error checking registration status:', error);
        res.status(500).json({ error: 'An error occurred while checking registration status.' });
    }
};

// Function to check if the paritcipants are already registered for an event
exports.checkParticipantRegistration = async (req, res) => {
    // Assuming the email is stored in the session
    const { email, event_name } = req.query;
    console.log("participant email", email)
    console.log("event", event_name)

    // Validate request
    if (!email || !event_name) {
        return res.status(400).json({ error: 'Invalid request. Please provide user email and event name.' });
    }

    try {
        const isRegistered = await Registration.findOne({ event_name: event_name, participants: email });
        if (isRegistered) {
            console.log("registered")
            res.status(200).json({ message: 'Participant already registered' });
        }
        else {
            res.status(200).json({ message: 'Participant not registered' });
        }

    } catch (error) {
        console.error('Error checking registration status:', error);
        res.status(500).json({ error: 'An error occurred while checking registration status.' });
    }
};

// Function to register for an event
exports.registerEvent = async (req, res) => {
    const userEmail = req.session.Student.email; // Assuming the email is stored in the session
    const { event_name, participantEmails } = req.body;
    participantEmails.push(userEmail)


    if (!userEmail || !event_name || !participantEmails || !Array.isArray(participantEmails)) {
        return res.status(400).json({ error: 'Invalid request. Please provide user email, event name, and participant emails array.' });
    }

    try {
        // Create a new Participant document

        const registrationId = await getNextRegistrationId();
        const newRegistration = new Registration({
            _id: registrationId,
            event_name: event_name,
            participants: participantEmails
        });

        // Save the Participant document to the database
        await newRegistration.save();
        await sendMail(newRegistration.participants, event_name)

        // Response if registration is successful
        res.json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error registering participants:', error);
        res.status(500).json({ error: 'An error occurred while registering participants.' });
    }
};

async function sendMail(participants, event_name){
    participants.forEach(email => {
        const mailOptions = {
            from: 'thiran.psg@gmail.com', // Sender email address
            to: email.trim(), // Recipient email address
            subject: 'Thiran Registration : '+event_name, // Subject line
            text: 'You have been registered for the event, '+event_name+'.', // Plain text body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                
            } else {
                
            }
        });
    });
}

async function getNextRegistrationId() {
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: "registration_id" },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        return counter.sequence_value;
    } catch (error) {
        console.error('Error getting next registration ID:', error);
        throw error;
    }
}


exports.check_student = async (req, res) => {
    try {
        const { email } = req.query;
        // Check if the email exists in the student collection
        const existingStudent = await Student.findOne({ email });

        // If the student exists, return exists: true
        if (existingStudent) {
            res.status(200).json({ exists: true });
        } else {
            // If the student does not exist, return exists: false
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking student email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getUserEvents = async (req, res) => {
    const email = req.session.Student.email;
    const data = await Registration.find({ participants: { $in: email } })
    res.json({
        "data": data
    })
    console.log(data)
};

exports.deleteUserevent = async (req, res) => {
    const id = req.body;
    console.log(id);
    const result = await Registration.deleteOne({ _id: id })
    if (result.deletedCount > 0) {
        res.json({
            "data": "success"
        });
    } else {
        res.json({
            "data": "not success"
        });
    }
};