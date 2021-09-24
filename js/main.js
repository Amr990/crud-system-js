//crud(create,retrieve,update,delete)
//validation,update()
//search
//regex(regular expression)

//js DOM -- document object model 
var h1=document.getElementById("demo"); //dom statement
var inputsCollection=Array.from(document.getElementsByClassName("form-control"));
var test=document.getElementsByTagName("input");
var test2=document.getElementsByName("gender");
var test3=document.querySelectorAll(".form-control");

//element,event,action


var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("productCategory");
var productDesc=document.getElementById("productDesc");
var submitBtn=document.getElementById("submitBtn");
var inputs=document.getElementsByClassName("form-control");
var searchInput=document.getElementById("search");
var nameAlert=document.getElementById("nameAlert");

var products=[];
var currentIndex=0;

productName.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{2,8}$/
    if(!nameRejex.test(productName.value))
    {
        submitBtn.disabled="true";
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
        return false;

    }
    else{
        submitBtn.removeAttribute("disabled");
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
        return true

    }
   
}

if(JSON.parse(localStorage.getItem("productsList"))!=null)
{
    products=JSON.parse(localStorage.getItem("productsList"));
    displayData()
}

submitBtn.onclick=function(){
    if(submitBtn.innerHTML=="Add Product")
    {
        addProduct();
    }
    else
    {
        updateProduct()
    }
 
   displayData();
   clearForm()
}

function addProduct(){
    var product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDesc.value
    }
    products.push(product);
    localStorage.setItem("productsList",JSON.stringify(products))
}
function displayData(){
    var trs='';
    for(var i=0;i<products.length;i++){
        trs+=`<tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
                <td><button onclick="getProductInfo(${i})" class="btn btn-warning">update</button></td>
             </tr>`
    }
    document.getElementById("tableBody").innerHTML=trs;
}
function clearForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value=""
    }
}
function deleteProduct(index){
    products.splice(index,1);
    displayData();
     localStorage.setItem("productsList",JSON.stringify(products))
}

searchInput.onkeyup=function()
{
    var trs='';
    var val=searchInput.value;
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(val.toLowerCase()))   //h==hp
        {
          trs+=
          `<tr>
              <td>${i+1}</td>
              <td>${products[i].name}</td>
              <td>${products[i].price}</td>
              <td>${products[i].category}</td>
              <td>${products[i].description}</td>
              <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
              <td><button onclick="editProduct()" class="btn btn-warning">update</button></td>
          </tr>`
        }
       
    }
    document.getElementById("tableBody").innerHTML=trs
}


function getProductInfo(index){
    productName.value=products[index].name;
    productPrice.value=products[index].price;
    productCategory.value=products[index].category;
    productDesc.value=products[index].description;
    submitBtn.innerHTML="update product";
    currentIndex=index;
}

function updateProduct(){
    var product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDesc.value
    }
    products[currentIndex]=product;
    localStorage.setItem("productsList",JSON.stringify(products))
}