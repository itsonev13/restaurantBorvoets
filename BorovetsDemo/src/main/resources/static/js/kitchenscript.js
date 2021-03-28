var orderCount=document.getElementsByClassName("client").length;
let popupSound=new Audio();
popupSound.src="/img/popup.mp3";
function getordercount(){
	
}
function readyorder(client_id){
	const REGEX_ID=new RegExp(/\d+/);
	c_id=(REGEX_ID.exec(client_id)[0]);
	let client={
			id:c_id
	};
	$.ajax({
        url:'http://localhost:8000/ordy',
        contentType:"application/JSON",
        type: "POST",
        data:JSON.stringify(client),
        dataType:'text',
        success: function (data) {
        	
        },
        error: function (data) {
            console.log("Error");
        }
    });
}
function a(){
	
$.ajax({
				   url:'http://localhost:8000/kitchen',
				   contentType:"application/JSON",
				   type:"GET",
				   success: function () {    
					 
					 
				   },
				   		error: function () {
				   			alert("Възникна грешка.Моля опитайте отново.");
				   			}
					});
}
setInterval(function(){
	  $('.order-container').load('/kitchen');
	  var orderCountAfterUpdate=document.getElementsByClassName("client").length;
	  if(orderCount<orderCountAfterUpdate){
		  orderCount=orderCountAfterUpdate;	
		  popupSound.play();
	  }
	  else orderCount=orderCountAfterUpdate;
	}, 5000) ;
