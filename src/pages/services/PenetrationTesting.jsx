import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { SECURITY_SERVICES } from '../../data/services/security';

export default function PenetrationTesting() {
  const service = SECURITY_SERVICES.find((s) => s.slug === 'penetration-testing');
  return <ServiceDetail service={service} siblings={SECURITY_SERVICES} />;
}
