import authAPI from "./auth";
import firebase from "firebase";

const storageAPI = {
    async getTasks(boardId) {
        return JSON.parse(localStorage.getItem(boardId))
    },
    createTask(data, boardId) {
        let task = JSON.parse(localStorage.getItem(boardId));
        if (task === null) task = [];
        data.id = generateId();
        let newTask = [...task, data];
        localStorage.setItem(boardId, JSON.stringify(newTask))
    },
    async getLists(boardId) {
        return JSON.parse(localStorage.getItem(boardId))
    },
    createList(data, boardId) {
        let task = JSON.parse(localStorage.getItem(boardId));
        if (task === null) task = [];
        data.id = generateId();
        let newTask = [...task, data];
        localStorage.setItem(boardId, JSON.stringify(newTask))
    },
    async getDesks() {
        return JSON.parse(localStorage.getItem('desk'))
    },
    async getDeskById(id) {
        const desk = JSON.parse(localStorage.getItem('desk'));
        if (desk && desk.length) return desk.find(d => d.id === id)
    },
    createDesk(data) {
        let desk = JSON.parse(localStorage.getItem('desk'));
        if (desk === null) desk = [];
        data.id = generateId();
        let newDesk = [...desk, data];
        localStorage.setItem('desk', JSON.stringify(newDesk))
    },
    async deleteDesk(id) {
        const desk = JSON.parse(localStorage.getItem('desk'));
        if (desk && desk.length) localStorage.setItem('desk', JSON.stringify(desk.filter(d => d.id !== id)));
        localStorage.removeItem(id);
    }
};

export const firebaseAPI = {
    boardRef: () => firebase.database().ref(`/boards`),
    async getTasks(boardId) {
        return await this.boardRef()
            .child(boardId)
            .once('value', snapshot => snapshot.val());
    },
    createTask(data, boardId) {
        const uid = authAPI.getUid();
        if (uid) {
            this.boardRef()
                .child(uid)
                .child(boardId)
                .push(data)
        }
    },
    async getLists(boardId) {
        const uid = authAPI.getUid();
        if (uid) {
            return await this.boardRef()
                .child(uid)
                .child(boardId)
                .child('lists')
                .once('value')
                .then(snapshot => {
                    let res = [];
                    snapshot.forEach(child => {
                        const {title} = child.val();
                        const id = child.key;
                        res.push({title, id})
                    })
                    return res
                })
        }
    },
    createList(data, boardId) {
        const uid = authAPI.getUid();
        if (uid) {
            this.boardRef()
                .child(uid)
                .child(boardId)
                .child('lists')
                .push(data)
        }
    },
    async getDesks() {
        const uid = authAPI.getUid();
        if (uid) {
            return await this.boardRef()
                .child(uid)
                .once('value')
                .then(snapshot => {
                    let res = [];
                    snapshot.forEach(child => {
                        const {title} = child.val();
                        const id = child.key;
                        res.push({title, id})
                    })
                    return res
                })
        }
    },
    async getDeskById(id) {
        const uid = authAPI.getUid();
        if (uid) {
            return await this.boardRef()
                .child(uid)
                .child(id)
                .once('value')
                .then(snapshot => snapshot.val())
        }
    },
    createDesk({title}) {
        const uid = authAPI.getUid();
        if (uid) {
            this.boardRef()
                .child(uid)
                .push({title})
        }
    },
    async deleteDesk(id) {
        const uid = authAPI.getUid();
        if (uid) {
            return await this.boardRef()
                .child(uid)
                .child(id)
                .remove();
        }
    }
}

const generateId = () => {
    let S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + S4() + S4() + S4() + S4());
}

const db = () => authAPI.getUid() ? firebaseAPI : storageAPI;

export default db;