const resultText = document.getElementById('resultText')
const imgInp = document.getElementById('image-url');
const addBtn = document.getElementById('image-add-btn')

function addPhoto() {
    if (!imgInp.value.trim()) {
        alert("Please enter an image URL");
        return;
    }

    axios
        .post("http://localhost:3000/postimg", {
            url: imgInp.value.trim()
        })
        .then((res) => {
            console.log(res);
            console.log("Photo added:", res.data);
            imgInp.value = "";
            setTimeout(() => {
                if (res.status == 200) {
                    resultText.innerHTML = 'Photo added successfully!'
                    window.location.href = '../index.html'
                }
            }, 2000);
        })
        .catch((err) => {
            console.error("Error adding photo:", err);
        });
}


addBtn.addEventListener('click', addPhoto)