const add_form= document.forms["add-form-id"];
const friend_input =  document.getElementById("friend-input");
const switch_btn= document.getElementById("switch-btn");

let friend_arr=[];
const valueEmpty=(str)=>{
    return str==""?true:false;
};
add_form.addEventListener("submit",function(e){
    e.preventDefault();
    if(valueEmpty(friend_input.value)){
        
        alert("Empty");
    }
    else{
       // add_friend(friend_name);
      add_friend();
      
    }
    
});
const check_dark_mode= ()=>{
    return switch_btn.checked;
};


function add_friend(){
    friend_arr.push(friend_input.value);
   friend_input.value=null;
    localStorage.setItem("friends_list",JSON.stringify(friend_arr));
    listRender();
}
function listRender(){

    const friends=  localStorage.getItem("friends_list");
    let friend_list = JSON.parse(friends);
    const friend_name_container = document.getElementById("friend-name-container-id");
    friend_name_container.innerHTML=null;
    
    for(let i=0;i<friend_list.length;i++){
        const div = document.createElement("div");
        div.setAttribute('class','friend-name');
        div.setAttribute("id","friend-id"+i);

        const name = document.createElement("span");
        const p = document.createElement('p');
        p.setAttribute("class","edit");
        p.textContent=friend_list[i];
        name.append(p);

        const friend_tool=document.createElement('span');
        friend_tool.setAttribute('class','friend-tools');

        const edit_btn=document.createElement('button');
        edit_btn.setAttribute('class',"edit-btn edit-btn-green");
        edit_btn.textContent="edit";
        edit_btn.addEventListener('click',function(){
            let paragraph=document.getElementById(this.parentElement.parentElement.id).querySelector("p");
            console.log(this.parentElement.parentElement.id)
            document.getElementById(this.parentElement.parentElement.id).querySelector('.done-btn').style.visibility="visible";
            document.getElementById(this.parentElement.parentElement.id).querySelector('.edit-btn').style.visibility="hidden";
            console.log(document.getElementById(this.parentElement.parentElement.id).querySelector('.done-btn'));
            paragraph.contentEditable=true;
            paragraph.style.backgroundColor="whitesmoke";
            paragraph.style.borderBottom="thin solid red";
            paragraph.style.color="red";
            /*
            paragraph.contentEditable=true;
            paragraph.textContent=paragraph.value;
            console.log(paragraph.content); */
        });

        const done_btn=document.createElement("button");
        done_btn.setAttribute('class','done-btn');
        done_btn.textContent="Done";
        done_btn.addEventListener('click',function(){
            let paragraph=document.getElementById(this.parentElement.parentElement.id).querySelector("p");
            document.getElementById(this.parentElement.parentElement.id).querySelector('.done-btn').style.visibility="hidden";
            document.getElementById(this.parentElement.parentElement.id).querySelector('.edit').style.visibility="visible";
            paragraph.contentEditable=false;
            paragraph.style.backgroundColor="white";
            paragraph.style.color="black";
            friend_arr[i]=paragraph.textContent;
            localStorage.setItem("friends_list",JSON.stringify(friend_arr));
            listRender();            
        });

        const del_btn=document.createElement('button');
        del_btn.setAttribute('class','btn-red-close');
        del_btn.textContent="x";
        del_btn.addEventListener("click",function(e){
            friend_arr.splice(i,1);
            localStorage.setItem("friends_list",JSON.stringify(friend_arr));
            listRender();
        });

        friend_tool.appendChild(done_btn);
        friend_tool.appendChild(edit_btn);
        friend_tool.appendChild(del_btn);
        div.appendChild(name);
        div.appendChild(friend_tool);
        friend_name_container.append(div);
        
    }

}


//event listener for dark mode switch
switch_btn.addEventListener("click",function(){
    const main_container= document.getElementById("main-container");
    const form_container= document.getElementById("form-container");
    const title= document.getElementById("title");
    const friend_input= document.getElementById("friend-input");
   
    if(switch_btn.checked){
        
        friend_input.classList.toggle("friend-input-dark-mode");
        main_container.classList.toggle("main-container-dark-mode");
        form_container.classList.toggle("form-container-dark-mode");
        title.classList.toggle("title-dark-mode");
    }
    else{

        main_container.classList.toggle("main-container-dark-mode");
        form_container.classList.toggle("form-container-dark-mode");
        title.classList.toggle("title-dark-mode");
        friend_input.classList.toggle("friend-input-dark-mode");
    }
    

    
})
function generate_ID(){
    return "friend-id"+friend_arr.length;
}
