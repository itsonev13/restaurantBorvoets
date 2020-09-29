
function deleteItem(id) {
	if(confirm("Сигурен ли си че искаш да изтриеш ястието от менюто?")){
	location.href='/delete/'+id;
	}
}
function deleteLunchItem(id) {
	if(confirm("Сигурен ли си че искаш да изтриеш ястието от менюто?")){
	location.href='/deleteLunch/'+id;
	}
}

function addItem(course_id){
	let form=document.getElementById("form"+course_id);
	let name;
	let price;
	let description;
	name = form.elements[0].value;
	price=form.elements[1].value;
	if(form.elements[3].value!=undefined)
	description=form.elements[3].value;
	if(form.elements[3].value==""){
		description="no description";
	}
	if(confirm("Сигурен ли си че искаш да добавиш ястието в менюто?")){
		location.href='/add/'+course_id+'/'+name+'/'+price+'/'+description;
		 sleep(500);
		}
	}
function addLunchItem(){
	let form=document.getElementById("lunchaddform");
	let name;
	let price;
	let description;
	name = form.elements[0].value;
	price=form.elements[1].value;
	if(form.elements[3].value!=undefined)
	description=form.elements[3].value;
	if(form.elements[3].value==""){
		description="no description";
	}
	if(confirm("Сигурен ли си че искаш да добавиш ястието в менюто?")){
		location.href='/addLunch/'+name+'/'+price+'/'+description;
		 sleep(500);
		}
	}
function updateItem(item_id){
	let form=document.getElementById("updateform"+item_id);
	let name;
	let price;
	let description;
	name = form.elements[0].value;
	price=form.elements[1].value;
	if(form.elements[2].value!=undefined)
	description=form.elements[2].value;
	if(form.elements[2].value==""){
		description="no description";
	}
	if(confirm("Сигурен ли си че искаш да обновиш ястието в менюто?")){
		//location.href='/update/'+item_id+'/'+name+'/'+price+'/'+description;
		let menuitem={
	             id: item_id,
	             name:name,
	             price:price,
	             description:description
		}
		$.ajax({
            url:'/update',
            contentType:"application/JSON",
            type: "POST",
            data:JSON.stringify(menuitem),
            dataType:'text',
            success: function (data) {
            
            },
            error: function (data) {
                console.log("Error");
            }
        })
        sleep(500);
		}
	}
function updateLunchItem(item_id)
{
	let form=document.getElementById("updatelunchform"+item_id);
	let name;
	let price;
	let description;
	name = form.elements[0].value;
	price=form.elements[1].value;
	if(form.elements[2].value!=undefined)
	description=form.elements[2].value;
	if(form.elements[2].value==""){
		description="no description";
	}
	console.log(item_id+"|"+name+"|"+price+"|"+description);
	if(confirm("Сигурен ли си че искаш да обновиш ястието в менюто?")){
		//location.href='/update/'+item_id+'/'+name+'/'+price+'/'+description;
		let lunchitem={
	             id: item_id,
	             name:name,
	             price:price,
	             description:description
		}
		$.ajax({
            url:'/updateLunch',
            contentType:"application/JSON",
            type: "POST",
            data:JSON.stringify(lunchitem),
            dataType:'JSON',
            success: function (data) {
            },
            error: function (data) {
                console.log("Error");
            }
        })
        sleep(500);
		}
	}
function adminCheck(){
	let form=document.getElementById("adminform");
	let email="";
	let password="";
	const EMAIL_VALIDATION =new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
	const PASS_VALIDATION= new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$");
	email = form.elements[0].value;
	password=form.elements[1].value;
	 if((EMAIL_VALIDATION.test(email))&&PASS_VALIDATION.test(password)){
		 console.log(email+"|"+password);
			let admin={
					email:email,
					password:password,
			}; 
			$.ajax({
		       url:'/check',
		       contentType:"application/JSON",
		       type:"POST",
		       data:JSON.stringify(admin),
		       dataType:'JSON',
		       success: function (data) {
		    	   console.log("if success");
		    	   if(data){
		    		   console.log("in if success");
		    		   window.location.href ="/adminmenu";
		    	   }
		    	   else console.log("error");
		       },
		       error: function (data) {
		           console.log("Error2");
		       }
		   });
	  }
	  else console.log("Invalid email or password");
	 sleep(500);
	
}
function sleep(miliseconds) {
	   var currentTime = new Date().getTime();

	   while (currentTime + miliseconds >= new Date().getTime()) {
	   }
	}
//jquerry
 function hideDesc(id){
	$("#"+id+".description").fadeToggle(500);
}
 function hideLunchDesc(){
		$(".description").fadeToggle(500);
	}

function hideAdd(id){
	{
		$("#form"+id+".addMenuItemForm").fadeToggle(500);
	}
}
function hideLunchAdd(){
	{
		$("#lunchaddform.addMenuItemForm").fadeToggle(500);
	}
}
function updateItemform(id){
	$("#updateform"+id+".updateForm").fadeToggle(500);
	
}
function updateLunchItemform(id){
	$("#updatelunchform"+id+".updateForm").fadeToggle(500);
	
}

