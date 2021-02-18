import { useRouter } from "next/router";

export const useQueryParamState = <ValueType>(paramName: string, defaultValue: ValueType) => {
  const router = useRouter();

  const setParam = (value: ValueType) => {
    router.push(
      { pathname: router.pathname, query: { [paramName]: JSON.stringify(value) } },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  const routerValue = router.query[paramName];

  return [typeof routerValue === "string" ? JSON.parse(routerValue) : defaultValue, setParam];
};
