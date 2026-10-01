import React from 'react';
import { ServiceHub } from '../components/site/ServiceTemplates';
import { DEVELOPMENT_HUB, DEVELOPMENT_SERVICES } from '../data/services/development';

export default function DevelopmentPage() {
  return <ServiceHub hub={DEVELOPMENT_HUB} services={DEVELOPMENT_SERVICES} />;
}
