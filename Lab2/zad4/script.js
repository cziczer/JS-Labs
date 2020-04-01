var expect = chai.expect;

add = document.getElementById('AddBtn');
print_out = document.getElementById('PrintOut');
subject = document.getElementById('Subject');
student = document.getElementById('Student');
mark = document.getElementById('Mark');
web_storage = document.getElementById('WebStorage');

add.addEventListener("click", add_button_pressed);
print_out.addEventListener("click", print_out_student)
let subjects = new Array();
let mapStudents = new Map();


function add_button_pressed(){
    if(!subjects.includes(subject.value) && subject.value.length > 0){
        subjects.push(subject.value);
        for (let [student, subjs] of mapStudents) {
            subjs.set(subject.value, new Array())
        }
    }

    if(student.value.localeCompare("") != 0){
        if(subject.value.length == 0 && mark.value.length == 0) // new student
        {
            if(web_storage.checked){
                localStorage.setItem(student.value, "")
            }
            else{
                mapStudents.set(student.value, new Map());
                var tmp_sub =  mapStudents.get(student.value)
                subjects.forEach(function(sub){
                    tmp_sub.set(sub, new Array());
                })
            }
        }

        else if(subject.value.length == 0){
            alert("Brak takiego przedmiotu");
        }

        else if(mark.value.length == 0){
            alert("Brak oceny do wpisania");
        }

        else if(student.value.length == 0 && mark.value.length > 0){
            alert("Brak studenta");
        }

        else{
            if(web_storage.checked){
                if (!mapStudents.has(student.value)){
                    localStorage.setItem(student.value, subject.value + " " + mark.value);
                }
                else{
                    var tmp_sub =  new Map(localStorage.getItem(student.value));
                   tmp_sub = tmp_sub.concat(" ", subject.value);
                   tmp_sub = tmp_sub.concat(" ", mark.value);
                   tmp_sub = tmp_sub.concat(" ", "\n");

                    localStorage.setItem(student.value, tmp_sub);
                }

            }
            else{
                if (!mapStudents.has(student.value)){
                    mapStudents.set(student.value, new Map());
                    var tmp_sub =  mapStudents.get(student.value)
                    subjects.forEach(function(sub){
                    tmp_sub.set(sub, new Array());
                    })
                }

                mapStudents.get(student.value).get(subject.value).push(Number(mark.value));
            }
        }
    }

    console.log(localStorage.getItem("Pot"))

    // clear text areas
    subject.value = "";
    student.value = "";
    mark.value = "";
}


function print_out_student(){
    if(!mapStudents.has(student.value) && localStorage.getItem(student.value) == null)
        alert("Brak takiego studenta");
    if(mapStudents.has(student.value))
    {
        var div = document.createElement("DIV");
        div.appendChild(document.createTextNode(student.value))
        document.body.appendChild(div);
        student_map = mapStudents.get(student.value);
        for (let [key, value] of student_map) {
            var marks = key;
            value.forEach(function(mk){
                marks = marks.concat(" ", mk);
            })
            var div = document.createElement("DIV");
            div.appendChild(document.createTextNode(marks))
            document.body.appendChild(div);
        }
    }
    if(localStorage.getItem(student.value) != null){
       var div = document.createElement("DIV");
       div.appendChild(document.createTextNode(student.value))
       document.body.appendChild(div);
       div = document.createElement("DIV");
       div.appendChild(document.createTextNode(localStorage.getItem(student.value)))
       document.body.appendChild(div);
    }
}


// TESTS

describe("Adding students and subjects and marks", function() {
    it("Add subject", function() {
      subjects.push("polski")
      expect(subjects.length).to.equal(1);
    });
    it("Add existing subject", function() {
        if(!subjects.includes("polski"))
            subjects.push("polski")
        expect(subjects.length).to.equal(1);
    });
    it("Add student", function() {
      mapStudents.set("Marek", new Map());
      expect(mapStudents.has("Marek")).to.equal(true)
    });
    it("Add student with marks", function() {
      var tmp = mapStudents.get("Marek");
      tmp.set("polski", new Array(5, 2));
      expect(mapStudents.get("Marek").get("polski")[0]).to.equal(5);
    });
    it("Add students to local storage", function() {
      localStorage.setItem("Andrzej", "Polski: 2");
      expect(localStorage.getItem("Andrzej")).to.equal("Polski: 2");
    });
  });
