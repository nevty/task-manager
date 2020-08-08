import firebase from "firebase/app";
import {provider} from "../firebaseConfig";

const authAPI = {
    async login(email, password) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
            throw e
        }
    },
    logout() {
        try {
            firebase.auth().signOut()
        } catch (e) {
            throw e
        }
    },
    async register(name, email, password) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            const uid = this.getUid();
            await firebase.database().ref(`/users/${uid}/info`).set({
                name,
                picture: ''
            })
        } catch (e) {
            throw e
        }
    },
    async loginWithPopUp(method) {
        switch (method) {
            case "google": {
                return await firebase.auth().signInWithPopup(provider)
                    .then(({additionalUserInfo}) => {
                        if (additionalUserInfo && additionalUserInfo.isNewUser) {
                            const uid = this.getUid();
                            firebase.database().ref(`/users/${uid}/info`).set({
                                name: additionalUserInfo.profile.given_name,
                                picture: additionalUserInfo.profile.picture
                            })
                        }
                        return {result: true}
                    })
                    .catch(e=>({result: false}))
            }
        }

    },
    getUid() {
        const user = firebase.auth().currentUser;
        return user ? user.uid : null
    },
}

export default authAPI