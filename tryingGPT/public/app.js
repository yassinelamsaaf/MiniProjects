// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const clientTable = document.getElementById('client-table');
    const addClientForm = document.getElementById('add-client-form');

    // Fetch all clients and display them in the table
    async function fetchClients() {
        try {
            const response = await fetch('/api/clients');
            if (!response.ok) throw new Error('Failed to fetch clients');

            const clients = await response.json();
            renderClientTable(clients);
        } catch (error) {
            console.error('Error fetching clients:', error);
            alert('Error fetching clients. Please try again later.');
        }
    }

    // Render the client table
    function renderClientTable(clients) {
        clientTable.innerHTML = ''; // Clear the table before adding new rows
        clients.forEach(client => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${client.id}</td>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.phone || ''}</td>
                <td class="actions">
                    <button class="update" data-id="${client.id}" data-name="${client.name}" data-email="${client.email}" data-phone="${client.phone || ''}">Update</button>
                    <button class="delete" data-id="${client.id}">Delete</button>
                </td>
            `;

            clientTable.appendChild(row);
        });

        attachActionListeners(); // Attach event listeners to new buttons
    }

    // Add a new client using the form
    addClientForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone })
            });

            if (!response.ok) throw new Error('Failed to add client');

            addClientForm.reset(); // Clear form fields
            fetchClients(); // Refresh the client list recupperer la reponse post (res) qui est sous form json et l'inserer
        } catch (error) {
            console.error('Error adding client:', error);
            alert('Error adding client. Please try again.');
        }
    });

    // Delete a client
    async function deleteClient(id) {
        try {
            const response = await fetch(`/api/clients/${id}`, {
                 method: 'DELETE' 
                });
            if (!response.ok) throw new Error('Failed to delete client');

            fetchClients(); // Refresh the client list
        } catch (error) {
            console.error('Error deleting client:', error);
            alert('Error deleting client. Please try again.');
        }
    }

    // Update a client
    async function updateClient(id, name, email, phone) {
        const updatedName = prompt('Update Name:', name);
        const updatedEmail = prompt('Update Email:', email);
        const updatedPhone = prompt('Update Phone:', phone);

        if (!updatedName || !updatedEmail) {
            alert('Name and Email are required!');
            return;
        }

        try {
            const response = await fetch(`/api/clients/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: updatedName, email: updatedEmail, phone: updatedPhone })
            });

            if (!response.ok) throw new Error('Failed to update client');

            fetchClients(); // Refresh the client list
        } catch (error) {
            console.error('Error updating client:', error);
            alert('Error updating client. Please try again.');
        }
    }

    // Attach event listeners to action buttons
    function attachActionListeners() {
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this client?')) {
                    deleteClient(id);
                }
            });
        });

        document.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const name = button.getAttribute('data-name');
                const email = button.getAttribute('data-email');
                const phone = button.getAttribute('data-phone');
                updateClient(id, name, email, phone);
            });
        });
    }

    // Initial load of client data
    fetchClients();
});
