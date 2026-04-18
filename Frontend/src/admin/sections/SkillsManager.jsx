import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    level: 90,
    category: 'Frontend',
    color: '#00d4ff',
  });

  const categories = [
    { name: 'Frontend', color: '#00d4ff' },
    { name: 'Backend', color: '#7c3aed' },
    { name: 'Database', color: '#10b981' },
    { name: 'Tools', color: '#f59e0b' },
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      // Convert backend skills format to frontend format
      const flatSkills = (data.skills || []).flatMap((skillCategory, catIndex) => 
        (skillCategory.items || []).map((item, itemIndex) => ({
          _id: `${catIndex}-${itemIndex}`,
          name: item,
          icon: '',
          level: 90,
          category: skillCategory.category,
          categoryColor: categories.find(c => c.name === skillCategory.category)?.color || '#00d4ff',
          color: categories.find(c => c.name === skillCategory.category)?.color || '#00d4ff',
        }))
      );
      setSkills(flatSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      alert('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const saveSkills = async (updatedSkills) => {
    try {
      setSaving(true);
      // Convert frontend format back to backend format
      const skillsByCategory = {};
      updatedSkills.forEach(skill => {
        if (!skillsByCategory[skill.category]) {
          skillsByCategory[skill.category] = [];
        }
        skillsByCategory[skill.category].push(skill.name);
      });

      const backendFormat = Object.entries(skillsByCategory).map(([category, items]) => ({
        category,
        items,
      }));

      await portfolioAPI.updateSection('skills', backendFormat);
      setSkills(updatedSkills);
      alert('Skills updated successfully!');
    } catch (error) {
      console.error('Error saving skills:', error);
      alert('Failed to save skills: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    const newSkill = {
      _id: Date.now().toString(),
      ...formData,
      categoryColor: categories.find(cat => cat.name === formData.category)?.color || '#00d4ff',
    };
    const updatedSkills = [...skills, newSkill];
    await saveSkills(updatedSkills);
    setFormData({ name: '', icon: '', level: 90, category: 'Frontend', color: '#00d4ff' });
    setIsAdding(false);
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setFormData({
      name: skill.name,
      icon: skill.icon,
      level: skill.level,
      category: skill.category,
      color: skill.color,
    });
  };

  const handleUpdate = async () => {
    const updatedSkills = skills.map(skill => 
      skill._id === editingId ? { 
        ...skill, 
        ...formData,
        categoryColor: categories.find(cat => cat.name === formData.category)?.color || '#00d4ff',
      } : skill
    );
    await saveSkills(updatedSkills);
    setEditingId(null);
    setFormData({ name: '', icon: '', level: 90, category: 'Frontend', color: '#00d4ff' });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      const updatedSkills = skills.filter(skill => skill._id !== id);
      await saveSkills(updatedSkills);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', icon: '', level: 90, category: 'Frontend', color: '#00d4ff' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">Skills</h2>
        {!isAdding && !editingId && (
          <button onClick={() => setIsAdding(true)} className="btn-primary text-sm" disabled={saving}>
            <HiPlus className="w-4 h-4" />
            Add Skill
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="glass-card p-4 lg:p-6 rounded-2xl mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            {isAdding ? 'Add New Skill' : 'Edit Skill'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="e.g., React.js"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-input"
              >
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Icon Name (React Icons)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="form-input"
              placeholder="e.g., FaReact"
            />
            <p className="text-xs text-slate-500 mt-1">Use React Icons names (e.g., FaReact, SiTailwindcss)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Proficiency Level: {formData.level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/[0.08] rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #00d4ff ${formData.level}%, rgba(255,255,255,0.08) ${formData.level}%)`
              }}
            />
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

      {/* Skills by Category */}
      {categories.map(category => {
        const categorySkills = skills.filter(skill => skill.category === category.name);
        
        if (categorySkills.length === 0) return null;

        return (
          <div key={category.name} className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <div key={skill._id} className="glass-card p-4 lg:p-5 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: skill.color || category.color }}
                      >
                        {skill.icon ? skill.icon.slice(0, 2) : skill.name.slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-slate-200 truncate">{skill.name}</h4>
                        <p className="text-xs text-slate-500">{skill.level}% proficiency</p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff] transition-colors"
                        disabled={saving}
                      >
                        <HiPencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                        disabled={saving}
                      >
                        <HiTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${skill.level}%`,
                        backgroundColor: skill.color || category.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
