const signupUserfirstnamaInp = document.getElementById('signupUserfirstname')
const signupUsersurnameInp = document.getElementById('signupUsersurname')
const signupUsernameInp = document.getElementById('signupUsername')
const signupUserPasswordInp = document.getElementById('signupUserPassword')
const regBtn = document.getElementById('registerBtn')
const errorText = document.getElementById('errorText');



const registerUser = async () => {

    if (!signupUserfirstnamaInp.value || !signupUsersurnameInp.value || !signupUsernameInp.value || !signupUserPasswordInp.value) {
        errorText.innerHTML = 'Please fill in all fields.';

        setTimeout(() => {
            errorText.innerHTML = '';
        }, 2000);

        return;
    }
    try {
        const response = await axios.post('http://localhost:3000/signup', {
            first_name: signupUserfirstnamaInp.value,
            last_name: signupUsersurnameInp.value,
            user_name: signupUsernameInp.value,
            password: signupUserPasswordInp.value
        });
        signupUserfirstnamaInp.value.innerHTML = ''
        signupUsersurnameInp.value.innerHTML = ''
        signupUsernameInp.value.innerHTML = ''
        signupUserPasswordInp.value.innerHTML = ''


        if (response.status === 200) {
            alert('Registered successfully')
            console.log("Login successful:", response.data);
            window.location.href = "../login.html";
        }
    } catch (error) {
        console.log(error);
        if (error.status === 400) {
            errorText.innerHTML = error.data.message
        }
        errorText.innerHTML = 'Something went wrong'
        setTimeout(() => {
            errorText.innerHTML = '';
        }, 2000);


    }
}

regBtn.addEventListener("click", registerUser)