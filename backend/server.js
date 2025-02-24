const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());

const crime = async (req, res) => {
    try {
        const fbiAPI = 'https://api.fbi.gov/wanted/v1/list';
        const response = await axios.get(fbiAPI, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }});
        res.send(response.data.items.map((item) => {
            return {
                "aliases": item.aliases,
                "race": item.race,
            }
        }));
    } catch (error) {
        console.error(error);
    }
};

app.get("/crime", crime);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});