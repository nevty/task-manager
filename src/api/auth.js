import firebase from "firebase/app";
const authAPI = {
    async login(email,password) {
        try{
          await firebase.auth().signInWithEmailAndPassword(email,password)
        } catch (e) {
            throw e
        }
    },
    logout(){
      try{
          firebase.auth().signOut()
      } catch (e) {
        throw e
      }
    },
    async register(name,email,password) {
        try{
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            const uid = this.getUid();
            await firebase.database().ref(`/users/${uid}/info`).set({
                name
            })
        } catch (e) {
            throw e
        }
    },
    getUid(){
        const user = firebase.auth().currentUser;
        return user ? user.uid : null
    },
}

export default authAPI