import "./styles.css";
import { format } from "date-fns";
import "@fortawesome/fontawesome-free/css/all.css";


const prBtn = document.getElementById("prBtn");
const caBtn = document.getElementById("caBtn"); 

const displayController = (function(){
    const container = document.getElementById("container");
    const sidebar = document.getElementById("sidebar");
    const collapse = document.getElementById("collapse");
    const collapsetwo = document.querySelectorAll(".ex-heading > i:first-child");
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
      deets = document.querySelectorAll(".deets"),
      taskForm = document.querySelector("#task-form");


      collapse.addEventListener("click", () => {
          container.classList.add("collapse");
          collapse.classList.add("collapse");
          sidebar.classList.add("collapse");
          expand.style.display = "block";
          bars.forEach((bar) => {
            bar.classList.add("collapse");
          });

          h2Arr.forEach((h2) => {
            h2.classList.add("collapse");
          });
     });

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
    });


    let toggle = true;
    add.addEventListener("click", () => {
      if (toggle) {
        setTimeout(() => {
          dialog.show();
        }, 1000);
        document.body.querySelector(".overlay").classList.add("active");
        add.querySelector("i:first-child").style.display = "none";
        add.querySelector("i:nth-child(2)").style.display = "block";
      } else {
        Array.from(dialogs).forEach((dialog) => {
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


    projects.forEach((project, index) => {
      project.addEventListener("click", () => {
        projects.forEach((prj) => {
          prj.classList.remove("maximize");
        });
        
        // Call editBtns function to update the details on the screen
        editBtns(project);
        updateEngine.saveButtons(project);
        deets[index].classList.add("close");
        project.classList.add("maximize");
        exdeets[index].classList.add("active");
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

    collapsetwo.forEach((collapse, index) => {
        collapse.addEventListener("click", (event) => {
            event.stopPropagation();
            exdeets[index].classList.remove("active");
            projects[index].classList.remove("maximize");
            deets[index].classList.remove("close");
        });
    });


    function editBtns(parent){
        let pencils = parent.querySelectorAll(".arr i:last-of-type");
        let exlist = parent.querySelectorAll(".ex-list");
        let parDialogs = parent.querySelectorAll(".ex-list dialog");
        const closepencils = parent.querySelectorAll(".pencil .task-heading i");


        pencils.forEach((pencil, index) => {
          pencil.addEventListener("click", () => {
            parDialogs.forEach((pDialog) => {
              pDialog.close();
            });

            let taskName =  exlist[index].querySelector("li > label > span").textContent;
            let taskPriority =  exlist[index].querySelector(".priority").textContent;
            let taskTime =  exlist[index].querySelector(".time-created").textContent;
            const values = [taskName, taskPriority, taskTime];
            const inputs = parDialogs[index].querySelectorAll('input[type="text"], input[type="number"], input.rem');

            for (let i = 0; i < inputs.length; i++) {
              inputs[i].value = values[i];
            }

            parDialogs[index].show();
          });
        });

        closepencils.forEach((cpencil, index) => {
          cpencil.addEventListener("click", () => {
            parDialogs[index].close();
          });
        });
    }
    
    return { editBtns };
    
})();




const factory = (function(){
    const parent = document.querySelector(".projects");
    const projectArr = [];
    const listArr = [];
    function project(name, date, heading, brief, lists){
        this.name = name;
        this.date = date;
        this.heading = heading;
        this.brief = brief;
        this.lists = lists;
    }

    function list(name, priority, reminder){
        this.name = name;
        this.priority = priority;
        this.reminder = reminder;
    }

    function createProject(name, date, heading, brief, lists){
        let obj = new project(name, date, heading, brief, lists);
        projectArr.push(obj);
    }

    function addClick(element) {
      let prjs = document.querySelectorAll(".project");
      let prDeets = element.querySelector(".ex-deets");
      let prDeet = element.querySelector(".deets");
      let collapse = element.querySelector(".ex-heading > i:first-child");
      element.addEventListener("click", () => {
        prjs.forEach((prj) => {
          prj.classList.remove("maximize");
        });

        // Call editBtns function to update the details on the screen
        displayController.editBtns(element);
        updateEngine.saveButtons(element);
        prDeet.classList.add("close");
        element.classList.add("maximize");
        prDeets.classList.add("active");
      });

      collapse.addEventListener("click", (event) => {
          event.stopPropagation();
          prDeets.classList.remove("active");
          element.classList.remove("maximize");
          prDeet.classList.remove("close");
      })
    }

    function projectEngine(){
      let proj = document.querySelector(".projects .project:last-of-type");
      let clone  = proj.cloneNode(true);
      let h2 = clone.querySelector(".ex-heading h2");
      let titleTime = clone.querySelector(".ex-heading .title p");
      let h3 = clone.querySelector(".deets > h3");
      let prtime = clone.querySelector(".pr-time");
      const date = new Date();
      const formattedDate = format(date, "hh:mm a, MMM d, yyyy");
      const timeArr = [titleTime, prtime];

      for(let i = 0; i < timeArr.length; i++){
        timeArr[i].textContent = formattedDate;
      }
      
      h2.textContent = "Title";
      h2.style.opacity = "0.3";
      h3.textContent = "Title";
      let lastIndex = document.querySelectorAll(".project").length - 1;

      proj.insertAdjacentElement('afterend', clone);
      addClick(clone);
    }

    function casualEngine(){
        let cas = document.querySelector(".casuals .casual:last-of-type");
        let clone  = cas.cloneNode(true);

        cas.insertAdjacentElement('afterend', clone);
    }

    function listEngine(){
      let prototype = document.querySelector(".ex-lists .ex-list:first-of-type");
      let last = document.querySelector(".ex-lists .ex-list:last-of-type");
      let exClone = prototype.cloneNode(true);
      let ex = prototype.parentElement.parentElement;
      let exdialog = ex.children[ex.children.length -1 ];

      let exInputs = exdialog.querySelectorAll('input[type="text"], input[type="number"], input.rem');
      let exName = exClone.querySelector("li label span");
      let exPriority = exClone.querySelector(".priority");
      let exRem = exClone.querySelector(".time-created");
      let vals = [exName, exPriority, exRem];

      for(let i = 0; i < exInputs.length; i++){
        vals[i].textContent = exInputs[i].value;
      }

      last.insertAdjacentElement("afterend", exClone);
    }

    function createlist(name, priority, reminder){
        let obj = new list(name, priority, reminder);
        projectArr.push(obj);
    }

    return{ createProject, createlist, projectEngine, casualEngine, listEngine };
})();

const updateEngine = (function(){
    let newTask = document.querySelectorAll(".ex-lists > dialog button");
    let deleteTask = document.querySelectorAll(".arr .fa-trash-alt");
    let deleteProject = document.querySelectorAll(".dts .fa-trash-alt");
    let myform = document.querySelectorAll("form");
    myform.forEach(form => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("form is being submitted");
    })
  })
      

    prBtn.addEventListener("click", () => {
      factory.projectEngine();
    });

    caBtn.addEventListener("click", () => {
      factory.casualEngine();
    });

    newTask.forEach(newt => {
      newt.addEventListener("click", () => {
        factory.listEngine();
      });
    });

    deleteTask.forEach(del =>{
      let parEx = del.closest(".ex-list");
      del.addEventListener("click", () => {
        parEx.classList.add("delete");
        setTimeout(() => {
          parEx.remove();
        }, 2000);
      });
    });

    deleteProject.forEach(pro => {
      let parPro = pro.closest(".project");
      pro.addEventListener("click", (event) => {
        event.stopPropagation();
        parPro.classList.add("delete");
        setTimeout(() => {
          parPro.remove();
        }, 2000);
      })
    })

    function saveButtons(par){
      const saveBtns = par.querySelectorAll(".pencil form .inputbox button");

      saveBtns.forEach((save, index) => {
        save.addEventListener("click", () => {
            let prj = document.querySelector(".project.maximize");
            let savDialogs = prj.querySelectorAll(".ex-list dialog");
            const exlist = prj.querySelectorAll(".ex-list");
            console.log(exlist);
  
            let tname = exlist[index].querySelector("li > label > span");
            let tpriority = exlist[index].querySelector(".priority");
            let tTime = exlist[index].querySelector(".time-created");
            const values = [tname, tpriority, tTime];
            const inputs = savDialogs[index].querySelectorAll('input[type="text"], input[type="number"], input.rem');
  
            for(let i = 0; i < inputs.length; i++){
              values[i].textContent = inputs[i].value;
            }
  
            savDialogs[index].close();
        });
      });
    }


    return { saveButtons };
})();

const appEngine = (function(){
    // const linames = document.querySelectorAll(".ex-list li label");
    // const liPriority = document.querySelectorAll(".ex-list .arrows .clock .priority");
    // const liTime = document.querySelectorAll(".ex-list .arrows .clock .time-created");
    
    // for(let i = 0; i < 5; i++){
    //     let listObj = factory.createlist(linames[i].textContent, liPriority[i].textContent, liTime[i].textContent);
    //     factory.listArr.push(listObj);
    // }



})();

