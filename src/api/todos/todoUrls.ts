import { getApiBaseUrl } from "../../utils/common";

export const TODOS_URL = getApiBaseUrl("/todos");
export const TODOS_BY_ID_URL = (id: string) => getApiBaseUrl(`/todos/${id}`);
