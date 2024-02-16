import Slot from '../Models/Slot.js';
import Camp from '../Models/Camp.js';
import NGO from '../Models/NGO.js';
import Volunteer from '../Models/Volunteer.js';
import Donor from '../Models/Donor.js';
import Appointment from '../Models/Appointment.js';
import BloodQuantity from '../Models/BloodQuantity.js';


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
      latitude,
      name

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
      name

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

export const checkBloodQuantity = async (req, res) => {
  try {
    // Extract the camp ID from the request body
    const { campId } = req.body;

    // Find the blood quantity for the specified camp
    const bloodQuantity = await BloodQuantity.findOne({ camp: campId });
    if (!bloodQuantity) {
      return res.status(404).json({ message: 'Blood quantity data not found for the specified camp' });
    }

    // Prepare the response object
  // Find the camp details
  const camp = await Camp.findById(campId);
  if (!camp) {
    return res.status(404).json({ message: 'Camp details not found for the specified camp' });
  }

  // Prepare the response object
  const response = {
    campId: bloodQuantity.camp,
    campName: camp.name,
    campAddress: camp.location,
    bloodQuantity: {
      A_positive: bloodQuantity.A_positive,
      A_negative: bloodQuantity.A_negative,
      B_positive: bloodQuantity.B_positive,
      B_negative: bloodQuantity.B_negative,
      AB_positive: bloodQuantity.AB_positive,
      AB_negative: bloodQuantity.AB_negative,
      O_positive: bloodQuantity.O_positive,
      O_negative: bloodQuantity.O_negative
    }
  };


    // Send the response
    res.status(200).json(response);
  } catch (error) {
    console.error('Error checking blood quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDonorsInCamp = async (req, res) => {
  try {
    const { campId } = req.body;

    // Find appointments where camp ID matches
    const appointments = await Appointment.find({ camp: campId }).populate('donor', 'name email phoneNumber donated');

    // Extract donor details from appointments
    const donors = {
      donated: [],
      notDonated: []
    };

    for (const appointment of appointments) {
      const donorDetails = {
        donorId: appointment.donor._id,
        name: appointment.donor.name,
        email: appointment.donor.email,
        phoneNumber: appointment.donor.phoneNumber
      };

      if (appointment.donated) {
        donors.donated.push(donorDetails);
      } else {
        donors.notDonated.push(donorDetails);
      }
    }

    // Get slot details for not donated appointments
    for (const donor of donors.notDonated) {
      const donorId = donor.donorId;
      const donorAppointments = await Appointment.find({ donor: donorId, donated: false }).populate('slot', 'date startTime endTime');
      const slotDetails = donorAppointments.map(appointment => ({
        date: appointment.slot.date,
        startTime: appointment.slot.startTime,
        endTime: appointment.slot.endTime
      }));
      donor.slotDetails = slotDetails;
    }
    for (const donor of donors.donated) {
      const donorId = donor.donorId;
      const donorAppointments = await Appointment.find({ donor: donorId, donated: true }).populate('slot', 'date startTime endTime');
      const slotDetails = donorAppointments.map(appointment => ({
        date: appointment.slot.date,
        startTime: appointment.slot.startTime,
        endTime: appointment.slot.endTime
      }));
      donor.slotDetails = slotDetails;
    }


    res.json(donors);
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