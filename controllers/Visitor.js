import Visitor from '../models/Visitor.js';
import axios from 'axios';

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
    const fetchPromises = visitors.map((e) => {
      return fetch(
        `http://api.ipstack.com/${e.ip}?access_key=${process.env.IPSTACK_API}`,
      )
        .then((res) => res.json())
        .then((data) => data.country_name)
        .catch((error) => {
          console.error('Error fetching IP data:', error);
          return null;
        });
    });

    const countries = await Promise.all(fetchPromises);
    const countryCount = {};

    countries.forEach((country) => {
      if (!countryCount[country]) {
        countryCount[country] = 1;
      } else {
        countryCount[country]++;
      }
    });
    res.status(200).json(countryCount);
  } catch (err) {
    console.log(err);
  }
};
