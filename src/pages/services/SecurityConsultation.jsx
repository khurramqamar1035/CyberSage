import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { SECURITY_SERVICES } from '../../data/services/security';

export default function SecurityConsultation() {
  const service = SECURITY_SERVICES.find((s) => s.slug === 'security-consultation');
  return <ServiceDetail service={service} siblings={SECURITY_SERVICES} />;
}
