import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { SECURITY_SERVICES } from '../../data/services/security';

export default function RealtimeMonitoring() {
  const service = SECURITY_SERVICES.find((s) => s.slug === 'real-time-monitoring');
  return <ServiceDetail service={service} siblings={SECURITY_SERVICES} />;
}
