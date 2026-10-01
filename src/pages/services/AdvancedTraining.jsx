import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { TRAINING_SERVICES } from '../../data/services/training';

export default function AdvancedTraining() {
  const service = TRAINING_SERVICES.find((s) => s.slug === 'advanced');
  return <ServiceDetail service={service} siblings={TRAINING_SERVICES} />;
}
