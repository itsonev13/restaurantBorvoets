function incrementQuantity(shopItemId){
	let quantity=document.getElementById("value"+shopItemId).innerHTML ;
	quantity++;
	document.getElementById("value"+shopItemId).innerHTML=quantity;
	getTotal()
	
}
function decrementQuantity(shopItemId){
	let quantity=document.getElementById("value"+shopItemId).innerHTML  ;
	quantity--;
	if(quantity<=1) quantity=1;
	document.getElementById("value"+shopItemId).innerHTML=quantity;
	getTotal();
}
function deleteshopitem(shopItemid){
	let item=document.getElementById("shopitem"+shopItemid);
	item.remove();
	getTotal();
	let items=document.getElementsByClassName("shopitem")[0]
	if(items==undefined ){
		hideOrder();
	}
}
function hideOrder()
	{
		$("#shopingCart").hide(500);
	}
function showOrder(){
	$("#shopingCart").show(500);
}
function toggleOrder(){
	let carticon=document.getElementsByClassName("fa-shopping-cart")[0];
	if(carticon.style.color!="red"&&carticon.style.color!=""){
	$("#shopingCart").toggle(500);
	}
}
function getTotal(){
	let allitems=document.getElementsByClassName("shopitem");
	let total=0;
	for(let i=0;i<allitems.length;i++){
		let item=allitems[i];
		let price=item.getElementsByClassName("itemPrice")[0].innerHTML;
		let quantitywithbtns=item.getElementsByClassName("itemQuantity")[0];
		let quantity=quantitywithbtns.getElementsByClassName("quantityValue")[0].innerHTML;
	total+=(quantity*price);
	}
	let totalhtml=document.getElementById("total");
	total=(Math.round(total * 100)/100).toFixed(2);
	if(total==0){
		totalhtml.innerHTML="";
		let carticon=document.getElementsByClassName("fa-shopping-cart")[0];
		carticon.style.color="red";
	}
	else {
		let carticon=document.getElementsByClassName("fa-shopping-cart")[0];
		carticon.style.color="#bbe50c";
		totalhtml.innerHTML="Общо:"+total+"лв";
	}
}

