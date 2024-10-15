import { useMutation } from '@tanstack/react-query';

import { LoginRqTO } from '../models/login';
import { LoginService } from '../services/login';

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRqTO) => LoginService.login(data),
  });
}
