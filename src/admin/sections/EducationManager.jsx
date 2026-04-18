import { useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';

const initialEducation = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University Name',
    period: '2019 - 2023',
    description: 'Focused on software engineering, algorithms, and web development.',
  },
];

export default function EducationManager() {
  const [education, setEducation] = useState(initialEducation);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '',
    description: '',
  });

  const handleAdd = () => {
    const newEducation = {
      id: Date.now(),
      ...formData,
    };
    setEducation([...education, newEducation]);
    setFormData({ degree: '', institution: '', period: '', description: '' });
    setIsAdding(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleUpdate = () => {
    setEducation(education.map(item => 
      item.id === editingId ? { ...item, ...formData } : item
    ));
    setEditingId(null);
    setFormData({ degree: '', institution: '', period: '', description: '' });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      setEducation(education.filter(item => item.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ degree: '', institution: '', period: '', description: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">Education</h2>
        {!isAdding && !editingId && (
          <button onClick={() => setIsAdding(true)} className="btn-primary text-sm">
            <HiPlus className="w-4 h-4" />
            Add Education
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="glass-card p-6 rounded-2xl mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            {isAdding ? 'Add New Education' : 'Edit Education'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Degree</label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="form-input"
              placeholder="e.g., Bachelor of Science in Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Institution</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="form-input"
              placeholder="e.g., University Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Period</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="form-input"
              placeholder="e.g., 2019 - 2023"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="form-input resize-none"
              placeholder="Brief description of your studies..."
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

      {/* Education List */}
      <div className="space-y-4">
        {education.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-200">{item.degree}</h3>
                <p className="text-sm text-[#00d4ff]">{item.institution}</p>
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
            <p className="text-sm text-slate-500 mb-2">{item.period}</p>
            <p className="text-sm text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
