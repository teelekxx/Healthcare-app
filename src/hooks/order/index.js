
import { useMutation, useQueryClient, useQuery } from "react-query";
import {getOrder} from "./function"

export const useGetOrders = () => useQuery(getOrder);