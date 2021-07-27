const apiKey = 'AIzaSyBUj7xEfbaMs0QV0nbpv0rRDutrB90JhmU';

const authService = {
    login(email, password) {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            }),
        }).then((response) => response.json())
            .then((data) => console.log(data))
            .catch((e) => console.error(e));
    }

};