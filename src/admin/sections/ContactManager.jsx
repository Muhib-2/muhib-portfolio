import { useState } from 'react';
import { HiPencil, HiCheck, HiXMark, HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import { PORTFOLIO_DATA } from '../../context/PortfolioContext';

export default function ContactManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: PORTFOLIO_DATA.contact?.email || 'your.email@example.com',
    phone: PORTFOLIO_DATA.contact?.phone || '+1 234 567 8900',
    location: PORTFOLIO_DATA.contact?.location || 'Your City, Country',
    availability: PORTFOLIO_DATA.contact?.availability || 'Available for freelance work',
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hi, I would like to discuss a project with you.',
      date: '2024-01-15',
      read: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Interested in hiring you for a web development project.',
      date: '2024-01-14',
      read: true,
    },
  ]);

  const handleSave = () => {
    console.log('Saving contact data:', formData);
    setIsEditing(false);
    alert('Contact information updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      email: PORTFOLIO_DATA.contact?.email || 'your.email@example.com',
      phone: PORTFOLIO_DATA.contact?.phone || '+1 234 567 8900',
      location: PORTFOLIO_DATA.contact?.location || 'Your City, Country',
      availability: PORTFOLIO_DATA.contact?.availability || 'Available for freelance work',
    });
    setIsEditing(false);
  };

  const toggleMessageRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: !msg.read } : msg
    ));
  };

  const deleteMessage = (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== id));
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div>
      <h2 className="text-2xl font-bold font-display text-gradient mb-6">Contact Management</h2>

      {/* Contact Information */}
      <div className="glass-card p-6 rounded-2xl mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-200">Contact Information</h3>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-primary text-sm">
              <HiPencil className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary text-sm">
                <HiCheck className="w-4 h-4" />
                Save
              </button>
              <button onClick={handleCancel} className="btn-outline text-sm">
                <HiXMark className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <HiEnvelope className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <HiPhone className="w-4 h-4" />
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <HiMapPin className="w-4 h-4" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Availability Status</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              disabled={!isEditing}
              className="form-input disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Messages Inbox */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-200">
            Messages Inbox
            {unreadCount > 0 && (
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[#00d4ff]/20 text-[#00d4ff]">
                {unreadCount} new
              </span>
            )}
          </h3>
        </div>

        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No messages yet</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl border transition-all ${
                  msg.read
                    ? 'bg-white/[0.02] border-white/[0.05]'
                    : 'bg-[#00d4ff]/[0.05] border-[#00d4ff]/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-200">{msg.name}</h4>
                    <p className="text-xs text-slate-500">{msg.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{msg.date}</span>
                    <button
                      onClick={() => toggleMessageRead(msg.id)}
                      className={`text-xs px-2 py-1 rounded-lg transition-colors ${
                        msg.read
                          ? 'bg-white/[0.04] text-slate-400 hover:text-slate-200'
                          : 'bg-[#00d4ff]/20 text-[#00d4ff] hover:bg-[#00d4ff]/30'
                      }`}
                    >
                      {msg.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-xs px-2 py-1 rounded-lg bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
