let isLoggedIn = true;
let userMessage;
let userRole = "admin"; // Or any other role like "user"

if (isLoggedIn) {
    if (userRole === "admin") {
        userMessage = "Welcome, Admin!";
    } else {
        userMessage = "Welcome, User!";
    }
} else {
    userMessage = "Please log in to access the system.";
}

console.log("User Message: ", userMessage);

let userType = "subscriber";
let userCategory;

switch (userType) {
    case "admin":
        userCategory = "Administrator";
        break;
    case "manager":
        userCategory = "Manager";
        break;
    case "subscriber":
        userCategory = "Subscriber";
        break;
    default:
        userCategory = "Unknown";
}

console.log("User Category:", userCategory);

let isAuthenticated = true;

let authenticationStatus = isAuthenticated ? "Authenticated" : "Not authenticated";

console.log("Authentication Status:", authenticationStatus);

// Practice Task
function dietaryServices(userType) {
    let message = ""; // Initialize the message variable

    switch (userType) {
        case "Employee":
            message =
                "Welcome, Employee! You have access to Dietary Services.";
            break;
        case "Enrolled Member":
            message =
                "Welcome, Enrolled Member! You have access to Dietary Services and one-on-one interaction with a dietician.";
            break;
        case "Subscriber":
            message =
                "Welcome, Subscriber! You have partial access to facilitate Dietary Services.";
            break;
        case "Non-Subscriber":
            message =
                "You need to enroll or subscribe to access Dietary Services.";
            break;
        default:
            message = "Invalid user type. Please provide a valid role.";
    }

    // Display the message
    console.log(message);
}

// Test cases
dietaryServices("Employee");
dietaryServices("Enrolled Member");
dietaryServices("Subscriber");
dietaryServices("Non-Subscriber");
dietaryServices("InvalidRole"); 

