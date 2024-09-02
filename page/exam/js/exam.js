const url = "exam_category_action.php";
const modal_body = "modal_sm_body";
const modal = "sm";

function get_action_data(_div = modal_body, _load = 0, _url = url) {
    return {
        'url': _url,
        'div': _div,
        'load': _load
    };
}

function get_exam_form(type, id = 0) {
    let header;
    let data_key;
    let val;

    if (type === "insert") {
        header = "Add Exam Category";
        data_key = "get_exam_category_form";
        val = 1;
    } else if (type === "update") {
        header = "Update Exam Category";
        data_key = "update_exam_category_form";
        val = id;
    } else {
        header = "Delete Exam Category";
        data_key = "delete_exam_category_form";
        val = id;
    }

    modal_open(modal, header);
    loader(modal_body);

    const data = {
        [data_key]: val
    };

    get_ajax(get_action_data(), data);
}

function exam_category_action(type, id = 0) {
    let data_key;
    let val;
    let delete_type = 0;

    if (type === "insert") {
        data_key = "insert_exam_category";
        val = 0;
    } else if (type === "update") {
        data_key = "update_exam_category";
        val = id;
    } else {
        data_key = "delete_exam_category";
        val = id;
        delete_type = 1;
    }

    let data_val;
    if (delete_type === 0) {
        data_val = {
            'id': val,
            'category_name': get_value("exam_category_name"),
            'program_id': get_value("add_program_select")
        };
    } else {
        data_val = {
            'id': val
        };
    }

    const error = delete_type === 0 ? filter_data(data_val) : 0;

    const data = {
        [data_key]: data_val
    };

    if (error === 0) {
        loader(modal_body);
        get_ajax(get_action_data(modal_body, 1), data);
    }
}

function filter_data(data) {
    const exam_category = data['category_name'];
    const program_id = data['program_id'];
    let error = 0;

    if (exam_category === "") {
        alert("Enter exam category Name");
        error = 1;
    } else if (program_id === "" || program_id == 0) {
        alert("Select Program");
        error = 1;
    }

    return error;
}

function get_ajax(action_data, data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', action_data.url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById(action_data.div).innerHTML = xhr.responseText;
            if (action_data.load) {
                loader(action_data.div);
            }
        } else {
            console.error('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.send(encodeForAjax(data));
}

function encodeForAjax(data) {
    const encoded = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            encoded.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
    }
    return encoded.join('&');
}
