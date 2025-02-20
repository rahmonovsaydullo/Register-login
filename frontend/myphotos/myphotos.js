let username = sessionStorage.getItem('username')
const container = document.getElementById("container")

if(!username) redirectToLogin()

axios.get(`http://localhost:3000/user/username?username=${username}`)
.then((res) =>{
    let data = res.data[0]
    console.log(data);
    
    container.innerHTML = `
    <h1>${data.first_name}</h1>`
})

document.getElementById('logoutBnt').addEventListener('click', redirectToLogin)

function redirectToLogin(){
    window.location.href = '../index.html'
    sessionStorage.removeItem('username')
}