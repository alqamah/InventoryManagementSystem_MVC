//client-side function for delete confirmation
function deleteProductConfirmation(id){
    const result = confirm("Are you sure you want to delete this product?");
    if(result){
        fetch('/delete-product/'+id, {
            method:"GET" //todo: change to POST req
        }).then(res =>{
            if(res.ok)
                location.reload();
        })
    }
}