import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: [''],
    liveUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const saveProjects = async (updatedProjects) => {
    try {
      setSaving(true);
      await portfolioAPI.updateSection('projects', updatedProjects);
      setProjects(updatedProjects);
      alert('Projects updated successfully!');
    } catch (error) {
      console.error('Error saving projects:', error);
      alert('Failed to save projects: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    const newProject = {
      _id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      image: formData.image,
      technologies: formData.tags.filter(t => t.trim() !== ''),
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      featured: false,
    };
    const updatedProjects = [...projects, newProject];
    await saveProjects(updatedProjects);
    setFormData({ title: '', description: '', image: '', tags: [''], liveUrl: '', githubUrl: '' });
    setIsAdding(false);
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.technologies || [''],
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
    });
  };

  const handleUpdate = async () => {
    const updatedProjects = projects.map(project => 
      project._id === editingId ? { 
        ...project, 
        title: formData.title,
        description: formData.description,
        image: formData.image,
        technologies: formData.tags.filter(t => t.trim() !== ''),
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
      } : project
    );
    await saveProjects(updatedProjects);
    setEditingId(null);
    setFormData({ title: '', description: '', image: '', tags: [''], liveUrl: '', githubUrl: '' });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project._id !== id);
      await saveProjects(updatedProjects);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', description: '', image: '', tags: [''], liveUrl: '', githubUrl: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const addTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, ''] });
  };

  const updateTag = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };

  const removeTag = (index) => {
    setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">Projects</h2>
        {!isAdding && !editingId && (
          <button onClick={() => setIsAdding(true)} className="btn-primary text-sm">
            <HiPlus className="w-4 h-4" />
            Add Project
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="glass-card p-6 rounded-2xl mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            {isAdding ? 'Add New Project' : 'Edit Project'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
              placeholder="e.g., E-commerce Platform"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="form-input resize-none"
              placeholder="Brief description of the project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="form-input"
              placeholder="e.g., /images/project.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Technologies</label>
            <div className="space-y-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    className="form-input flex-1"
                    placeholder="e.g., React"
                  />
                  {formData.tags.length > 1 && (
                    <button
                      onClick={() => removeTag(index)}
                      className="p-3 rounded-xl hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addTag}
                className="text-sm text-[#00d4ff] hover:text-[#00aad4] transition-colors"
              >
                + Add Technology
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Live/Official URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="form-input"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GitHub Source Code</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="form-input"
                placeholder="https://github.com/username/repo"
              />
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="glass-card rounded-2xl overflow-hidden">
            {project.image && (
              <div className="h-48 bg-gradient-to-br from-[#00d4ff]/10 to-[#7c3aed]/10 flex items-center justify-center">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-200">{project.title}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff] transition-colors"
                    disabled={saving}
                  >
                    <HiPencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                    disabled={saving}
                  >
                    <HiTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {(project.technologies || []).map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded-lg bg-[#00d4ff]/10 text-[#00d4ff]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
