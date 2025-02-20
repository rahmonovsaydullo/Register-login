const usernameInput = document.getElementById('username');
const userpasswordInput = document.getElementById('userpassword');
const loginBtn = document.getElementById('loginBtn');
const errorText = document.getElementById('errorText');

const loginUser = async () => {
    if (!usernameInput.value || !userpasswordInput.value) {
        errorText.innerHTML = 'Please fill  username and password.';
        return
    }

    try {
        const response = await axios.post('http://localhost:3000/login', {
            user_name: usernameInput.value,
            password: userpasswordInput.value
        });
        sessionStorage.setItem("username", usernameInput.value);

        if (response.status === 200) {
            window.location.href = "./home/home.html";
        } else {
            errorText.innerHTML = 'Invalid username or password';
        }
    } catch (error) {
        errorText.innerHTML = 'Something went wrong. Please try again.';
    }
};

loginBtn.addEventListener("click", loginUser);
