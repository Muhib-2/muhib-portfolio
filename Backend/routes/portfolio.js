const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

// GET /api/portfolio - Get portfolio data
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      // Create default portfolio if none exists
      portfolio = new Portfolio({
        profile: {
          name: 'Your Name',
          title: 'Full Stack Developer',
          bio: 'Passionate developer creating amazing web experiences',
          email: 'your.email@example.com'
        },
        about: {
          description: 'Add your about description here'
        },
        skills: [],
        techStack: [],
        education: [],
        experience: [],
        projects: [],
        contact: {
          email: 'your.email@example.com'
        }
      });
      await portfolio.save();
    }
    
    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/portfolio - Update portfolio data (protected)
router.put('/', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      portfolio = new Portfolio(req.body);
    } else {
      Object.assign(portfolio, req.body);
    }
    
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/portfolio/section/:section - Update specific section
router.put('/section/:section', auth, async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = req.body;
    
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    portfolio[section] = updateData;
    await portfolio.save();
    
    res.json(portfolio);
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;