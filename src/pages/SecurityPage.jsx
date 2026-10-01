import React from 'react';
import { ServiceHub } from '../components/site/ServiceTemplates';
import { SECURITY_HUB, SECURITY_SERVICES } from '../data/services/security';

export default function SecurityPage() {
  return <ServiceHub hub={SECURITY_HUB} services={SECURITY_SERVICES} />;
}
