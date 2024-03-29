// onLoad function to set the event title
function onLoad(event_name) {
    // alert(events[event_name]["title"])
    // alert(event_name)
    const title = events[event_name] ? events[event_name]["title"] : "Event Not Found";
    document.getElementById("event_title").innerHTML = title;



    const event_description = events[event_name] ? events[event_name]["description"] : "Description Not Found";
    document.getElementById("event_description").innerHTML = event_description;

    const no_participants = events[event_name] ? events[event_name]["general_info"]["no_participants"] : "Not Found";
    document.getElementById("no_participants").innerHTML = no_participants;

    const no_rounds = events[event_name] ? events[event_name]["general_info"]["no_rounds"] : "Not Found";
    document.getElementById("no_rounds").innerHTML = no_rounds;

    const venue = events[event_name] ? events[event_name]["general_info"]["venue"] : "Not Found";
    document.getElementById("venue").innerHTML = venue;

    const duration_1 = events[event_name] ? events[event_name]["general_info"]["duration_1"] : "Not Found";
    document.getElementById("duration_1").innerHTML = duration_1;

    
    const duration_2 = events[event_name] ? events[event_name]["general_info"]["duration_2"] : "Not Found";
    document.getElementById("duration_2").innerHTML = duration_2;


    const round_1 = events[event_name] ? events[event_name]["round_wise_description"]["round_1"] : "Not Found";
    document.getElementById("round_1").innerHTML = round_1;

    const round_2 = events[event_name] ? events[event_name]["round_wise_description"]["round_2"] : "Not Found";
    document.getElementById("round_2").innerHTML = round_2;


    const name_1 = events[event_name] ? events[event_name]["coordinators_details"]["name_1"] : "Not Found";
    document.getElementById("name_1").innerHTML = name_1;

    const name_2 = events[event_name] ? events[event_name]["coordinators_details"]["name_2"] : "Not Found";
    document.getElementById("name_2").innerHTML = name_2;

    const phone_1 = events[event_name] ? events[event_name]["coordinators_details"]["phone_1"] : "Not Found";
    document.getElementById("phone_1").innerHTML = phone_1;

    const phone_2 = events[event_name] ? events[event_name]["coordinators_details"]["phone_2"] : "Not Found";
    document.getElementById("phone_2").innerHTML = phone_2;

    var rules = events[event_name] ? events[event_name]["event_rules"] : "Not found";
    document.getElementById("rules").innerHTML = rules

    
    if(events[event_name]["title"] === "NETHUNT" || events[event_name]["title"] === "LAST STAND [Valorant]"){
        document.getElementById("r2").style.display = "none";
        document.getElementById("s2").style.display = "none";
    }
    else if(events[event_name]["title"] === "CODESPRINT"){
        document.getElementById("registerEve").innerHTML = "CLOSED";
    }

    else{
        document.getElementById("r_2").style.display = "block";
        document.getElementById("s_2").style.display = "block";
    }
    
    
}
// function registerEvent(event_name) {
//     if (!events[event_name]) {
//         alert("Event details not found.");
//         return;
//     }

//     // Check user session
//     fetch("/session_check")
//         .then(response => {
//             if (!response.ok) {
//                 window.location.href = '/login';
//             }
//             else {
//                 fetch(`/check_registration?event_name=${events[event_name]["title"]}`)
//                     .then(response => response.json())

//                     .then(async data => {
//                         if (data.message === 'Participant already registered') {
//                             alert('Participant already registered for the event');

//                         }
//                         else {
//                             // User is not registered, proceed with registration
//                             const isConfirmed = window.confirm("Do you want to proceed?");
//                             if (isConfirmed) {

//                                 const count = events[event_name]["general_info"]["no_participants"];
//                                 const participantEmails = []; // Array to store participant emails

//                                 //getting the email from the session in the backend
//                                 let userEmail = null
//                                 await fetch('/getUserEmail')
//                                     .then(
//                                         response => response.json())
//                                     .then(async data => {
//                                         // console.log(data)
//                                         userEmail = data.data;

//                                     }
//                                 )

//                                 // Loop to prompt for participant emails
//                                 // Loop to prompt for participant emails
//                                 var x
//                                 var studentsArr = []

