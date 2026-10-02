import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ServiceHub } from '../components/site/ServiceTemplates';
import { TRAINING_HUB, TRAINING_SERVICES } from '../data/services/training';

const API_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export default function TrainingAcademy() {
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/enrollment/status`)
      .then((r) => r.json())
      .then((d) => setEnrollmentOpen(d.enrollmentOpen ?? true))
      .catch(() => setEnrollmentOpen(true));
  }, []);

  // The internship call to action follows the live enrolment status
  const renderSectionLink = (link) => (enrollmentOpen ? (
    <Link to={link.to} className="cs-btn cs-btn-primary w-fit">
      {link.label}
      <svg className="cs-btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
    </Link>
  ) : (
    <div className="flex flex-col gap-2">
      <span className="cs-btn cs-btn-secondary w-fit opacity-60 cursor-not-allowed" aria-disabled="true">{link.closedLabel}</span>
      <span className="text-[14px] text-dim">{link.closedNote}</span>
    </div>
  ));

  return <ServiceHub hub={TRAINING_HUB} services={TRAINING_SERVICES} renderSectionLink={renderSectionLink} />;
}
