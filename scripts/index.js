const guideList      = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks  = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

//setup link toggle
const setupUI = (user)=>{
  if(user){
    //account info 
    db.collection('users').doc(user.uid).get().then(doc=>{
        let userDetails = doc.data();
        const html = `<div>Logged in as ${user.email}</div>
                      <div>Biography ${userDetails.bio}</div>`;
        accountDetails.innerHTML = html;
    })
   
    //toggle UI elements 
    loggedInLinks.forEach(link=> link.style.display="block");
    loggedOutLinks.forEach(link=>link.style.display="none");
  }
  else{
      //toggle UI elements 
    loggedInLinks.forEach(link=> link.style.display="none");
    loggedOutLinks.forEach(link=>link.style.display="block");
  }
}

//setup guides 
const setupGuides = (data)=>{
    let html = '';
    
    if(data.length){
      data.forEach(doc=>{
        const guide = doc.data();
        html+=`<li>
              <div class="collapsible-header grey lighten-4">${guide.title}</div>
              <div class="collapsible-body white"><span>${guide.content}</span></div>
            </li>`
      });
      guideList.innerHTML=html;
    }
    else{
      guideList.innerHTML = "<h5>Login to view guides</h5>";
    }
   
}

//setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });