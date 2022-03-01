import { merge } from 'lodash';

import { useGlobalPluginProps } from '@tkeel/console-business-components';
import {
  UseCustomMutationOptions,
  useMutation as useCustomMutation,
  useNoAuthRedirectPath,
} from '@tkeel/console-hooks';
import { createHandleNoAuth } from '@tkeel/console-utils';

export default function useMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const { portalName, navigate } = useGlobalPluginProps();
  const basePath = process.env.BASE_PATH;
  const redirectPath = useNoAuthRedirectPath({ portalName, basePath });
  const handleNoAuth = createHandleNoAuth({ navigate, redirectPath });
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomMutation<TApiData, TRequestParams, TRequestData>(opts);
}
