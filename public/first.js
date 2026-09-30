console.log("I am connected");

const userDiv = document.getElementById("div");

console.log(userDiv);

fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        data.forEach((user)=>{
            console.log(user);
            userDiv.innerHTML += `
            <div class="post-card">
              <div class="heading">
                <h4>User${user.userId}</h4>
                <p>#${user.id}</p>
                
              </div>
                <h2 id="title">${user.title}</h2>
                <p id="body">${user.body}</p>

            </div>

            `
        });
      })
