import {save, update, remove} from './watchs.controller';

export default userRouter => {
  const userBaseUrl = '/:username/watch';

  userRouter.post(`${userBaseUrl}/`, save);
  userRouter.put(`${userBaseUrl}/`, update);
  userRouter.delete(`${userBaseUrl}/`, remove);
};