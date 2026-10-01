import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { DEVELOPMENT_SERVICES } from '../../data/services/development';

export default function WebDevelopment() {
  const service = DEVELOPMENT_SERVICES.find((s) => s.slug === 'web');
  return <ServiceDetail service={service} siblings={DEVELOPMENT_SERVICES} />;
}
