const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./views'));

const htmlRoutes = require('./controllers/client/htmlRoutes');
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})