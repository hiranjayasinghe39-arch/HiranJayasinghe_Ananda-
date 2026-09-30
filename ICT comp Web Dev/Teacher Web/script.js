// =====================================================
// TEACHERTRACK
// Teacher Performance & Development Tracking System
// =====================================================


// =====================================================
// LOAD DATA
// =====================================================

function loadData(key, defaultData) {

    let savedData = localStorage.getItem(key);

    if (savedData) {

        try {
            return JSON.parse(savedData);
        } catch (error) {
            console.log("Error loading " + key);
        }

    }

    return defaultData;
}


// =====================================================
// TEACHERS
// =====================================================

let teachers = loadData("teacherTrackTeachers", [

    {
        name: "Mr. Silva",
        subject: "Mathematics",
        email: "silva@gmail.com",
        experience: 8,
        performance: 92,
        status: "Excellent",
        present: 18,
        absent: 1,
        late: 1
    },

    {
        name: "Ms. Perera",
        subject: "Science",
        email: "perera@gmail.com",
        experience: 6,
        performance: 84,
        status: "Good",
        present: 19,
        absent: 0,
        late: 1
    },

    {
        name: "Mr. Fernando",
        subject: "ICT",
        email: "fernando@gmail.com",
        experience: 4,
        performance: 76,
        status: "Good",
        present: 17,
        absent: 2,
        late: 1
    }

]);


// =====================================================
// TRAINING
// =====================================================

let training = loadData("teacherTrackTraining", [

    {
        teacher: "Mr. Silva",
        name: "ICT Teaching Workshop",
        status: "Completed",
        date: "2026-09-15"
    },

    {
        teacher: "Ms. Perera",
        name: "First Aid Training",
        status: "Completed",
        date: "2026-09-12"
    },

    {
        teacher: "Mr. Fernando",
        name: "Digital Education",
        status: "Pending",
        date: "-"
    }

]);


// =====================================================
// FEEDBACK
// =====================================================

let feedback = loadData("teacherTrackFeedback", [

    {
        teacher: "Mr. Silva",
        rating: 5,
        text: "Explains Mathematics clearly.",
        date: "2026-09-18"
    },

    {
        teacher: "Ms. Perera",
        rating: 4,
        text: "Good science lessons.",
        date: "2026-09-17"
    },

    {
        teacher: "Mr. Fernando",
        rating: 4,
        text: "Makes ICT lessons interesting.",
        date: "2026-09-16"
    }

]);


// =====================================================
// LESSON PLANS
// =====================================================

let lessons = loadData("teacherTrackLessons", [

    {
        teacher: "Mr. Silva",
        subject: "Mathematics",
        name: "Algebra",
        date: "2026-09-20",
        status: "Completed"
    },

    {
        teacher: "Ms. Perera",
        subject: "Science",
        name: "Human Digestive System",
        date: "2026-09-21",
        status: "Planned"
    },

    {
        teacher: "Mr. Fernando",
        subject: "ICT",
        name: "Computer Networks",
        date: "2026-09-22",
        status: "In Progress"
    }

]);


// =====================================================
// SAVE DATA
// =====================================================

function saveData() {

    localStorage.setItem(
        "teacherTrackTeachers",
        JSON.stringify(teachers)
    );

    localStorage.setItem(
        "teacherTrackTraining",
        JSON.stringify(training)
    );

    localStorage.setItem(
        "teacherTrackFeedback",
        JSON.stringify(feedback)
    );

    localStorage.setItem(
        "teacherTrackLessons",
        JSON.stringify(lessons)
    );

}


// =====================================================
// TEACHER TABLE
// =====================================================

function showTeachers() {

    let table = document.getElementById("teacherTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    teachers.forEach(function(teacher) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = teacher.name;

        let subjectCell = document.createElement("td");
        subjectCell.textContent = teacher.subject;

        let emailCell = document.createElement("td");
        emailCell.textContent = teacher.email;

        let experienceCell = document.createElement("td");
        experienceCell.textContent = teacher.experience + " years";

        let performanceCell = document.createElement("td");
        performanceCell.textContent = teacher.performance + "%";

        let statusCell = document.createElement("td");
        statusCell.textContent = teacher.status;

        row.appendChild(nameCell);
        row.appendChild(subjectCell);
        row.appendChild(emailCell);
        row.appendChild(experienceCell);
        row.appendChild(performanceCell);
        row.appendChild(statusCell);

        table.appendChild(row);

    });

}


