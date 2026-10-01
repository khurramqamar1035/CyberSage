import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { TRAINING_SERVICES } from '../../data/services/training';

export default function BasicTraining() {
  const service = TRAINING_SERVICES.find((s) => s.slug === 'beginner');
  return <ServiceDetail service={service} siblings={TRAINING_SERVICES} />;
}
