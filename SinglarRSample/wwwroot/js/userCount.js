
//create connection
var connectionUserCount = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/userCount",signalR.HttpTransportType.WebSockets).build();

//connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})

//invoke hub methods aka send notifications to hub
function newWindowLoadedOnClient() {
    connectionUserCount.invoke("NewWindowLoaded","Hasan").then((value) => console.log(value));
}

//start connection
function fulfilled() {
    //do something to start
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}
function rejected() {
    //rejected logs
}
connectionUserCount.start().then(fulfilled,rejected);