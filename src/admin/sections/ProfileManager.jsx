import { useState } from 'react';
import { HiPencil, HiCheck, HiXMark, HiPlus, HiTrash } from 'react-icons/hi2';
import { PORTFOLIO_DATA } from '../../context/PortfolioContext';

export default function ProfileManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    name: PORTFOLIO_DATA.name,
    role: PORTFOLIO_DATA.role,
    heroDescription: PORTFOLIO_DATA.heroDescription,
    cvUrl: PORTFOLIO_DATA.cvUrl,
    profileImage: '/src/assets/muhib.png', // Add this to portfolio data
    
    // About Info
    title: PORTFOLIO_DATA.about.introHeading,
    shortDescription: PORTFOLIO_DATA.about.introDescription,
    location: PORTFOLIO_DATA.about.location,
    roleDetail: PORTFOLIO_DATA.about.role,
    education: PORTFOLIO_DATA.about.education,
    languages: PORTFOLIO_DATA.about.languages,
    
    // Social Media
    socials: [...PORTFOLIO_DATA.socials],
  });

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: PORTFOLIO_DATA.name,
      role: PORTFOLIO_DATA.role,
      heroDescription: PORTFOLIO_DATA.heroDescription,
      cvUrl: PORTFOLIO_DATA.cvUrl,
      profileImage: '/src/assets/muhib.png',
      title: PORTFOLIO_DATA.about.introHeading,
      shortDescription: PORTFOLIO_DATA.about.introDescription,
      location: PORTFOLIO_DATA.about.location,
      roleDetail: PORTFOLIO_DATA.about.role,
      education: PORTFOLIO_DATA.about.education,
      languages: PORTFOLIO_DATA.about.languages,
      socials: [...PORTFOLIO_DATA.socials],
    });
    setIsEditing(false);
  };

  const addSocial = () => {
    setFormData({
      ...formData,
      socials: [...formData.socials, { id: '', label: '', href: '', icon: '' }]
    });
  };

  const updateSocial = (index, field, value) => {
    const newSocials = [...formData.socials];
    newSocials[index][field] = value;
    setFormData({ ...formData, socials: newSocials });
  };

  const removeSocial = (index) => {
    setFormData({
      ...formData,
      socials: formData.socials.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">Profile Management</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn-primary text-sm">
            <HiPencil className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary text-sm">
              <HiCheck className="w-4 h-4" />
              Save Changes
            </button>
            <button onClick={handleCancel} className="btn-outline text-sm">
              <HiXMark className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Primary Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                disabled={!isEditing}
                className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="e.g., Frontend Developer"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">Hero Description</label>
            <textarea
              value={formData.heroDescription}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed resize-none"
              placeholder="Brief description for hero section"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">CV/Resume URL</label>
              <input
                type="text"
                value={formData.cvUrl}
                onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                disabled={!isEditing}
                className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="/path/to/cv.pdf"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Profile Image URL</label>
              <input
                type="text"
                value={formData.profileImage}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                disabled={!isEditing}
                className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="/path/to/profile-image.png"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">About Section</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">Title (Who Am I)</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">Short Description</label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              disabled={!isEditing}
              rows={4}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed resize-none"
              placeholder="Brief description about yourself"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">📍 Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditing}
                className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Malaysia (Available Remotely)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">💼 Role</label>
              <input
                type="text"
                value={formData.roleDetail}
                onChange={(e) => setFormData({ ...formData, roleDetail: e.target.value })}
                disabled={!isEditing}
                className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Frontend & Full Stack Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">🎓 Education</label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                disabled={!isEditing}
                className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Bachelor's in Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">🌍 Languages</label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                disabled={!isEditing}
                className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="English, Arabic"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-200">Social Media Handles</h3>
            {isEditing && (
              <button onClick={addSocial} className="btn-outline text-sm">
                <HiPlus className="w-4 h-4" />
                Add Social
              </button>
            )}
          </div>

          <div className="space-y-4">
            {formData.socials.map((social, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/[0.02] rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Platform ID</label>
                  <input
                    type="text"
                    value={social.id}
                    onChange={(e) => updateSocial(index, 'id', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="github"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Label</label>
                  <input
                    type="text"
                    value={social.label}
                    onChange={(e) => updateSocial(index, 'label', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="GitHub"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">URL</label>
                  <input
                    type="url"
                    value={social.href}
                    onChange={(e) => updateSocial(index, 'href', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Icon</label>
                    <input
                      type="text"
                      value={social.icon}
                      onChange={(e) => updateSocial(index, 'icon', e.target.value)}
                      disabled={!isEditing}
                      className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="FaGithub"
                    />
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => removeSocial(index)}
                      className="p-3 rounded-xl hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}