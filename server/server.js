import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
// import donorrouter from "./Routes/DonorRoute";
// import volunteerroute from "./Routes/VolunteerRoute";
// import ngoroute from "./Routes/NGORoute";


dotenv.config();
const App = express();
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err))

App.use(cors());
App.use(express.json());
// App.use("/api/donor", donorrouter);
// App.use("/api/ngo", ngoroute);
// App.use("/api/volunteer", volunteerroute);


// ------------deployment------------
const __dirname = path.resolve();
//Serve Static assets if in production
if (process.env.NODE_ENV === 'production') {
    App.use(express.static('client/build'));

    App.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// ------------deployment--------------

const PORT = process.env.PORT;
App.listen(PORT || 5000, () => console.log(`server listening on port ${PORT}`));

