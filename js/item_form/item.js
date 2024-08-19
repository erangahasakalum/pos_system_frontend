let recodeIndex;
$("#item-save").on('click', () => {
    saveItem();
})

$('#update-item').on('click', () => {
    updateItem();
})

$('#delete-item').on('click', () => {
    deleteItem();
})


function saveItem() {
    let iId = $('#item_id').val();
    let iName = $('#item_name').val();
    let iQuantity = $('#quantity').val();
    let iPrice = $('#price').val();

    $('#item-code').append($('<option>').text(iId)); // place order customer id comboBox set item code

    var regexId = /^I00-\d{3}$/;
    var regexName = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    var regQuantity = /^\d+$/;
    var regPrice = /^(Rs|₨)?\s?\d{1,9}(,\d{3})*(\.\d{2})?$/;


    function isDuplicateId(id) {
        return itemArray.some(item => item.item_id === id);
    }

    if (iId === "") {
        document.getElementById('i-id-error').innerText = 'ID cannot be empty';
    } else if (!regexId.test(iId)) {
        document.getElementById('i-id-error').innerText = 'invalid ID';
    } else if (isDuplicateId(iId)) {
        document.getElementById('i-id-error').innerText = 'duplicate  ID';
    } else {
        document.getElementById('i-id-error').innerText = '';
    }

    if (iName === '') {
        document.getElementById('i-name-error').innerText = 'Name cannot be empty';
    } else if (!regexName.test(iName)) {
        document.getElementById('i-name-error').innerText = 'invalid Name';
    } else {
        document.getElementById('i-name-error').innerText = '';
    }

    if (iQuantity === '') {
        document.getElementById('i-quantity-error').innerText = 'Cannot be empty';
    } else if (!regQuantity.test(iQuantity)) {
        document.getElementById('i-quantity-error').innerText = 'invalid value';
    } else {
        document.getElementById('i-quantity-error').innerText = '';
    }

    if (iPrice === '') {
        document.getElementById('i-price-error').innerText = "Cannot be empty";
    } else if (!regPrice.test(iPrice)) {
        document.getElementById('i-price-error').innerText = "invalid value"
    } else {
        document.getElementById('i-price-error').innerText = '';
    }

    if (
        regexId.test(iId) && !isDuplicateId(iId) &&
        regexName.test(iName) &&
        regQuantity.test(iQuantity) &&
        regPrice.test(iPrice)
    ) {
        let itemObj = new ItemModel(
            iId,
            iName,
            iQuantity,
            iPrice);

        itemArray.push(itemObj);
        loadItem();
    }

}

function loadItem() {
    $('#item-table-tbody').empty();

    itemArray.map((item) => {
        let customerRecode = `<tr>
            <td class="i-id">${item.item_id}</td>
            <td class="i-name">${item.item_name}</td>
            <td class="i-quantity">${item.quantity}</td>
            <td class="i-price">${item.price}</td>
        </tr>`

        $('#item-table-tbody').append(customerRecode);
    })

}

$("#item-table").on('click', 'tr', function () {
    let idI = $(this).find('.i-id').text();
    let nameI = $(this).find('.i-name').text();
    let quantityI = $(this).find('.i-quantity').text();
    let priceI = $(this).find('.i-price').text();

    recodeIndex = $(this).index();
    $('#i_id').val(idI);
    $('#i_name').val(nameI);
    $('#i_quantity').val(quantityI);
    $('#i_price').val(priceI);

    $('#d-id').val(idI);
    $('#d-name').val(nameI);


})

function saveItemClearField() {
    $('#item_id').val('');
    $('#item_name').val('');
    $('#quantity').val('');
    $('#price').val('');
}

function updateItem() {
    let iId = $('#i_id').val();
    let iName = $('#i_name').val();
    let iQuantity = $('#i_quantity').val();
    let iPrice = $('#i_price').val();

    var regexId = /^I00-\d{3}$/;
    var regexName = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    var regQuantity = /^\d+$/;
    var regPrice = /^(Rs|₨)?\s?\d{1,9}(,\d{3})*(\.\d{2})?$/;


    if (regexId.test(iId)) {
        if (regexName.test(iName)) {
            if (regQuantity.test(iQuantity)) {
                if (regPrice.test(iPrice)) {

                    let itemArrayElement = itemArray[recodeIndex];
                    itemArrayElement.item_id = iId;
                    itemArrayElement.item_name = iName;
                    itemArrayElement.quantity = iQuantity;
                    itemArrayElement.price = iPrice;

                    loadItem();
                    clearUpdateField();

                } else {
                    document.getElementById('error-priceU').innerText = 'invalid';
                }
            } else {
                document.getElementById('error-quantityU').innerText = 'invalid ';
            }
        } else {
            document.getElementById('error-nameU').innerText = 'invalid Name';
        }
    } else {
        document.getElementById('error-idU').innerText = 'invalid ID';
    }

}

function clearUpdateField() {
    $('#i_id').val('');
    $('#i_name').val('');
    $('#i_quantity').val('');
    $('#i_price').val('');
}

function deleteItem() {
    itemArray.splice(recodeIndex, 1);
    loadItem();

}