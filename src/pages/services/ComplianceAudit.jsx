import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { SECURITY_SERVICES } from '../../data/services/security';

export default function ComplianceAudit() {
  const service = SECURITY_SERVICES.find((s) => s.slug === 'compliance-audit');
  return <ServiceDetail service={service} siblings={SECURITY_SERVICES} />;
}
