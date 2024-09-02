function select_program() {
    const program_id = document.getElementById("program").value;

    $.ajax({
        type: 'POST',
        url: 'student_add_ajax.php',
        data: { select_program: program_id },
        success: function(response) {
            // Assurez-vous que la réponse est correctement formatée
            document.getElementById("batch").innerHTML = response;
            total_payment(program_id);
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error: ", status, error);
        }
    });
}

function total_payment(pid) {
    $.ajax({
        type: 'POST',
        url: 'student_add_ajax.php',
        data: { total_payment: pid },
        success: function(response) {
            // Assurez-vous que la réponse est correctement formatée
            document.getElementById("total").value = response;
            calculate_advanced();
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error: ", status, error);
        }
    });
}

function calculate_advanced() {
    const advanced = parseFloat(document.getElementById("advanced").value) || 0;
    const total = parseFloat(document.getElementById("total").value) || 0;
    const due = total - advanced;
    document.getElementById("due").value = due.toFixed(2);
}

function test(argument) {
    alert("work");
}

function attend() {
    const id = document.getElementById("id").value;

    $.ajax({
        type: 'POST',
        url: 'student_add_ajax.php',
        data: { attend: id },
        beforeSend: function() {
            document.getElementById("load").innerHTML = "Saving";
        },
        success: function(response) {
            document.getElementById("id").value = "";
            document.getElementById("load").innerHTML = "Save Attendance";
            document.getElementById("msg").innerHTML = response;
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error: ", status, error);
        }
    });
}

function loader() {
    document.getElementById("loading").innerHTML = "<div class='loader'></div>";
}

function close_loader() {
    document.getElementById("loading").innerHTML = "";
}

function edit_student(id) {
    $.ajax({
        type: 'POST',
        url: 'student_add_ajax.php',
        data: { edit_student: id },
        beforeSend: function() {
            // Optionnel : afficher un message ou loader ici
        },
        success: function(response) {
            document.getElementById("edit_body").innerHTML = response;
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error: ", status, error);
        }
    });
}
