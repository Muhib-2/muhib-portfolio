import { useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';
import { PORTFOLIO_DATA } from '../../context/PortfolioContext';

export default function SkillsManager() {
  // Flatten skills from all categories for easier management
  const flattenSkills = () => {
    const allSkills = [];
    PORTFOLIO_DATA.skillCategories.forEach((category, categoryIndex) => {
      category.skills.forEach((skill, skillIndex) => {
        allSkills.push({
          ...skill,
          id: `${categoryIndex}-${skillIndex}`,
          category: category.name,
          categoryColor: category.color,
        });
      });
    });
    return allSkills;
  };

  const [skills, setSkills] = useState(flattenSkills());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    level: 90,
    category: 'Frontend',
    color: '#00d4ff',
  });

  const categories = PORTFOLIO_DATA.skillCategories.map(cat => ({
    name: cat.name,
    color: cat.color,
  }));

  const handleAdd = () => {
    const newSkill = {
      id: Date.now().toString(),
      ...formData,
      categoryColor: categories.find(cat => cat.name === formData.category)?.color || '#00d4ff',
    };
    setSkills([...skills, newSkill]);
    setFormData({ name: '', icon: '', level: 90, category: 'Frontend', color: '#00d4ff' });
    setIsAdding(false);
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      icon: skill.icon,
      level: skill.level,
      category: skill.category,
      color: skill.color,
    });
  };

  const handleUpdate = () => {
    setSkills(skills.map(skill => 
      skill.id === editingId ? { 
        ...skill, 
        ...formData,
        categoryColor: categories.find(cat => cat.name === formData.category)?.color || '#00d4ff',
      } : skill
    ));
    setEditingId(null);
    setFormData({ name: '', icon: '', level: 90, category: 'Frontend', color: '#00d4ff' });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', icon: '', level: 90, category: 'Frontend', color: '#00d4ff' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">Skills</h2>
        {!isAdding && !editingId && (
          <button onClick={() => setIsAdding(true)} className="btn-primary text-sm">
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
                <div key={skill.id} className="glass-card p-4 lg:p-5 rounded-2xl">
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
                      >
                        <HiPencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
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
