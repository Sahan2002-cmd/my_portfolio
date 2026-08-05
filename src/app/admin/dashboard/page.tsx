'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  FolderOpen,
  Code,
  Briefcase,
  Award,
  Mail,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  AlertCircle,
  Eye,
} from 'lucide-react';

type Tab = 'projects' | 'skills' | 'experience' | 'certificates' | 'messages';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [loading, setLoading] = useState(true);
  const [authenticating, setAuthenticating] = useState(true);
  const [dbOffline, setDbOffline] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [viewMessage, setViewMessage] = useState<any | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    date: '',
    techStack: '',
    link: '',
    github: '',
    order: 0,
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Programming Languages',
    order: 0,
  });

  const [experienceForm, setExperienceForm] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    type: 'work',
    order: 0,
    attachment: '',
    attachmentType: '',
    attachmentName: '',
  });

  const [certificateForm, setCertificateForm] = useState({
    title: '',
    organization: '',
    year: '',
    credentialId: '',
    imageKey: '',
    status: 'Finished',
    attachment: '',
    attachmentType: '',
    attachmentName: '',
  });

  // Verify Admin Auth
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      if (!res.ok || !data.authenticated) {
        router.push('/admin/login');
      } else {
        setAuthenticating(false);
        if (data.dbOffline) {
          setDbOffline(true);
        }
      }
    } catch {
      router.push('/admin/login');
    }
  }, [router]);

  // Load Tab Data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${activeTab}`);
      const data = await res.json();
      if (res.ok) {
        setItems(data);
      } else {
        showBanner('error', data.error || 'Failed to fetch items');
      }
    } catch (err: any) {
      showBanner('error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authenticating) {
      loadData();
    }
  }, [authenticating, activeTab, loadData]);

  const showBanner = (type: 'success' | 'error', message: string) => {
    setBanner({ type, message });
    setTimeout(() => setBanner(null), 5000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  // Open creation modal
  const handleAddClick = () => {
    setEditingItem(null);
    // Reset forms
    setProjectForm({ title: '', description: '', date: '', techStack: '', link: '', github: '', order: 0 });
    setSkillForm({ name: '', category: 'Programming Languages', order: 0 });
    setExperienceForm({
      role: '',
      company: '',
      period: '',
      description: '',
      type: 'work',
      order: 0,
      attachment: '',
      attachmentType: '',
      attachmentName: '',
    });
    setCertificateForm({
      title: '',
      organization: '',
      year: '',
      credentialId: '',
      imageKey: '',
      status: 'Finished',
      attachment: '',
      attachmentType: '',
      attachmentName: '',
    });
    setModalOpen(true);
  };

  // Open edit modal
  const handleEditClick = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'projects') {
      setProjectForm({
        title: item.title,
        description: item.description,
        date: item.date,
        techStack: item.techStack.join(', '),
        link: item.link || '',
        github: item.github || '',
        order: item.order || 0,
      });
    } else if (activeTab === 'skills') {
      setSkillForm({
        name: item.name,
        category: item.category,
        order: item.order || 0,
      });
    } else if (activeTab === 'experience') {
      setExperienceForm({
        role: item.role,
        company: item.company,
        period: item.period,
        description: item.description || '',
        type: item.type,
        order: item.order || 0,
        attachment: item.attachment || '',
        attachmentType: item.attachmentType || '',
        attachmentName: item.attachmentName || '',
      });
    } else if (activeTab === 'certificates') {
      setCertificateForm({
        title: item.title,
        organization: item.organization,
        year: item.year,
        credentialId: item.credentialId || '',
        imageKey: item.imageKey,
        status: item.status || 'Finished',
        attachment: item.attachment || '',
        attachmentType: item.attachmentType || '',
        attachmentName: item.attachmentName || '',
      });
    }
    setModalOpen(true);
  };

  // Submit form (Create / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let body: any = {};

    if (activeTab === 'projects') {
      body = {
        ...projectForm,
        techStack: projectForm.techStack.split(',').map((t) => t.trim()).filter((t) => t.length > 0),
      };
    } else if (activeTab === 'skills') {
      body = skillForm;
    } else if (activeTab === 'experience') {
      body = experienceForm;
    } else if (activeTab === 'certificates') {
      body = certificateForm;
    }

    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem
      ? `/api/${activeTab}/${editingItem._id}`
      : `/api/${activeTab}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save item');
      }

      showBanner('success', `Item ${editingItem ? 'updated' : 'created'} successfully!`);
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      showBanner('error', err.message || 'Operation failed');
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/${activeTab}/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete item');
      }

      showBanner('success', 'Item deleted successfully!');
      loadData();
    } catch (err: any) {
      showBanner('error', err.message || 'Failed to delete');
    }
  };

  if (authenticating) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00f5ff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0624] border-r border-white/5 flex flex-col justify-between p-6">
        <div>
          {/* Logo */}
          <div className="mb-10 px-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#00f5ff] to-[#14b8a6] bg-clip-text text-transparent">
              Sahan.admin
            </h1>
            <p className="text-xxs text-gray-500 uppercase tracking-widest mt-1.5 font-bold">Control Panel</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'projects', label: 'Projects', icon: FolderOpen },
              { id: 'skills', label: 'Skills', icon: Code },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'certificates', label: 'Certificates', icon: Award },
              { id: 'messages', label: 'Messages', icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as Tab);
                    setViewMessage(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:cursor-pointer ${
                    isActive
                      ? 'bg-[#00f5ff]/10 border border-[#00f5ff]/20 text-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.05)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/3'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all hover:cursor-pointer w-full mt-auto"
        >
          <LogOut className="w-4.5 h-4.5" />
          Log Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen">
        {dbOffline && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold">Offline Fallback Mode Enabled</p>
              <p className="text-xs text-amber-400/80">
                Could not connect to MongoDB. You are logged in using local fallback credentials. Note that CRUD operations are fully functional and will be saved locally to localData.json. To sync with your cloud database, please check your IP Access List / IP Whitelist on MongoDB Atlas or MONGODB_URI in `.env.local`.
              </p>
            </div>
          </div>
        )}
        {/* Banner Alert */}
        {banner && (
          <div
            className={`fixed top-6 right-6 z-100 flex items-center gap-3 px-5 py-4 rounded-xl border text-sm max-w-sm shadow-xl animate-fade-in ${
              banner.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}
          >
            {banner.type === 'success' ? (
              <Check className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="font-semibold">{banner.message}</p>
          </div>
        )}

        {/* Tab Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold capitalize text-white">
              Manage {activeTab}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Add, update, or remove portfolio {activeTab} items dynamically.
            </p>
          </div>

          {activeTab !== 'messages' && (
            <button
              onClick={handleAddClick}
              className="btn-primary py-2.5 px-5 flex items-center gap-2 text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add {activeTab.slice(0, -1)}
            </button>
          )}
        </div>

        {/* Data Loading / Main View Container */}
        <div className="bg-[#0a0624]/65 border border-white/5 rounded-2xl p-6 min-h-[400px] backdrop-blur-md relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00f5ff]"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <FolderOpen className="w-12 h-12 mb-3 text-gray-700" />
              <p className="text-sm font-semibold">No items found.</p>
              <p className="text-xs text-gray-600 mt-1">Seeding the database or adding one will populate this view.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Active list views */}
              {activeTab === 'projects' && (
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500">
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Order</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Title</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Date</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Tech Stack</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((project) => (
                      <tr key={project._id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-4 font-semibold text-gray-400">{project.order}</td>
                        <td className="py-4 font-bold text-white">{project.title}</td>
                        <td className="py-4 text-gray-300">{project.date}</td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-1">
                            {project.techStack && Array.isArray(project.techStack) ? project.techStack.map((tech: string, i: number) => (
                              <span key={i} className="text-xxs px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                                {tech}
                              </span>
                            )) : null}
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button onClick={() => handleEditClick(project)} className="p-2 text-gray-400 hover:text-[#00f5ff] hover:bg-white/5 rounded-lg transition-all" title="Edit"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(project._id)} className="p-2 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'skills' && (
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500">
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Order</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Name</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Category</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((skill) => (
                      <tr key={skill._id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-4 font-semibold text-gray-400">{skill.order}</td>
                        <td className="py-4 font-bold text-white">{skill.name}</td>
                        <td className="py-4 text-[#00f5ff] font-semibold text-xs">{skill.category}</td>
                        <td className="py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button onClick={() => handleEditClick(skill)} className="p-2 text-gray-400 hover:text-[#00f5ff] hover:bg-white/5 rounded-lg transition-all" title="Edit"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(skill._id)} className="p-2 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'experience' && (
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500">
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Order</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Role</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Company</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Period</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Type</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Doc / Image</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((exp) => (
                      <tr key={exp._id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-4 font-semibold text-gray-400">{exp.order}</td>
                        <td className="py-4 font-bold text-white">{exp.role}</td>
                        <td className="py-4 text-gray-300">{exp.company}</td>
                        <td className="py-4 text-gray-400">{exp.period}</td>
                        <td className="py-4 capitalize">
                          <span className={`text-xxs px-2 py-0.5 rounded font-semibold border ${exp.type === 'work' ? 'bg-[#00f5ff]/10 border-[#00f5ff]/25 text-[#00f5ff]' : 'bg-[#7c3aed]/10 border-[#7c3aed]/25 text-[#7c3aed]'}`}>
                            {exp.type}
                          </span>
                        </td>
                        <td className="py-4">
                          {exp.attachment ? (
                            <a
                              href={exp.attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#00f5ff] hover:underline font-semibold flex items-center gap-1.5"
                              title={exp.attachmentName || 'View attachment'}
                            >
                              View {exp.attachmentType === 'pdf' ? 'PDF' : 'Image'}
                            </a>
                          ) : (
                            <span className="text-gray-600 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button onClick={() => handleEditClick(exp)} className="p-2 text-gray-400 hover:text-[#00f5ff] hover:bg-white/5 rounded-lg transition-all" title="Edit"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(exp._id)} className="p-2 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'certificates' && (
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500">
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Title</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Organization</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Year</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Asset Key</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Status</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Doc / Image</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((cert) => (
                      <tr key={cert._id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-4 font-bold text-white">{cert.title}</td>
                        <td className="py-4 text-gray-300">{cert.organization}</td>
                        <td className="py-4 text-gray-400">{cert.year}</td>
                        <td className="py-4 font-mono text-xs text-[#00f5ff]">{cert.imageKey}</td>
                        <td className="py-4">
                          <select
                            value={cert.status || 'Finished'}
                            onChange={async (e) => {
                              const newStatus = e.target.value;
                              try {
                                const res = await fetch(`/api/certificates/${cert._id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ ...cert, status: newStatus }),
                                });
                                if (res.ok) {
                                  showBanner('success', 'Status updated successfully!');
                                  loadData();
                                } else {
                                  showBanner('error', 'Failed to update status');
                                }
                              } catch (err: any) {
                                showBanner('error', err.message || 'Error updating status');
                              }
                            }}
                            className="bg-[#060b24] border border-white/10 text-xs text-[#00f5ff] rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#00f5ff] hover:cursor-pointer"
                          >
                            <option value="Finished">Finished</option>
                            <option value="Continue">Continue</option>
                            <option value="Hold">Hold</option>
                            <option value="Stop">Stop</option>
                          </select>
                        </td>
                        <td className="py-4">
                          {cert.attachment ? (
                            <a
                              href={cert.attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#00f5ff] hover:underline font-semibold flex items-center gap-1.5"
                              title={cert.attachmentName || 'View attachment'}
                            >
                              View {cert.attachmentType === 'pdf' ? 'PDF' : 'Image'}
                            </a>
                          ) : (
                            <span className="text-gray-600 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button onClick={() => handleEditClick(cert)} className="p-2 text-gray-400 hover:text-[#00f5ff] hover:bg-white/5 rounded-lg transition-all" title="Edit"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(cert._id)} className="p-2 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'messages' && (
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500">
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Sender</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Email</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Subject</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider">Date</th>
                      <th className="pb-3 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((message) => (
                      <tr key={message._id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-4 font-bold text-white">{message.name}</td>
                        <td className="py-4 text-gray-300">{message.email}</td>
                        <td className="py-4 text-gray-300 font-semibold">{message.subject}</td>
                        <td className="py-4 text-gray-500 text-xs">{new Date(message.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button onClick={() => setViewMessage(message)} className="p-2 text-gray-400 hover:text-[#00f5ff] hover:bg-white/5 rounded-lg transition-all" title="Read Message"><Eye className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(message._id)} className="p-2 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-all" title="Delete Message"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#0d0a21] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all"><X className="w-5 h-5" /></button>

            <h3 className="text-xl font-bold text-white mb-6">
              {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {activeTab === 'projects' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Project Title</label>
                    <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Date/Period</label>
                      <input type="text" value={projectForm.date} onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })} required placeholder="e.g. Dec 2025" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Display Order</label>
                      <input type="number" value={projectForm.order} onChange={(e) => setProjectForm({ ...projectForm, order: parseInt(e.target.value) || 0 })} required className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Tech Stack (comma-separated)</label>
                    <input type="text" value={projectForm.techStack} onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })} required placeholder="React, Node.js, MongoDB" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Live URL</label>
                      <input type="url" value={projectForm.link} onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })} placeholder="https://example.com" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">GitHub URL</label>
                      <input type="url" value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} placeholder="https://github.com/..." className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Description</label>
                    <textarea rows={4} value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all resize-none" />
                  </div>
                </>
              )}

              {activeTab === 'skills' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Skill Name</label>
                    <input type="text" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} required placeholder="e.g. Next.js" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Category</label>
                      <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} className="w-full bg-[#0d0a21] border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all">
                        <option value="Programming Languages">Programming Languages</option>
                        <option value="Web Technologies">Web Technologies</option>
                        <option value="Databases & Tools">Databases & Tools</option>
                        <option value="Concepts & Frameworks">Concepts & Frameworks</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Display Order</label>
                      <input type="number" value={skillForm.order} onChange={(e) => setSkillForm({ ...skillForm, order: parseInt(e.target.value) || 0 })} required className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'experience' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Role/Qualification</label>
                    <input type="text" value={experienceForm.role} onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })} required placeholder="e.g. Full-Stack Developer" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Company/Institution</label>
                    <input type="text" value={experienceForm.company} onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })} required placeholder="e.g. Peoples Bank / SLIIT" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Period</label>
                      <input type="text" value={experienceForm.period} onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })} required placeholder="e.g. Sep 2022 - Sep 2023" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Order</label>
                      <input type="number" value={experienceForm.order} onChange={(e) => setExperienceForm({ ...experienceForm, order: parseInt(e.target.value) || 0 })} required className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Type</label>
                    <select value={experienceForm.type} onChange={(e) => setExperienceForm({ ...experienceForm, type: e.target.value as 'work' | 'education' })} className="w-full bg-[#0d0a21] border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all">
                      <option value="work">Work Experience</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Description</label>
                    <textarea rows={3} value={experienceForm.description} onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })} className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Upload Attachment (Image or PDF)</label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const MAX_SIZE_MB = 5;
                        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                          alert(`File is too large. Maximum allowed size is ${MAX_SIZE_MB}MB.`);
                          e.target.value = '';
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const base64 = event.target?.result as string;
                          const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
                          setExperienceForm(prev => ({
                            ...prev,
                            attachment: base64,
                            attachmentType: fileType,
                            attachmentName: file.name,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2 text-white focus:outline-none transition-all text-xs"
                    />
                    {experienceForm.attachmentName && (
                      <p className="text-xxs text-[#00f5ff] truncate mt-1">
                        ✓ Attached: {experienceForm.attachmentName}
                      </p>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'certificates' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Certificate Title</label>
                    <input type="text" value={certificateForm.title} onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })} required placeholder="e.g. Python Programming" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Issuing Organization</label>
                    <input type="text" value={certificateForm.organization} onChange={(e) => setCertificateForm({ ...certificateForm, organization: e.target.value })} required placeholder="e.g. University of Moratuwa" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Year</label>
                      <input type="text" value={certificateForm.year} onChange={(e) => setCertificateForm({ ...certificateForm, year: e.target.value })} required placeholder="e.g. 2026" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Credential ID (Optional)</label>
                      <input type="text" value={certificateForm.credentialId} onChange={(e) => setCertificateForm({ ...certificateForm, credentialId: e.target.value })} placeholder="e.g. VERIFY-123" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Image Asset Key (e.g. &apos;ml&apos;, &apos;python&apos;)</label>
                      <input type="text" value={certificateForm.imageKey} onChange={(e) => setCertificateForm({ ...certificateForm, imageKey: e.target.value })} required placeholder="e.g. python" className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-semibold uppercase">Status</label>
                      <select value={certificateForm.status} onChange={(e) => setCertificateForm({ ...certificateForm, status: e.target.value })} className="w-full bg-[#0d0a21] border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2.5 text-white focus:outline-none transition-all">
                        <option value="Finished">Finished</option>
                        <option value="Continue">Continue</option>
                        <option value="Hold">Hold</option>
                        <option value="Stop">Stop</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Upload Attachment (Image or PDF)</label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const MAX_SIZE_MB = 5;
                        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                          alert(`File is too large. Maximum allowed size is ${MAX_SIZE_MB}MB.`);
                          e.target.value = '';
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const base64 = event.target?.result as string;
                          const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
                          setCertificateForm(prev => ({
                            ...prev,
                            attachment: base64,
                            attachmentType: fileType,
                            attachmentName: file.name,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-2 text-white focus:outline-none transition-all text-xs"
                    />
                    {certificateForm.attachmentName && (
                      <p className="text-xxs text-[#00f5ff] truncate mt-1">
                        ✓ Attached: {certificateForm.attachmentName}
                      </p>
                    )}
                  </div>
                </>
              )}

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer mt-6 py-2.5 text-sm">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Message Reader Modal */}
      {viewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#0d0a21] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-lg">
            {/* Close */}
            <button onClick={() => setViewMessage(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all"><X className="w-5 h-5" /></button>

            <span className="inline-block text-[#00f5ff] text-xxs font-bold px-2 py-0.5 rounded bg-[#00f5ff]/10 border border-[#00f5ff]/20 mb-4">
              Received on {new Date(viewMessage.createdAt).toLocaleString()}
            </span>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Sender</h4>
                <p className="text-white font-bold text-base">{viewMessage.name}</p>
                <a href={`mailto:${viewMessage.email}`} className="text-xs text-[#00f5ff] hover:underline font-semibold">{viewMessage.email}</a>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Subject</h4>
                <p className="text-white font-semibold text-sm">{viewMessage.subject}</p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1.5">Message</h4>
                <p className="text-gray-300 text-sm leading-relaxed bg-white/2 p-4 rounded-xl border border-white/5 whitespace-pre-wrap">
                  {viewMessage.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