// =====================================================
// ADD TEACHER
// =====================================================

let teacherForm = document.getElementById("teacherForm");

if (teacherForm) {

    teacherForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("teacherName").value.trim();

        let subject = document.getElementById("teacherSubject").value.trim();

        let email = document.getElementById("teacherEmail").value.trim();

        let experience = Number(
            document.getElementById("teacherExperience").value
        );


        if (name === "" || subject === "" || email === "") {

            alert("Please fill in all teacher details.");

            return;
        }


        let newTeacher = {

            name: name,
            subject: subject,
            email: email,
            experience: experience,
            performance: 0,
            status: "New",
            present: 0,
            absent: 0,
            late: 0

        };


        teachers.push(newTeacher);

        saveData();

        showTeachers();
        showAttendance();
        updateTeacherDropdowns();
        updateDashboard();
        updateAnalytics();
        updateAdminDashboard();

        teacherForm.reset();

        alert("Teacher added successfully!");

    });

}


// =====================================================
// ATTENDANCE TABLE
// =====================================================

function showAttendance() {

    let table = document.getElementById("attendanceTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    teachers.forEach(function(teacher, index) {

        let total =
            Number(teacher.present) +
            Number(teacher.absent);

        let percentage = 0;

        if (total > 0) {

            percentage = Math.round(
                (Number(teacher.present) / total) * 100
            );

        }


        let row = document.createElement("tr");


        let nameCell = document.createElement("td");
        nameCell.textContent = teacher.name;


        let presentCell = document.createElement("td");

        let presentInput = document.createElement("input");

        presentInput.type = "number";
        presentInput.min = "0";
        presentInput.value = teacher.present;
        presentInput.id = "present-" + index;

        presentCell.appendChild(presentInput);


        let absentCell = document.createElement("td");

        let absentInput = document.createElement("input");

        absentInput.type = "number";
        absentInput.min = "0";
        absentInput.value = teacher.absent;
        absentInput.id = "absent-" + index;

        absentCell.appendChild(absentInput);


        let lateCell = document.createElement("td");

        let lateInput = document.createElement("input");

        lateInput.type = "number";
        lateInput.min = "0";
        lateInput.value = teacher.late;
        lateInput.id = "late-" + index;

        lateCell.appendChild(lateInput);


        let percentageCell = document.createElement("td");

        percentageCell.textContent = percentage + "%";


        let buttonCell = document.createElement("td");

        let saveButton = document.createElement("button");

        saveButton.textContent = "Save";

        saveButton.onclick = function() {
            saveAttendance(index);
        };

        buttonCell.appendChild(saveButton);


        row.appendChild(nameCell);
        row.appendChild(presentCell);
        row.appendChild(absentCell);
        row.appendChild(lateCell);
        row.appendChild(percentageCell);
        row.appendChild(buttonCell);

        table.appendChild(row);

    });

}


// =====================================================
// SAVE ATTENDANCE
// =====================================================

function saveAttendance(index) {

    let presentInput =
        document.getElementById("present-" + index);

    let absentInput =
        document.getElementById("absent-" + index);

    let lateInput =
        document.getElementById("late-" + index);


    let present = Number(presentInput.value);

    let absent = Number(absentInput.value);

    let late = Number(lateInput.value);


    if (present < 0 || absent < 0 || late < 0) {

        alert("Attendance values cannot be negative.");

        return;
    }


    teachers[index].present = present;

    teachers[index].absent = absent;

    teachers[index].late = late;


    saveData();

    showAttendance();

    updateAnalytics();

    updateAdminDashboard();


    alert("Attendance saved successfully!");

}


// =====================================================
// TEACHER DROPDOWNS
// =====================================================