function addToCart(id){
	let items=document.getElementsByClassName("shopitem")[0]
if(items==undefined){
	showOrder();
}
let cartcontainer=document.getElementById("shopingContainer");
let itemid={
		id:id,
};
$.ajax({
   url:'/addtocart',
   contentType:"application/JSON",
   type:"POST",
   data:JSON.stringify(itemid),
   dataType:'JSON',
   success: function (data) {
	   let shopitem=document.getElementById("shopitem"+data.id);
	   if (shopitem==null){
		   $('.shopingcart-container').append('<div class="d-flex flex-row shopitem shopitem'+data.id+'" id="shopitem'+data.id+'"></div>'); 
		   $('.shopitem'+data.id).append('<i class="fas fa-trash col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1" id="delete'+data.id+'"></i>');
		   $('.shopitem'+data.id).append('<div class="p1 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 itemName itemName'+data.id+'"></div>');
		   $('.itemName'+data.id).append(data.name);
		   $('.shopitem'+data.id).append('<div class="p1 col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 itemPrice itemPrice'+data.id+'"></div>');
		   $('.itemPrice'+data.id).append(data.price.toFixed(2));
		   $('.shopitem'+data.id).append('<div class="p1 col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 itemQuantity itemQuantity'+data.id+'"id="itemQuantity'+data.id+'"></div>');
		   $('.itemQuantity'+data.id).append('<i class="fas fa-plus-circle" id="increment'+data.id+'"></i>');
		   $('.itemQuantity'+data.id).append('<div class="quantityValue" id=value'+data.id+'>1</div>');
		   $('.itemQuantity'+data.id).append('<i class="fas fa-minus-circle" id="decrement'+data.id+'"></i>');
		   let incrementbtn=document.getElementById('decrement'+data.id);
		   let decrementbtn=document.getElementById('increment'+data.id);
		   let deletebtn=document.getElementById('delete'+data.id);
		   decrementbtn.addEventListener("click",function(){incrementQuantity(data.id)});
		   incrementbtn.addEventListener("click",function(){decrementQuantity(data.id)});
		   deletebtn.addEventListener("click",function(){deleteshopitem(data.id)});
	   }
	   else{
		   incrementQuantity(data.id);
	   }
	   getTotal();
   },
   		error: function (data) {
   			console.log("Error2");
   			}
	});
}
function addToCartLunch(id){
	let items=document.getElementsByClassName("shopitem")[0]
if(items==undefined){
	showOrder();
}
let cartcontainer=document.getElementById("shopingContainer");
let itemid={
		id:id,
};
$.ajax({
   url:'/addtocartLunch',
   contentType:"application/JSON",
   type:"POST",
   data:JSON.stringify(itemid),
   dataType:'JSON',
   success: function (data) {
	   let shopitem=document.getElementById("shopitem"+data.id);
	   if (shopitem==null){
		   $('.shopingcart-container').append('<div class="d-flex flex-row shopitem shopitem'+data.id+'" id="shopitem'+data.id+'"></div>'); 
		   $('.shopitem'+data.id).append('<i class="fas fa-trash col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1" id="delete'+data.id+'"></i>');
		   $('.shopitem'+data.id).append('<div class="p1 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 itemName itemName'+data.id+'"></div>');
		   $('.itemName'+data.id).append(data.name);
		   $('.shopitem'+data.id).append('<div class="p1 col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 itemPrice itemPrice'+data.id+'"></div>');
		   $('.itemPrice'+data.id).append(data.price.toFixed(2));
		   $('.shopitem'+data.id).append('<div class="p1 col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 itemQuantity itemQuantity'+data.id+'"id="itemQuantity'+data.id+'"></div>');
		   $('.itemQuantity'+data.id).append('<i class="fas fa-plus-circle" id="increment'+data.id+'"></i>');
		   $('.itemQuantity'+data.id).append('<div class="quantityValue" id=value'+data.id+'>1</div>');
		   $('.itemQuantity'+data.id).append('<i class="fas fa-minus-circle" id="decrement'+data.id+'"></i>');
		   let incrementbtn=document.getElementById('decrement'+data.id);
		   let decrementbtn=document.getElementById('increment'+data.id);
		   let deletebtn=document.getElementById('delete'+data.id);
		   decrementbtn.addEventListener("click",function(){incrementQuantity(data.id)});
		   incrementbtn.addEventListener("click",function(){decrementQuantity(data.id)});
		   deletebtn.addEventListener("click",function(){deleteshopitem(data.id)});
	   }
	   else{
		   incrementQuantity(data.id);
	   }
	   getTotal();

   },
   		error: function (data) {
   			console.log("Error2");
   			}
	});
}
function validateOrder(){
	let name=document.getElementById("inputordername").value;
	let address=document.getElementById("inputorderadress").value;
	let phone=document.getElementById("inputorderphone").value;
	let email=document.getElementById("inputorderemail").value;
	let note=document.getElementById("textareanote").value;
	if(note.localeCompare("")==0)note="без описание";
	const EMAIL_VALIDATION= new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
	const PHONE_VALIDATION= new RegExp(	/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/);
	if(EMAIL_VALIDATION.test(email)){
		if(PHONE_VALIDATION.test(phone))
			{
				let itemsObj=[];
				let client= new Object();
				client.name=name;
				client.address=address;
				client.phone=phone;
				client.note=note;
				client.email=email;			
				const REGEX_ID=new RegExp(/\d+/);
				let allitems=document.getElementsByClassName("shopitem");
				for(let i=0;i<allitems.length;i++){
					let item=allitems[i];
					i_id=(REGEX_ID.exec(item.id)[0]);
					let i_name=item.getElementsByClassName("itemName")[0].innerHTML;
					let quantitywithbtns=item.getElementsByClassName("itemQuantity")[0];
					let item_quantity=quantitywithbtns.getElementsByClassName("quantityValue")[0].innerHTML;
					let itemorder= new Object();
					itemorder.name=i_name;
					itemorder.id=i_id;
					itemorder.quantity=item_quantity;
					itemsObj.push(itemorder);	
				}
				let fullorder={
					orders:itemsObj,
			        customer:client    
				};
				
				$.ajax({
		            url:'/order',
		            contentType:"application/JSON",
		            type: "POST",
		            data:JSON.stringify(fullorder),
		            dataType:"text",
		            success: function (data) {
		            	update();
						alert("Поръчката е направена успешно.Очаквайте обаждане за потвърждение");				  

		            },
		            error: function (data) {
			   			alert("Възникна грешка.Моля опитайте отново.");
		            }
		        });
		        sleep(500);
				

			}
		}
}
function update(){
	
	$.ajax({
					   url:'/kitchen',
					   contentType:"application/JSON",
					   type:"POST",
					   success: function () {    	
					   },
					   		error: function () {
					   			alert("Възникна грешка.Моля опитайте отново.");
					   			}
						});
	}
function sleep(miliseconds) {
	   var currentTime = new Date().getTime();

	   while (currentTime + miliseconds >= new Date().getTime()) {
	   }
	}