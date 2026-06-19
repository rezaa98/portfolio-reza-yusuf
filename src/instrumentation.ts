import { registerOTel } from '@vercel/otel';

export function register() {
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || 'development';
  
  registerOTel({ 
    serviceName: 'rezacode-portfolio',
    attributes: {
      'deployment.environment': env
    }
  });
}
