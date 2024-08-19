// $("#header").css({
//     display:'none'
// })

$("#customer-form").css({
    display:"none"
})

$('#item-form').css({
    display:'none'
})

$('#order-form').css({
    display:'none'
})

$('#customer-btn').on('click',()=>{
    $("#customer-form").css({
        display:"block"
    })

    $('#item-form').css({
        display:'none'
    })
    
    $('#order-form').css({
        display:'none'
    })
})

$('#item-btn').on('click',()=>{
    $('#item-form').css({
        display:'block'
    })

    $('#order-form').css({
        display:'none'
    })

    $("#customer-form").css({
        display:"none"
    })
    
})

$('#order-btn').on('click',()=>{
    $('#order-form').css({
        display:'block'
    })

    $("#customer-form").css({
        display:"none"
    })
    
    $('#item-form').css({
        display:'none'
    })

})
