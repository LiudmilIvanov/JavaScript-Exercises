const apiKey = 'AIzaSyBUj7xEfbaMs0QV0nbpv0rRDutrB90JhmU';

const authService = {
    async login(email, password) {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            }),
        });
        let data = response.json();
        localStorage.setItem('auth', JSON.stringify(data));
        console.log('yes')
    }

};