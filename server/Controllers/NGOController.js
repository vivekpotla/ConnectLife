import Slot from '../Models/Slot.js';
import Camp from '../Models/Camp.js';
import NGO from '../Models/NGO.js';
import Volunteer from '../Models/Volunteer.js';
import Donor from '../Models/Donor.js';


//NGO Register
export const registerNGO = async (req, res) => {


  try {
    const { name, email, password, phoneNumber, address, description } = req.body;

    // Check if NGO with the provided email or phone number already exists
    const existingNGO = await NGO.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingNGO) {
      return res.status(400).json({ message: 'NGO with this email or phone number already exists' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new NGO
    const newNGO = await NGO.create({
      name,
      email,
      password: password,
      phoneNumber,
      address,
      description
    });

    res.status(201).json({ message: 'NGO registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//NGO Login
export const loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if NGO with the provided email exists
    const NGOData = await NGO.findOne({ email });
    if (!NGOData) {
      return res.status(404).json({ message: 'NGO not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, NGOData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    // const token = jwt.sign({ id: NGOData._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//create camp
export const createBloodDonationCamp = async (req, res) => {
  try {
    const {
      ngoId,
      location,
      description,
      startDate,
      endDate,
      maxDonorsPerSlot,
      startTime,
      endTime,
      longitude,
      latitude

    } = req.body;

    if (!startTime || !endTime) {
      return res.status(400).json({ message: 'Start time and end time of the day are required' });
    }

    const newCamp = await Camp.create({
      ngo: ngoId,
      location,
      geolocation: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      description,
      startDate,
      endDate,
      maxDonorsPerSlot,
      startTime,
      endTime,

    });

    const sD = new Date(startDate);
    const eD = new Date(endDate);
    // Calculate the difference in milliseconds
    const differenceInMs = eD.getTime() - sD.getTime();
    // Convert milliseconds to days
    const durationInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    //creating slots
    for (let i = 0; i < durationInDays + 1; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const startHour = parseInt(startTime.split(':')[0]);
      console.log("Start ", startHour)
      const endHour = parseInt(endTime.split(':')[0]);
      console.log("End ", endHour)
      for (let j = startHour; j < endHour; j++) {
        const slotStartTime = `${j}:00`;
        const slotEndTime = `${j + 1}:00`;

        for (let k = 0; k < 1; k++) {
          console.log("Slot created")
          await Slot.create({
            camp: newCamp._id,
            date: currentDate,
            startTime: slotStartTime,
            endTime: slotEndTime,
            maxDonorsPerSlot,
            slotsLeft: maxDonorsPerSlot
          });
        }
      }
    }

    // notifyUsers({campId:newCamp._id})
    res.json(newCamp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//notifying volunteers function
const notifyVolunteers = (volunteers, Camp) => {
  //Message logic






  console.log('Notifying volunteers:', volunteers);
};

const notifyDonors = (Donors, Camp) => {
  //Message Logic






  console.log('Notifying Donors:', Donors);
};


//Notify Donors and Volunteers for a camp separately
export const notifyUsers = async (req, res) => {


  const { campId } = req.body;
  let camp = Camp.find({ _id: campId });
  //Notify nearest volunteers and Donors code 
  let maxDistance = 10; //kms

  const nearestVolunteers = await Volunteer.find({
    livelocation: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [camp.geolocation.coordinates[0], camp.geolocation.coordinates[1]] // Specify camp location coordinates
        },
        $maxDistance: maxDistance * 1000 // Convert kilometers to meters
      }
    }
  });
  // Notify the nearest volunteers !!!! send the camp details also
  notifyVolunteers(nearestVolunteers, camp);
  //notify the nearest donors
  const nearestDonors = await Donor.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [camp.geolocation.coordinates[0], camp.geolocation.coordinates[1]]
        },
        $maxDistance: maxDistance * 1000
      }
    }
  });
  //notify the donors, send the camp detailss!!!!!!!
  notifyDonors(nearestDonors, camp);
};



//Get Previously Organized Camps
export const getPreviousCamps = async (req, res) => {
  try {
    const { ngoId } = req.body;

    // Find previous camps organized by the NGO
    const previousCamps = await Camp.find({ ngo: ngoId });

    res.json(previousCamps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};