function updateTeacherDropdowns() {

    let trainingTeacher =
        document.getElementById("trainingTeacher");

    let feedbackTeacher =
        document.getElementById("feedbackTeacher");

    let lessonTeacher =
        document.getElementById("lessonTeacher");


    if (trainingTeacher) {

        trainingTeacher.innerHTML = "";

        teachers.forEach(function(teacher) {

            let option = document.createElement("option");

            option.value = teacher.name;

            option.textContent = teacher.name;

            trainingTeacher.appendChild(option);

        });

    }


    if (feedbackTeacher) {

        feedbackTeacher.innerHTML = "";

        teachers.forEach(function(teacher) {

            let option = document.createElement("option");

            option.value = teacher.name;

            option.textContent = teacher.name;

            feedbackTeacher.appendChild(option);

        });

    }


    if (lessonTeacher) {

        lessonTeacher.innerHTML = "";

        teachers.forEach(function(teacher) {

            let option = document.createElement("option");

            option.value = teacher.name;

            option.textContent = teacher.name;

            lessonTeacher.appendChild(option);

        });

    }

}


// =====================================================
// TRAINING TABLE
// =====================================================

function showTraining() {

    let table = document.getElementById("trainingTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    training.forEach(function(item) {

        let row = document.createElement("tr");

        let teacherCell = document.createElement("td");
        teacherCell.textContent = item.teacher;

        let nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        let statusCell = document.createElement("td");
        statusCell.textContent = item.status;

        let dateCell = document.createElement("td");
        dateCell.textContent = item.date;

        row.appendChild(teacherCell);
        row.appendChild(nameCell);
        row.appendChild(statusCell);
        row.appendChild(dateCell);

        table.appendChild(row);

    });

}


// =====================================================
// ADD TRAINING
// =====================================================

let trainingForm =
    document.getElementById("trainingForm");

if (trainingForm) {

    trainingForm.addEventListener("submit", function(event) {

        event.preventDefault();


        let teacher =
            document.getElementById("trainingTeacher").value;

        let name =
            document.getElementById("trainingName").value.trim();

        let status =
            document.getElementById("trainingStatus").value;

        let date =
            document.getElementById("trainingDate").value;


        if (name === "") {

            alert("Please enter a training name.");

            return;
        }


        let newTraining = {

            teacher: teacher,
            name: name,
            status: status,
            date: date || "-"

        };


        training.push(newTraining);

        saveData();

        showTraining();

        updateDashboard();
        updateAnalytics();
        updateAdminDashboard();

        trainingForm.reset();

        alert("Training added successfully!");

    });

}


// =====================================================
// FEEDBACK TABLE
// =====================================================

function showFeedback() {

    let table = document.getElementById("feedbackTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    feedback.forEach(function(item) {

        let row = document.createElement("tr");

        let teacherCell = document.createElement("td");
        teacherCell.textContent = item.teacher;

        let ratingCell = document.createElement("td");
        ratingCell.textContent = item.rating + "/5";

        let textCell = document.createElement("td");
        textCell.textContent = item.text;

        let dateCell = document.createElement("td");
        dateCell.textContent = item.date;

        row.appendChild(teacherCell);
        row.appendChild(ratingCell);
        row.appendChild(textCell);
        row.appendChild(dateCell);

        table.appendChild(row);

    });

}


// =====================================================
// ADD FEEDBACK
// =====================================================

let feedbackForm =
    document.getElementById("feedbackForm");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function(event) {

        event.preventDefault();


        let teacher =
            document.getElementById("feedbackTeacher").value;

        let rating =
            Number(document.getElementById("feedbackRating").value);

        let text =
            document.getElementById("feedbackText").value.trim();

        let date =
            document.getElementById("feedbackDate").value;


        if (text === "") {

            alert("Please enter feedback.");

            return;
        }


        let newFeedback = {

            teacher: teacher,
            rating: rating,
            text: text,
            date: date || "-"

        };


        feedback.push(newFeedback);

        saveData();

        showFeedback();

        updateAdminDashboard();

        feedbackForm.reset();

        alert("Feedback added successfully!");

    });

}


// =====================================================
// LESSON PLAN TABLE
// =====================================================

