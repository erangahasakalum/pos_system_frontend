$('#add-to-cart').on('click', () => {
    addToCart();
})

function addToCart() {

    let oId = $('#OrderID').val();
    let date = $('#date').val();
    let customerId = $('#customer-idO').val();
    let customerName = $('#customer-nameO').val();
    let city = $('#city-name').val();
    let mobile = $('#mobile').val();
    let itemCode = $('#item-code').val();
    let itemName = $('#item-name').val();
    let qtyOnHand = $('#item-qty-on-hand').val();
    let orderQty = $('#order-qty').val();
    let price = $('#t-price').val();
    let discount = $('#t-discount').val();

    let cash = +orderQty * price
    $('#cash').val(cash);

    let dis = +cash * discount / 100;
    $('#discount').val(dis);
    let balance = cash - dis;
    $('#balance').val(balance);

    $('#total-discount').text(dis);
    $('#net-total').text(balance);

    let orderDetails = new OrderModel(oId, date, customerId, customerName, city, mobile, itemCode, qtyOnHand, itemName, orderQty, dis, balance);
    orderArray.push(orderDetails);
    loadTable();
}

$('#item-code').change(function () {
    // Get the selected value using val()
    var selectedValue = $(this).val();

    itemArray.map(function (store) {
        if (selectedValue === store.item_id) {
            $('#item-name').val(store.item_name);
            $('#item-qty-on-hand').val(store.quantity);
            $('#t-price').val(store.price);
        }
    })
});

$('#customer-idO').change(function () {
    // Get the selected value using val()
    var selectedValue = $(this).val();

    customerArray.map(function (customer) {
        if (selectedValue === customer.customer_id) {
            $('#customer-nameO').val(customer.customer_name);
            $('#city-name').val(customer.city);
            $('#mobile').val(customer.telephone);
        }
    })
});


function loadTable() {
    $('#addToCart').empty()
    orderArray.map(function (orders) {
        let record = `
                            <tr>
                                <td class="code">${orders.itemCode}</td>
                                <td class="name">${orders.itemName}</td>
                                <td class="qty">${orders.orderQTY}</td>
                                <td class="dis">${orders.discount}</td>
                                <td class="total">${orders.price}</td>
                                <td class="code">
                                    <button class="btn btn-danger btn-sm">Remove</button>
                                </td>
                            </tr>`

        $('#addToCart').append(record)
    })
}

$('#purchase').on('click', () => {
    $('#order-table').empty();
    orderArray.map(function (details) {
        let orderRecode = `<tr>
                                    <td>${details.orderId}{</td>
                                    <td>${details.customer_name}</td>
                                    <td>${details.item_name}</td>  
                                    <td>${details.orderQTY}</td>
                                    <td>${details.discount}</td>
                                    <td>${details.price}</td>
                                </tr>`

        $('#order-tbl-tbody').append(orderRecode);
    })


})


