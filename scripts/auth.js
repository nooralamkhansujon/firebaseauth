//get data 


//listen for auth status changes 
auth.onAuthStateChanged(user=>{

   //calling setupUI function for loggedin and loggedout links
   setupUI(user);
   
   //if user login  then get guides collection from firebase firestore
   if(user){
        db.collection('guides').get().then(snapshot=>{
            setupGuides(snapshot.docs); //then set guides in document
        });
   }
   else{
      setupGuides([]);
   }
});

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',function(event){
    event.preventDefault();

    //get user data 
    const email    = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user 
    auth.createUserWithEmailAndPassword(email,password).then(credentials=>{
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
