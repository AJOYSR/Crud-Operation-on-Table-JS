var productArray = [];

var n = 1;
var x = 0;
function isUniqueProductID(current_id) {
    for (let i = 0; i < productArray.length; i++) {
        if (productArray[i].p_id === current_id) {
            return false;
        }
    }
    return true;
}
function getInputData() {
    let pid = document.getElementById("p_id").value;
    let pname = document.getElementById("p_name").value;
    let pprice = document.getElementById("p_price").value;
    let Data = {
        p_id: pid,
        p_name: pname,
        p_price: pprice,
    };
    return Data;
}
function isValidProductName(pname) {
    return Boolean(pname.length <= 60);
}

function isValidProductPrice(pprice) {
    return Boolean(pprice >= 0 && pprice <= 100000);
}

function deleteModal(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('table').deleteRow(row.rowIndex);
        resetForm();
    }
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.p_id;
    selectedRow.cells[1].innerHTML = formData.p_name;
    selectedRow.cells[2].innerHTML = formData.p_price;
}
function resetForm() {
    document.getElementById("p_id").value = '';
    document.getElementById("p_name").value = '';
    document.getElementById("p_price").value = '';
    selectedRow = null;
}

function editRecord(td) {
    selectedRow = td.parentElement.parentElement;
    a = document.getElementById("p_id").value = selectedRow.cells[0].innerHTML;
    b = document.getElementById("p_name").value = selectedRow.cells[1].innerHTML;
    c = document.getElementById("p_price").value = selectedRow.cells[2].innerHTML;
    document.getElementById("p_id").disabled = true;
    // console.log(document.getElementsByTagName("button"));
    document.getElementsByTagName("button")[0].classList.add("show-not");
    document.getElementsByTagName("button")[1].classList.remove("show");
    // .innerHTML=Edit;
    data = {
        p_id: a,
        p_name: b,
        p_price: c
    }
    updateRecord(data);
}

function formPrint() {

    var ourTable = document.getElementById("table");
    var newRowToTheTable = ourTable.insertRow(1);
    let data = getInputData();

    if (data.p_name === "" || data.p_id === "" || data.p_price === "") {
        alert("Any input should not be empty !!!");
        return;
    }

    data.p_name = data.p_name.trim();
    if (!isValidProductName(data.p_name)) {
        alert("Product Name shouldn't be more than 60 char !!!");
        let error = document.getElementById("errorname");
        error.textContent = "Please enter a valid Name!!";
        error.style.color = "red"
        return;
    }

    if (!isValidProductPrice(data.p_price)) {
        alert("Product Price should be 0 to 10,000 !!!");
        let error = document.getElementById("errorprice");
        error.textContent = "Please enter a valid Price!!";
        error.style.color = "red";
        return;
    }
    if (!isUniqueProductID(data.p_id)) {
        alert("Product ID should be unique !!!");
        let error = document.getElementById("errorid");
        error.textContent = "Please enter a Unique ID!!";
        error.style.color = "red"
        return;
    }

    let c1 = newRowToTheTable.insertCell(0);
    let c2 = newRowToTheTable.insertCell(1);
    let c3 = newRowToTheTable.insertCell(2);
    let c4 = newRowToTheTable.insertCell(3);
    let c5 = newRowToTheTable.insertCell(4);

    c1.innerHTML = data.p_id;
    c2.innerHTML = data.p_name;
    c3.innerHTML = data.p_price;
    c4.innerHTML = `<input type="button" class="red-button" value = "Delete" onclick="deleteModal(this) ">`;
    c5.innerHTML = `<input type="button" class="edit-button" value = "Edit" onclick="editRecord(this) ">`;

    productArray.push(data);
    x++;
    n++;
}
