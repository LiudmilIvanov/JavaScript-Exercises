import { errorHandler, extendContext, getUserData, clearUserData, saveUserData, UserModel } from '../util.js';

export async function registerPage(context) {
    await extendContext(context)
    context.partial('./templates/register.hbs');
};

export function loginPage(context) {
    extendContext(context)
        .then(function () {
            context.partial('./templates/login.hbs');
        });
};

export function logout() {
    UserModel.signOut()
        .then((response) => {
            clearUserData();

            this.redirect('/home');
        }).catch(errorHandler);
};

export function registerPost(context) {
    const { email, password, rePassword } = context.params;

    if (password !== rePassword) {
        return;
    }

    UserModel.createUserWithEmailAndPassword(email, password)
        .then((userData) => {

            this.redirect('/home');
        }).catch((e) => console.log(e));
};

export function loginPost(context) {
    const { email, password } = context.params;

    UserModel.signInWithEmailAndPassword(email, password)
        .then((userData) => {
            saveUserData(userData);

            this.redirect('/home');

        }).catch(errorHandler);
};

