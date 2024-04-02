function handleFormSubmit(event) {
    event.preventDefault();
  
    const itemName = event.target.itemName.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;
  
    const vegDetail = {
        ItemName: itemName,
        Price: price,
        Quantity: quantity
    };
    
    axios
        .post(
            "https://crudcrud.com/api/949a06d6abd54072a0db07c008c9dcc1/vegData",
            vegDetail
        )
        .then((response) => {
            console.log(response.data);
            getData(); 
        })
        .catch((error) => console.log(error));        
}

function getData() {
    axios
        .get(
            "https://crudcrud.com/api/949a06d6abd54072a0db07c008c9dcc1/vegData"
        )
        .then((response) => {
            console.log(response);
            const vegDetails = response.data;
            const vegList = document.getElementById("listItem");
            vegList.innerHTML = ""; 

            vegDetails.forEach((veg) => {
                const list = document.createElement("li");
                list.appendChild(
                    document.createTextNode(
                        `${veg.ItemName}, Rs${veg.Price}, ${veg.Quantity}KG `
                    )
                );

                const inputedit = document.createElement("input");
                inputedit.type = "text";
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "DELETE";
                const buyBtn = document.createElement("button");
                buyBtn.textContent = "BUY";

                list.appendChild(inputedit);
                list.appendChild(buyBtn);
                list.appendChild(deleteBtn);
                vegList.appendChild(list);

                deleteBtn.addEventListener("click", function (event) {
                    axios
                        .delete(
                            `https://crudcrud.com/api/949a06d6abd54072a0db07c008c9dcc1/vegData/${veg._id}`
                        )
                        .then(() => {
                            vegList.removeChild(list);
                        })
                        .catch((err) => console.log(err));
                });

                buyBtn.addEventListener("click", function (event) {
                    const purchasedQuantity = parseInt(inputedit.value);
                    if (!isNaN(purchasedQuantity) && purchasedQuantity > 0) {
                        const remainingQuantity = veg.Quantity - purchasedQuantity;
                        list.textContent = `${veg.ItemName}, Rs${veg.Price}, ${remainingQuantity}KG `;
                    } 
                });
            });

            const count = document.getElementById("totalcount");
            count.innerHTML = vegDetails.length;
        })
        .catch((error) => console.log(error));
}
