const guideList = document.querySelector('.guides');

//setup guides 
const setupGuides = (data)=>{
    let html = '';
//     <li>
//     <div class="collapsible-header grey lighten-4">Guide title</div>
//     <div class="collapsible-body white"><span>Lorem ipsum dolor sit amet.</span></div>
//   </li>
     data.forEach(doc=>{
        const guide = doc.data();
        console.log(guide);
        html+=`<li>
           <div class="collapsible-header grey lighten-4">${guide.title}</div>
             <div class="collapsible-body white"><span>${guide.content}</span></div>
           </li>`
     });
     guideList.innerHTML=html;
}

//setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });