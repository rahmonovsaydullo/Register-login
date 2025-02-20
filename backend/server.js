const express = require("express")
const app = express()
const { Pool } = require("pg")
const cors = require("cors")

// Middleware
app.use(express.json())
app.use(cors())

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "navruz",
    password: "12345qwerty",
    port: 5432
})

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users')
        res.json(result.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/user/username', async (req, res) => {
    try {
        const username = req.query.username;
        const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [username]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/allphotos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM photos')
        res.json(result.rows)
    } catch (error) {
        res.status(500).send(error.message);

    }
})



app.get('/login', async (req, res) => {
    try {
        let { user_name, password } = req.body
        const result = await pool.query(`SELECT * FROM users WHERE user_name = $1 AND password = $2`,
            [user_name, password]
        )
        if (result.rows.length == 0) {
            res.status(401).send({ message: 'Invalid username or password' })
        }
        res.status(200).send(`Username: ${user_name} Password: ${password}`);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, user_name, password } = req.body
        const userExists = await pool.query('SELECT * FROM users WHERE user_name = $1', [user_name]);
        if (userExists.rows.length > 0) {
            return res.status(400).send('Username already taken. Please choose another.');
        }
        const result = await pool.query(`
            INSERT INTO users (first_name, last_name, user_name, password) 
            VALUES ('${first_name}', '${last_name}', '${user_name}', '${password}')`)
        res.json(result.rows)
    } catch (error) {
        console.log(error.message);

        res.status(500).send(error.message)
    }
})

app.post('/login', async (req, res) => {
    try {
        let { user_name, password } = req.body
        res.send(`Username: ${user_name} Password: ${password}`);

    } catch (error) {
        res.status(500).send(error.message)
    }
})


app.post('/postimg', async (req, res) => {
    try {
        const { url } = req.body;
        const result = await pool.query(`INSERT INTO photos (url) VALUES ($1) RETURNING *`, [url]);
        res.json({ message: "Photo added successfully", photo: result.rows[0] });
    } catch (error) {
        console.log(error);

        res.status(500).send(error.message);
    }
});


// ! Photos api
app.post('/photos', async (req, res) => {
    try {
        const { url, userId } = req.body;
        const result = await pool.query(`
        INSERT INTO photos(url, userId)
        VALUES($1, $2) RETURNING *`, [url, userId])
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error.message);
    }
})



app.get('/photos', async (req, res) => {
    try {
        const { userId } = req.query
        if (userId) {
            const resultUser = await pool.query("SELECT * FROM photos WHERE userId = $1", [userId])
            return res.status(200).json(resultUser.rows)
        };
        const result = await pool.query("SELECT * FROM photos")
        res.status(200).json(result.rows)

    } catch (error) {
        res.status(500).send(error.message);

    }
})



// Port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

