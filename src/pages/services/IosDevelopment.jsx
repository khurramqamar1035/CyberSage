import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { DEVELOPMENT_SERVICES } from '../../data/services/development';

export default function IosDevelopment() {
  const service = DEVELOPMENT_SERVICES.find((s) => s.slug === 'ios');
  return <ServiceDetail service={service} siblings={DEVELOPMENT_SERVICES} />;
}
