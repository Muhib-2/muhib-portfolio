const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  profile: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    location: String,
    profileImage: String,
    resume: String
  },
  
  about: {
    description: { type: String, required: true },
    highlights: [String]
  },
  
  skills: [{
    category: { type: String, required: true },
    items: [String]
  }],
  
  techStack: [{
    name: { type: String, required: true },
    icon: String,
    category: String
  }],
  
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: String,
    startDate: Date,
    endDate: Date,
    description: String,
    gpa: String
  }],
  
  experience: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    description: String,
    technologies: [String]
  }],
  
  projects: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
    technologies: [String],
    liveUrl: String,
    githubUrl: String,
    featured: { type: Boolean, default: false }
  }],
  
  contact: {
    email: { type: String, required: true },
    phone: String,
    social: {
      linkedin: String,
      github: String,
      twitter: String,
      website: String
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);