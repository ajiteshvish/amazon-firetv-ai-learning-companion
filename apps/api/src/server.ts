import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { config } from 'dotenv';
import Fastify from 'fastify';

import type { HealthResponse } from '@multi-tv/shared-types';

const envPath = [resolve(process.cwd(), '.env'), resolve(process.cwd(), '../../.env')].find(existsSync);

if (envPath) {
  config({ path: envPath });
}

const server = Fastify({ logger: true });

server.get<{ Reply: HealthResponse }>('/health', async () => ({ status: 'ok' }));

const parsePort = (value: string): number => {
  const port = Number.parseInt(value, 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid API port: ${value}`);
  }

  return port;
};

const start = async (): Promise<void> => {
  const host = process.env.API_HOST ?? '0.0.0.0';
  const port = parsePort(process.env.API_PORT ?? '3000');

  try {
    await server.listen({ host, port });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

if (require.main === module) {
  void start();
}

export { server, start };
