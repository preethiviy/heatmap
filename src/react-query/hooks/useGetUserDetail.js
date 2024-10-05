import { getUserDetail } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export function useGetUserDetail (id) {
    const {data, isPending} = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserDetail(id),
        enabled: id ? true : false
    })

    return {userDetailData: data, isPending}
}