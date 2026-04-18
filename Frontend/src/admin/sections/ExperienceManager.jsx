import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';

export default function ExperienceManager() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    period: '',
    description: '',
    achievements: [''],
  });

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      setExperience(data.experience || []);
    } catch (error) {
      console.error('Error fetching experience:', error);
      alert('Failed to load experience data');
    } finally {
      setLoading(false);
    }
  };

  const saveExperience = async (updatedExperience) => {
    try {
      setSaving(true);
      await portfolioAPI.updateSection('experience', updatedExperience);
      setExperience(updatedExperience);
      alert('Experience updated successfully!');
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Failed to save experience: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    const newExperience = {
      _id: Date.now().toString(),
      company: formData.company,
      position: formData.title,
      startDate: new Date(),
      current: false,
      description: formData.description,
      technologies: formData.achievements.filter(a => a.trim() !== ''),
    };
    const updatedExperience = [...experience, newExperience];
    await saveExperience(updatedExperience);
    setFormData({ title: '', company: '', period: '', description: '', achievements: [''] });
    setIsAdding(false);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.position,
      company: item.company,
      period: item.current ? 'Present' : '',
      description: item.description,
      achievements: item.technologies || [''],
    });
  };

  const handleUpdate = async () => {
    const updatedExperience = experience.map(item => 
      item._id === editingId ? { 
        ...item, 
        company: formData.company,
        position: formData.title,
        description: formData.description,
        technologies: formData.achievements.filter(a => a.trim() !== ''),
      } : item
    );
    await saveExperience(updatedExperience);
    setEditingId(null);
    setFormData({ title: '', company: '', period: '', description: '', achievements: [''] });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      const updatedExperience = experience.filter(item => item._id !== id);
      await saveExperience(updatedExperience);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', company: '', period: '', description: '', achievements: [''] });
  };

  const addAchievement = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ''] });
  };

  const updateAchievement = (index, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const removeAchievement = (index) => {
    setFormData({ ...formData, achievements: formData.achievements.filter((_, i) => i !== index) });
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
        <h2 className="text-2xl font-bold font-display text-gradient">Experience</h2>
        {!isAdding && !editingId && (
          <button onClick={() => setIsAdding(true)} className="btn-primary text-sm" disabled={saving}>
            <HiPlus className="w-4 h-4" />
            Add Experience
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="glass-card p-6 rounded-2xl mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            {isAdding ? 'Add New Experience' : 'Edit Experience'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                placeholder="e.g., Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="form-input"
                placeholder="e.g., Tech Company"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Period</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="form-input"
              placeholder="e.g., 2022 - Present"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="form-input resize-none"
              placeholder="Brief description of your role..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Key Technologies/Achievements</label>
            <div className="space-y-2">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    className="form-input flex-1"
                    placeholder="Technology or achievement..."
                  />
                  {formData.achievements.length > 1 && (
                    <button
                      onClick={() => removeAchievement(index)}
                      className="p-3 rounded-xl hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addAchievement}
                className="text-sm text-[#00d4ff] hover:text-[#00aad4] transition-colors"
              >
                + Add Item
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={isAdding ? handleAdd : handleUpdate}
              className="btn-primary text-sm"
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <HiCheck className="w-4 h-4" />
                  {isAdding ? 'Add' : 'Update'}
                </>
              )}
            </button>
            <button onClick={handleCancel} className="btn-outline text-sm" disabled={saving}>
              <HiXMark className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((item) => (
          <div key={item._id} className="glass-card p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-200">{item.position}</h3>
                <p className="text-sm text-[#00d4ff]">{item.company}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff] transition-colors"
                  disabled={saving}
                >
                  <HiPencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                  disabled={saving}
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-3">{item.current ? 'Present' : 'Past'}</p>
            <p className="text-sm text-slate-400 mb-3">{item.description}</p>
            {item.technologies && item.technologies.length > 0 && (
              <ul className="space-y-1">
                {item.technologies.map((tech, idx) => (
                  <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-1">•</span>
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
