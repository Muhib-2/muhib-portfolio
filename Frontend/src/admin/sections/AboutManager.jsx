import { useState, useEffect } from 'react';
import { HiPencil, HiCheck, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';

export default function AboutManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    introHeading: '',
    introHeadingHighlight: '',
    introDescription: '',
    location: '',
    role: '',
    education: '',
    languages: '',
    yearsOfExperience: '',
    projectsDone: '',
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      setFormData({
        introHeading: data.about?.description || '',
        introHeadingHighlight: data.about?.highlights?.[0] || '',
        introDescription: data.about?.highlights?.[1] || '',
        location: data.profile?.location || '',
        role: data.profile?.title || '',
        education: data.education?.[0]?.degree || '',
        languages: data.profile?.languages || '',
        yearsOfExperience: data.profile?.yearsOfExperience || '',
        projectsDone: data.profile?.projectsDone || '',
      });
    } catch (error) {
      console.error('Error fetching about data:', error);
      alert('Failed to load about data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updateData = {
        about: {
          description: formData.introHeading,
          highlights: [formData.introHeadingHighlight, formData.introDescription],
        },
        profile: {
          location: formData.location,
          title: formData.role,
          languages: formData.languages,
          yearsOfExperience: formData.yearsOfExperience,
          projectsDone: formData.projectsDone,
        },
      };
      await portfolioAPI.updatePortfolio(updateData);
      setIsEditing(false);
      alert('About section updated successfully!');
    } catch (error) {
      console.error('Error saving about data:', error);
      alert('Failed to save about data: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    fetchAboutData();
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">About Section</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn-primary text-sm" disabled={loading}>
            <HiPencil className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary text-sm" disabled={saving}>
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <HiCheck className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
            <button onClick={handleCancel} className="btn-outline text-sm" disabled={saving}>
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
