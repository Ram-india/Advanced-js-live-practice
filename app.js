let bucketList = JSON.parse(localStorage.getItem("bucketList")) || [];
let filterCategory = 'All';
let editIndex = null;

function addItem(){
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const targetDate = document.getElementById("target-date").value;

    if(description && category && targetDate){
        if(editIndex != null){
            //Update existing bucketlist
            bucketList[editIndex] = {
                description,
                category,
                targetDate,
                completed: bucketList[editIndex].completed,
            };
            editIndex = null;
        } else{
        
        //Add a new item
        bucketList.push({description, category, targetDate, completed:false});
        }
        localStorage.setItem("bucketList", JSON.stringify(bucketList));

        clearInputFields();
        updateUI();
    }
}
function clearInputFields(){
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("target-date").value = "";

}

function updateUI(){
    const bucketListContainer = document.getElementById("bucket-list");
    bucketListContainer.innerHTML = "";
    let completedCount = 0;

    const filterdList = filterCategory === "All" ? bucketList : bucketList.filter(function(item){
        return item.category === filterCategory;
    })

    filterdList.forEach(function (item, index){
        const itemElement = document.createElement("li");
        itemElement.classList =
          "p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50";
        itemElement.innerHTML =
          "<div> <p class='font-semibold'>" +
          item.description +
          "</p>" +
          "<p class='text-sm text-gray-600'>" +
          item.category +
          "- Target: " +
          item.targetDate +
          "</p></div><div>" +
          "<button onclick='editItem(" +
          index +
          ")' class='px-2 py-1 bg-yellow-500 text-white rounded'" +
          ">Edit</button>" +
          "<button onclick='toggleCompletion(" +
          index +
          ")' class='mr-2 px-2 py-1 rounded " +
          (item.completed
            ? "bg-green-500 text-white" + "'>"
            : "bg-red-500 text-white" + "'>") +
          (item.completed ? "Achieved" + "</button>" : "Pending" + "</button>") +
          "<button onclick='deleteItem(" +
          index +
          ")' class='px-2 py-1 bg-red-500 text-white rounded'" +
          ">Delete</button></div>";
            
          if(item.completed){
            completedCount++;
          }
       
        bucketListContainer.appendChild(itemElement);
    });

    // UPDATE PROGRESS
    const progressPercentage = (completedCount / bucketList.length) * 100 || 0;
    document.getElementById("progress-bar").style.width = progressPercentage + "%";
    document.getElementById("completed-count").innerHTML = completedCount;
    document.getElementById("total-count").innerText = bucketList.length;
    

}
 function toggleCompletion(index){
     bucketList[index].completed = !bucketList[index].completed;
     localStorage.setItem("bucketList", JSON.stringify(bucketList));
     updateUI();
 }
 function deleteItem(index){
    bucketList.splice(index, 1);
    localStorage.setItem("bucketList", JSON.stringify(bucketList));
    updateUI();
 }
 function filterItems (category){
    filterCategory = category;
    updateUI();
 }
 function editItem(index){

    document.getElementById("description").value = bucketList[index].description;
    document.getElementById("category").value = bucketList[index].category;
    document.getElementById("target-date").value = bucketList[index].targetDate;
    editIndex = index;

 }
updateUI();