var firebaseConfig = {
    apiKey: "AIzaSyBi9O1mI7WpBh30pWMdP9gcfJI7jI4LUrg",
    authDomain: "kwitter-81f25.firebaseapp.com",
    databaseURL: "https://kwitter-81f25-default-rtdb.firebaseio.com",
    projectId: "kwitter-81f25",
    storageBucket: "kwitter-81f25.appspot.com",
    messagingSenderId: "354290113028",
    appId: "1:354290113028:web:2cb6caae3fa5d96620b351",
    measurementId: "G-EMX4TK5CNY"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

usersname = localStorage.getItem("user_name")

document.getElementById("user_name").innerHTML = "Welcome " + usersname +" the dude";

function addRoom(){
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    })
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";

}

function getData() { firebase.database().ref("/").on('value', function (snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;
   Room_names = childKey;
   console.log("Room Name - " + Room_names);
    row = "<div class = 'room_name' id = " +  Room_names + " onclick = 'redirectToRoomName(this.id)'>#" + Room_names +"</div><hr>";
    document.getElementById("output").innerHTML += row;
        });
    });
}

getData();

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location("kwitter_page.html");
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}