import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { DEVELOPMENT_SERVICES } from '../../data/services/development';

export default function AndroidDevelopment() {
  const service = DEVELOPMENT_SERVICES.find((s) => s.slug === 'android');
  return <ServiceDetail service={service} siblings={DEVELOPMENT_SERVICES} />;
}
