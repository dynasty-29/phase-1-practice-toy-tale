let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
   
  //let me store the toy URL in a variable
  const toyURL = "http://localhost:3000/toys";
  //do the fetch on the url
  fetch(toyURL)
  //first then that parses json 
  .then(response => response.json())
  //the second then that now takes the parses json dat
  .then(toys=> {
    //create our html element by id where will be storing our toys
    const toyCollection = document.getElementById('toy-collection');
    //we have been tasked to make <div class="card">, so will creeate these element
    //but first we create the foeEach that will help loop through all these elements
    toys.forEach(toy =>{
      //create our div element
      const divCard = document.createElement('div');
      //give it a class name
      divCard.className = 'card';
      //continue create each of the following
      //h2 tag with the toy's name
      const h2tag = document.createElement('h2');
      h2tag.textContent = toy.name; //this is because its attribute we adding to the toy
      divCard.appendChild(h2tag); //its part of the card we created so will append it as a child to it

      // img tag with the src of the toy's image attribute and the class name "toy-avatar"
      const imgtag = document.createElement('img');
      imgtag.src = toy.image; //its expected to have the src
      imgtag.className = 'toy-avatar'; //its expected to have a classname
      divCard.appendChild(imgtag); //we then add it to the card as a child

      // p tag with how many likes that toy has
      const ptag = document.createElement('p');
      ptag.textContent = `${toy.likes} Likes`; //it should be storing the number of likes for that toy
      divCard.appendChild(ptag); //and as usual add it to the parent element which is our card

      // button tag with a class "like-btn" and an id attribute set to the toy's id number
      const buttontag = document.createElement('button');
      buttontag.className = 'like-btn'; //should have a classname
      buttontag.id = `toy-${toy.id}`; //should have id
      buttontag.textContent = 'Like ❤️'; //likes comes with a heart

      ///we have to add the likes event listener here
      // a like comes from a button click so i will add event listener
      buttontag.addEventListener("click", () => {
        // keeping counts of all likes
        const newLikes = toy.likes + 1;

        // Now we need to send PATCH request to update likes
        fetch(`${toyURL}/${toy.id}`, {
          //the verb is PATCH
          method: "PATCH",
          //Awalys update the header
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          //the body carries what we are patching
          body: JSON.stringify({
            likes: newLikes,
          }),
        })
          //first then as usual parse our json
          .then(response => response.json())
          //second then updates the data with parsed json

          .then(updatedToy => {
            // Update the likes count in the DOM
            toy.likes = updatedToy.likes; 
            //store our likes in the ptag we created, well you can't say its like if you can't see number of likes
            ptag.textContent = `${updatedToy.likes} Likes`;
          })
          //always be ready to catch the error
          .catch(error => console.error("Error updating likes:", error));

      
    })
    divCard.appendChild(buttontag); //add back to parent element

      //now lets add our card to html element it will be sored under
    toyCollection.appendChild(divCard);
  })
  //want also to catch an eror if there is one
  .catch(error=> 
    console.log('Ooops error occured:', error)
  );

  //Now will be adding toys
  //first will create and argument (function) that helps me with this
  const confugarationObject = {
    //we want to add so the verb is post
    method: "POST",
    //
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": "arcane",
      "image": "https://images.unsplash.com/photo-1489367874814-f5d040621dd8?q=80&w=2046&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "likes": 0
    }),
  };

  //the add my fetch
  fetch(toyURL, confugarationObject)
  .then(response => response.json())
  .then(toy=>{
    console.log('Success:', toy);
  })
  .catch(error => console.error('Error adding toy:', error));


  //awesome that works so far so good now lets increase likes
  //will have to go back to where likes button is and add the event listener functionality there
  

   
  });
});
