const setDobRange = () => {
            const dobInput = document.getElementById('dob');
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()).toISOString().split('T')[0];
            const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
            dobInput.setAttribute('min', minDate);
            dobInput.setAttribute('max', maxDate);
        }

        const displayTableData = () => {
            const userTableBody = document.querySelector('#user-table tbody');
            userTableBody.innerHTML = '';
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="border px-4 py-2">${user.name}</td>
                    <td class="border px-4 py-2">${user.email}</td>
                    <td class="border px-4 py-2">${user.password}</td>
                    <td class="border px-4 py-2">${user.dob}</td>
                    <td class="border px-4 py-2">${user.acceptTerms ? 'Yes' : 'No'}</td>
                `;
                userTableBody.appendChild(row);
            });
        }

        window.onload = () => {
            setDobRange();
            displayTableData();
        }

        document.getElementById('user-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const dob = document.getElementById('dob').value;
            const acceptTerms = document.getElementById('acceptTerms').checked;
            const newUser = { name, email, password, dob, acceptTerms };
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            displayTableData();
            document.getElementById('user-form').reset();
        });