//                                 for (let i = 1; i <= count - 1; i++) {
//                                     const participantEmail = prompt(`Enter participant ${i + 1}'s email:`);

//                                     //checking whether the participants mails are duplicated
//                                     if (!(studentsArr.includes(participantEmail))) {
//                                         studentsArr.push(participantEmail)

//                                         //checking whether the logged in user mail is duplicated 
//                                         if (userEmail && participantEmail != userEmail) {

//                                             if (participantEmail) {
//                                                 // Perform a check against the student collection
//                                                 x = await fetch(`/check_student?email=${participantEmail}`)
//                                                     .then(response => response.json())
//                                                     .then(async data => {
//                                                         if (data.exists) {

//                                                             y = await fetch(`/checkParticipantRegistration?event_name=${events[event_name]["title"]}&email=${participantEmail}`)
//                                                                 .then(response => response.json())
//                                                                 .then(data => {
//                                                                     if (data.message === "Participant already registered") {
//                                                                         alert("This Participant is already registered with other team for this event")
//                                                                         i--;
//                                                                         return;

//                                                                     }
//                                                                 })



//                                                             // Email exists in the student collection, add it to the participantEmails array
//                                                             participantEmails.push(participantEmail);
//                                                         }
//                                                         else {
//                                                             // Email does not exist in the student collection, prompt the user to sign up
//                                                             alert("This email is not registered. Do you want to sign up?");

//                                                             return 0

//                                                         }
//                                                     })


//                                                     .catch(error => {
//                                                         console.error('Error checking student email:', error);
//                                                         alert("An error occurred while checking student email. Please try again later.");
//                                                     });


//                                             } else {
//                                                 alert("Please enter valid emails for all participants.");
//                                                 return; // Exit function if email is not entered
//                                             }
//                                         }
//                                         else {
//                                             alert("Please enter other participants emails.");
//                                             i--;
//                                             continue

//                                         }
//                                     } else {
//                                         alert("Participants mail ids should be unique");
//                                         i--;
//                                         continue
//                                     }
//                                 }

//                                 if (x == 0)
//                                     window.location.href = '/login'
//                                 else {
//                                     const registrationData = {
//                                         event_name: events[event_name]["title"],
//                                         participantEmails: participantEmails
//                                     };

//                                     // Example of sending data to server using fetch
//                                     fetch("/register_event", {
//                                         method: 'POST',
//                                         headers: {
//                                             'Content-Type': 'application/json'
//                                         },
//                                         body: JSON.stringify(registrationData)
//                                     })
//                                         .then(response => response.json())
//                                         .then(data => {
//                                             window.location.reload();
//                                             window.scrollTo(0, 0); // Scroll to the top of the page
//                                             alert(data.message);  // Display response message from server

//                                         })
//                                         .catch(error => {
//                                             console.error('There was a problem with the fetch operation:', error);
//                                             alert("Error occurred while registering for the event. Please try again later.");
//                                         });
//                                 }
//                             }
//                         }
//                     })
//                     .catch(error => {
//                         console.error('There was a problem with the Already Registration check:', error);
//                         alert(error.message);
//                     });
//             }
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//             alert("Error occurred while registering for the event. Please try again later.");
//         });
// }


