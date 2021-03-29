const url = "https://reqres.in/api/users?page=1";

const fetchData = () => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      const html = data.data
        .map((user) => {
          return `                     
              <div class="card text-center m-3 d-inline-block" style="width: 14rem;">
                <img class="card-img-top" src="${user.avatar}" alt="${user.first_name}">
                <div class="card-body">
                  <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
                  <a href="#" class="card-link">${user.email}</a>
                </div>
              </div>            
          `;
        })
        .join("");
      document.querySelector("#data").insertAdjacentHTML("afterbegin", html);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();



