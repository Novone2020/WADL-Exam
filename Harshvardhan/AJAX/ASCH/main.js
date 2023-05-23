function FetchData()
{
    var xhr=new XMLHttpRequest();
    xhr.open("GET","https://jsonplaceholder.typicode.com/users");
    xhr.send();
    xhr.onload = () => {
        let response=xhr.responseText;
        let arr=JSON.parse(localStorage.getItem('user'));
        if(!arr)
        {
            localStorage.setItem("user",response);
        }
    };
}
function DisplayData(){
    let user=JSON.parse(localStorage.getItem("user"));
    let html= ` <center>
        <table border='2px'>
            <thead>
                <tr>
                    <th>
                        Name :
                    </th>
                    <th>
                        Phone-Number :
                    </th>
                    <th>
                        Division :
                    </th>
                </tr>
            </thead>
            <tbody>
        `;
          user.forEach(element => {
            html+=`
            <tr>
            <td>${element?.name}</td>
            <td>${element?.phone}</td>
            <td>${element?.div || "11"}</td>
            </tr>
            `
          });  
          html+='</tbody> </table></center>';
          const w=open();
          w.document.body.innerHTML=html;
}
FetchData();
document.forms.registrationForm.addEventListener("submit",formSubmit)

function formSubmit(event)
{
    event.preventDefault();
    let name=document.getElementById('name').value;
    let phone=document.getElementById('phone').value;
    let div=document.getElementById('div').value;

    let postObj={name,phone,div};

    $.ajax({
        type:'POST',
        url: 'https://jsonplaceholder.typicode.com/users',
        data:JSON.stringify(postObj),
        contentType: "application/json; charset=utf-8",
        success: function(newUser)
        {
            let arr=JSON.parse(localStorage.getItem('user'));
            arr.unshift(newUser);
            localStorage.setItem('user',JSON.stringify(arr));
            DisplayData();
        },
        error: function(error){
            console.log(error)
            DisplayData;
        }
    })

}