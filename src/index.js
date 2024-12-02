import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.css";


const displayController = (function(){

})();

const container = document.getElementById("container");
const sidebar = document.getElementById("sidebar");
const collapse = document.getElementById("collapse");
const collapsetwo = document.getElementById("collapsetwo");
const expand = document.getElementById("expand"),
    bars = document.querySelectorAll(".bar"),
    h2Arr = document.querySelectorAll(".bar > h2"),
    add = document.querySelector("#add"),
    dialog = document.getElementById("dialog"),
    dialogs = document.getElementsByTagName("dialog"),
    cproject = document.querySelector("#project"),
    crCasual = document.querySelector("#casual"),
    projects = document.querySelectorAll(".project"),
    exdeets = document.querySelectorAll(".ex-deets"),
    taskForm = document.querySelector("#task-form");



collapse.addEventListener("click", () => {
    container.classList.add("collapse");
    collapse.classList.add("collapse");
    sidebar.classList.add("collapse");
    expand.style.display = "block";
    bars.forEach(bar => {
        bar.classList.add("collapse");
    });

    h2Arr.forEach(h2 => {
        h2.classList.add("collapse");
    });

    
})

expand.addEventListener("click", () => {
    container.classList.remove("collapse");
    collapse.classList.remove("collapse");
    sidebar.classList.remove("collapse");
    expand.style.display = "none";

    bars.forEach((bar) => {
      bar.classList.remove("collapse");
    });

    h2Arr.forEach((h2) => {
      h2.classList.remove("collapse");
    });
})

let toggle = true;
add.addEventListener("click", () => {
    if(toggle){
        setTimeout(() => {
            dialog.show();
        }, 1000);
        document.body.querySelector(".overlay").classList.add("active");
        add.querySelector("i:first-child").style.display = "none";
        add.querySelector("i:nth-child(2)").style.display = "block";
    }else{
        Array.from(dialogs).forEach(dialog => {
            dialog.close();
        });
        document.body.querySelector(".overlay").classList.remove("active");
        add.querySelector("i:first-child").style.display = "block";
        add.querySelector("i:nth-child(2)").style.display = "none";
    }

    toggle = !toggle;
});

cproject.addEventListener("click", () => {
    Array.from(dialogs).forEach((dialog) => {
      dialog.close();
    });

    document.querySelector("#p-form").show();
});

crCasual.addEventListener("click", () => {
    Array.from(dialogs).forEach((dialog) => {
      dialog.close();
    });

    document.querySelector("#c-form").show();
});


projects.forEach(project => {
    project.addEventListener("click", () => {
        projects.forEach(prj => {
            prj.classList.remove("maximize");
        });

        project.classList.add("maximize");
        exdeets[0].classList.add("active");
    });
});


const addTask = document.getElementById("add-task");

let taskToggle = true;
addTask.addEventListener("click", () => {
    console.log("back button clicked");

    if (taskToggle) {
      setTimeout(() => {
        taskForm.show();
      }, 1000);
      
      document.body.querySelector(".overlay").classList.add("active");
      addTask.querySelector("i:first-child").style.display = "none";
      addTask.querySelector("i:nth-child(2)").style.display = "block";
    } else {
      taskForm.close();
      document.body.querySelector(".overlay").classList.remove("active");
      addTask.querySelector("i:first-child").style.display = "block";
      addTask.querySelector("i:nth-child(2)").style.display = "none";
    }

    taskToggle = !taskToggle;
    
});

collapsetwo.addEventListener("click", (event) => {
    event.stopPropagation();
    exdeets[0].classList.remove("active");
    projects[0].classList.remove("maximize");
});



// const factory = (function(){
//     const projectArr = [];
//     function project(name, date, heading, brief, lists){
//         this.name = name;
//         this.date = date;
//         this.heading = heading;
//         this.brief = brief;
//         this.lists = lists;
//     }
// });

const updateEngine = (function(){
    
});

const appEngine = (function(){


});

