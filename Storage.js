//console.log(screen.height);
document.querySelector("div[role='main']").style.height = "" + (screen.height - 74) + "px";

var d = new Date();
document.getElementById("datum").innerHTML = d;

function addsor (szoveg) {
  var li = document.createElement("li");
  li.innerHTML = "" + szoveg;
  document.getElementById("txts").appendChild(li);
}

var IDBFactory_db = window.indexedDB;
var IDBOpenDBRequest_req = IDBFactory_db.open ("Adatbazis_Tar", 1);

IDBOpenDBRequest_req.onupgradeneeded = function (evt) {
    var IDBDatabase_db = evt.currentTarget.result;
    
    var IDBObjectStore_os = IDBDatabase_db.createObjectStore ("Hozzaszolasok", {keyPath: "Id", autoIncrement: true});
    
    var IDBIndex_idx1 = IDBObjectStore_os.createIndex ("Id", "Id", {unique: true});
    
};


IDBOpenDBRequest_req.onsuccess = function () {
  var IDBDatabase_db = this.result;
  
  var IDBTransaction_trans = IDBDatabase_db.transaction ("Hozzaszolasok", "readonly");
    
  IDBTransaction_trans.oncomplete = function () {
      IDBDatabase_db.close ();
  };
  
  var IDBObjectStore_oswt = IDBTransaction_trans.objectStore ("Hozzaszolasok");
  
  var IDBRequest_Kreq1 = IDBObjectStore_oswt.openCursor ();
  IDBRequest_Kreq1.onsuccess = function (evt) {
    var IDBCursorWithValue_cursor = evt.target.result;
    
    if (IDBCursorWithValue_cursor) {
      addsor ("" + IDBCursorWithValue_cursor.value.Id + "." + " Étel: " + IDBCursorWithValue_cursor.value.Szoveg);
      IDBCursorWithValue_cursor.continue ();
    }
    
    else {
      console.log ("Végetért a kiírás :-)");
    }
    
  };
  
  IDBRequest_Kreq1.onerror = function () {
   console.log ("Hiba a kurzor megnyitásakor!");
  };
  
};

function addTxt() {
  var IDBFactory_db = window.indexedDB;
  
  var IDBOpenDBRequest_req = IDBFactory_db.open ("Adatbazis_Tar", 1);
  
  IDBOpenDBRequest_req.onsuccess = function () {
    var IDBDatabase_db = this.result;
    var IDBTransaction_trans = IDBDatabase_db.transaction ("Hozzaszolasok", "readwrite");
    
    IDBTransaction_trans.oncomplete = function () {
      addsor(document.getElementById("txt").value + " " + "Gramm:" + " " +  document.getElementById("txt1").value + " " +  " Kalória:" + " " + document.getElementById("txt2").value);
      IDBDatabase_db.close ();
    };
    
    var IDBObjectStore_oswt = IDBTransaction_trans.objectStore ("Hozzaszolasok");
   
    var hozzaszolas = {Szoveg: document.getElementById("txt").value + " " + "Gramm:" + " " +  document.getElementById("txt1").value + " " + "Kalória:" + " " + document.getElementById("txt2").value};
    
    var IDBRequest_req = IDBObjectStore_oswt.add (hozzaszolas);
    IDBRequest_req.onsuccess = function () {
      console.log ("Sikerült a hozzászólás hozzáadása: Hozzászólás szövege: " + hozzaszolas.Szoveg);
    };
    
    IDBRequest_req.onerror = function () {
      console.log ("Hiba történt a hozzászólás létrehozásakor!");
    };
    
    
  };
  
  IDBOpenDBRequest_req.onerror = function () {
    console.log ("Hiba történt az Adatbázis megnyitásakor!");
  };
}


document.getElementById("action").addEventListener("click", addTxt);