function registerEvent(event_name) {
    if (!events[event_name]) {
        alert("Event details not found.");
        return;
    }
    if (events[event_name]["title"] === "STAR OF THIRAN") {
        alert("[Automatic Registration] Be the WINNERS of other Events!..")
        return;
    }
    else if(events[event_name]["title"] === "CODESPRINT"){
        alert("Registrations closed for CODESPRINT!")
        return;
    }

    var emailRegex = /^[0-9]{2}[a-zA-Z]{1,2}[0-9]+@psgtech\.ac\.in$/;

    // Check user session
    fetch("/session_check")
        .then(response => {
            if (!response.ok) {
                window.location.href = '/login';
            }
            else {
                fetch(`/check_registration?event_name=${events[event_name]["title"]}`)
                    .then(response => response.json())

                    .then(async data => {

                        if (data.message === 'Participant already registered') {
                            alert('Participant already registered for the event');
                            return
                        }
                        else {
                            // User is not registered, proceed with registration
                            const isConfirmed = window.confirm("Do you want to proceed?");
                            if (isConfirmed) {

                                var count = events[event_name]["general_info"]["no_participants"];
                                if (/-/.test(count)) {
                                    const min = parseInt(count[0])
                                    const max = parseInt(count[2])
                                    count = prompt(`Enter participant count:`);
                                    if (!count) {
                                        return;
                                    }
                                    else if(!/^\d+$/.test(count)){
                                        alert("Invalid Team Size")
                                        return;
                                    }
                                    else if (count > max || count < min) {
                                        alert("Invalid Team Size")
                                        return;
                                    }
                                }
                                else {
                                    count = parseInt(count)
                                }
                                const participantEmails = []; // Array to store participant emails

                                //getting the email from the session in the backend
                                let userEmail = null
                                await fetch('/getUserEmail')
                                    .then(
                                        response => response.json())
                                    .then(async data => {
                                        // console.log(data)
                                        userEmail = data.data;

                                    }
                                    )

                                // Loop to prompt for participant emails
                                // Loop to prompt for participant emails
                                var x




                                for (let i = 1; i <= count - 1; i++) {
                                    const participantEmail = prompt(`Enter participant ${i + 1}'s email:`);
                                    if (participantEmail === null) {
                                        return;
                                    }
                                    else if (!participantEmail) {
                                        alert("Email address can't be empty.");
                                        i--;
                                    }
                                    else if (!emailRegex.test(participantEmail)) {
                                        alert("Enter the valid college email id (@psgtech.ac.in).");
                                        i--;
                                    }
                                    else if (participantEmail === userEmail) {
                                        alert("Please enter other participants emails.");
                                        i--;
                                    }
                                    else if (participantEmails.includes(participantEmail)) {
                                        alert("Participants email's should be unique");
                                        i--;
                                    }
                                    // else{
                                    //     participantEmails.push(participantEmail)
                                    // }
                                    else {
                                        // await fetch(`/checkParticipantRegistration?event_name=${events[event_name]["title"]}&email=${participantEmail}`
                                        x = await fetch(`/check_register?event_name=${events[event_name]["title"]}&email=${participantEmail}`)
                                            .then(response => response.json())
                                            .then(data => {
                                                // alert(data.message)
                                                if (data.message === "Participant not registered") {
                                                    alert("This email is not registered. Do you want to sign up?");
                                                    return 1;
                                                }

                                                else if (data.message === "Participant registered") {
                                                    alert("This Participant is already registered with other team for this event");
                                                    i--;
                                                }
                                                else {
                                                    participantEmails.push(participantEmail);
                                                }

                                            })
                                            .catch(
                                                error => {
                                                    console.error('There was a problem with the fetch operation:', error);
                                                    alert("se try again later.");
                                                }
                                            )
                                    }
                                    if (x == 1)
                                        break
                                }
                                if (x == 1)

                                    window.location.href = '/login'
                                else {
                                    const registrationData = {
                                        event_name: events[event_name]["title"],
                                        participantEmails: participantEmails
                                    };

                                    // Example of sending data to server using fetch
                                    fetch("/register_event", {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(registrationData)
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            window.location.reload();
                                            window.scrollTo(0, 0); // Scroll to the top of the page
                                            alert(data.message);  // Display response message from server

                                        })
                                        .catch(error => {
                                            console.error('There was a problem with the fetch operation:', error);
                                            alert("Error occurred while registering for the event. Please try again later.");
                                        });
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.error('There was a problem with the Already Registration check:', error);
                        alert(error.message);
                    });
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Error occurred while registering for the event. Please try again later.");
        });
}




//dropdown in the profile icon
// Get references to the dropdown toggle link and the dropdown menu
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

// Add click event listener to the dropdown toggle link
dropdownToggle.addEventListener('mouseover', function (event) {
    // Prevent the default behavior of the anchor tag (e.g., navigating to a URL)
    event.preventDefault();
    // console.log('Dropdown toggle clicked');
    // Toggle the ' active' class on the dropdown menu to show/hide it
    dropdownMenu.style.display = 'block'
});



dropdownToggle.addEventListener('click', function (event) {
    // Hide the element when clicked anywhere on the document
    // dropdownMenu.style.display = 'block';
    dropdownMenu.style.display = 'block'


});

document.addEventListener('click', function (event) {
    // Check if the clicked target is not the hover container or hover element
    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        // Hide the element when clicked anywhere outside
        dropdownMenu.style.display = 'none';
    }
});



function handleLogout() {
    console.log("hit")
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            alert("Error Logging you out")
        }
        else {
            window.location.href = "/"
        }
    })

}


