import express from 'express';
import Hotel from '../model/hotel.js';
import { createError } from '../utils/error.js';

const router = express.Router();

//CREATE
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
});

//UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted.');
  } catch (err) {
    next(err);
  }
});

//GET
router.get('/', async (req, res, next) => {
  const failed = true;

  if (failed) return next(createError(401, 'Your are not authenticated'));

  try {
    const hotels = await Hotel.findById('adfasdfdf');
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
});

export default router;
