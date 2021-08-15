import init from './db-init.js';

export function extendContext(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(getUserData());
    context.email = user ? user.email : '';

    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs',
    })
};

export function errorHandler(error) {
    console.log(error);
};

export function saveUserData(data) {
    const { user: { email, uid } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }));
};

export function getUserData() {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export function clearUserData() {
    localStorage.removeItem('user');
};

init();

export const UserModel = firebase.auth();
export const DB = firebase.firestore();