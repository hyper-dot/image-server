import Visitor from '../models/Visitor.js';

export const addVisitor = async (req, res) => {
  const { ip } = req.body;
  try {
    const visitor = await Visitor.findOne({ ip });
    if (!visitor) {
      const newVisitor = new Visitor({
        ip: ip,
      });
      await newVisitor.save();
    }
    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    return res.status(500).json({ message: 'server error' });
  }
};

export const getVisitiors = async (req, res) => {
  try {
    const count = await Visitor.countDocuments({});
    return res.status(200).json({ count });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server error' });
  }
};
