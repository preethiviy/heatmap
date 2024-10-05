import { getUsers } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers () {
    const {data, isPending} = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers()
    })

    return {usersData: data, isPending}
}