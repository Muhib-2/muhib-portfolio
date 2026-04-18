import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';

export default function TechStackManager() {
  const [techStack, setTechStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [techForm, setTechForm] = useState({
    name: '',
    icon: '',
    category: 'Frontend'
  });

  useEffect(() => {
    fetchTechStack();
  }, []);

  const fetchTechStack = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      setTechStack(data.techStack || []);
    } catch (error) {
      console.error('Error fetching tech stack:', error);
      alert('Failed to load tech stack');
    } finally {
      setLoading(false);
    }
  };

  const saveTechStack = async (updatedTechStack) => {
    try {
      setSaving(true);
      await portfolioAPI.updateSection('techStack', updatedTechStack);
      setTechStack(updatedTechStack);
      alert('Tech stack updated successfully!');
    } catch (error) {
      console.error('Error saving tech stack:', error);
      alert('Failed to save tech stack: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTech = async () => {
    const newTech = {
      _id: Date.now().toString(),
      ...techForm
    };
    const updatedTechStack = [...techStack, newTech];
    await saveTechStack(updatedTechStack);
    setTechForm({ name: '', icon: '', category: 'Frontend' });
    setIsAdding(false);
  };

  const handleEditTech = (tech) => {
    setEditingId(tech._id);
    setTechForm({
      name: tech.name,
      icon: tech.icon,
      category: tech.category
    });
  };

  const handleUpdateTech = async () => {
    const updatedTechStack = techStack.map(tech =>
      tech._id === editingId ? { ...tech, ...techForm } : tech
    );
    await saveTechStack(updatedTechStack);
    setEditingId(null);
    setTechForm({ name: '', icon: '', category: 'Frontend' });
  };

  const handleDeleteTech = async (techId) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      const updatedTechStack = techStack.filter(tech => tech._id !== techId);
      await saveTechStack(updatedTechStack);
    }
  };

  const cancelForms = () => {
    setIsAdding(false);
    setEditingId(null);
    setTechForm({ name: '', icon: '', category: 'Frontend' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const categories = ['Frontend', 'Backend', 'Database', 'Cloud', 'Tools'];
  const groupedTech = categories.reduce((acc, category) => {
    acc[category] = techStack.filter(tech => tech.category === category);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">Tech Stack Management</h2>
        {!isAdding && !editingId && (
          <button onClick={() => setIsAdding(true)} className="btn-primary text-sm" disabled={saving}>
            <HiPlus className="w-4 h-4" />
            Add Technology
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="glass-card p-6 rounded-2xl mb-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            {isAdding ? 'Add New Technology' : 'Edit Technology'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Technology Name</label>
              <input
                type="text"
                value={techForm.name}
                onChange={(e) => setTechForm({ ...techForm, name: e.target.value })}
                className="form-input"
                placeholder="e.g., React"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Icon/Image URL</label>
              <input
                type="text"
                value={techForm.icon}
                onChange={(e) => setTechForm({ ...techForm, icon: e.target.value })}
                className="form-input"
                placeholder="/icons/react.png"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={techForm.category}
                onChange={(e) => setTechForm({ ...techForm, category: e.target.value })}
                className="form-input"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={isAdding ? handleAddTech : handleUpdateTech}
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
                  {isAdding ? 'Add Technology' : 'Update Technology'}
                </>
              )}
            </button>
            <button onClick={cancelForms} className="btn-outline text-sm" disabled={saving}>
              <HiXMark className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Technologies by Category */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryTech = groupedTech[category] || [];
          
          if (categoryTech.length === 0) return null;

          return (
            <div key={category} className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-slate-200 mb-4">{category}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTech.map((tech) => (
                  <div key={tech._id} className="bg-white/[0.02] p-4 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                          {tech.icon ? (
                            <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
                          ) : (
                            <span className="text-xs font-bold text-slate-400">
                              {tech.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-slate-200 truncate">{tech.name}</h4>
                          <p className="text-xs text-slate-500">{tech.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleEditTech(tech)}
                          className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff] transition-colors"
                          disabled={saving}
                        >
                          <HiPencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTech(tech._id)}
                          className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                          disabled={saving}
                        >
                          <HiTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
