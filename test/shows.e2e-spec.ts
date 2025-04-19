import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

describe('Shows (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: (context: ExecutionContext) => {
                    const ctx = GqlExecutionContext.create(context);
                    ctx.getContext().req.user = {
                        id: 'test-user-id',
                        email: 'test@example.com',
                        roles: ['user'],
                    };
                    return true;
                },
            })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should fetch shows', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
          query {
            shows {
              id
              title
              genre
              type
            }
          }
        `,
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.shows).toBeInstanceOf(Array);
                expect(res.body.data.shows.length).toBeGreaterThan(0);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
