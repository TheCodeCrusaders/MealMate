const form = document.getElementById("myForm"); // Replace 'myForm' with the id of your form
const message = document.getElementById("message");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(form); // Get the form data

    const userData = {
        username: formData.get('username'), // Replace 'username' with the name of your username input field
        password: formData.get('password') // Replace 'password' with the name of your password input field
    };

    if (!userData.username) {
        message.innerText = 'Error: Please enter a username';
        return;
    }
    
    if (!userData.password) {
        message.innerText = 'Error: Please enter a password';
        return;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };

    fetch('/login', options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            message.innerText = 'Logged in successfully, redirecting...';
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000); // 2000 milliseconds = 2 seconds
        } else {
            message.innerText = 'Error: Unknown response from server';
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        message.innerText = 'Error: Failed to login';
    });
});