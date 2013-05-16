/*

James Black
VFW : 1305
Project 2

*/
window.addEventListener("DOMContentLoaded", function(){
   
// My get id function.
    function ge(x) {
         var elementId = document.getElementById(x);
         return elementId;
    }
         
// Make Select Field With js.
    function makeField() {
        var formTag = ge("form"), 
            selectLi = ge("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "area");
        for(var i=0, j=myTypeArray.length; i<j; i++){
            var makeOption = document.createElement("option");
            var optText = myTypeArray[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
// Show storage.
    function showData(){
        toggleControls("on");
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        ge("items").style.display = "block";
        for (var i=0, len=localStorage.length; i<len; i++) {
            var makeLi = document.createElement("li");
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSublist = document.createElement("ul");
            makeLi.appendChild(makeSublist);
            for (var n in obj) {
                var makeSubli = document.createElement("li");
                makeSublist.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
            }
        }
    }
           
// Toggle on/off function.        
    function toggleControls(n) {
        switch(n) {
            case "on":
                ge("choreForm").style.display = "none";
                ge("clearStorage").style.display = "inline";
                ge("displayData").style.display = "none";
                ge("addNewChore").style.display = "inline";
                break;
            case "off":
                ge("choreForm").style.display = "block";
                ge("clearStorage").style.display = "inline";
                ge("displayData").style.display = "inline";
                ge("addNewChore").style.display = "none";
                ge("items").style.display = "none";
                break;
            default:
            return false;
        }
    }

// Get radio answer function.         
        function getSelectedRadio() {
            var radios = document.forms[0].difficulty
            for(var i=0; i < radios.length; i++) {
                if (radios[i].checked) {
                     difficultyValue = radios[i].value;
               }
            }
        }
        
// Save data
        
        function saveData() {
        var id              = Math.floor(Math.random()*1000001);
        getSelectedRadio();
        var item            = {}
            item.chore      = ["Chore", ge("chore").value];
            item.area       = ["Chore Location", ge("area").value];
            item.difficulty = ["difficulty", difficultyValue];
            item.importance = ["importance", ge("importance").value];
            item.choreDate  = ["Chore Date", ge("choreDate").value];
            item.notes      = ["Notes", ge("notes").value];
            localStorage.setItem(id, JSON.stringify(item));
            alert("Chore Saved!");
    }

    
// Clear storage.
    var clearStorage = function() {
        if (localStorage.length === 0){
            alert("Storage is empty.");
    }   else {
            localStorage.clear();
            alert("All chores have been deleted!");
            window.location.reload();
            return false;
    }
    }
    
   
         
    
    
// My array for dropdown menu.
    var myTypeArray = ["--Choose A Location--", "laundry", "kitchen", "bathroom", "living room", "beddroom", "yard"],
        difficultyValue
        ;
    makeField();
    
// Set link & Submit.    
    var showStorage = ge("displayData");
    showStorage.addEventListener("click", showData);
    var clearStorageLink = ge("clearStorage");
    clearStorageLink.addEventListener("click", clearStorage);
    var saveButton     = ge("saveButton");
    saveButton.addEventListener("click", saveData);

    
});