import Slot from '../Models/Slot.js';
import Camp from '../Models/Camp.js';

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
      
    } = req.body;

    if (!startTime || !endTime) {
      return res.status(400).json({ message: 'Start time and end time of the day are required' });
    }

    const newCamp = await Camp.create({
      ngo: ngoId,
      location,
      description,
      startDate,
      endDate,
      maxDonorsPerSlot,
      startTime,
      endTime,
      
    });

    const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    for (let i = 0; i < durationInDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const startHour = parseInt(startTime.split(':')[0]);
      const endHour = parseInt(endTime.split(':')[0]);

      for (let j = startHour; j < endHour; j++) {
        const slotStartTime = `${j}:00`;
        const slotEndTime = `${j + 1}:00`;

        for (let k = 0; k < slotsPerHour; k++) {
          await Slot.create({
            camp: newCamp._id,
            date: currentDate,
            startTime: slotStartTime,
            endTime: slotEndTime,
            maxDonorsPerSlot,
            slotsLeft:maxDonorsPerSlot
          });
        }
      }
    }

    res.json(newCamp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
