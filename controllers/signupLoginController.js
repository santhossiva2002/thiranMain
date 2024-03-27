const express = require('express');
const Student = require('../models/student');
const OTP = require('../models/otp');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Change to your email service provider if necessary
    auth: {
        user: 'thiran.psgct@gmail.com', // Your email address
        pass: 'rwwx iahb qrmy hnlm', // Your email password or app-specific password
    },
});


exports.renderLogin = async (req, res) => {
    res.render('login_signup', { error: req.flash('error') });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    Student.findOne({ email, password })
        .then(Student => {
            if (Student) {
                req.session.Student = Student;
                res.redirect('/');
            } else {
                req.flash('error', 'Invalid email or password');
                res.redirect('/login');
            }
        })
        .catch(err => {
            console.error('Error finding user:', err);
            req.flash('error', 'An error occurred. Please try again later.');
            res.redirect('/login');
        });
};

// exports.signup = async (req, res) =>  async (req, res) => {
//     console.log("hai")
//     try {
//         // Parse the JSON data from the query parameter
//         const data = JSON.parse(req.query.data);

//         // Extract data from the parsed JSON
//         const { name, email, phone, password, programme, department, year } = data;

//         // Create a new Student object
//         const newStudent = new Student({ name, email, phone, password, programme, department, year });

//         // Save the new student to the database
//         await newStudent.save();

//         // Redirect to the login page upon successful signup
//         res.redirect('/login');
//     } catch (error) {
//         console.error('Error creating user:', error);
//         // Handle errors here if needed
//         req.flash('error', 'An error occurred. Please try again later.');
//         res.redirect('/login');
//     }
// }



exports.session_check = async (req, res) => {
    if (!req.session.Student)
        res.status(400).send("Session not found");
    else
        res.status(200).send("Session checked successfully");
};

exports.generate_otp = async (req, res) => {
    const email = req.body.email;

    await Student.findOne({ email })
        .then(async existingStudent => {
            if (existingStudent) {
                // req.flash('error', 'Email already exists');
                res.status(200).json({ message: "Already Exists" })
            }
            else {
                try {
                    var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
                    let existingOTP = await OTP.findOne({ email });
                    if (existingOTP) {
                        // res.status(200).json({ message: "OTP send" });
                        // Update existing OTP
                        otp = existingOTP.otp
                        // await existingOTP.save();
                    } else {
                        // Create new OTP
                        await OTP.create({ email, otp });
                    }

                    const mailOptions = {
                        from: 'thiran.psg@gmail.com', // Sender email address
                        to: email.trim(), // Recipient email address
                        subject: '[OTP] Thiran Registration', // Subject line
                        text: 'Welcome to THIRAN 2K24, OTP : ' + otp, // Plain text body
                    };


                    // Send email
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Error sending email:', error);
                            res.status(400).json({ message: "error", error: 'Error sending email' });
                        } else {
                            res.status(200).json({ message: "OTP send" });
                        }
                    });
                } catch (error) {
                    console.error('Error creating or updating OTP:', error);
                    res.status(400).json({ done: false, error: 'Error creating or updating OTP' });
                }
            }
        })
};

exports.validate_otp = async (req, res) => {
    const { email, userOTP } = req.body;

    try {
        const existingOTP = await OTP.findOne({ email });

        if (existingOTP && existingOTP.otp === userOTP) {
            // If OTP matches, you can consider it as a successful login
            // You can perform additional actions here if needed
            res.status(200).json({ success: true, message: 'OTP verified successfully' });
        } else {
            // If OTP does not match, inform the user
            res.status(200).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error validating OTP:', error);
        res.status(500).json({ success: false, message: 'An error occurred while validating OTP' });
    }
};



exports.logout = async (req, res) => {
    await req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            req.flash('error', 'An error occurred while logging out.');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
};

exports.getUser = (req, res) => {
    if (req.session.Student) {
        let temp = req.session.Student.email;
        console.log("userEmail", temp);
        res.json({ "data": temp });
    } else {
        res.json({ "data": "No user in session" });
    }
};

exports.getUserName = (req, res) => {
    console.log("hit")
    if (req.session.Student) {
        let temp = req.session.Student.name
        console.log("userName", temp)
        res.json({ "data": temp })
    }
    else {
        res.json({ "data": "No user in session" })
    }

}

// Add other functions as needed...