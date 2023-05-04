import { Application } from 'express';
import { pick } from 'rambda';

import { appConfig } from '@config';
import blockRouter from '@modules/block/block.router';
import monitoringRouter from '@modules/monitoring/monitoring.router';
import notesRouter from '@modules/notes/notes.router';
import reportRouter from '@modules/report/report.router';

export const registerRoutes = (app: Application) => {
  app.get('/', (_, res) => res.json(pick(['name', 'version'], appConfig)));

  // API routes
  app.use('/v1/ping', monitoringRouter);
  app.use('/v1/notes', notesRouter);
  app.use('/v1/block', blockRouter);
  app.use('/v1/report', reportRouter);
};
