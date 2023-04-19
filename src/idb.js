// indexeddb.js

const dbName = "notes-db";
const dbVersion = 1;

export function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore("notes", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("updated", "updated", { unique: false });
    };

    request.onerror = () => {
      reject(Error("Failed to open database"));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

export function getNoteById(id) {
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const transaction = db.transaction(["notes"], "readwrite");
      const objectStore = transaction.objectStore("notes");

      const request = objectStore.get(id);

      request.onerror = () => {
        reject(Error("Failed to save note"));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  });
}
export  function addOrUpdateRecord(note) {
  // Open a transaction on the object store with read/write access
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const transaction = db.transaction(["notes"], "readwrite");
      const objectStore = transaction.objectStore("notes");

      // const request = objectStore.add(note);
      const request = objectStore.get(note.id);
      request.onerror = () => {
        reject(Error("Failed to save note"));
      };

      request.onsuccess = () => {
        const existingRecord = request.result;
        console.log('exiexistingRecord',existingRecord)
        if (existingRecord) {
          // Update the existing record
          updateNote(note).then(resolve).catch(reject)
        } else {
          // Add a new record
          const {id,...obj} = note;
          console.debug(id)
          saveNote(obj).then(resolve).catch(reject)
        }
        resolve(request.result);
      };
    });
  });
}

export function saveNote(note) {
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const transaction = db.transaction(["notes"], "readwrite");
      const objectStore = transaction.objectStore("notes");

      const request = objectStore.add(note);

      request.onerror = () => {
        reject(Error("Failed to save note"));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  });
}
export function updateNote(note) {
    return new Promise((resolve, reject) => {
      openDb().then((db) => {
        const transaction = db.transaction(["notes"], "readwrite");
        const objectStore = transaction.objectStore("notes");
  
        const request = objectStore.put(note);
  
        request.onerror = () => {
          reject(Error("Failed to save note"));
        };
  
        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    });
  }
export function getAllNotes() {
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const transaction = db.transaction(["notes"], "readonly");
      const objectStore = transaction.objectStore("notes");
      const request = objectStore.getAll();

      request.onerror = () => {
        reject(Error("Failed to get notes"));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  });
}

export function deleteNote(id) {
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const transaction = db.transaction(["notes"], "readwrite");
      const objectStore = transaction.objectStore("notes");

      const request = objectStore.delete(id);

      request.onerror = () => {
        reject(Error("Failed to delete note"));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  });
}
