import Visitor from '../models/Visitor.js';
import axios from 'axios';
import ipinfo from 'ipinfo';

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

export const getVisitorsDetailed = async (req, res) => {
  try {
    const visitors = await Visitor.find();

    const fetchPromises = visitors.map(async (e) => {
      try {
        const res = await ipinfo(e.ip, 'dec2b9385eb179');
        console.log(res);
        return res.country;
      } catch (err) {
        console.log(err);
        return null;
      }
    });

    const countries = await Promise.all(fetchPromises);

    const countryCount = [];

    countries.forEach((country) => {
      const existingCountry = countryCount.find(
        (item) => item.country === country,
      );
      if (existingCountry) {
        existingCountry.count++;
      } else {
        countryCount.push({ country, count: 1 });
      }
    });

    res.status(200).json(countryCount);
  } catch (err) {
    console.log(err);
  }
};
