import "./styles.css";
import { format } from "date-fns";
import "@fortawesome/fontawesome-free/css/all.css";


const prBtn = document.getElementById("prBtn");
const caBtn = document.getElementById("caBtn"); 

// Display contoller: adds color changing functionality, handles expand & collapse events, adds event listeners to projects.
const displayController = (function(){
  const body = document.body;
  const container = document.getElementById("container");
  const sidebar = document.getElementById("sidebar");
  const collapse = document.getElementById("collapse");
  const collapsetwo = document.querySelectorAll(".ex-heading > i:first-child");
  const expand = document.getElementById("expand"),
    bars = document.querySelectorAll(".bar"),
    h2Arr = document.querySelectorAll(".bar > h2"),
    add = document.getElementById("add"),
    addTasks = document.querySelectorAll(".ex-lists > button"),
    taskDialog = document.querySelectorAll(".ex-lists > dialog"),
    dialog = document.getElementById("dialog"),
    dialogs = document.getElementsByTagName("dialog"),
    cproject = document.querySelector("#project"),
    crCasual = document.querySelector("#casual"),
    projects = document.querySelectorAll(".project"),
    exdeets = document.querySelectorAll(".ex-deets"),
    deets = document.querySelectorAll(".deets"),
    taskForm = document.querySelector("#task-form");

  const header = document.querySelector(".icons-bar.two");
  const dots = document.querySelectorAll(".dot");
  const brs = document.querySelectorAll(".bar >*");
  const exBrief = document.querySelectorAll(".ex-brief");
  const titleH2 = document.querySelectorAll(".title > h2");
  const exlistH2 = document.querySelectorAll(".ex-lists > h2");
  const barH2 = document.querySelectorAll(".bar > h2");
  const colorArr = ["#ffcfd2", "#8eecf5", "#d9ed92", "#76c893", "#e2ece9", "#ade8f4", "#ecf8f8", "#fec5bb", "#ffe5d9", "#d8f3dc", "#b7e4c7"];

  function setColors(){
    let index = Math.floor(Math.random() * colorArr.length);
    let clr = colorArr[index];

    body.style.background = `linear-gradient( #fff 35%, ${clr} 100%)`;
    header.style.background = clr;

    dots.forEach((dot) => {
      dot.style.background = clr;
    });

    exBrief.forEach((exb) => {
      exb.style.background = clr;
    });


    brs.forEach((br) => {
      br.style.color = clr;
    });

    bars.forEach((bar) => {
      bar.style.color = clr;
    });

    titleH2.forEach((h2) => {
      h2.style.color = clr;
    });

    exlistH2.forEach((exh2) => {
      exh2.style.color = clr;
    });

    barH2.forEach(bh2 => {
      bh2.style.setProperty('--bg', clr);
    })

  }

  setInterval(setColors, 7000);

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

  let addToggle = true;

  add.addEventListener("click", () => {
    if (addToggle) {
      setTimeout(() => {
        dialog.show();
      }, 2000);
      document.querySelector(".overlay").classList.add("active");
      changeBtn();
    } else {
      setTimeout(() => {
        dialog.close();
      }, 200);
      document.querySelector(".overlay").classList.remove("active");
      changeBtn(1);
    }

    addToggle = !addToggle;
  });

  let toggle = true;
  addTasks.forEach((elem, index) => {
    let dt = elem.closest(".ex-deets");
    let over = dt.previousElementSibling.previousElementSibling;
    elem.addEventListener("click", () => {
      if (toggle) {
        setTimeout(() => {
          taskDialog[index].show();
        }, 1000);
        over.classList.add("active");
        elem.querySelector("i:first-child").style.display = "none";
        elem.querySelector("i:nth-child(2)").style.display = "block";
      } else {
        Array.from(dialogs).forEach((dialog) => {
          dialog.close();
        });
        over.classList.remove("active");
        elem.querySelector("i:first-child").style.display = "block";
        elem.querySelector("i:nth-child(2)").style.display = "none";
      }

      toggle = !toggle;
    });
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


  function changeBtn(def = 0) {
    if (def === 1) {
      add.querySelector("i:first-child").style.display = "block";
      add.querySelector("i:nth-child(2)").style.display = "none";
    } else {
      add.querySelector("i:first-child").style.display = "none";
      add.querySelector("i:nth-child(2)").style.display = "block";
    }
  }

  function editBtns(parent) {
    let pencils = parent.querySelectorAll(".arr i:last-of-type");
    let exlist = parent.querySelectorAll(".ex-list");
    let parDialogs = parent.querySelectorAll(".ex-list dialog");
    let checks = parent.querySelectorAll(".ex-list input[type='checkbox']");
    let hrs = parent.querySelectorAll(".ex-list > hr");
    const closepencils = parent.querySelectorAll(".pencil .task-heading i");

    pencils.forEach((pencil, index) => {
      pencil.addEventListener("click", () => {
        parDialogs.forEach((pDialog) => {
          pDialog.close();
        });

        let taskName =
          exlist[index].querySelector("li > label > span").textContent;
        let taskPriority = exlist[index].querySelector(".priority").textContent;
        let taskTime = exlist[index].querySelector(".time-created").textContent;
        const values = [taskName, taskPriority, taskTime];
        const inputs = parDialogs[index].querySelectorAll(
          'input[type="text"], input[type="number"], input.rem'
        );

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

    checks.forEach((check, index) => {
      check.addEventListener("change", (event) => {
        if (event.target.checked) {
          hrs[index].classList.add("active");
        } else {
          hrs[index].classList.remove("active");
        }
      });

    });
  }

  return { editBtns, changeBtn, setColors };
})();




const factory = (function(){
    const parent = document.querySelector(".projects");

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

    function projectEngine(text){
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
      
      h2.textContent = text;
      h3.textContent = text;
      let lastIndex = document.querySelectorAll(".project").length - 1;
      
      updateEngine.addEvents(clone);
      addClick(clone);
      proj.insertAdjacentElement('afterend', clone);
    }

    function casualEngine(){
        let cas = document.querySelector(".casuals .casual:last-of-type");
        let clone  = cas.cloneNode(true);

        cas.insertAdjacentElement('afterend', clone);
    }

    function listEngine(parent){
      let prototype = parent.querySelector(".ex-list:first-of-type");
      let last = parent.querySelector(".ex-list:last-of-type");
      let exClone = prototype.cloneNode(true);
      let delTask = exClone.querySelector(".arr .fa-trash-alt");
      let exdialog = parent.children[parent.children.length -1];  

      let exInputs = exdialog.querySelectorAll('input[type="text"], input[type="number"], input.rem');
      let exName = exClone.querySelector("li label span");
      let exPriority = exClone.querySelector(".priority");
      let exRem = exClone.querySelector(".time-created");
      let vals = [exName, exPriority, exRem];

      for(let i = 0; i < exInputs.length; i++){
        vals[i].textContent = exInputs[i].value;
      }

      delTask.addEventListener("click", () => {
        let elem = delTask.closest(".ex-list");
        elem.classList.add("delete");
        setTimeout(() => {
          elem.remove();
        }, 2000);
      });


      last.insertAdjacentElement("afterend", exClone);
      console.log(exClone.closest(".project"));
    }

    return{ projectEngine, casualEngine, listEngine, addClick };
})();

const updateEngine = (function(){
    let newTask = document.querySelectorAll(".ex-lists > dialog button");
    let deleteTask = document.querySelectorAll(".arr .fa-trash-alt");
    let deleteProject = document.querySelectorAll(".dts .fa-trash-alt");
    let myform = document.querySelectorAll("form");

    myform.forEach(form => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    })
  })
      

    prBtn.addEventListener("click", () => {
      let pForm = document.querySelector("#p-form");
      let text = pForm.querySelector("input[type='text']");
      factory.projectEngine(text.value);
      pForm.close();
      document.querySelector(".overlay").classList.remove("active");
      displayController.changeBtn(1);
    });

    caBtn.addEventListener("click", () => {
      factory.casualEngine();
      document.querySelector("#c-form").close();
      document.querySelector(".overlay").classList.remove("active");
      displayController.changeBtn(1);
    });

    newTask.forEach(newt => {
      let npar = newt.closest(".ex-lists");
      newt.addEventListener("click", () => {
      factory.listEngine(npar);
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
    
    function addEvents(element){
        let deleteP = element.querySelector(".dts .fa-trash-alt");
        let newBtns = document.querySelectorAll(".ex-lists > dialog button");
        let el = element.querySelector(".ex-list");
        let dels = element.querySelectorAll(".arr .fa-trash-alt");
        dels.forEach(del => {
          del.addEventListener("click", () => {
            el.classList.add("delete");
            setTimeout(() => {
              el.remove();
            }, 2000);
          });
        });

        let evForms = element.querySelectorAll("form");
        console.log(evForms);
        let toggle = true;
        let over = element.querySelector(".overlay");
        let taskBtn = element.querySelector(".ex-lists > button");
        console.log(taskBtn);
        let dg = element.querySelector(".ex-lists > dialog");

        evForms.forEach(ev => {
          ev.addEventListener("submit", (event) => {
            event.preventDefault();
          });
        });

        taskBtn.addEventListener("click", () => {
          if (toggle) {
            setTimeout(() => {
              dg.show();
            }, 1000);
            over.classList.add("active");
            taskBtn.querySelector("i:first-child").style.display = "none";
            taskBtn.querySelector("i:nth-child(2)").style.display = "block";
          } else {
            dg.close();
            over.classList.remove("active");
            taskBtn.querySelector("i:first-child").style.display = "block";
            taskBtn.querySelector("i:nth-child(2)").style.display = "none";
          }

          toggle = !toggle;
        });

        newBtns.forEach((newb) => {
          let nbtn = newb.closest(".ex-lists");
          newb.addEventListener("click", () => {
            factory.listEngine(nbtn);
          });
        });

        deleteP.addEventListener("click", (event) => {
          event.stopPropagation();
          let target = deleteP.closest(".project");
          target.classList.add("delete");
          setTimeout(() => {
            target.remove();
          }, 2000);
        })

    };

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
      console.log(`savbtns`);
      console.log(saveBtns);

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


    return { saveButtons, addEvents };
})();