async function handleUser() {

    let user = null;
    await fetch('/getUserEmail')
        .then(
            response => response.json())
        .then(async data => {
            if (data.data != "No user in session") {
                user = data.data;
            }
        }
        )
    console.log("user", user)

    var element = document.getElementById("dropdown-toggle")
    var mobElement = document.getElementById("menuImg")
    var mobHome = document.getElementById("mobHome")
    if (user) {
        element.removeAttribute('hidden')
        mobElement.removeAttribute('hidden')
        mobHome.setAttribute("hidden", "")
    }



}


const menuIcon = document.getElementById("menuImg");
const dropdown = document.getElementById("dropdown");

menuIcon.addEventListener("click", () => {
    dropdown.style.display = (dropdown.style.display === "flex") ? "none" : "flex";
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    const isClickInsideDropdown = dropdown.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);

    if (!isClickInsideDropdown && !isClickOnMenuIcon) {
        dropdown.style.display = "none";
    }
});

// Close dropdown when mobile view is maximized
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) { // Adjust the threshold as needed
        dropdown.style.display = "none";
    }

});



// Define the events object with event details
const events = {
    event_1: {
        title: "STAR OF THIRAN",
        description: '<span style="color:yellow;"><b><br>Winner?...Oh runner?</b></span> then lace up for the finale. Showcase your skills and test your limits in this event to become the winner of winners and get titled as "Star of Thiran". Do take the chance to prove your ability and claim your place in the running history!',
        general_info: {
            no_participants: "1",
            no_rounds: 2,
            venue: "<br>  ROUND - 1 : K504 <br> ROUND - 2 : F-BLOCK ASSEMBLY HALL",
            duration_1: "12:15PM - 12:45PM on 02-04-2024 ",
            duration_2: "03:30PM - 04:45PM on 02-04-2024 "
        },
        coordinators_details: {
            name_1: "BRINDHA.S.V",
            phone_1: "97519 02989<br>",
            name_2: "GANGA SOWBHAKYA LAKSHMI.M",
            phone_2: "88700 85451"
        },
        round_wise_description: {
            round_1: "<center><b>Prelims</b></center><br>"+
            "A set of brainstorming questions will be presented, and participants must involve their skills and abilities to provide clever answers. "+
            "Those answered questions smartly will proceed to the next round.",
            
            round_2: "<center><b>Finals</b></center><br>"+
            "Participants are required to execute tasks assigned by the judges while on stage. "+
            "Each participant will be allotted a 15-minute timeframe for their performance."
            
        },
        event_rules: "- Only the winners and runners-up from all other events of Thiran 2024 are qualified to participate.<br><br>"+
                    "- If the person is not reporting on time for prelims, then he/she will not be permitted to participate.<br><br>"+
                    "- Copying of answers from the internet or any other resources is prohibited.<br><br>"+
                    "- The decisions of judges will be final."


    },
    event_2: {
        title: "CODESPRINT",
        description: 'Embark on a thrilling <span style="color:yellow;"><b>journey of logic, problem-solving, and '+
        "innovation!</b></span> Get ready to test your mettle against the best and brightest minds in the realm of "+
        "technology. Brace yourself for a whirlwind of questions designed to stretch your understanding of "+
        "programming concepts to its limits. From algorithms and data structures to programming languages "+
        "and software engineering principles, every question is a puzzle waiting to be solved. With each correct "+
        "answer, you inch closer to securing your spot in the next phase of the challenge. But beware, the clock "+
        "is ticking, and every decision counts. Will you emerge victorious, or will the pressure prove too much "+
        "to handle?",
        general_info: {
            no_participants: "1",
            no_rounds: 2,
            venue: "ONLINE EVENT",
            duration_1: "04:00PM - 06:30PM on 29-03-2024",
            duration_2: "04:00PM - 06:30PM on 30-03-2024",
        },
        coordinators_details: {
            name_1: "Aparna Ramanathan",
            phone_1: "94879 03933<br>",
            name_2: "Sudharsana Amuthan",
            phone_2: "77082 52279"
        },
        round_wise_description: {
            round_1: "<center><b>MCQs</b></center><br>"+
        
            "This round will have 25 MCQ questions mainly based on topics like data structures and algorithms."+
            " The questions will also test the basic coding ability and programming language knowledge of the participant.",
            
            round_2: "<center><b>Decode Drama</b></center><br>"+
            "Both the rounds will be hosted online for all PSG students to attend."+
            " Everyone must report virutally to the event on time in the 'Quizz.com'. "+
            " All participants must follow the proctoring guidelines and their activities will be monitored."+
            " Malpractice will be strictly condemned."
        },
        event_rules:
            //  "<br>- Each team consists of 2 members.<br><br>"+
            "- Participants must adhere to the time limit for each round.<br><br>"+
            "- Fair play and sportsmanship are always expected.<br><br>"+
            "- Any form of misconduct will result in immediate disqualification."
    },
    event_3: {
        title: "CRICKBID AUCTION",
        description: "The CrickBid Auction features two rounds: first, a quiz competition to shortlist ten teams, and in the second round the selected 10 teams have to participate in the auction and bid for the players they want within a 70 crores purse, adhering to the constraints of 4 batsmen, 1 wicketkeeper, 3 all-rounders, and 3 bowlers, each player will be having varying points. The team with the highest cumulative points while meeting the player requirements emerges victorious.",
        general_info: {
            no_participants: "2-3",
            no_rounds: 2,
            venue: "<br>ROUND - 1: ONLINE <br> ROUND-2 : J411 ",
            duration_1: "04:00PM - 04:30PM on 30-03-2024",
            duration_2: "05:00PM - 07:30PM on 01-04-2024"
        },
        coordinators_details: {
            name_1: "GOUTHAM H",
            phone_1: "93456 70926<br>",
            name_2: "NARESH KUMAR P",
            phone_2: "93611 69510"
        },
        round_wise_description: {
            round_1: "In the first round of the Cricket Auction, teams will participate in a quiz competition to secure their spot in the subsequent player auction phase. Each team have to participate in a MCQ test which will be conducted in an online platform where the questions will be covering various aspects of cricket, including history, rules, player statistics, and current events. The questions will test the teams' knowledge and understanding of the sport.",
            round_2: "Teams will engage in a competitive bidding process to acquire the desired players within their budget constraints. They must carefully strategize to balance skill, value, and team composition while adhering to the specified player categories. At the conclusion of the auction, teams will be evaluated based on their adherence to the player requirements and the cumulative points of their selected squad. The team with the highest total points while meeting the specified criteria will emerge victorious and secure the top places in the competition."
        },
        event_rules: "- Each team must contain of 3 members.<br><br>"+
        "- Where the Ten Team will be shortlisted based on the MCQ in the first round.<br><br>"+
        "- Each team must build an IPL team which consists of 4 Batsmen, 1 Wicket Keeper, 3 All-rounders & 3 Bowlers through the auction.<br><br>"+
        "- Maximum of 4 international players allowed in the team.<br><br>"+
        "- Each team will have a purse of 70 crores to spend in the auction.<br><br>"+
        "- Each player appearing in the auction will have their own points.<br><br>"+
        "- The team which has the highest total points will be declared as the winner.<br><br>"+
        "- In case, if teams have the same total points, the team with the more money in the purse will be declared as the winner."
    
    },
    event_4: {
        title: "CTRL ALT QODE",
        description: '<br>We present you with yet another opportunity to code your brain and buzz your heart out - <b><span style="color:yellow;"><b>Ctrl+Alt+Qode</b></span>. Stack skills and queue tricks up your sleeve for a race against time! This event will surely provide you with a heap of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.',
        general_info: {
            no_participants: "1-3",
            no_rounds: 2,
            venue: "<br>ROUND - 1: ONLINE <br> ROUND - 2: M-BLOCK SIL LAB",
            duration_1: "  10:00AM - 11:30AM on 30-03-2024 ",
            duration_2: " 05:30PM - 07:00PM on 01-04-2024 "
        },
        coordinators_details: {
            name_1: "NAVEEN KUMAR A A",
            phone_1: "76039 93673<br>",
            name_2: "VENKAD KRISHNA C",
            phone_2: "93854 68962"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of coding and quiz questions that tests the participants on their knowledge of problem-solving and quizzing skills. Top 5 teams in this round advance to the next round.",
            round_2: "The second round is the final round of this competition. The participants encounter a unique challenge where they must first conquer a coding question. Only upon completion of the coding question, the participants will be able to press the buzzer to get a chance at answering the quiz question, which would be on display for all the teams. Once the buzzer is pressed all participants should stop coding and marks for the coding questions will be allotted accordingly. <br><br> If the participant who buzzes first answers the quiz question incorrectly, the other teams would be given a chance to pounce on the quiz question and scores will be allocated accordingly. The leaderboard is used to monitor the submissions of the participants."
        },
        event_rules: "- Team must contain a maximum of 2 members<br>"+
            "- The top 5 teams in Prelims will be selected for finals. In case of a tie-breaker, the team that solves the problem first wins<br>"+
            "- The participants should not involve in any unacceptable behaviour, it will lead to the disqualification of the team<br>"+
            "- The leaderboard is used to determine the winner<br>"+
            // "- The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.<br>"+
            "- Question paper, pen, rough sheets for workout will be provided.<br>"+
            "- Smartphone usage is not allowed during the events.<br>"
    },
    event_5: {
        title: "FORTRESS CTF",
        description: '<br>Embark on an exhilarating journey where <b><span style="color:yellow;"><b>machine learning meets cybersecurity</b></span>. Compete in fast-paced challenges that blend the essence of data science with the thrill of capturing flags. Sharpen your skills, outwit your opponents, and emerge as the ultimate champion in this high-stakes showdown! Join us now and let the excitement begin!',
        general_info: {
            no_participants: "2-4",
            no_rounds: 1,
            venue: "EVENT",
            duration_1: "09:00AM - 06:00PM on 30-03-2024",
            duration_2: "N/A"
        },
        coordinators_details: {
            name_1: "AMPAREESHAN M B",
            phone_1: "98413 37480<br>",
            name_2: "ANU RAMYA R",
            phone_2: "95788 22211"
        },
        round_wise_description: {
            round_1: "Participants will engage in a series of challenges combining machine learning and cybersecurity concepts. Each challenge will unveil a distinct scenario, demanding participants to apply a blend of cryptography, web challenges, forensics, as well as machine learning and data analysis techniques. Points will be awarded based on the difficulty of the challenges, with participants aiming to accumulate the highest score within the allotted time frame. The event follows the traditional Capture the Flag format, where participants 'CAPTURE' flags by solving challenges, showcasing their ability to identify vulnerabilities, analyze data, and develop innovative solutions. ",
            round_2: "N/A"
        },
        event_rules: "- The event will take place in online mode.<br><br>"+
            "- Each team must contain 2-4 members.<br><br>"+
            "- In case of a tie-breaker, the team that solves the problem first wins<br><br>"+
            "- The leaderboard is used to determine the winner<br><br>"+
            "- The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team."
    },
    event_6: {
        title: "LAST STAND - [FALL GUYS]",
        description: 'Gear up for an adrenaline-charged <span style="color:yellow;"><b>gaming extravaganza</b></span> where every move counts and every play shapes destiny. Welcome to Last Stand, where virtual battlefields ignite, and champions rise!',
        general_info: {
            no_participants: "1",
            no_rounds: 1,
            venue: "TBD",
            duration_1: "09:00AM - 05:30PM on 31-03-2024 (PRELIMS)",
            duration_2: "05:30PM - 07:30PM on 01-04-2024"
        },
        coordinators_details: {
            name_1: "Tejas Srinivas",
            phone_1: "97900 49089<br>",
            name_2: "Rakshith UR",
            phone_2: "87625 18341"
        },
        round_wise_description: {
            round_1: "Ultimate Knockout is a whimsical and chaotic multiplayer game that pits up to 60 players against each other in a mad dash through obstacle courses and challenges until only one victor remains.<br>",
            
            round_2: "Final Round"
        },
        event_rules:
       "- Participants are required to have Fall Guys: Ultimate Knockout downloaded and installed on their gaming platform of choice prior to the event. The game will be conducted online, and players must ensure that they have access to a stable internet connection. Failure to have the game installed and ready to play at the designated start time may result in disqualification from the event.<br>"+
       "- Participants must be present and ready to play at the scheduled match times. Failure to show up within the designated time frame may result in disqualification.<br>"+
       "- Players are expected to exhibit good sportsmanship and fair play throughout the tournament. Any form of cheating or unsportsmanlike behavior will result in immediate disqualification.<br>"
    },
    
    event_7: {
        title: "NETHUNT",
        description: '<br>An Image can convey things that words alone cannot fully capture or clarify. However, <span style="color:yellow;"><b>Images can also be misleading</span></b>. Are you someone who pays close attention to every important detail? If yes, then we have a challenge for you. It"s not a test of your thinking abilities, but rather one that will really make your brain work hard. Are you up for it? Here it is...!!!',
        general_info: {
            no_participants: "1",
            no_rounds: 1,
            venue: "ONLINE EVENT",
            duration_1: "<br> 10:00AM on 30-03-2024 TO 05:00PM of 01-04-2024 ",
            duration_2: ""
        },
        coordinators_details: {
            name_1: "Prevarshini R J",
            phone_1: "97894 24077<br>",
            name_2: "Vijaykeerthy S",
            phone_2: "78069 74480"
        },
        round_wise_description: {
            round_1: "Guess the computer related technical term from the image displayed. Clues will be provided for every image after a few tries/hits. Answers are to be entered in Textbox Provided. For every image, First clue appears after 75 tries, Second clue appears after 150 tries.<br><br> Scores will be reduced according to your hit counts. The answers should or will not contain any special characters like (, + * / < > - $ &). Ignore the space between the words in the answer, e.g: “Net-Hunt” must be entered as “nethunt”, 1 must be entered as “one”.",
            round_2: ""
        },
        event_rules: "- This is an online event.<br>"+
            "- In case of a tie, the winner will be selected based on the number of tries.<br>"+
            "- Any form of malpractice will lead to disqualification and the organizers have all the rights to disqualify anyone without any prior notice.<br>"+
            "- Selection will be made after verification of the student's credentials. Students with invalid credentials will be disqualified.<br>"+
            "- Winners will be announced on 1<sup>st</sup> April 2024.<br>"+
            "- Judges decision will be final."
    },
    event_8: {
        title: "TRIPLE TROUBLE",
        description: '<br>Gear up for an exhilarating journey with <span style="color:yellow;"><b>Triple Trouble</b></span>, where the excitement triples and the laughter multiplies! Challenge your intellect with brain-teasers like \'Connections\' and the lightning-fast game. But the fun doesn\'t stop there! Then, get ready to strategize and outwit your opponents in a thrilling game of Tic Tac Toe. Brace yourselves for the hilarious chaos of the Headphone Game! So, put on your game face and prepare to conquer the chaos like never before!!',
        general_info: {
            no_participants: "2-3",
            no_rounds: 2,
            venue: "TBD",
            duration_1: "09:00AM - 05:00PM on 31-03-2024 (ONLINE - GMEET)",
            duration_2: "05:30AM - 07:00PM on 01-04-2024 (OFFLINE)"
        },
        coordinators_details: {
            name_1: "RASHMI N S",
            phone_1: "93841 33686<br>",
            name_2: "MEDAM SAI PRANATHI",
            phone_2: "91008 75865"
        },
        round_wise_description: {
            round_1: " The first round is the preliminary round in which participants will engage in brain-teasing challenges. In 'Rapid Rush', they race against the clock to list as many items related to a specific topic. Next up, in 'Connections', players will identify answers from a set of images.",
            round_2: " The second round is the Final round of this competition in which teams engage in interactive challenges. In 'Tic Tac Toe', players combine strategy with agility, performing activities before racing to fill their grid. Before placing their markers, they must overcome hindrances such as bottle flips or completing rounds of a roundabout. This dynamic twist adds an extra layer of challenge and excitement to the game. Following this, in 'Headphone Game!', one player will put on headphones and try to guess the statements conveyed by the other team members amidst noise."
        },
        event_rules: "- Each team must contain a maximum of 3 members<br><br>"+
            "- There will be break given on the first round<br><br>"+
            "- The top 10 teams in Prelims will be selected for finals<br><br>"+
            "- In case of a tie-breaker, the team that completes the game first wins.<br><br>"+
            "- The leaderboard is used to determine the winner."
    },
    event_9: {
        title: "WITTY MINDZ",
        description: '<br><span style="color:yellow;"><b>WITTY MINDZ</b></span> offers participants a platform to showcase their cognitive agility and '+
        "intelligence through a series of engaging tasks. This event promises to challenge their intellect and "+
        "creativity, providing an exciting opportunity for them to showcase their mental ability.",
        general_info: {
            no_participants: "2",
            no_rounds: 2,
            venue: "K504 (OFFLINE)",
            duration_1: "04:30PM - 05:10PM on 01-04-2024 ",
            duration_2: "05:30PM - 06:30PM on 01-04-2024 "
        },
        coordinators_details: {
            name_1: "HEMANTH KUMAR V",
            phone_1: "73972 68063<br>",
            name_2: "MAHALAKSHMI R",
            phone_2: "94984 13977"
        },
        round_wise_description: {
            round_1: "<center><b>Brainathon</b></center>"+
            '<span style="color:yellow;">This round consists of various mental challenges</span><br>'+
            "&nbsp;&nbsp;&nbsp;&nbsp;Solve a crossword puzzle using provided clues."+
            " Engage in a computer science quiz."+
            " Memorize details from an image and answer the subsequent questions accordingly.",
    
            round_2: "<center><b>Decode Drama</b></center>"+
            '<span style="color:yellow;">This round combines wordplay and acting skills:</span><br>'+
            " &nbsp;&nbsp;&nbsp;&nbsp;Participants crack a jumbled word related to computer science."+
            " One team member acts out the word to their teammate, similar to 'Dumb Charades.'"
        },
        event_rules: "- Each team consists of 2 members.<br><br>"+
            "- Participants must adhere to the time limit for each round.<br><br>"+
            "- Fair play and sportsmanship are always expected.<br><br>"+
            "- Any form of misconduct will result in immediate disqualification."
    },
    event_10: {
        title: "LAST STAND [Valorant]",
        description: 'Gear up for an adrenaline-charged <span style="color:yellow;"><b>gaming extravaganza</b></span> where every move counts and every play shapes destiny. Welcome to Last Stand, where virtual battlefields ignite, and champions rise!',
        general_info: {
            no_participants: "1-5",
            no_rounds: 1,
            venue: "TBD",
            duration_1: "3 hours",
            duration_2: ""
        },
        coordinators_details: {
            name_1: "Tejas Srinivas",
            phone_1: "97900 49089<br>",
            name_2: "Rakshith UR",
            phone_2: "87625 18341"
        },
        round_wise_description: {
            round_1: 
            "Enter the tactical arena of Valorant, where precision and strategy reign supreme. Form your squad, strategize your moves, and engage in heart-pounding firefights against formidable opponents. Only the sharpest minds and quickest reflexes will emerge victorious in this intense competition.",
            round_2: ""
        },
        event_rules:
        "- The match will be held in the following stages: Qualifiers - Swift-Play & Semi Finals and Finals  - Unrated<br>"+
        "- Squad size: 5 members<br>"+
       "- Squads lacking members and solos should inform beforehand, so that we can group you guys.<br>"+
       "- The Qualifiers will be held online on a preceding day.<br>"+
       "- Players must be punctual to their scheduled slots, no waiting time will be given (Slots and timing will be announced in the discord server).<br>"+
       "- Players must be respectful to one another and no foul language will be tolerated.<br>"+
       "- If the players are caught using any form of hack or stream sniping your team will be disqualified."
       
    },
}