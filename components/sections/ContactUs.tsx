'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BorderGlow from '../ui/BorderGlow';
import { Loader2, CheckCircle2, AlertTriangle, Upload, Mail, Phone, ArrowLeft, MapPin, Clock } from 'lucide-react';

type FlowState = 'prompt' | 'candidate' | 'employer';

export default function ContactUs() {
  const [flowState, setFlowState] = useState<FlowState>('prompt');
  
  // Employer form state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [employerEmail, setEmployerEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  // Candidate form state
  const [fullName, setFullName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [jobTypePreference, setJobTypePreference] = useState('Full-time');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Status state
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // DOM Ref for scrolling
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Custom Event Listener for page-wide selectors
  useEffect(() => {
    const handleFlowSelect = (e: Event) => {
      const customEvent = e as CustomEvent;
      const selectedFlow = customEvent.detail as 'candidate' | 'employer';
      setFlowState(selectedFlow);
      setStatus('idle');
      setErrorMessage('');
      
      // Scroll to contact section
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('select-contact-flow', handleFlowSelect);
    return () => window.removeEventListener('select-contact-flow', handleFlowSelect);
  }, []);

  const handleBackToPrompt = () => {
    setFlowState('prompt');
    setStatus('idle');
    setErrorMessage('');
  };

  const resetForms = () => {
    setCompanyName('');
    setContactName('');
    setEmployerEmail('');
    setJobTitle('');
    setJobDescription('');
    
    setFullName('');
    setCandidateEmail('');
    setJobTypePreference('Full-time');
    setLinkedinUrl('');
    setCoverNote('');
    setResumeFile(null);
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !employerEmail || !jobTitle || !jobDescription) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employerEmail)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactName,
          email: employerEmail,
          jobTitle,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        resetForms();
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to connect to the server. Please check your connection.');
      setStatus('error');
    }
  };

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !candidateEmail || !resumeFile) {
      setErrorMessage('Please fill in all required fields and upload your resume.');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidateEmail)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      setErrorMessage('Resume file must be under 5MB.');
      setStatus('error');
      return;
    }

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = resumeFile.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage('Only PDF, DOC, and DOCX files are allowed.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', candidateEmail);
    formData.append('jobTypePreference', jobTypePreference);
    formData.append('linkedinUrl', linkedinUrl);
    formData.append('coverNote', coverNote);
    formData.append('resume', resumeFile);

    try {
      const response = await fetch('/api/contact/candidate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        resetForms();
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to connect to the server. Please check your connection.');
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' as const } },
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative z-10 overflow-hidden bg-background-primary">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-text-primary">
            Connect with <span className="text-[#8fa3ff]">Talent Origins</span>
          </h2>
          <p className="font-body text-lg text-text-muted">
            Partner with us to grow your career or team.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left Column: Contact Info */}
          <div className="space-y-8 font-body">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-[#8fa3ff]">
                Get in Touch
              </h3>
              <p className="text-text-muted text-base leading-relaxed">
                Whether you are looking to hire premium talent or searching for your next career move, we are here to support your goals.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-full bg-[#566ff0]/10 text-[#8fa3ff] border border-[#566ff0]/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-text-primary text-base">Email Us</div>
                  <div className="text-text-muted text-sm">info@talentorigins.com</div>
                </div>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-full bg-[#566ff0]/10 text-[#8fa3ff] border border-[#566ff0]/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-text-primary text-base">Call Us</div>
                  <div className="text-text-muted text-sm">+1 (555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-full bg-[#566ff0]/10 text-[#8fa3ff] border border-[#566ff0]/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-text-primary text-base">Visit Us</div>
                  <div className="text-text-muted text-sm leading-relaxed">
                    100 Pine Street, Suite 1250<br />San Francisco, CA 94111
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-full bg-[#566ff0]/10 text-[#8fa3ff] border border-[#566ff0]/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-text-primary text-base">Office Hours</div>
                  <div className="text-text-muted text-sm">Monday - Friday: 9:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Conversational Form */}
          <BorderGlow
            edgeSensitivity={20}
            borderRadius={12}
            backgroundColor="#12121a"
            className="w-full border border-accent-muted/20 overflow-hidden"
          >
            <div className="p-8 sm:p-10 min-h-[420px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {/* Prompt/Selection Stage */}
                {flowState === 'prompt' && (
                  <motion.div
                    key="prompt"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center flex-grow text-center"
                  >
                    <div className="mb-6 flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8fa3ff] animate-bounce delay-100" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8fa3ff] animate-bounce delay-200" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8fa3ff] animate-bounce delay-300" />
                    </div>
                    
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-8 max-w-md leading-relaxed">
                      Hello! Welcome to Talent Origins. Are you a Candidate or an Employer?
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <button
                        onClick={() => setFlowState('candidate')}
                        className="px-6 py-3 bg-[#566ff0] text-[#a5b4fc] font-body font-bold rounded-lg hover:opacity-90 transition-all cursor-pointer text-sm sm:text-base"
                      >
                        I am a Candidate
                      </button>
                      <button
                        onClick={() => setFlowState('employer')}
                        className="px-6 py-3 border border-[#8fa3ff] text-[#8fa3ff] font-body font-bold rounded-lg hover:bg-[#8fa3ff]/10 transition-all cursor-pointer text-sm sm:text-base"
                      >
                        I am an Employer
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Employer Form Stage */}
                {flowState === 'employer' && status !== 'success' && (
                  <motion.div
                    key="employer"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <button
                      onClick={handleBackToPrompt}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#8fa3ff] hover:underline mb-6 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to selection
                    </button>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary mb-6">
                      Tell Us About Your Hiring Needs
                    </h3>

                    <form onSubmit={handleEmployerSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Company Name <span className="text-[#8fa3ff]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
                            placeholder="Acme Corp"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Contact Name <span className="text-[#8fa3ff]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Corporate Email <span className="text-[#8fa3ff]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={employerEmail}
                            onChange={(e) => setEmployerEmail(e.target.value)}
                            className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
                            placeholder="john@company.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Target Job Title <span className="text-[#8fa3ff]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
                            placeholder="e.g. Warehouse Manager"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                          Requirements &amp; Job Description <span className="text-[#8fa3ff]">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all resize-none"
                          placeholder="Briefly describe the candidate requirements, experience, and responsibilities..."
                        />
                      </div>

                      {status === 'error' && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-md">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full sm:w-auto px-8 py-3 bg-[#566ff0] text-[#a5b4fc] font-body font-bold rounded-lg hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                            </>
                          ) : (
                            'Submit Inquiry'
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Candidate Form Stage */}
                {flowState === 'candidate' && status !== 'success' && (
                  <motion.div
                    key="candidate"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <button
                      onClick={handleBackToPrompt}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#8fa3ff] hover:underline mb-6 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to selection
                    </button>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary mb-6">
                      Submit Your Resume &amp; Profile
                    </h3>

                    <form onSubmit={handleCandidateSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Full Name <span className="text-[#8fa3ff]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
                            placeholder="Sarah Mitchell"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Email Address <span className="text-[#8fa3ff]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={candidateEmail}
                            onChange={(e) => setCandidateEmail(e.target.value)}
                            className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
                            placeholder="sarah@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Job Type Preference <span className="text-[#8fa3ff]">*</span>
                          </label>
                          <select
                            value={jobTypePreference}
                            onChange={(e) => setJobTypePreference(e.target.value)}
                            className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            LinkedIn URL <span className="text-text-muted/50 text-[10px] font-normal">(Optional)</span>
                          </label>
                          <input
                            type="url"
                            value={linkedinUrl}
                            onChange={(e) => setLinkedinUrl(e.target.value)}
                            className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                          Short Cover Note
                        </label>
                        <textarea
                          rows={3}
                          value={coverNote}
                          onChange={(e) => setCoverNote(e.target.value)}
                          className="w-full bg-[#12121a] border border-[#2a3580] focus:border-[#566ff0] focus:ring-1 focus:ring-[#566ff0] text-text-primary rounded-md px-3.5 py-2.5 text-sm outline-none transition-all resize-none"
                          placeholder="Introduce yourself and tell us what kind of roles you are interested in..."
                        />
                      </div>

                      {/* Resume Upload Box */}
                      <div>
                        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                          Resume File <span className="text-[#8fa3ff]">*</span> <span className="text-[10px] text-text-muted/50 font-normal">(PDF, DOC, DOCX up to 5MB)</span>
                        </label>
                        <div className="relative group border border-dashed border-[#2a3580] hover:border-[#566ff0] bg-[#12121a]/30 rounded-md p-6 flex flex-col items-center justify-center transition-all cursor-pointer">
                          <input
                            type="file"
                            required
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <Upload className="w-8 h-8 text-[#8fa3ff] group-hover:text-[#c7d2fe] transition-colors mb-2" />
                          <span className="font-body text-xs text-text-primary font-semibold mb-1">
                            {resumeFile ? resumeFile.name : 'Upload your resume'}
                          </span>
                          <span className="font-body text-[10px] text-text-muted">
                            {resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB` : 'Drag and drop or click to browse'}
                          </span>
                        </div>
                      </div>

                      {status === 'error' && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-md">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full sm:w-auto px-8 py-3 bg-[#566ff0] text-[#a5b4fc] font-body font-bold rounded-lg hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                            </>
                          ) : (
                            'Submit Resume'
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Success Screen */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center flex-grow text-center animate-pulse"
                  >
                    <CheckCircle2 className="w-14 h-14 text-[#8fa3ff] mb-6" />
                    <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
                      Thank You!
                    </h3>
                    <p className="font-body text-sm sm:text-base text-text-muted max-w-md mb-8 leading-relaxed">
                      Your details have been successfully submitted to the Talent Origins recruitment team. We will review your inquiry and get back to you shortly.
                    </p>
                    <button
                      onClick={handleBackToPrompt}
                      className="px-6 py-2.5 border border-[#8fa3ff] text-[#8fa3ff] hover:bg-[#8fa3ff]/10 font-body font-semibold rounded-md transition-colors text-xs cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
