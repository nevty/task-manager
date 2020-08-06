import authAPI from "./auth";
import firebase from "firebase";

const storageAPI = {
    async getTasks(boardId) {
        const board = JSON.parse(localStorage.getItem(boardId));
        return board && board.tasks;
    },
    createTask(data, boardId) {
        let board = JSON.parse(localStorage.getItem(boardId));
        data.id = generateId();
        if (!board.tasks) board.tasks = [];
        let newBoard = {...board, tasks: [...board.tasks, data]};
        localStorage.setItem(boardId, JSON.stringify(newBoard))
    },
    async getLists(boardId) {
        const board = JSON.parse(localStorage.getItem(boardId));
        return board && board.lists;
    },
    createList(data, boardId) {
        let board = JSON.parse(localStorage.getItem(boardId));
        if (board === null) board = {lists: []};
        data.id = generateId();
        let newBoard = {...board, lists: [...board.lists, data]};
        localStorage.setItem(boardId, JSON.stringify(newBoard))
    },
    async deleteList(boardId, id) {
        const board = JSON.parse(localStorage.getItem(boardId));
        const lists = board.lists;
        lists && lists.length > 1 ?
            localStorage.setItem(
                boardId,
                JSON.stringify({...board, lists: [...lists.filter(L => L.id !== id)]})
            )
            :
            localStorage.removeItem(boardId)
    },
    async getBoards() {
        return JSON.parse(localStorage.getItem('boards'))
    },
    async getBoardById(id) {
        const boards = JSON.parse(localStorage.getItem('boards'));
        if (boards && boards.length) return boards.find(d => d.id === id)
    },
    createBoard(data) {
        let boards = JSON.parse(localStorage.getItem('boards'));
        if (boards === null) boards = [];
        data.id = generateId();
        let newBoards = [...boards, data];
        localStorage.setItem('boards', JSON.stringify(newBoards))
    },
    async changeBoardTitle(boardId, title) {
        const boards = JSON.parse(localStorage.getItem('boards'));
        if (boards && boards.length) localStorage.setItem('boards', JSON.stringify(boards.map((d) => {
            if (d.id === boardId) d.title = title;
            return d
        })))
    },
    async deleteBoard(id) {
        const boards = JSON.parse(localStorage.getItem('boards'));
        if (boards && boards.length) localStorage.setItem('boards', JSON.stringify(boards.filter(d => d.id !== id)));
        localStorage.removeItem(id);
    }
};

export const firebaseAPI = {
    boardRef: () => firebase.database().ref(`/boards`),
    async getTasks(boardId) {
        return await this.boardRef()
            .child(boardId)
            .child('tasks')
            .once('value', snapshot => snapshot.val());
    },
    createTask(data, boardId) {
        const uid = authAPI.getUid();
        if (uid) {
            this.boardRef()
                .child(uid)
                .child(boardId)
                .child('tasks')
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
    async deleteList(boardId, id) {
        const uid = authAPI.getUid();
        if (uid) {
            return await this.boardRef()
                .child(uid)
                .child(boardId)
                .child('lists')
                .child(id)
                .remove();
        }
    },
    async getBoards() {
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
    async getBoardById(id) {
        const uid = authAPI.getUid();
        if (uid) {
            return await this.boardRef()
                .child(uid)
                .child(id)
                .once('value')
                .then(snapshot => snapshot.val())
        }
    },
    createBoard({title}) {
        const uid = authAPI.getUid();
        if (uid) {
            this.boardRef()
                .child(uid)
                .push({title})
        }
    },
    async deleteBoard(id) {
        const uid = authAPI.getUid();
        if (uid) {
            return await this.boardRef()
                .child(uid)
                .child(id)
                .remove();
        }
    },
    async changeBoardTitle(boardId, title) {
        const uid = authAPI.getUid();
        if (uid) {
            return await this.boardRef()
                .child(uid)
                .child(boardId)
                .set({title})
        }
    }
}

const generateId = () => {
    let S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + S4() + S4() + S4() + S4());
}

const dbAPI = () => authAPI.getUid() ? firebaseAPI : storageAPI;

export default dbAPI;