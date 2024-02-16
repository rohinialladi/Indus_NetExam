function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();

    // Validate required fields
    if (name === '' || email === '' || contactNumber === '') {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Prepare data to send to the server
    const formData = {
        name: name,
        email: email,
        contactNumber: contactNumber
    };

    // Use Fetch API to send data to the server
    fetch('http://localhost:8080/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Display confirmation message
        document.getElementById('confirmationMessage').textContent = 'Form submitted successfully.';
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
