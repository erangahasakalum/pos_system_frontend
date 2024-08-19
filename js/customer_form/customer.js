var recodeIndex;

$('#customer-save').on('click', () => {
    saveCustomer();
})

$('#customer-update').on('click',() => {
    updateCustomer();
})

$('#delete-customer').on('click', () => {
    deleteCustomers();
})

function saveCustomer() {

    let customer_id = $('#customer_id').val();
    let customer_name = $('#customer_name').val();
    let city = $('#city').val();
    let telephone = $('#telephone').val();

    var regexId = /^C00-\d{3}$/;
    var regexName = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    var regexCity = /^[A-Za-z\s]+$/;
    var regexContact = /^\d{10}$/;

    $('#customer-idO').append($('<option>').text(customer_id)); // place order customer id comboBox set customer code

    function isDuplicateId(id) {
        return customerArray.some(customer => customer.customer_id === id);
    }

    if (customer_id === "") {
        document.getElementById("error-id").innerText = "ID cannot be empty";
    } else if (!regexId.test(customer_id)) {
        document.getElementById("error-id").innerText = "Invalid ID format";
    } else if (isDuplicateId(customer_id)) {
        document.getElementById("error-id").innerText = "Duplicate ID";
    } else {
        document.getElementById("error-id").innerText = "";
    }

    if (customer_name === "") {
        document.getElementById("error-name").innerText = "Name cannot be empty";
    } else if (!regexName.test(customer_name)) {
        document.getElementById("error-name").innerText = "Invalid name format";
    } else {
        document.getElementById("error-name").innerText = "";
    }

    if (city === "") {
        document.getElementById("error-city").innerText = "City cannot be empty";
    } else if (!regexCity.test(city)) {
        document.getElementById("error-city").innerText = "Invalid city format";
    } else {
        document.getElementById("error-city").innerText = "";
    }

    if (telephone === "") {
        document.getElementById("error-telephone").innerText = "Telephone cannot be empty";
    } else if (!regexContact.test(telephone)) {
        document.getElementById("error-telephone").innerText = "Invalid telephone number";
    } else {
        document.getElementById("error-telephone").innerText = "";
    }

    if (
        regexId.test(customer_id) && !isDuplicateId(customer_id) &&
        regexName.test(customer_name) &&
        regexCity.test(city) &&
        regexContact.test(telephone)
    ) {
        let customerObj = new CustomerModel(
            customer_id,
            customer_name,
            city,
            telephone
        );

        customerArray.push(customerObj);
        loadCustomer();
        clearSaveFields();
    }
}



function loadCustomer() {
    $('#customer-table-tbody').empty();

    customerArray.map((item) => {
        let customerRecodes = `<tr> 
            <td class="c-id">${item.customer_id}</td>
            <td class="c-name">${item.customer_name}</td>
            <td class="c-city">${item.city}</td>
            <td class="c-telephone">${item.telephone}</td>
        </tr>`
        $('#customer-table-tbody').append(customerRecodes);
    })
}

$('#customer-table').on('click', 'tr', function () {
    let idC = $(this).find('.c-id').text();
    let nameC = $(this).find('.c-name').text();
    let cityC = $(this).find('.c-city').text();
    let telephoneC = $(this).find('.c-telephone').text();

    recodeIndex = $(this).index();

    $("#c_id").val(idC);
    $("#c_name").val(nameC);
    $("#c_city").val(cityC);
    $("#c_telephone").val(telephoneC);

    $('#delete-id').val(idC);
    $('#delete-name').val(nameC);
})

function updateCustomer() {
    let idU = $('#c_id').val();
    let nameU = $('#c_name').val();
    let cityU = $('#c_city').val();
    let telephoneU = $('#c_telephone').val();

    var regexId = /^C00-\d{3}$/;
    var regexName = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    var regexCity = /^[A-Za-z\s]+$/;
    var regexContact = /^\d{10}$/;


    if (regexId.test(idU)) {
        if (regexName.test(nameU)) {
            if (regexCity.test(cityU)) {
                if (regexContact.test(telephoneU)) {
                    let customerArrayElement = customerArray[recodeIndex];
                    customerArrayElement.customer_id = idU;
                    customerArrayElement.customer_name = nameU;
                    customerArrayElement.city = cityU;
                    customerArrayElement.telephone = telephoneU;

                    loadCustomer();
                    clearUpdateFields();
                } else {
                    document.getElementById("error-c-telU").innerText = "Invalid telephone number";
                }
            } else {
                document.getElementById("error-c-cityU").innerText = "Invalid city";
            }
        } else {
            document.getElementById("error-c-nameU").innerText = "Invalid name";
        }
    } else {
        document.getElementById("error-c-idU").innerText = "Invalid ID";
    }

}

function clearSaveFields() {
    $('#customer_id').val('');
    $('#customer_name').val('');
    $('#city').val('');
    $('#telephone').val('');
}

function clearUpdateFields() {
    $('#c_id').val('');
    $('#c_name').val('');
    $('#c_city').val('');
    $('#c_telephone').val('');
}

function deleteCustomers() {
    customerArray.splice(recodeIndex, 1);
    loadCustomer();

}

$('#close-customer-save').on('click', () => {
    clearSaveFields()
})