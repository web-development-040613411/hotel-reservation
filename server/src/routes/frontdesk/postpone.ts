import { sql } from '@/libs/db';
import Elysia from 'elysia';
import { reservationType } from '@/libs/type';

export const checkInRoute = new Elysia({ prefix: '/postponement' })
  .post('/', async ({body}) => {
    
  })
