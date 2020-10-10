
//listen for auth status changes 
auth.onAuthStateChanged(user=>{

   //calling setupUI function for loggedin and loggedout links
   setupUI(user);
   
   //if user login  then get guides collection from firebase firestore
   if(user){
        db.collection('guides').onSnapshot(snapshot=>{
            setupGuides(snapshot.docs); //then set guides in document
        },err=>{
           console.log(err.message);
        });
   }
   else{
      setupGuides([]);
   }
});


//create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',event=>{
   event.preventDefault();
   //add new guide to fireabase firestore
   db.collection('guides').add({
       title:createForm['title'].value,
       content:createForm['content'].value
   }).then(()=>{
       //close the modal and reset form
       const modal = document.querySelector('#modal-create');
       M.Modal.getInstance(modal).close();
       createForm.reset();
   }).catch(error=>{
       console.log(error);
   });
});

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',function(event){
    event.preventDefault();

    //get user data 
    const email    = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user 
    auth.createUserWithEmailAndPassword(email,password).then(credential=>{
        return db.collection('users').doc(credential.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
        
    }).then(()=>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch((error)=>{
        let errorCode    = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
    })
});

//login 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',event=>{ 
   event.preventDefault();

   //get login user data 
   const email    = loginForm['login-email'].value;
   const password = loginForm['login-password'].value;

   //auth is global const variable which is defined in index.html file
   auth.signInWithEmailAndPassword(email, password)
   .then(credentials=>{
       //after login close and reset login modal
       const modal = document.querySelector('#modal-login');
       M.Modal.getInstance(modal).close();
       loginForm.reset();
   }).catch(error=> {
        var errorCode    = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
   });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',function(event){
    event.preventDefault();
    auth.signOut()
    .catch(error=> {
        console.log(error)
    });
});