function showLessons() {

    let table = document.getElementById("lessonTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";


    lessons.forEach(function(item) {

        let row = document.createElement("tr");


        let teacherCell = document.createElement("td");
        teacherCell.textContent = item.teacher;


        let subjectCell = document.createElement("td");
        subjectCell.textContent = item.subject;


        let nameCell = document.createElement("td");
        nameCell.textContent = item.name;


        let dateCell = document.createElement("td");
        dateCell.textContent = item.date;


        let statusCell = document.createElement("td");
        statusCell.textContent = item.status;


        row.appendChild(teacherCell);
        row.appendChild(subjectCell);
        row.appendChild(nameCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);


        table.appendChild(row);

    });

}


// =====================================================
// ADD LESSON PLAN
// =====================================================

let lessonForm =
    document.getElementById("lessonForm");

if (lessonForm) {

    lessonForm.addEventListener("submit", function(event) {

        event.preventDefault();


        let teacher =
            document.getElementById("lessonTeacher").value;

        let subject =
            document.getElementById("lessonSubject").value.trim();

        let name =
            document.getElementById("lessonName").value.trim();

        let date =
            document.getElementById("lessonDate").value;

        let status =
            document.getElementById("lessonStatus").value;


        if (subject === "" || name === "" || date === "") {

            alert("Please fill in all lesson details.");

            return;
        }


        let newLesson = {

            teacher: teacher,
            subject: subject,
            name: name,
            date: date,
            status: status

        };


        lessons.push(newLesson);

        saveData();

        showLessons();

        updateDashboard();

        updateAdminDashboard();

        lessonForm.reset();

        alert("Lesson plan added successfully!");

    });

}


// =====================================================
// DASHBOARD
// =====================================================

function updateDashboard() {

    let totalTeachers =
        document.getElementById("totalTeachers");

    let averagePerformance =
        document.getElementById("averagePerformance");

    let totalTraining =
        document.getElementById("totalTraining");

    let totalLessons =
        document.getElementById("totalLessons");


    if (totalTeachers) {

        totalTeachers.textContent =
            teachers.length;

    }


    let totalPerformance = 0;


    teachers.forEach(function(teacher) {

        totalPerformance +=
            Number(teacher.performance);

    });


    let averagePerformanceValue = 0;


    if (teachers.length > 0) {

        averagePerformanceValue =
            Math.round(
                totalPerformance / teachers.length
            );

    }


    if (averagePerformance) {

        averagePerformance.textContent =
            averagePerformanceValue + "%";

    }


    if (totalTraining) {

        totalTraining.textContent =
            training.length;

    }


    if (totalLessons) {

        totalLessons.textContent =
            lessons.length;

    }


    updatePerformanceBar(
        "silvaPerformance",
        "Mr. Silva"
    );


    updatePerformanceBar(
        "pereraPerformance",
        "Ms. Perera"
    );


    updatePerformanceBar(
        "fernandoPerformance",
        "Mr. Fernando"
    );

}


// =====================================================
// PERFORMANCE BARS
// =====================================================

function updatePerformanceBar(elementId, teacherName) {

    let bar =
        document.getElementById(elementId);


    if (!bar) {
        return;
    }


    let teacher = null;


    teachers.forEach(function(item) {

        if (item.name === teacherName) {
            teacher = item;
        }

    });


    if (teacher) {

        bar.style.width =
            teacher.performance + "%";

    } else {

        bar.style.width = "0%";

    }

}


// =====================================================
// ANALYTICS
// =====================================================

function updateAnalytics() {

    let attendanceElement =
        document.getElementById("analyticsAttendance");

    let performanceElement =
        document.getElementById("analyticsPerformance");

    let trainingElement =
        document.getElementById("analyticsTraining");


    // ATTENDANCE

    let totalPresent = 0;

    let totalAttendance = 0;


    teachers.forEach(function(teacher) {

        totalPresent +=
            Number(teacher.present);

        totalAttendance +=
            Number(teacher.present) +
            Number(teacher.absent);

    });


    let attendancePercentage = 0;


    if (totalAttendance > 0) {

        attendancePercentage =
            Math.round(
                (totalPresent / totalAttendance) * 100
            );

    }


    if (attendanceElement) {

        attendanceElement.textContent =
            attendancePercentage + "%";

    }


    // PERFORMANCE

    let totalPerformance = 0;


    teachers.forEach(function(teacher) {

        totalPerformance +=
            Number(teacher.performance);

    });


    let averagePerformance = 0;


    if (teachers.length > 0) {

        averagePerformance =
            Math.round(
                totalPerformance / teachers.length
            );

    }


    if (performanceElement) {

        performanceElement.textContent =
            averagePerformance + "%";

    }


    // TRAINING

    let completedTraining = 0;


    training.forEach(function(item) {

        if (item.status === "Completed") {

            completedTraining++;

        }

    });


    let trainingPercentage = 0;


    if (training.length > 0) {

        trainingPercentage =
            Math.round(
                (completedTraining / training.length) * 100
            );

    }


    if (trainingElement) {

        trainingElement.textContent =
            trainingPercentage + "%";

    }

}


// =====================================================
// ADMIN DASHBOARD
// =====================================================

function updateAdminDashboard() {

    let teacherCount =
        document.getElementById("adminTeacherCount");

    let attendance =
        document.getElementById("adminAttendance");

    let performance =
        document.getElementById("adminPerformance");

    let trainingPercentage =
        document.getElementById("adminTraining");

    let lessonCount =
        document.getElementById("adminLessonCount");

    let feedbackCount =
        document.getElementById("adminFeedbackCount");


    // TEACHERS

    if (teacherCount) {

        teacherCount.textContent =
            teachers.length;

    }


    // ATTENDANCE

    let totalPresent = 0;

    let totalAttendance = 0;


    teachers.forEach(function(teacher) {

        totalPresent +=
            Number(teacher.present);

        totalAttendance +=
            Number(teacher.present) +
            Number(teacher.absent);

    });


    let attendancePercentage = 0;


    if (totalAttendance > 0) {

        attendancePercentage =
            Math.round(
                (totalPresent / totalAttendance) * 100
            );

    }


    if (attendance) {

        attendance.textContent =
            attendancePercentage + "%";

    }


    // PERFORMANCE

    let totalPerformance = 0;


    teachers.forEach(function(teacher) {

        totalPerformance +=
            Number(teacher.performance);

    });


    let averagePerformance = 0;


    if (teachers.length > 0) {

        averagePerformance =
            Math.round(
                totalPerformance / teachers.length
            );

    }


    if (performance) {

        performance.textContent =
            averagePerformance + "%";

    }


    // TRAINING

    let completedTraining = 0;


    training.forEach(function(item) {

        if (item.status === "Completed") {

            completedTraining++;

        }

    });


    let trainingCompletion = 0;


    if (training.length > 0) {

        trainingCompletion =
            Math.round(
                (completedTraining / training.length) * 100
            );

    }


    if (trainingPercentage) {

        trainingPercentage.textContent =
            trainingCompletion + "%";

    }


    // LESSONS

    if (lessonCount) {

        lessonCount.textContent =
            lessons.length;

    }


    // FEEDBACK

    if (feedbackCount) {

        feedbackCount.textContent =
            feedback.length;

    }

}


// =====================================================
// NAVIGATION
// =====================================================

function showSection(sectionId) {

    let sections = [

        "dashboard",
        "teachers",
        "attendance",
        "training",
        "feedback",
        "lessons",
        "analytics",
        "admin"

    ];


    sections.forEach(function(id) {

        let section =
            document.getElementById(id);


        if (section) {

            section.style.display = "none";

        }

    });


    let selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.style.display = "block";

    }

}


// =====================================================
// LOGIN
// =====================================================

let loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        let username =
            document.getElementById("loginUsername").value.trim();

        let password =
            document.getElementById("loginPassword").value;

        let message =
            document.getElementById("loginMessage");


        if (username === "admin" && password === "1234") {

            document.getElementById(
                "loginScreen"
            ).style.display = "none";


            message.textContent = "";


            showSection("dashboard");

        } else {

            message.textContent =
                "Incorrect username or password.";

            message.style.color =
                "#dc2626";

        }

    });

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    let loginScreen =
        document.getElementById("loginScreen");

    let username =
        document.getElementById("loginUsername");

    let password =
        document.getElementById("loginPassword");

    let message =
        document.getElementById("loginMessage");


    if (loginScreen) {

        loginScreen.style.display = "flex";

    }


    if (username) {

        username.value = "";

    }


    if (password) {

        password.value = "";

    }


    if (message) {

        message.textContent = "";

    }


    showSection("dashboard");

}


// =====================================================
// START TEACHERTRACK
// =====================================================

showTeachers();

showAttendance();

showTraining();

showFeedback();

showLessons();

updateDashboard();

updateAnalytics();

updateAdminDashboard();

updateTeacherDropdowns();

showSection("dashboard");