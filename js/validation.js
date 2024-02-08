document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to input fields
    var form = document.getElementById('contact-form');
    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }

    });

    // Add event listeners to input fields for real-time validation
    var nameInput = document.getElementById('cf-name');
    var emailInput = document.getElementById('cf-email');
    var phoneInput = document.getElementById('cf-phone');
    var subjectInput = document.getElementById('cf-subject');
    var messageInput = document.getElementById('cf-message');

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    subjectInput.addEventListener('input', validateSubject);
    messageInput.addEventListener('input', validateMessage);
});

function validateForm(e) {
    e.preventDefault();
    console.log(e);
    var name = document.getElementById('cf-name').value;
    var email = document.getElementById('cf-email').value;
    var phone = document.getElementById('cf-phone').value;
    var subject = document.getElementById('cf-subject').value;
    var message = document.getElementById('cf-message').value;

    // Reset error messages
    resetErrorMessages();

    // Simple validation rules (you can customize as needed)
    if (name.trim() === '') {
        document.getElementById('name-error').innerText = 'Please enter your name.';
        return false;
    }

    if (email.trim() === '' || !isValidEmail(email)) {
        document.getElementById('email-error').innerText = 'Please enter a valid email address.';
        return false;
    }
    var phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone)) {
        document.getElementById('phone-error').innerText = 'Please enter your phone number.';
        return false;
    }

    if (subject.trim() === '') {
        document.getElementById('subject-error').innerText = 'Please enter the subject.';
        return false;
    }

    if (message.trim() === '') {
        document.getElementById('message-error').innerText = 'Please enter your message.';
        return false;
    }

    //If all validations pass, the form will be submitted
    const jsonData = {
        "cfname": name,
        "cfemail": email,
        "cfphone": phone,
        "cfsubject": subject,
        "cfmessage": message
    };
    sendData(jsonData);
    return true;
}


function sendData(jsonData){
    $('#submit-button').text('In progres....').prop('disabled', true).css('background','#e0d9b6');
    // API endpoint URL
    const apiUrl = "https://1sgmyoovv1.execute-api.us-east-1.amazonaws.com/v1/contact-me";
    // jQuery AJAX
    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        success: function(data) {
            // Handle success
            console.log('Response:', data);
            $('#submit-button').text('Send').prop('disabled', false).css('background','#ffd500');
            $("#successMsg").css("display", "block");

        },
        error: function(error) {
            // Handle error
            console.error('Error:', error);
        }
    });
}


function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resetErrorMessages() {
    // Reset all error messages
    var errorElements = document.getElementsByClassName('error-message');
    for (var i = 0; i < errorElements.length; i++) {
        errorElements[i].innerText = '';
    }
}

function validateName() {
    var name = document.getElementById('cf-name').value;
    var nameError = document.getElementById('name-error');
    nameError.innerText = name.trim() === '' ? 'Please enter your name.' : '';
}

function validateEmail() {
    var email = document.getElementById('cf-email').value;
    var emailError = document.getElementById('email-error');
    emailError.innerText = email.trim() === '' || !isValidEmail(email) ? 'Please enter a valid email address.' : '';
}

function validatePhone() {
    var phone = document.getElementById('cf-phone').value;
    if(phone){
        var phoneError = document.getElementById('phone-error');
        phoneError.innerText = phone.trim() === '' ? 'Please enter your phone number.' : '';
    }
}

function validateSubject() {
    var subject = document.getElementById('cf-subject').value;
    var subjectError = document.getElementById('subject-error');
    subjectError.innerText = subject.trim() === '' ? 'Please enter the subject.' : '';
}

function validateMessage() {
    var message = document.getElementById('cf-message').value;
    var messageError = document.getElementById('message-error');
    messageError.innerText = message.trim() === '' ? 'Please enter your message.' : '';
}
