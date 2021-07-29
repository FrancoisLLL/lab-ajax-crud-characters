const charactersAPI = new APIHandler('http://localhost:8000');
const characContainer = document.querySelector(".characters-container")

window.addEventListener('load', () => {
  // document.getElementById('fetch-all').addEventListener('click', function (event) {
  //   charactersAPI.getFullList("characters")
  //     .then((apiResponse) => {
  //       console.log(apiResponse);
  //       characContainer.innerHTML = "";

  //       apiResponse.data
  //         .forEach(charac => characContainer.innerHTML += `
  //         <div class="character-info">
  //           <div class="name">Id: ${charac.id}</div>
  //           <div class="name">Name: ${charac.name}</div>
  //           <div class="occupation">Occupation: ${charac.occupation}</div>
  //           <div class="cartoon">Is cartoon: ${charac.cartoon}</div>
  //           <div class="weapon">Weapon: ${charac.weapon}</div>
  //         </div>`)
  //     })
  //     .catch(error => console.log("error"))

  // });

  //Trying async await syntax
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    const catchCharacters = async () => {
      try {
        characContainer.innerHTML = "";
        const characters = await charactersAPI.getFullList("characters");
        characters.data
          .forEach(charac => characContainer.innerHTML += `
          <div class="character-info">
            <div class="name">Id: ${charac.id}</div>
            <div class="name">Name: ${charac.name}</div>
            <div class="occupation">Occupation: ${charac.occupation}</div>
            <div class="cartoon">Is cartoon: ${charac.cartoon}</div>
            <div class="weapon">Weapon: ${charac.weapon}</div>
          </div>`)
      } catch {
        error => console.log(error)
      }
    }
    catchCharacters();

  });


  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const catchCharacter = async () => {
      try {
        characContainer.innerHTML = "";
        const charac = await charactersAPI.getOneRegister("characters", document.querySelector("input[name='character-id']").value);
        characContainer.innerHTML += `
          <div class="character-info">
            <div class="name">Id: ${charac.data.id}</div>
            <div class="name">Name: ${charac.data.name}</div>
            <div class="occupation">Occupation: ${charac.data.occupation}</div>
            <div class="cartoon">Is cartoon: ${charac.data.cartoon}</div>
            <div class="weapon">Weapon: ${charac.data.weapon}</div>
          </div>`
      } catch {
        error => console.log(error)
      }
    }
    catchCharacter();
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault();

    // const deleteCharacter = async () => {
    //   try {
    //     await charactersAPI.deleteOneRegister("characters", document.querySelector("input[name='character-id-delete']").value);
    //     console.log("deleted" + this);
    //     this.style.backgroundColor = "Green";
    //   } catch {
    //     error => {
    //       this.style.backgroundColor = "Red";
    //       console.log(error);
    //     }
    //   }
    // }
    // deleteCharacter();
    charactersAPI.deleteOneRegister("characters", document.querySelector("input[name='character-id-delete']").value)
      .then((foundData) => {
        console.log("deleted");
        this.style.backgroundColor = "Green";
      })
      .catch(
        error => {
          this.style.backgroundColor = "Red";
          console.log(error);
        }
      )
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault();

    let id = document.querySelector("#edit-character-form input[name='chr-id']").value
    let name = document.querySelector("#edit-character-form input[name='name']").value;
    let occupation = document.querySelector("#edit-character-form input[name='occupation']").value;
    let weapon = document.querySelector("#edit-character-form input[name='weapon']").value;
    let cartoon = document.querySelector("#edit-character-form input[name='cartoon']").value;

    cartoon = cartoon === "on" ? true : false;

    charactersAPI.updateOneRegister("characters", id, {
        name,
        occupation,
        weapon,
        cartoon
      })
      .then(user => console.log(user))
      .catch(error => console.log(error))
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let name = document.querySelector("#new-character-form input[name='name']").value;
    let occupation = document.querySelector("#new-character-form input[name='occupation']").value;
    let weapon = document.querySelector("#new-character-form input[name='weapon']").value;
    let cartoon = document.querySelector("#new-character-form input[name='cartoon']").value;

    cartoon = cartoon === "on" ? true : false;
    charactersAPI.createOneRegister("characters", {
        name,
        occupation,
        weapon,
        cartoon
      })
      .then(user => {
        console.log(user)
        this.style.backgroundColor = "Green";
      })
      .catch(error => {
        console.log(error)
        this.style.backgroundColor = "Red";
      })
  });
});