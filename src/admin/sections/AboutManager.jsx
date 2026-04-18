import { useState } from 'react';
import { HiPencil, HiCheck, HiXMark } from 'react-icons/hi2';
import { PORTFOLIO_DATA } from '../../context/PortfolioContext';

export default function AboutManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    introHeading: PORTFOLIO_DATA.about.introHeading,
    introHeadingHighlight: PORTFOLIO_DATA.about.introHeadingHighlight,
    introDescription: PORTFOLIO_DATA.about.introDescription,
    location: PORTFOLIO_DATA.about.location,
    role: PORTFOLIO_DATA.about.role,
    education: PORTFOLIO_DATA.about.education,
    languages: PORTFOLIO_DATA.about.languages,
    yearsOfExperience: PORTFOLIO_DATA.about.yearsOfExperience,
    projectsDone: PORTFOLIO_DATA.about.projectsDone,
  });

  const handleSave = () => {
    // Here you would typically save to a backend/database
    console.log('Saving about data:', formData);
    setIsEditing(false);
    // Show success message
    alert('About section updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      introHeading: PORTFOLIO_DATA.about.introHeading,
      introHeadingHighlight: PORTFOLIO_DATA.about.introHeadingHighlight,
      introDescription: PORTFOLIO_DATA.about.introDescription,
      location: PORTFOLIO_DATA.about.location,
      role: PORTFOLIO_DATA.about.role,
      education: PORTFOLIO_DATA.about.education,
      languages: PORTFOLIO_DATA.about.languages,
      yearsOfExperience: PORTFOLIO_DATA.about.yearsOfExperience,
      projectsDone: PORTFOLIO_DATA.about.projectsDone,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">About Section</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn-primary text-sm">
            <HiPencil className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary text-sm">
              <HiCheck className="w-4 h-4" />
              Save
            </button>
            <button onClick={handleCancel} className="btn-outline text-sm">
              <HiXMark className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Intro Heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Intro Heading</label>
            <input
              type="text"
              value={formData.introHeading}
              onChange={(e) => setFormData({ ...formData, introHeading: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Heading Highlight</label>
            <input
              type="text"
              value={formData.introHeadingHighlight}
              onChange={(e) => setFormData({ ...formData, introHeadingHighlight: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
          <textarea
            value={formData.introDescription}
            onChange={(e) => setFormData({ ...formData, introDescription: e.target.value })}
            disabled={!isEditing}
            rows={4}
            className="form-input disabled:opacity-60 disabled:cursor-not-allowed resize-none"
          />
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Education</label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Languages</label>
            <input
              type="text"
              value={formData.languages}
              onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Years of Experience</label>
            <input
              type="number"
              value={formData.yearsOfExperience}
              onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Projects Done</label>
            <input
              type="number"
              value={formData.projectsDone}
              onChange={(e) => setFormData({ ...formData, projectsDone: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
