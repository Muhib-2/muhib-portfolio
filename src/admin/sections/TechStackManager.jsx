import { useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';

export default function TechStackManager() {
  const [techCategories, setTechCategories] = useState([
    {
      id: 1,
      name: 'Frontend Frameworks',
      emoji: '🎨',
      color: '#00d4ff',
      technologies: [
        { id: 1, name: 'React', image: '/icons/react.png', description: 'JavaScript library for building user interfaces' },
        { id: 2, name: 'Next.js', image: '/icons/nextjs.png', description: 'React framework for production' },
        { id: 3, name: 'Vue.js', image: '/icons/vue.png', description: 'Progressive JavaScript framework' },
      ]
    },
    {
      id: 2,
      name: 'Backend',
      emoji: '⚙️',
      color: '#7c3aed',
      technologies: [
        { id: 4, name: 'Node.js', image: '/icons/nodejs.png', description: 'JavaScript runtime for server-side development' },
        { id: 5, name: 'Python', image: '/icons/python.png', description: 'High-level programming language' },
        { id: 6, name: 'Django', image: '/icons/django.png', description: 'Python web framework' },
      ]
    },
    {
      id: 3,
      name: 'Cloud',
      emoji: '☁️',
      color: '#10b981',
      technologies: [
        { id: 7, name: 'AWS', image: '/icons/aws.png', description: 'Amazon Web Services cloud platform' },
        { id: 8, name: 'Vercel', image: '/icons/vercel.png', description: 'Frontend cloud platform' },
        { id: 9, name: 'Firebase', image: '/icons/firebase.png', description: 'Google cloud platform' },
      ]
    }
  ]);

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingTech, setIsAddingTech] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTech, setEditingTech] = useState(null);
  
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    emoji: '',
    color: '#00d4ff'
  });

  const [techForm, setTechForm] = useState({
    name: '',
    image: '',
    description: ''
  });

  // Category Management
  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now(),
      ...categoryForm,
      technologies: []
    };
    setTechCategories([...techCategories, newCategory]);
    setCategoryForm({ name: '', emoji: '', color: '#00d4ff' });
    setIsAddingCategory(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setCategoryForm({
      name: category.name,
      emoji: category.emoji,
      color: category.color
    });
  };

  const handleUpdateCategory = () => {
    setTechCategories(techCategories.map(cat => 
      cat.id === editingCategory ? { ...cat, ...categoryForm } : cat
    ));
    setEditingCategory(null);
    setCategoryForm({ name: '', emoji: '', color: '#00d4ff' });
  };

  const handleDeleteCategory = (id) => {
    if (confirm('Are you sure you want to delete this category and all its technologies?')) {
      setTechCategories(techCategories.filter(cat => cat.id !== id));
    }
  };

  // Technology Management
  const handleAddTech = (categoryId) => {
    const newTech = {
      id: Date.now(),
      ...techForm
    };
    setTechCategories(techCategories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, technologies: [...cat.technologies, newTech] }
        : cat
    ));
    setTechForm({ name: '', image: '', description: '' });
    setIsAddingTech(null);
  };

  const handleEditTech = (tech, categoryId) => {
    setEditingTech({ techId: tech.id, categoryId });
    setTechForm({
      name: tech.name,
      image: tech.image,
      description: tech.description
    });
  };

  const handleUpdateTech = () => {
    setTechCategories(techCategories.map(cat => 
      cat.id === editingTech.categoryId
        ? {
            ...cat,
            technologies: cat.technologies.map(tech =>
              tech.id === editingTech.techId ? { ...tech, ...techForm } : tech
            )
          }
        : cat
    ));
    setEditingTech(null);
    setTechForm({ name: '', image: '', description: '' });
  };

  const handleDeleteTech = (techId, categoryId) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      setTechCategories(techCategories.map(cat => 
        cat.id === categoryId
          ? { ...cat, technologies: cat.technologies.filter(tech => tech.id !== techId) }
          : cat
      ));
    }
  };

  const cancelForms = () => {
    setIsAddingCategory(false);
    setIsAddingTech(null);
    setEditingCategory(null);
    setEditingTech(null);
    setCategoryForm({ name: '', emoji: '', color: '#00d4ff' });
    setTechForm({ name: '', image: '', description: '' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">Tech Stack Management</h2>
        {!isAddingCategory && !editingCategory && (
          <button onClick={() => setIsAddingCategory(true)} className="btn-primary text-sm">
            <HiPlus className="w-4 h-4" />
            Add Category
          </button>
        )}
      </div>

      {/* Add/Edit Category Form */}
      {(isAddingCategory || editingCategory) && (
        <div className="glass-card p-6 rounded-2xl mb-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            {isAddingCategory ? 'Add New Category' : 'Edit Category'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category Name</label>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                className="form-input"
                placeholder="e.g., Frontend Frameworks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Emoji</label>
              <input
                type="text"
                value={categoryForm.emoji}
                onChange={(e) => setCategoryForm({ ...categoryForm, emoji: e.target.value })}
                className="form-input"
                placeholder="🎨"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Color</label>
              <input
                type="color"
                value={categoryForm.color}
                onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                className="form-input h-12"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={isAddingCategory ? handleAddCategory : handleUpdateCategory}
              className="btn-primary text-sm"
            >
              <HiCheck className="w-4 h-4" />
              {isAddingCategory ? 'Add Category' : 'Update Category'}
            </button>
            <button onClick={cancelForms} className="btn-outline text-sm">
              <HiXMark className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-8">
        {techCategories.map((category) => (
          <div key={category.id} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  {category.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-200">{category.name}</h3>
                  <p className="text-sm text-slate-400">{category.technologies.length} technologies</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {!isAddingTech && !editingTech && (
                  <button
                    onClick={() => setIsAddingTech(category.id)}
                    className="btn-outline text-sm"
                  >
                    <HiPlus className="w-4 h-4" />
                    Add Tech
                  </button>
                )}
                <button
                  onClick={() => handleEditCategory(category)}
                  className="p-2 rounded-xl hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff] transition-colors"
                >
                  <HiPencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 rounded-xl hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add/Edit Technology Form */}
            {(isAddingTech === category.id || (editingTech && editingTech.categoryId === category.id)) && (
              <div className="bg-white/[0.02] p-4 rounded-xl mb-4">
                <h4 className="text-md font-semibold text-slate-200 mb-3">
                  {isAddingTech ? 'Add New Technology' : 'Edit Technology'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                    <input
                      type="text"
                      value={techForm.image}
                      onChange={(e) => setTechForm({ ...techForm, image: e.target.value })}
                      className="form-input"
                      placeholder="/icons/react.png"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    value={techForm.description}
                    onChange={(e) => setTechForm({ ...techForm, description: e.target.value })}
                    rows={2}
                    className="form-input resize-none"
                    placeholder="Brief description of the technology"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={isAddingTech ? () => handleAddTech(category.id) : handleUpdateTech}
                    className="btn-primary text-sm"
                  >
                    <HiCheck className="w-4 h-4" />
                    {isAddingTech ? 'Add Technology' : 'Update Technology'}
                  </button>
                  <button onClick={cancelForms} className="btn-outline text-sm">
                    <HiXMark className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Technologies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.technologies.map((tech) => (
                <div key={tech.id} className="bg-white/[0.02] p-4 rounded-xl hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                        {tech.image ? (
                          <img src={tech.image} alt={tech.name} className="w-6 h-6 object-contain" />
                        ) : (
                          <span className="text-xs font-bold text-slate-400">
                            {tech.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-slate-200 truncate">{tech.name}</h4>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEditTech(tech, category.id)}
                        className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff] transition-colors"
                      >
                        <HiPencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTech(tech.id, category.id)}
                        className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <HiTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}