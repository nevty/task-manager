export const storageAPI = {
    getTasks(boardId) {
        return JSON.parse(localStorage.getItem(boardId))
    },
    createTask(data,boardId) {
        let task = JSON.parse(localStorage.getItem(boardId));
        if (task === null) task = [];
        data.id = generateId();
        let newTask = [...task, data];
        localStorage.setItem(boardId, JSON.stringify(newTask))
    },
    getLists(boardId) {
        return JSON.parse(localStorage.getItem(boardId))
    },
    createList(data,boardId) {
        let task = JSON.parse(localStorage.getItem(boardId));
        if (task === null) task = [];
        data.id = generateId();
        let newTask = [...task, data];
        localStorage.setItem(boardId, JSON.stringify(newTask))
    },
    getDesks() {
        return JSON.parse(localStorage.getItem('desk'))
    },
    getDeskById(id){
        const desk = JSON.parse(localStorage.getItem('desk'));
        if (desk && desk.length) return desk.find(d=>d.id === id)
    },
    createDesk(data) {
        let desk = JSON.parse(localStorage.getItem('desk'));
        if (desk === null) desk = [];
        data.id = generateId();
        let newDesk = [...desk, data];
        localStorage.setItem('desk', JSON.stringify(newDesk))
    }
}

const generateId = () => {
    let S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + S4() + S4() + S4() + S4());
}