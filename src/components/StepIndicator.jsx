import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaLock } from 'react-icons/fa';

const steps = [
  { id: 1, label: 'Artefacto', description: 'Selecciona el artefacto' },
  { id: 2, label: 'Distancia', description: 'Ingresa la distancia real' },
  { id: 3, label: 'Accesorios', description: 'Selecciona accesorios (opcional)' },
  { id: 4, label: 'Revisar', description: 'Revisa y calcula' },
];

const StepIndicator = ({ currentStep, completedSteps = [] }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 'var(--spacing-6)',
      padding: 'var(--spacing-4)',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      position: 'relative',
    }}>
      {/* Progress line */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        right: '10%',
        height: '2px',
        background: 'var(--border-color)',
        transform: 'translateY(-50%)',
        zIndex: 0,
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'var(--primary-gradient)',
          }}
        />
      </div>

      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;
        const isLocked = step.id > currentStep && !isCompleted;

        return (
          <div
            key={step.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: isCurrent ? 1.1 : 1,
                backgroundColor: isCompleted 
                  ? 'var(--success-color)' 
                  : isCurrent 
                    ? 'var(--primary-color)' 
                    : 'var(--bg-card)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `3px solid ${
                  isCompleted 
                    ? 'var(--success-color)' 
                    : isCurrent 
                      ? 'var(--primary-color)' 
                      : 'var(--border-color)'
                }`,
                color: isCompleted || isCurrent ? 'white' : 'var(--text-muted)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-lg)',
                boxShadow: isCurrent ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
              }}
            >
              {isCompleted ? (
                <FaCheck />
              ) : isLocked ? (
                <FaLock size={16} />
              ) : (
                step.id
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: 'var(--spacing-2)',
                textAlign: 'center',
                maxWidth: '100px',
              }}
            >
              <div style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: isCurrent ? 'var(--font-weight-bold)' : 'var(--font-weight-semibold)',
                color: isCurrent ? 'var(--primary-color)' : 'var(--text-secondary)',
                marginBottom: 'var(--spacing-1)',
              }}>
                {step.label}
              </div>
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {step.description}
                </motion.div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
