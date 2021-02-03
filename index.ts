import {
  ApiRouter,
  compose,
  createServer,
  dispatchCommandFromBody,
  IHttpContext,
  injectLogService,
  sendJson,
  Server,
} from 'canoapi';

createServer((server: Server) => {})
  .withRouter(
    new ApiRouter('/user')
      .post(
        '/',
        compose(
          dispatchCommandFromBody((body: any) => {
            const logger = injectLogService();

            logger.info(body);
          }),
          (ctx: IHttpContext) => {
            sendJson(ctx.request.body)(ctx);
          },
        ),
      )
      .get(
        '/',
        sendJson({
          name: 'Ilya Katun',
          phone: '+7911*****06',
        }),
      ),
  )
  .run(() => {});
