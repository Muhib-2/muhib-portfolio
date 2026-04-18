import { useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';

const initialExperience = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Developed and maintained web applications using React, Node.js, and MongoDB.',
    achievements: [
      'Built responsive web applications',
      'Improved performance by 40%',
      'Led team of 3 developers',
    ],
  },
];

export default function ExperienceManager() {
  const [experience, setExperience] = useState(initialExperience);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    period: '',
    description: '',
    achievements: [''],
  });

  const handleAdd = () => {
    const newExperience = {
      id: Date.now(),
      ...formData,
      achievements: formData.achievements.filter(a => a.trim() !== ''),
    };
    setExperience([...experience, newExperience]);
    setFormData({ title: '', company: '', period: '', description: '', achievements: [''] });
    setIsAdding(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleUpdate = () => {
    setExperience(experience.map(item => 
      item.id === editingId ? { ...item, ...formData, achievements: formData.achievements.filter(a => a.trim() !== '') } : item
    ));
    setEditingId(null);
    setFormData({ title: '', company: '', period: '', description: '', achievements: [''] });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setExperience(experience.filter(item => item.id !== id));
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">Experience</h2>
        {!isAdding && !editingId && (
          <button onClick={() => setIsAdding(true)} className="btn-primary text-sm">
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Key Achievements</label>
            <div className="space-y-2">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    className="form-input flex-1"
                    placeholder="Achievement..."
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
                + Add Achievement
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={isAdding ? handleAdd : handleUpdate}
              className="btn-primary text-sm"
            >
              <HiCheck className="w-4 h-4" />
              {isAdding ? 'Add' : 'Update'}
            </button>
            <button onClick={handleCancel} className="btn-outline text-sm">
              <HiXMark className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-200">{item.title}</h3>
                <p className="text-sm text-[#00d4ff]">{item.company}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff] transition-colors"
                >
                  <HiPencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-3">{item.period}</p>
            <p className="text-sm text-slate-400 mb-3">{item.description}</p>
            {item.achievements && item.achievements.length > 0 && (
              <ul className="space-y-1">
                {item.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-1">•</span>
                    {achievement}
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
