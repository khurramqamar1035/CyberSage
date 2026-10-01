import React from 'react';
import { ServiceDetail } from '../../components/site/ServiceTemplates';
import { TRAINING_SERVICES } from '../../data/services/training';

export default function IntermediateTraining() {
  const service = TRAINING_SERVICES.find((s) => s.slug === 'intermediate');
  return <ServiceDetail service={service} siblings={TRAINING_SERVICES} />;
}
