import {save, remove} from './watchs.controller';

export default userRouter => {
  const userBaseUrl = '/:username/watch';

  userRouter.post(`${userBaseUrl}/`, save);
  userRouter.delete(`${userBaseUrl}/`, remove);
};