import idb from "./vendor/idb.js";

const dbPromised = idb.open("football-data", 1, upgradeDb => {
    const teamObjS = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamObjS.createIndex("name", "name", {
        unique: false
    });
});

const saveForLater = team => {
    dbPromised
        .then(db => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.put(team);
            return tx.complete;
        })
        .then(() => {
            M.toast({html: 'Tim ini telah ditambahkan kedalam list favorit anda!'})
        })
}
const deleteFromSave = team => {
    dbPromised
        .then(db => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.delete(team.id);
            return tx.complete;
        })
        .then(() => {
            M.toast({html: 'Tim ini telah dihapus dari list favorit anda!'})
        })
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(teams => {
                resolve(teams);
            })
    });
}

const getById = id => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(db => {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.get(id);
            })
            .then(team => {
                resolve(team);
            })
    });
}

export { saveForLater, deleteFromSave, getAll, getById };