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
roomname = localStorage.getItem("room_name")

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomname).push({
        name:usersname,
        message:msg,
        like:0
    })
    document.getElementById("msg").value = "";
}

function updateLike(message_id){
    console.log("clicked on button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updatedlikes = Number(likes) +1;
    console.log(updatedlikes);

    firebase.database().ref(roomname).child(message_id).update({
        like:updatedlikes
    })
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose"){ 
              firebase_message_id = childKey;
                message_data = childData;

              console.log(firebase_message_id);
             console.log(message_data);
              name_1 = message_data['name'];
              message = message_data['message'];
              like = message_data['like'];
                console.log(message_data['name']);
              console.log(message);
               console.log(like);
 //              name_with_tag = "<h4>" + name_1 + "<img class = 'user_tick' src = 'tick.png'></h4>";
   //            message_with_tag = "<h4 class = 'message_h4>" + message + "</h4>";
     //           like_button = "<button class = 'btn btn-warning' id=" + firebase_message_id + " value =" + like + "onclick = 'updateLike(this.id)'";
       //         span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like:" + like + "</span></button><hr>";

               // row  = name_with_tag + message_with_tag + like_button + span_with_tag;
                row = "<h4> "+ name_1 +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";       
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();


function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
