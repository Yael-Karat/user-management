const RegistrationModule = (() => {
    let userData = [];
    let currentStep = 1;

    const createErrorMessage = (message) => {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message text-danger';
        errorMessage.textContent = message;
        return errorMessage;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+ac\.il$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z]*)*(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const isValidDateOfBirth = (dob) => {
        const currentDate = new Date();
        const userDate = new Date(dob);
        const ageDiff = currentDate.getFullYear() - userDate.getFullYear();
        return ageDiff >= 18;
    };

    const validateInput = (input, type) => {
        const trimmedInput = input.trim();
        switch (type) {
            case 'name':
                return trimmedInput.match(/^[a-z]+$/) ? '' : 'Name is mandatory and must contain only alphabets.';
            case 'email':
                return isValidEmail(trimmedInput) ? '' : 'Email is mandatory and must be valid for an academic email from Israel (*.ac.il).';
            case 'password':
                return isValidPassword(trimmedInput) ? '' : 'Password must contain at least one uppercase letter, at least one lowercase letter, one digit, and must be at least 8 characters long.';
            case 'dob':
                return isValidDateOfBirth(trimmedInput) ? '' : 'User must be at least 18 years old.';
            default:
                return '';
        }
    };

    const handleNext = () => {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();

        const errors = [
            validateInput(firstName, 'name'),
            validateInput(lastName, 'name'),
            validateInput(email, 'email'),
        ];

        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = '';
        errors.forEach((error) => {
            if (error) {
                errorContainer.appendChild(createErrorMessage(`Input ${error}`));
            }
        });

        if (errors.every((error) => error === '')) {
            currentStep = 2;
            renderForm();
        }
    };

    const handleSave = () => {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const comments = document.getElementById('comments').value.trim();

        const errors = [
            validateInput(firstName, 'first name'),
            validateInput(lastName, 'last name'),
            validateInput(email, 'email'),
            validateInput(password, 'password'),
            password === confirmPassword ? '' : 'Passwords do not match',
            validateInput(dob, 'dob'),
            gender ? '' : 'Please select a gender',
        ];

        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = '';
        errors.forEach((error) => {
            if (error) {
                errorContainer.appendChild(createErrorMessage(`Input ${error}`));
            }
        });

        if (errors.every((error) => error === '')) {
            const user = {
                firstName,
                lastName,
                email,
                password,
                dob,
                gender,
                comments,
            };
            userData.push(user);
            userData.sort((a, b) => a.lastName.localeCompare(b.lastName));

            renderUserList();

            // Reset input fields to blank
            document.getElementById('first-name').value = '';
            document.getElementById('last-name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirm-password').value = '';
            document.getElementById('dob').value = '';
            document.getElementById('male').checked = false;
            document.getElementById('female').checked = false;
            document.getElementById('comments').value = '';

            currentStep = 1;
            renderForm();
        }
    };

    const goBack = () => {
        currentStep = 1;
        renderForm();
    };

    const addEventListeners = () => {
        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            nextButton.addEventListener('click', handleNext);
        }

        const saveButton = document.getElementById('save-button');
        if (saveButton) {
            saveButton.addEventListener('click', handleSave);
        }

        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', goBack);
        }
    };

    const renderForm = () => {
        const registrationContainer = document.getElementById('registration-container');
        registrationContainer.innerHTML = '';

        if (currentStep === 1) {
            const form1 = document.createElement('div');
            form1.innerHTML = `
                        <form>
                            <div class="mb-3">
                                <label for="first-name" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="first-name" required>
                            </div>
                            <div class="mb-3">
                                <label for="last-name" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="last-name" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" required>
                            </div>
                            <button type="button" class="btn btn-primary" id="next-button">Next</button>
                            <div id="error-container"></div>
                        </form>
                    `;
            registrationContainer.appendChild(form1);
        } else {
            const form2 = document.createElement('div');
            form2.innerHTML = `
                        <form>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" required>
                            </div>
                            <div class="mb-3">
                                <label for="confirm-password" class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" id="confirm-password" required>
                            </div>
                            <div class="mb-3">
                                <label for="dob" class="form-label">Date of Birth</label>
                                <input type="date" class="form-control" id="dob" required>
                            </div>
                            <div class="mb-3">
                                <label for="dropdown">Gender</label><br>
                                        <select id="Gender">
                                            <option value="1" selected>Please select</option>
                                            <option value="2">Male</option>
                                            <option value="3">Female</option>
                                        </select><br><br>
                            <div class="mb-3">
                                <label for="comments" class="form-label">Comments</label>
                                <textarea class="form-control" id="comments" maxlength="100"></textarea>
                            </div>
                            <button type="button" class="btn btn-success" id="save-button">Save</button>
                            <button type="button" class="btn btn-secondary" id="back-button">Back</button>
                            <div id="error-container"></div>
                        </form>
                    `;
            registrationContainer.appendChild(form2);
        }

        addEventListeners(); // Add event listeners after rendering the form
    };

    const renderUserList = () => {
        const registrationContainer = document.getElementById('registration-container');
        registrationContainer.innerHTML = '';

        if (userData.length > 0) {
            const userList = document.createElement('table');
            userList.className = 'table table-bordered table-striped mt-4';
            userList.innerHTML = `
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userData.map(user => `
                                <tr>
                                    <td>${user.lastName}</td>
                                    <td>${user.firstName}</td>
                                    <td>${user.email}</td>
                                    <td>${user.password}</td>
                                    <td>${user.dob}</td>
                                    <td>${user.gender}</td>
                                    <td>${user.comments}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    `;
            registrationContainer.appendChild(userList);
        }
    };

    return {
        renderForm,
        renderUserList,
    };
})();

RegistrationModule.renderForm();