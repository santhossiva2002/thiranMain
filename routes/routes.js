const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const signup_loginController = require('../controllers/signupLoginController');
const registrationController = require('../controllers/registrationController');
const Student = require('../models/student');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/events', eventController.describeEvent);

router.get('/login', signup_loginController.renderLogin);

router.post('/login', signup_loginController.login);

router.post('/signup', async (req, res) => {
    const {userOTP, name, email, phone, password, programme, department, year} = req.body;
    
    try{
    const existingOTP = await OTP.findOne({ email });

    if (existingOTP && existingOTP.otp === userOTP){
        await Student.findOne({ email })
        .then(student => {
            if (student) {
                res.status(200).json({ message: "already" });
            }
            
            else {
                // Create a new Student object
                const newStudent = new Student({ name, email, phone, password, programme, department, year });

                // Save the new student to the database
                newStudent.save()
                    .then(() => {
                        // Redirect to the login page upon successful signup
                        res.status(200).json({ message: "success" });
                    })
                    .catch(error => {
                        console.error('Error saving student:', error);
                        res.status(500).json({ message: "error" });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding student:', error);
            res.status(500).json({ message: "error" });
        });
    }
    else{
        res.status(200).json({message: "David Billa"});
    }
}
catch(error){
    res.status(500).json({message: "David Billa"});
}
});

router.get('/session_check', signup_loginController.session_check);

router.post('/register', eventController.registerEvent);

router.post('/register_event', registrationController.registerEvent);

// Route to check registration status before registering the user
router.get('/check_registration', registrationController.checkRegistration);

router.get('/check_student', registrationController.check_student);

router.post('/logout', signup_loginController.logout);

router.get('/getUserEmail', signup_loginController.getUser);

router.delete('/deleteUserevent', registrationController.deleteUserevent);

router.get('/getUserEvents', registrationController.getUserEvents);

router.get('/check_register', registrationController.checkRegister);

router.post('/generate_otp', signup_loginController.generate_otp)

router.post('/validate_otp', signup_loginController.validate_otp)

router.get('/getUserName', signup_loginController.getUserName)


module.exports = router;